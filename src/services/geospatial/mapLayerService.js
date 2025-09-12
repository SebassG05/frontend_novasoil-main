import mapboxgl from 'mapbox-gl';

/**
 * Servicio para manejar las capas del mapa de Mapbox
 */
class MapLayerService {
    constructor() {
        this.LAYER_IDS = {
            SHAPEFILE: 'shapefile-layer',
            SHAPEFILE_FILL: 'shapefile-fill-layer',
            SAMPLING_POINTS: 'sampling-points-layer',
            SAMPLING_LABELS: 'sampling-labels-layer'
        };

        this.SOURCE_IDS = {
            SHAPEFILE: 'shapefile-source',
            SAMPLING: 'sampling-source'
        };
    }

    /**
     * Añade el shapefile como capa al mapa
     */
    addShapefileLayer(map, geojsonData) {
        try {
            // Remover capas existentes si existen
            this.removeShapefileLayer(map);

            // Añadir fuente de datos
            map.addSource(this.SOURCE_IDS.SHAPEFILE, {
                type: 'geojson',
                data: geojsonData
            });

            // Añadir capa de relleno (visible desde zoom 8)
            map.addLayer({
                id: this.LAYER_IDS.SHAPEFILE_FILL,
                type: 'fill',
                source: this.SOURCE_IDS.SHAPEFILE,
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.1
                },
                layout: {
                    'visibility': 'visible'
                },
                minzoom: 8
            });

            // Añadir capa de contorno (visible desde zoom 6)
            map.addLayer({
                id: this.LAYER_IDS.SHAPEFILE,
                type: 'line',
                source: this.SOURCE_IDS.SHAPEFILE,
                paint: {
                    'line-color': '#088',
                    'line-width': 2,
                    'line-opacity': 0.8
                },
                layout: {
                    'visibility': 'visible'
                },
                minzoom: 6
            });

            console.log('Shapefile layer añadida correctamente');
        } catch (error) {
            console.error('Error añadiendo capa de shapefile:', error);
        }
    }

    /**
     * Añade los puntos de muestreo como capa al mapa
     */
    addSamplingPointsLayer(map, geojsonData) {
        try {
            console.log('Añadiendo capa de puntos de muestreo...', geojsonData);
            
            // Remover capas existentes si existen
            this.removeSamplingPointsLayer(map);

            // Verificar que tenemos datos válidos
            if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                console.warn('No hay datos válidos para los puntos de muestreo');
                return;
            }

            // Añadir fuente de datos
            map.addSource(this.SOURCE_IDS.SAMPLING, {
                type: 'geojson',
                data: geojsonData
            });

            console.log('Fuente de datos añadida:', this.SOURCE_IDS.SAMPLING);

            // Añadir capa de puntos (visible desde zoom 6)
            map.addLayer({
                id: this.LAYER_IDS.SAMPLING_POINTS,
                type: 'circle',
                source: this.SOURCE_IDS.SAMPLING,
                paint: {
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        6, 4,
                        10, 6,
                        15, 12,
                        20, 20
                    ],
                    'circle-color': [
                        'case',
                        ['==', ['get', 'samplingType'], 'CHE'], '#ff6b6b',
                        ['==', ['get', 'samplingType'], 'CHE-BIO'], '#4ecdc4',
                        '#95a5a6'
                    ],
                    'circle-stroke-color': '#ffffff',
                    'circle-stroke-width': 2,
                    'circle-opacity': 0.8
                },
                layout: {
                    'visibility': 'visible'
                },
                minzoom: 6
            });

            console.log('Capa de puntos añadida:', this.LAYER_IDS.SAMPLING_POINTS);

            // Añadir capa de etiquetas (visible desde zoom 10)
            map.addLayer({
                id: this.LAYER_IDS.SAMPLING_LABELS,
                type: 'symbol',
                source: this.SOURCE_IDS.SAMPLING,
                layout: {
                    'text-field': ['get', 'code'],
                    'text-size': 12,
                    'text-offset': [0, 2],
                    'text-anchor': 'top',
                    'visibility': 'visible'
                },
                paint: {
                    'text-color': '#333333',
                    'text-halo-color': '#ffffff',
                    'text-halo-width': 1
                },
                minzoom: 10
            });

            console.log('Capa de etiquetas añadida:', this.LAYER_IDS.SAMPLING_LABELS);
            console.log('Sampling points layer añadida correctamente por encima de todas las capas');
        } catch (error) {
            console.error('Error añadiendo capa de puntos de muestreo:', error);
        }
    }

    /**
     * Configura los eventos de hover para los puntos de muestreo
     */
    setupSamplingPointsInteraction(map, onHover, onLeave) {
        try {
            // Cambiar el cursor al pasar sobre los puntos (sin indicar que es clickeable)
            map.on('mouseenter', this.LAYER_IDS.SAMPLING_POINTS, (e) => {
                map.getCanvas().style.cursor = 'default';
                if (onHover && e.features.length > 0) {
                    onHover(e.features[0], e);
                }
            });

            map.on('mouseleave', this.LAYER_IDS.SAMPLING_POINTS, () => {
                map.getCanvas().style.cursor = '';
                if (onLeave) {
                    onLeave();
                }
            });

            console.log('Interacciones de hover para puntos de muestreo configuradas');
        } catch (error) {
            console.error('Error configurando interacciones:', error);
        }
    }

    /**
     * Remueve la capa del shapefile
     */
    removeShapefileLayer(map) {
        try {
            if (map.getLayer(this.LAYER_IDS.SHAPEFILE)) {
                map.removeLayer(this.LAYER_IDS.SHAPEFILE);
            }
            if (map.getLayer(this.LAYER_IDS.SHAPEFILE_FILL)) {
                map.removeLayer(this.LAYER_IDS.SHAPEFILE_FILL);
            }
            if (map.getSource(this.SOURCE_IDS.SHAPEFILE)) {
                map.removeSource(this.SOURCE_IDS.SHAPEFILE);
            }
        } catch (error) {
            console.error('Error removiendo capa de shapefile:', error);
        }
    }

    /**
     * Remueve la capa de puntos de muestreo
     */
    removeSamplingPointsLayer(map) {
        try {
            console.log('Removiendo capas de puntos de muestreo...');
            
            if (map.getLayer(this.LAYER_IDS.SAMPLING_POINTS)) {
                map.removeLayer(this.LAYER_IDS.SAMPLING_POINTS);
                console.log('Capa de puntos removida:', this.LAYER_IDS.SAMPLING_POINTS);
            }
            if (map.getLayer(this.LAYER_IDS.SAMPLING_LABELS)) {
                map.removeLayer(this.LAYER_IDS.SAMPLING_LABELS);
                console.log('Capa de etiquetas removida:', this.LAYER_IDS.SAMPLING_LABELS);
            }
            if (map.getSource(this.SOURCE_IDS.SAMPLING)) {
                map.removeSource(this.SOURCE_IDS.SAMPLING);
                console.log('Fuente removida:', this.SOURCE_IDS.SAMPLING);
            }
        } catch (error) {
            console.error('Error removiendo capa de puntos de muestreo:', error);
        }
    }

    /**
     * Ajusta la vista del mapa para mostrar todos los datos
     */
    fitMapToData(map, geojsonData) {
        try {
            if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                return;
            }

            // Calcular el bounding box
            let minLng = Infinity, minLat = Infinity;
            let maxLng = -Infinity, maxLat = -Infinity;

            geojsonData.features.forEach(feature => {
                if (feature.geometry.type === 'Point') {
                    const [lng, lat] = feature.geometry.coordinates;
                    minLng = Math.min(minLng, lng);
                    maxLng = Math.max(maxLng, lng);
                    minLat = Math.min(minLat, lat);
                    maxLat = Math.max(maxLat, lat);
                } else if (feature.geometry.type === 'Polygon') {
                    feature.geometry.coordinates[0].forEach(([lng, lat]) => {
                        minLng = Math.min(minLng, lng);
                        maxLng = Math.max(maxLng, lng);
                        minLat = Math.min(minLat, lat);
                        maxLat = Math.max(maxLat, lat);
                    });
                }
            });

            // Añadir un poco de padding
            const padding = 50;
            map.fitBounds([
                [minLng, minLat],
                [maxLng, maxLat]
            ], { padding });

        } catch (error) {
            console.error('Error ajustando vista del mapa:', error);
        }
    }

    /**
     * Actualiza el estilo de los puntos de muestreo
     */
    updateSamplingPointsStyle(map, styleConfig) {
        try {
            if (map.getLayer(this.LAYER_IDS.SAMPLING_POINTS)) {
                Object.keys(styleConfig).forEach(property => {
                    map.setPaintProperty(this.LAYER_IDS.SAMPLING_POINTS, property, styleConfig[property]);
                });
            }
        } catch (error) {
            console.error('Error actualizando estilo de puntos:', error);
        }
    }

    /**
     * Obtiene las capas disponibles
     */
    getAvailableLayers(map) {
        const layers = [];
        
        if (map.getLayer(this.LAYER_IDS.SHAPEFILE)) {
            layers.push({
                id: this.LAYER_IDS.SHAPEFILE,
                name: 'Área de Estudio',
                type: 'shapefile',
                visible: map.getLayoutProperty(this.LAYER_IDS.SHAPEFILE, 'visibility') !== 'none'
            });
        }
        
        if (map.getLayer(this.LAYER_IDS.SAMPLING_POINTS)) {
            layers.push({
                id: this.LAYER_IDS.SAMPLING_POINTS,
                name: 'Puntos de Muestreo',
                type: 'sampling',
                visible: map.getLayoutProperty(this.LAYER_IDS.SAMPLING_POINTS, 'visibility') !== 'none'
            });
        }
        
        return layers;
    }

    /**
     * Alterna la visibilidad de una capa
     */
    toggleLayerVisibility(map, layerId) {
        try {
            const visibility = map.getLayoutProperty(layerId, 'visibility');
            const newVisibility = visibility === 'none' ? 'visible' : 'none';
            map.setLayoutProperty(layerId, 'visibility', newVisibility);
            
            // También ocultar/mostrar las capas relacionadas
            if (layerId === this.LAYER_IDS.SHAPEFILE) {
                map.setLayoutProperty(this.LAYER_IDS.SHAPEFILE_FILL, 'visibility', newVisibility);
            } else if (layerId === this.LAYER_IDS.SAMPLING_POINTS) {
                map.setLayoutProperty(this.LAYER_IDS.SAMPLING_LABELS, 'visibility', newVisibility);
            }
            
            return newVisibility === 'visible';
        } catch (error) {
            console.error('Error alternando visibilidad de capa:', error);
            return false;
        }
    }
}

export default new MapLayerService();
