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
        samplingDataGermany,
        samplingDataBulgaria,
        isLoadingGeoData,
        geoDataError,
        layersVisibility,
        isChangingStyle,
        setShapefileData,
        setSamplingData,
        setSamplingDataGermany,
        setSamplingDataBulgaria,
        setIsLoadingGeoData,
        setGeoDataError,
        setHoveredSample,
        setIsChangingStyle,
        clearGeoData
    } = useMapStore();

    /**
     * Carga los datos de muestreo de Bulgaria y añade la capa al mapa
     */
    const loadBulgariaData = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const bulgariaData = await geoDataService.makeRequest('/sampling/bulgaria');
            setSamplingDataBulgaria(bulgariaData.data);
            // Añadir capa de puntos de Bulgaria si el mapa está listo
            if (map && bulgariaData.data && bulgariaData.data.length > 0) {
                // Aquí podrías añadir una capa específica si tienes una función para Bulgaria
                // mapLayerService.addBulgariaSamplingPointsLayer(map, bulgariaData.data);
            }
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };
    /**
     * Carga los datos de muestreo de Alemania y añade la capa al mapa
     */
    const loadGermanyData = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const germanyData = await geoDataService.makeRequest('/sampling/germany');
            setSamplingDataGermany(germanyData.data);
            // Añadir capa de puntos de Alemania si el mapa está listo
            if (map && germanyData.data && germanyData.data.length > 0) {
                mapLayerService.addGermanySamplingPointsLayer(map, germanyData.data);
            }
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };

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
            // Cargar y mostrar puntos de Alemania
            loadGermanyData();
        }
    }, [map, isLoaded]);

    // Efecto para manejar cambios de estilo y re-añadir capas
    useEffect(() => {
        if (!map || !isChangingStyle) return;

        const handleStyleLoad = () => {
            console.log('Estilo cargado, re-añadiendo capas...');
            
            // Re-añadir las capas después de un breve delay
            setTimeout(() => {
                if (shapefileData) {
                    mapLayerService.addShapefileLayer(map, shapefileData);
                }

                if (samplingData) {
                    mapLayerService.addSamplingPointsLayer(map, samplingData);
                    
                    // Re-configurar interacciones de hover
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

                // Aplicar configuraciones de visibilidad
                Object.entries(layersVisibility).forEach(([layerType, visible]) => {
                    let layerId, relatedLayerIds = [];
                    
                    switch (layerType) {
                        case 'shapefile':
                            layerId = mapLayerService.LAYER_IDS.SHAPEFILE;
                            relatedLayerIds = [mapLayerService.LAYER_IDS.SHAPEFILE_FILL];
                            break;
                        case 'samplingPoints':
                            layerId = mapLayerService.LAYER_IDS.SAMPLING_POINTS;
                            break;
                        case 'samplingLabels':
                            layerId = mapLayerService.LAYER_IDS.SAMPLING_LABELS;
                            break;
                    }

                    if (layerId && map.getLayer(layerId)) {
                        map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
                    }
                    
                    relatedLayerIds.forEach(relatedId => {
                        if (map.getLayer(relatedId)) {
                            map.setLayoutProperty(relatedId, 'visibility', visible ? 'visible' : 'none');
                        }
                    });
                });

                // Marcar que el cambio de estilo ha terminado
                setIsChangingStyle(false);
                console.log('Capas re-añadidas correctamente después del cambio de estilo');
            }, 100);
        };

        // Escuchar cuando el estilo se haya cargado completamente
        if (map.isStyleLoaded()) {
            handleStyleLoad();
        } else {
            map.once('styledata', handleStyleLoad);
        }

        return () => {
            map.off('styledata', handleStyleLoad);
        };
    }, [map, isChangingStyle, shapefileData, samplingData, layersVisibility]);

    return {
        // Estados
        shapefileData,
        samplingData,
        samplingDataGermany,
        samplingDataBulgaria,
        isLoadingGeoData,
        geoDataError,
        layersVisibility,

        // Funciones
        loadGeoData,
        reloadGeoData,
        loadGermanyData,
        loadBulgariaData,
        toggleLayerVisibility,
        focusOnSample,
        getSamplingStats
    };
};
