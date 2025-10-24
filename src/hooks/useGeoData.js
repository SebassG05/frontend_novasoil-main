import { useEffect } from 'react';
import { useMapStore } from '../store/mapStore';
import geoDataService from '../services/geospatial/geoDataService';
import mapLayerService from '../services/geospatial/mapLayerService';

/**
 * Hook personalizado para manejar la carga y gestión de datos geoespaciales
 */
export const useGeoData = () => {
    // --- TAMARGUILLO NUEVO ---
    const loadTamarguilloDepth0_25Data = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const data = await geoDataService.getTamarguilloDepth0_25();
            setSamplingDataTamarguillo1(data); // Reutiliza samplingDataTamarguillo1 para 0-25
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };

    const loadTamarguilloDepth25_50Data = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const data = await geoDataService.getTamarguilloDepth25_50();
            setSamplingDataTamarguillo2(data); // Reutiliza samplingDataTamarguillo2 para 25-50
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };
    // Cargar tabla TOPSOIL
    const loadEstadisticosTopsoil = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const data = await geoDataService.getEstadisticosTopsoil();
            setSamplingDataEstadisticosTopsoil(data);
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };

    // Cargar tabla SUBSOIL
    const loadEstadisticosSubsoil = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const data = await geoDataService.getEstadisticosSubsoil();
            setSamplingDataEstadisticosSubsoil(data);
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };
    /**
     * Carga el recinto (polígono) de Madrid y lo añade al mapa
     */
    const loadMadridArea = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const madridGeojson = await geoDataService.getMadridShapefile();
            setShapefileData(madridGeojson);
            if (map && madridGeojson) {
                mapLayerService.addMadridShapefileLayer(map, madridGeojson);
            }
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };
    const {
        map,
        isLoaded,
        shapefileData,
        samplingData,
        samplingDataGermany,
        samplingDataBulgaria,
        samplingDataEstonia,
        samplingDataLetonia,
        samplingDataMadrid,
        samplingDataItaly,
        samplingDataItalyCiraa,
        samplingDataItalyCiraa2,
        samplingDataItalyCiraa3,
        samplingDataTamarguillo1,
        samplingDataTamarguillo2,
        samplingDataTamarguillo3,
        samplingDataAsaja,
        isLoadingGeoData,
        geoDataError,
        layersVisibility,
        isChangingStyle,
        setShapefileData,
        setSamplingData,
        setSamplingDataGermany,
        setSamplingDataBulgaria,
        setSamplingDataEstonia,
        setSamplingDataLetonia,
        setSamplingDataMadrid,
        setSamplingDataItaly,
        setSamplingDataItalyCiraa,
        setSamplingDataItalyCiraa2,
        setSamplingDataItalyCiraa3,
        setSamplingDataTamarguillo1,
        setSamplingDataTamarguillo2,
        setSamplingDataTamarguillo3,
        setSamplingDataAsaja,
        setIsLoadingGeoData,
        setGeoDataError,
        setHoveredSample,
        setIsChangingStyle,
        clearGeoData
    } = useMapStore();

    /**
            loadMadridArea,
     * Carga los datos de muestreo de Madrid y añade la capa al mapa
     */
    const loadMadridData = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const madridData = await geoDataService.makeRequest('/sampling/madrid');
            setSamplingDataMadrid(madridData.data);
            // Si tienes una función para añadir la capa de Madrid, agrégala aquí
            if (map && madridData.data && madridData.data.length > 0) {
                if (mapLayerService.addMadridSamplingPointsLayer) {
                    mapLayerService.addMadridSamplingPointsLayer(map, madridData.data);
                }
            }
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };

    const loadAsajaData = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const asajaData = await geoDataService.makeRequest('/sampling/asaja');
            setSamplingDataAsaja(asajaData.data);
            // Si tienes una función para añadir la capa de Asaja, agrégala aquí
            if (map && asajaData.data && asajaData.data.length > 0) {
                if (mapLayerService.addAsajaSamplingPointsLayer) {
                    mapLayerService.addAsajaSamplingPointsLayer(map, asajaData.data);
                }
            }
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };

    /**
     * Carga los datos de muestreo de Letonia y añade la capa al mapa
     */
    const loadLetoniaData = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const letoniaData = await geoDataService.makeRequest('/sampling/letonia');
            setSamplingDataLetonia(letoniaData.data);
            // Si tienes una función para añadir la capa de Letonia, agrégala aquí
            if (map && letoniaData.data && letoniaData.data.length > 0) {
                if (mapLayerService.addLetoniaSamplingPointsLayer) {
                    mapLayerService.addLetoniaSamplingPointsLayer(map, letoniaData.data);
                }
            }
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };
    /**
     * Carga los datos de muestreo de Estonia y añade la capa al mapa
     */
    const loadEstoniaData = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const estoniaData = await geoDataService.makeRequest('/sampling/estonia');
            setSamplingDataEstonia(estoniaData.data);
            // Añadir capa de puntos de Estonia si el mapa está listo
            if (map && estoniaData.data && estoniaData.data.length > 0) {
                if (mapLayerService.addEstoniaSamplingPointsLayer) {
                    mapLayerService.addEstoniaSamplingPointsLayer(map, estoniaData.data);
                }
            }
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };

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
                mapLayerService.addBulgariaSamplingPointsLayer(map, bulgariaData.data);
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
        if (map && isLoaded && !isLoadingGeoData) {
            loadGeoData();
            loadGermanyData();
            loadBulgariaData();
            loadEstoniaData();
            loadLetoniaData();
            loadMadridData();
            loadAsajaData();
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


                // Reañadir capa de puntos de muestreo de Alemania
                if (samplingDataGermany && samplingDataGermany.length > 0) {
                    mapLayerService.addGermanySamplingPointsLayer(map, samplingDataGermany);
                }
                // Reañadir capa de puntos de muestreo de Bulgaria
                if (samplingDataBulgaria && samplingDataBulgaria.length > 0) {
                    mapLayerService.addBulgariaSamplingPointsLayer(map, samplingDataBulgaria);
                }
                // Reañadir capa de puntos de muestreo de Estonia
                if (samplingDataEstonia && samplingDataEstonia.length > 0) {
                    mapLayerService.addEstoniaSamplingPointsLayer(map, samplingDataEstonia);
                }
                // Reañadir capa de puntos de muestreo de Letonia
                if (samplingDataLetonia && samplingDataLetonia.length > 0) {
                    mapLayerService.addLetoniaSamplingPointsLayer(map, samplingDataLetonia);
                }
                // Reañadir capa de puntos de muestreo de Madrid
                if (samplingDataMadrid && samplingDataMadrid.length > 0) {
                    mapLayerService.addMadridSamplingPointsLayer(map, samplingDataMadrid);
                }
                // Reañadir capa de puntos de muestreo de Asaja
                if (samplingDataAsaja && samplingDataAsaja.length > 0) {
                    mapLayerService.addAsajaSamplingPointsLayer(map, samplingDataAsaja);
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

    /**
     * Carga los datos de muestreo de Italia y añade la capa al mapa
     */
    const loadItalyData = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const italyData = await geoDataService.makeRequest('/sampling/italy');
            setSamplingDataItaly(italyData.data);
            // Si tienes una función para añadir la capa de Italia, agrégala aquí
            if (map && italyData.data && italyData.data.length > 0) {
                if (mapLayerService.addItalySamplingPointsLayer) {
                    mapLayerService.addItalySamplingPointsLayer(map, italyData.data);
                }
            }
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };

    /**
     * Carga los datos de muestreo de Italia CIRAA y añade la capa al mapa
     */
    const loadItalyCiraaData = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const italyCiraaData = await geoDataService.makeRequest('/sampling/italy-ciraa');
            setSamplingDataItalyCiraa(italyCiraaData.data);
            // Si tienes una función para añadir la capa de Italia CIRAA, agrégala aquí
            if (map && italyCiraaData.data && italyCiraaData.data.length > 0) {
                if (mapLayerService.addItalyCiraaSamplingPointsLayer) {
                    mapLayerService.addItalyCiraaSamplingPointsLayer(map, italyCiraaData.data);
                }
            }
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };

    /**
     * Carga los datos de muestreo de Italia CIRAA2 (Tillage Systems)
     */
    const loadItalyCiraa2Data = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const italyCiraa2Data = await geoDataService.makeRequest('/sampling/italy-ciraa2');
            setSamplingDataItalyCiraa2(italyCiraa2Data.data);
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };

    /**
     * Carga los datos de muestreo de Italia CIRAA3 (MASCOT)
     */
    const loadItalyCiraa3Data = async () => {
        try {
            setIsLoadingGeoData(true);
            setGeoDataError(null);
            const italyCiraa3Data = await geoDataService.makeRequest('/sampling/italy-ciraa3');
            setSamplingDataItalyCiraa3(italyCiraa3Data.data);
        } catch (error) {
            setGeoDataError(error.message);
        } finally {
            setIsLoadingGeoData(false);
        }
    };

    return {
        // Estados
        shapefileData,
        samplingData,
        samplingDataGermany,
        samplingDataBulgaria,
        samplingDataEstonia,
        samplingDataLetonia,
        samplingDataMadrid,
        samplingDataItaly,
        samplingDataItalyCiraa,
        samplingDataItalyCiraa2,
        samplingDataItalyCiraa3,
    isLoadingGeoData,
    samplingDataTamarguillo1,
    samplingDataTamarguillo2,
    // samplingDataTamarguillo3, // No longer used
    loadTamarguilloDepth0_25Data,
    loadTamarguilloDepth25_50Data,
        geoDataError,
        layersVisibility,

        // Funciones
        loadGeoData,
        reloadGeoData,
        loadGermanyData,
        loadBulgariaData,
        loadEstoniaData,
        loadLetoniaData,
        loadMadridData,
        loadItalyData,
        loadItalyCiraaData,
        loadItalyCiraa2Data,
        loadItalyCiraa3Data,
        loadAsajaData,
        loadMadridArea, // <-- Añadido para exponer la función
        toggleLayerVisibility,
        focusOnSample,
        getSamplingStats
    };
};
