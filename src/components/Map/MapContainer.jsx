import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapStore } from '../../store/mapStore';
import { useGeoData } from '../../hooks/useGeoData';
import { MAPBOX_TOKEN } from '../../config/mapbox';
import MiniMap from '../Controls/MiniMap';
import SampleHoverInfo from './SampleInfo/SampleHoverInfo';
import GeoDataLoader from './SampleInfo/GeoDataLoader';
import GermanyHoverInfo from './SampleInfoGermany/GermanyHoverInfo';
import BulgariaHoverInfo from './SampleInfoBulgaria/BulgariaHoverInfo';
import EstoniaHoverInfo from './SampleInfoEstonia/EstoniaHoverInfo';
import LetoniaHoverInfo from './SampleInfoLetonia/LetoniaHoverInfo';
import MadridHoverInfo from './SampleInfoMadrid/MadridHoverInfo';
import ItalyFlora2HoverInfo from './SampleInfoItalia/ItalyFlora2/ItalyFlora2HoverInfo';
import ItalyCiraa3HoverInfo from './SampleInfoItalia/ItalyCiraa3/ItalyCiraa3HoverInfo';

mapboxgl.accessToken = MAPBOX_TOKEN;

const MapContainer = () => {
    const mapContainer = useRef(null);
    const {
        map,
        viewport,
        mapStyle,
        setMap,
        setIsLoaded,
        selectedWMSLayers
    } = useMapStore();
    // Leer opacidades de window para cada capa WMS
    const [wmsOpacities, setWmsOpacities] = useState({});
    useEffect(() => {
        // window.wmsOpacities es actualizado por FloatingMenu
        setWmsOpacities(window.wmsOpacities || {});
        // Escuchar cambios globales
        const handler = () => setWmsOpacities({ ...(window.wmsOpacities || {}) });
        window.addEventListener('wmsOpacitiesChanged', handler);
        return () => window.removeEventListener('wmsOpacitiesChanged', handler);
    }, []);

    // Agregar todas las capas WMS seleccionadas al mapa (superpuestas)
    useEffect(() => {
        if (!map) return;

        function addWMSLayersIfReady() {
            if (!map.isStyleLoaded()) return;
            // Añadir cada capa WMS si no existe
            selectedWMSLayers.forEach((layer) => {
                const sourceId = `wms-source-${layer.name}`;
                const layerId = `wms-layer-${layer.name}`;
                const opacity = wmsOpacities[layer.name] !== undefined ? wmsOpacities[layer.name] : 1;
                if (!map.getSource(sourceId)) {
                    let wmsUrl = layer.url;
                    if (wmsUrl.includes('GetCapabilities')) {
                        wmsUrl = wmsUrl.split('?')[0];
                    }
                    if (!wmsUrl.endsWith('?')) wmsUrl += '?';
                    const layerName = layer.layerName || 'suoli';
                    const wmsParams =
                        `service=WMS&version=1.1.1&request=GetMap&layers=${layerName}&styles=&format=image/png&transparent=true&SRS=EPSG:3857&width=256&height=256&bbox={bbox-epsg-3857}`;
                    map.addSource(sourceId, {
                        type: 'raster',
                        tiles: [wmsUrl + wmsParams],
                        tileSize: 256,
                    });
                    map.addLayer({
                        id: layerId,
                        type: 'raster',
                        source: sourceId,
                        paint: { 'raster-opacity': opacity },
                    });
                } else {
                    // Si ya existe, actualizar opacidad
                    if (map.getLayer(layerId)) {
                        map.setPaintProperty(layerId, 'raster-opacity', opacity);
                    }
                }
            });
            // Eliminar capas/sources que ya no están seleccionadas
            const allLayerIds = map.getStyle().layers.map(l => l.id);
            allLayerIds.forEach(id => {
                if (id.startsWith('wms-layer-')) {
                    const name = id.replace('wms-layer-', '');
                    if (!selectedWMSLayers.some(l => l.name === name)) {
                        if (map.getLayer(id)) map.removeLayer(id);
                        const sourceId = `wms-source-${name}`;
                        if (map.getSource(sourceId)) map.removeSource(sourceId);
                    }
                }
            });
        }

        if (map.isStyleLoaded()) {
            addWMSLayersIfReady();
        } else {
            map.once('styledata', addWMSLayersIfReady);
        }

        // Limpieza: quitar listener si cambia dependencias
        return () => {
            map.off && map.off('styledata', addWMSLayersIfReady);
        };
    }, [map, selectedWMSLayers, wmsOpacities]);

    // Usar el hook de datos geoespaciales
    const { isLoadingGeoData } = useGeoData();

    useEffect(() => {
        if (!mapContainer.current) return;

        const mapInstance = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapStyle,
            center: [viewport.longitude, viewport.latitude],
            zoom: viewport.zoom,
            attributionControl: false
        });

        // Exponer setHoveredSample para los eventos de Alemania
        window.setHoveredSample = useMapStore.getState().setHoveredSample;

        // Agregar controles de navegación
        mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
        mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-right');

        mapInstance.on('load', () => {
            setIsLoaded(true);
            // Forzar vista de Europa al cargar
            setTimeout(() => {
                if (mapInstance) {
                    mapInstance.flyTo({
                        center: [10.0, 50.0],
                        zoom: 4.2,
                        duration: 0
                    });
                }
            }, 100);
        });

        setMap(mapInstance);

        return () => {
            if (mapInstance) {
                mapInstance.remove();
            }
        };
    }, []);

    // El cambio de estilo ahora se maneja en el store para preservar las capas personalizadas

    return (
        <div className="relative w-full h-full">
            <div ref={mapContainer} className="w-full h-full" />
            {/* Solo mostrar un pop-up según el tipo de punto */}
            {/* Mostrar pop-up de Sevilla solo si hoveredSample existe y no es de Alemania ni Bulgaria */}
            {useMapStore.getState().hoveredSample && !useMapStore.getState().hoveredSample._germany && !useMapStore.getState().hoveredSample._bulgaria && !useMapStore.getState().hoveredSample._estonia && !useMapStore.getState().hoveredSample._letonia && !useMapStore.getState().hoveredSample._madrid && <SampleHoverInfo />}
            {/* Mostrar pop-up de Alemania solo si hoveredSample existe y es de Alemania */}
            {useMapStore.getState().hoveredSample && useMapStore.getState().hoveredSample._germany && <GermanyHoverInfo />}
            {/* Mostrar pop-up de Bulgaria solo si hoveredSample existe y es de Bulgaria */}
            {useMapStore.getState().hoveredSample && useMapStore.getState().hoveredSample._bulgaria && <BulgariaHoverInfo />}
            {/* Mostrar pop-up de Estonia solo si hoveredSample existe y es de Estonia */}
            {useMapStore.getState().hoveredSample && useMapStore.getState().hoveredSample._estonia && <EstoniaHoverInfo />}
            {/* Mostrar pop-up de Letonia solo si hoveredSample existe y es de Letonia */}
            {useMapStore.getState().hoveredSample && useMapStore.getState().hoveredSample._letonia && <LetoniaHoverInfo />}
            {/* Mostrar pop-up de Madrid solo si hoveredSample existe y es de Madrid */}
            {useMapStore.getState().hoveredSample && useMapStore.getState().hoveredSample._madrid && <MadridHoverInfo />}
            {/* Mostrar pop-up de Italy Ciraa3 solo si hoveredSample existe y es de Italy Ciraa3 */}
            {useMapStore.getState().hoveredSample && useMapStore.getState().hoveredSample._italy && <ItalyCiraa3HoverInfo />}
            {/* Cargar datos geoespaciales */}
            <GeoDataLoader />
            <MiniMap />
        </div>
    );
};

export default MapContainer;