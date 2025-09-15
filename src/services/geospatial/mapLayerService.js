import mapboxgl from 'mapbox-gl';

/**
 * Servicio para manejar las capas del mapa de Mapbox
 */
class MapLayerService {
    constructor() {
        this.LAYER_IDS = {
            SHAPEFILE: 'shapefile-layer',
            SHAPEFILE_FILL: 'shapefile-fill-layer',
            SAMPLING_POINTS: 'sampling-points-layer', // Sevilla
            SAMPLING_LABELS: 'sampling-labels-layer',
            GERMANY_POINTS: 'germany-sampling-points-layer',
        };
        this.SOURCE_IDS = {
            SHAPEFILE: 'shapefile-source',
            SAMPLING: 'sampling-source', // Sevilla
            GERMANY: 'germany-sampling-source',
        };
    }

    /**
     * Función para parsear coordenadas DMS a decimal
     */
    parseDMS(dmsStr) {
        const regex = /([0-9]+)[°\s]+([0-9]+)'[\s]*([0-9.,]+)"?\s*([NSEO])/i;
        const match = dmsStr.match(regex);
        if (!match) return null;
        let deg = parseFloat(match[1]);
        let min = parseFloat(match[2]);
        let sec = parseFloat(match[3].replace(',', '.'));
        let dir = match[4].toUpperCase();
        let dec = deg + min / 60 + sec / 3600;
        // Para Alemania, la longitud debe ser positiva (Este), aunque venga como 'O'.
        if (dir === 'S') dec *= -1;
        if (dir === 'O') {
            // Si la coordenada es longitud y está en Alemania, la convertimos a positiva (Este)
            // Esto se controla en el parser de Alemania, donde sabemos que la segunda coordenada es longitud
            dec = Math.abs(dec); // Siempre positiva
        }
        if (dir === 'W') dec *= -1;
        return dec;
    }

    /**
     * Añade los puntos de muestreo de Alemania como capa al mapa (color amarillo)
     */
    addGermanySamplingPointsLayer(map, germanyData) {
        try {
            console.log('[Alemania] Intentando añadir capa de puntos de muestreo...');
            if (!map) {
                console.error('[Alemania] El objeto map no está disponible');
                return;
            }
            // Remove only Germany layer/source
            if (map.getLayer(this.LAYER_IDS.GERMANY_POINTS)) {
                map.removeLayer(this.LAYER_IDS.GERMANY_POINTS);
            }
            if (map.getSource(this.SOURCE_IDS.GERMANY)) {
                map.removeSource(this.SOURCE_IDS.GERMANY);
            }
            let geojsonData;
            console.log('[Alemania] Datos recibidos:', germanyData);
            if (germanyData && Array.isArray(germanyData)) {
                geojsonData = {
                    type: 'FeatureCollection',
                    features: germanyData.map(row => {
                        let lat = null, lon = null;
                        const coordRaw = row["coord_lat__long"] || row["coord_(lat_&_long)"] || row["coord"] || row["coord (lat & long)"] || "";
                        console.log('[Alemania] Procesando fila:', row, 'Coord:', coordRaw);
                        if (coordRaw.includes(';')) {
                            const [latStr, lonStr] = coordRaw.split(';');
                            lat = this.parseDMS(latStr);
                            // Para Alemania, la longitud debe ser positiva (Este)
                            lon = this.parseDMS(lonStr);
                            if (lon < 0) lon = Math.abs(lon); // Forzar positivo
                            console.log('[Alemania] DMS a decimal:', lat, lon);
                        }
                        if (lat && lon) {
                            // Mapbox espera [longitud, latitud]
                            return {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [lon, lat] // lon primero, lat segundo
                                },
                                properties: row
                            };
                        }
                        return null;
                    }).filter(f => f !== null)
                };
            } else {
                geojsonData = germanyData;
            }
            console.log('[Alemania] GeoJSON generado:', geojsonData);
            if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                console.warn('[Alemania] No hay datos válidos para los puntos de muestreo de Alemania');
                return;
            }
            map.addSource(this.SOURCE_IDS.GERMANY, {
                type: 'geojson',
                data: geojsonData
            });
            map.addLayer({
                id: this.LAYER_IDS.GERMANY_POINTS,
                type: 'circle',
                source: this.SOURCE_IDS.GERMANY,
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
                    'circle-color': '#FFD600',
                    'circle-stroke-color': '#ffffff',
                    'circle-stroke-width': 2,
                    'circle-opacity': 0.8
                },
                layout: {
                    'visibility': 'visible'
                },
                minzoom: 6
            });
            // Interacción: mostrar tooltip al pasar el ratón por los puntos de Alemania
            map.on('mouseenter', this.LAYER_IDS.GERMANY_POINTS, (e) => {
                map.getCanvas().style.cursor = 'pointer';
                if (e.features.length > 0) {
                    const feature = e.features[0];
                    // Aquí puedes mostrar un tooltip o información
                }
            });
            map.on('mouseleave', this.LAYER_IDS.GERMANY_POINTS, () => {
                map.getCanvas().style.cursor = '';
            });
            // Ajustar la vista del mapa automáticamente a los puntos de Alemania
            if (geojsonData.features && geojsonData.features.length > 0) {
                let minLng = Infinity, minLat = Infinity;
                let maxLng = -Infinity, maxLat = -Infinity;
                geojsonData.features.forEach(feature => {
                    if (feature.geometry.type === 'Point') {
                        const [lng, lat] = feature.geometry.coordinates;
                        minLng = Math.min(minLng, lng);
                        maxLng = Math.max(maxLng, lng);
                        minLat = Math.min(minLat, lat);
                        maxLat = Math.max(maxLat, lat);
                    }
                });
                const padding = 50;
                console.log('[Alemania] fitBounds:', minLng, minLat, maxLng, maxLat);
                map.fitBounds([
                    [minLng, minLat],
                    [maxLng, maxLat]
                ], { padding });
            }
            console.log('[Alemania] Capa de puntos de Alemania añadida correctamente');
        } catch (error) {
            console.error('[Alemania] Error añadiendo capa de puntos de muestreo de Alemania:', error);
        }
    }

    addShapefileLayer(map, geojsonData) {
        try {
            this.removeShapefileLayer(map);
            map.addSource(this.SOURCE_IDS.SHAPEFILE, {
                type: 'geojson',
                data: geojsonData
            });
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

    addSamplingPointsLayer(map, geojsonData) {
        try {
            this.removeSamplingPointsLayer(map);
            if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                console.warn('No hay datos válidos para los puntos de muestreo');
                return;
            }
            map.addSource(this.SOURCE_IDS.SAMPLING, {
                type: 'geojson',
                data: geojsonData
            });
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
            console.log('Sampling points layer añadida correctamente');
        } catch (error) {
            console.error('Error añadiendo capa de puntos de muestreo:', error);
        }
    }

    setupSamplingPointsInteraction(map, onHover, onLeave) {
        try {
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
        } catch (error) {
            console.error('Error configurando interacciones:', error);
        }
    }

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

    removeSamplingPointsLayer(map) {
        try {
            if (map.getLayer(this.LAYER_IDS.SAMPLING_POINTS)) {
                map.removeLayer(this.LAYER_IDS.SAMPLING_POINTS);
            }
            if (map.getLayer(this.LAYER_IDS.SAMPLING_LABELS)) {
                map.removeLayer(this.LAYER_IDS.SAMPLING_LABELS);
            }
            if (map.getSource(this.SOURCE_IDS.SAMPLING)) {
                map.removeSource(this.SOURCE_IDS.SAMPLING);
            }
        } catch (error) {
            console.error('Error removiendo capa de puntos de muestreo:', error);
        }
    }

    fitMapToData(map, geojsonData) {
        try {
            if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                return;
            }
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
            const padding = 50;
            map.fitBounds([
                [minLng, minLat],
                [maxLng, maxLat]
            ], { padding });
        } catch (error) {
            console.error('Error ajustando vista del mapa:', error);
        }
    }

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

    toggleLayerVisibility(map, layerId) {
        try {
            const visibility = map.getLayoutProperty(layerId, 'visibility');
            const newVisibility = visibility === 'none' ? 'visible' : 'none';
            map.setLayoutProperty(layerId, 'visibility', newVisibility);
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