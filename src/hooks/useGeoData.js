import { useEffect } from 'react';
import { useMapStore } from '../store/mapStore';
import geoDataService from '../services/geospatial/geoDataService';
import mapLayerService from '../services/geospatial/mapLayerService';

/**
 * Hook personalizado para manejar la carga y gestión de datos geoespaciales
 */
export const useGeoData = () => {
    const {
        map,
        isLoaded,
        shapefileData,
        samplingData,
        isLoadingGeoData,
        geoDataError,
        layersVisibility,
        setShapefileData,
        setSamplingData,
        setIsLoadingGeoData,
        setGeoDataError,
        setHoveredSample,
        clearGeoData
    } = useMapStore();

    /**
     * Carga todos los datos geoespaciales
     */
    const loadGeoData = async () => {
        if (!map || !isLoaded) return;

        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);

            console.log('Cargando datos geoespaciales...');
            
            // Cargar todos los datos en paralelo
            const geoData = await geoDataService.getAllGeoData();
            
            // Guardar los datos en el store
            setShapefileData(geoData.shapefile);
            setSamplingData(geoData.samplingData);

            // Añadir las capas al mapa
            if (geoData.shapefile) {
                mapLayerService.addShapefileLayer(map, geoData.shapefile);
            }

            if (geoData.samplingData) {
                mapLayerService.addSamplingPointsLayer(map, geoData.samplingData);
                
                // Configurar interacciones de hover
                mapLayerService.setupSamplingPointsInteraction(
                    map,
                    (feature) => {
                        setHoveredSample(feature.properties);
                    },
                    () => {
                        setHoveredSample(null);
                    }
                );
            }

            console.log('Datos geoespaciales cargados correctamente');
        } catch (error) {
            console.error('Error cargando datos geoespaciales:', error);
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };

    /**
     * Recarga los datos geoespaciales
     */
    const reloadGeoData = async () => {
        clearGeoData();
        await loadGeoData();
    };

    /**
     * Alterna la visibilidad de una capa
     */
    const toggleLayerVisibility = (layerType) => {
        if (!map) return;

        let layerId;
        switch (layerType) {
            case 'shapefile':
                layerId = mapLayerService.LAYER_IDS.SHAPEFILE;
                break;
            case 'samplingPoints':
                layerId = mapLayerService.LAYER_IDS.SAMPLING_POINTS;
                break;
            default:
                return;
        }

        const isVisible = mapLayerService.toggleLayerVisibility(map, layerId);
        useMapStore.getState().setLayerVisibility(layerType, isVisible);
    };

    /**
     * Busca y enfoca en una muestra específica
     */
    const focusOnSample = async (sampleCode) => {
        try {
            const sample = await geoDataService.getSampleByCode(sampleCode);
            if (sample && sample.geometry && sample.geometry.coordinates) {
                const [lng, lat] = sample.geometry.coordinates;
                useMapStore.getState().flyTo([lng, lat], 16);
                setHoveredSample(sample.properties);
                return sample;
            }
        } catch (error) {
            console.error('Error buscando muestra:', error);
            throw error;
        }
    };

    /**
     * Obtiene estadísticas de los datos de muestreo
     */
    const getSamplingStats = async () => {
        try {
            return await geoDataService.getSamplingStats();
        } catch (error) {
            console.error('Error obteniendo estadísticas:', error);
            throw error;
        }
    };

    // Efecto para cargar los datos cuando el mapa esté listo
    useEffect(() => {
        if (map && isLoaded && !shapefileData && !samplingData && !isLoadingGeoData) {
            loadGeoData();
        }
    }, [map, isLoaded]);

    // Efecto para manejar cambios en la visibilidad de capas
    useEffect(() => {
        if (!map) return;

        Object.entries(layersVisibility).forEach(([layerType, visible]) => {
            let layerId;
            switch (layerType) {
                case 'shapefile':
                    layerId = mapLayerService.LAYER_IDS.SHAPEFILE;
                    break;
                case 'samplingPoints':
                    layerId = mapLayerService.LAYER_IDS.SAMPLING_POINTS;
                    break;
                case 'samplingLabels':
                    layerId = mapLayerService.LAYER_IDS.SAMPLING_LABELS;
                    break;
                default:
                    return;
            }

            if (map.getLayer(layerId)) {
                map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
            }
        });
    }, [map, layersVisibility]);

    return {
        // Estados
        shapefileData,
        samplingData,
        isLoadingGeoData,
        geoDataError,
        layersVisibility,

        // Funciones
        loadGeoData,
        reloadGeoData,
        toggleLayerVisibility,
        focusOnSample,
        getSamplingStats
    };
};
