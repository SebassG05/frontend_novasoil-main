import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapStore } from '../../store/mapStore';
import { MAPBOX_TOKEN } from '../../config/mapbox';

const MiniMap = () => {
    const miniMapRef = useRef(null);
    const miniMapInstance = useRef(null);
    const map = useMapStore((state) => state.map);
    const deviceMemory = navigator.deviceMemory;
    const isLowPowerDevice =
        (navigator.hardwareConcurrency || 2) <= 4 ||
        (deviceMemory !== undefined && deviceMemory <= 4) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (isLowPowerDevice || !map || !miniMapRef.current) {
            return;
        }

        // Configurar token
        mapboxgl.accessToken = MAPBOX_TOKEN;

        // Crear mini-mapa
        miniMapInstance.current = new mapboxgl.Map({
            container: miniMapRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: map.getCenter(),
            zoom: Math.max(map.getZoom() - 4, 0),
            interactive: false,
            attributionControl: false,
            antialias: false,
            fadeDuration: 0,
            preserveDrawingBuffer: false
        });

        // Manejar errores
        miniMapInstance.current.on('error', (e) => {
            console.error('Error en MiniMap:', e);
        });

        // Eliminar logo de Mapbox
        miniMapInstance.current.on('load', () => {
            const logoElements = miniMapRef.current.querySelectorAll('.mapboxgl-ctrl-logo');
            logoElements.forEach(el => {
                el.style.display = 'none';
            });

            // Agregar fuente para el rectángulo
            miniMapInstance.current.addSource('viewport', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [[]]
                    }
                }
            });

            // Agregar capa del rectángulo
            miniMapInstance.current.addLayer({
                id: 'viewport',
                type: 'line',
                source: 'viewport',
                paint: {
                    'line-color': '#2563eb', // Azul de Tailwind
                    'line-width': 2,
                    'line-opacity': 0.8
                }
            });

            // Añadir relleno semitransparente
            miniMapInstance.current.addLayer({
                id: 'viewport-fill',
                type: 'fill',
                source: 'viewport',
                paint: {
                    'fill-color': '#2563eb',
                    'fill-opacity': 0.1
                }
            });

            updateViewportRectangle();
        });

        // Sincronizar con mapa principal
        let animationFrame = null;
        const updateMiniMap = () => {
            if (animationFrame !== null) return;
            animationFrame = requestAnimationFrame(() => {
                animationFrame = null;
                if (!miniMapInstance.current) return;
                miniMapInstance.current.jumpTo({
                    center: map.getCenter(),
                    zoom: Math.max(map.getZoom() - 4, 0)
                });
                updateViewportRectangle();
            });
        };

        // Actualizar el rectángulo de viewport
        const updateViewportRectangle = () => {
            if (miniMapInstance.current && miniMapInstance.current.getSource('viewport')) {
                const bounds = map.getBounds();
                const coordinates = [[
                    [bounds.getWest(), bounds.getNorth()],
                    [bounds.getEast(), bounds.getNorth()],
                    [bounds.getEast(), bounds.getSouth()],
                    [bounds.getWest(), bounds.getSouth()],
                    [bounds.getWest(), bounds.getNorth()]
                ]];

                miniMapInstance.current.getSource('viewport').setData({
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: coordinates
                    }
                });
            }
        };

        // Escuchar cambios del mapa principal
        map.on('move', updateMiniMap);

        // Cleanup
        return () => {
            if (miniMapInstance.current) {
                map.off('move', updateMiniMap);
                if (animationFrame !== null) cancelAnimationFrame(animationFrame);
                miniMapInstance.current.remove();
            }
        };
    }, [isLowPowerDevice, map]);

    if (isLowPowerDevice) return null;

    return (
        <div className="absolute bottom-4 right-4 w-[240px] h-[220px] sm:w-[300px] sm:h-[250px] md:w-[340px] md:h-[280px] z-40 shadow-lg overflow-hidden rounded-lg bg-white">
            <div ref={miniMapRef} className="w-full h-full"></div>
            <div className="absolute inset-0 pointer-events-none rounded-lg border border-gray-200"></div>
        </div>
    );
};

export default MiniMap;
