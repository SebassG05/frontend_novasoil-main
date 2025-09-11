import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMapStore } from '../../store/mapStore';
import { useGeoData } from '../../hooks/useGeoData';
import { MAPBOX_TOKEN } from '../../config/mapbox';
import MiniMap from '../Controls/MiniMap';
import SampleHoverInfo from './SampleInfo/SampleHoverInfo';
import GeoDataLoader from './SampleInfo/GeoDataLoader';

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
        <div className="relative w-full h-full">
            <div ref={mapContainer} className="w-full h-full" />
            
            {/* Componentes de UI superpuestos */}
            <SampleHoverInfo />
            <GeoDataLoader />
            <MiniMap />
        </div>
    );
};

export default MapContainer;