import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapStore } from '../../store/mapStore';
import { MAPBOX_TOKEN } from '../../config/mapbox';
import MiniMap from '../Controls/MiniMap';

mapboxgl.accessToken = MAPBOX_TOKEN;

const MapContainer = () => {
    const mapContainer = useRef(null);
    const {
        map,
        viewport,
        mapStyle,
        setMap,
        setIsLoaded
    } = useMapStore();

    useEffect(() => {
        if (!mapContainer.current) return;

        const mapInstance = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapStyle,
            center: [viewport.longitude, viewport.latitude],
            zoom: viewport.zoom,
            attributionControl: false
        });

        // Agregar controles de navegación
        mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
        mapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-right');

        mapInstance.on('load', () => {
            setIsLoaded(true);
        });

        setMap(mapInstance);

        return () => {
            if (mapInstance) {
                mapInstance.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (map && mapStyle) {
            map.setStyle(mapStyle);
        }
    }, [map, mapStyle]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div
                ref={mapContainer}
                style={{ width: '100%', height: '100%' }}
            />
            <MiniMap /> {/* ✅ AGREGAR ESTA LÍNEA */}
        </div>
    );
};

export default MapContainer;