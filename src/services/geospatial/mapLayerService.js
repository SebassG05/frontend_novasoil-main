import mapboxgl from 'mapbox-gl';

/**
 * Servicio para manejar las capas del mapa de Mapbox
 */
class MapLayerService {
    addAsajaSamplingPointsLayer(map, asajaData) {
        // Ocultar hover al hacer click en un punto de Asaja
        map.on('click', this.LAYER_IDS.ASAJA_POINTS, () => {
            window.setHoveredSample && window.setHoveredSample(null);
        });
        try {
            console.log('[Asaja] Intentando añadir capa de puntos de muestreo...');
            if (!map) {
                console.error('[Asaja] El objeto map no está disponible');
                return;
            }
            // Remove only Asaja layer/source
            if (map.getLayer(this.LAYER_IDS.ASAJA_POINTS)) {
                map.removeLayer(this.LAYER_IDS.ASAJA_POINTS);
            }
            if (map.getSource(this.SOURCE_IDS.ASAJA)) {
                map.removeSource(this.SOURCE_IDS.ASAJA);
            }
            let geojsonData;
            console.log('[Asaja] Datos recibidos:', asajaData);
            if (asajaData && Array.isArray(asajaData)) {
                geojsonData = {
                    type: 'FeatureCollection',
                    features: asajaData.map(row => {
                        // Asaja: coord_x = latitud, coord_y = longitud
                        let lat = parseFloat(row.coord_x);
                        let lon = parseFloat(row.coord_y);
                        let motivo = '';
                        if (isNaN(lat) || isNaN(lon)) {
                            motivo = `No se pudo parsear coord_x/coord_y. coord_x: ${row.coord_x}, coord_y: ${row.coord_y}`;
                        }
                        if (isNaN(lat) || isNaN(lon)) {
                            console.warn('[Asaja][DESCARTADO] Punto con coordenadas inválidas:', row, 'Motivo:', motivo);
                            return null;
                        }
                        // Verificar rango de coordenadas (España: lat ~36-44, lon ~-10 a 4)
                        if (lat < 36 || lat > 44 || lon < -10 || lon > 4) {
                            console.warn('[Asaja][DESCARTADO] Coordenadas fuera de rango esperado:', row, `lat: ${lat}, lon: ${lon}`);
                            return null;
                        }
                        return {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [lon, lat]
                            },
                            properties: row
                        };
                    }).filter(f => f !== null)
                };
            } else {
                geojsonData = asajaData;
            }
            console.log('[Asaja] GeoJSON generado:', geojsonData);
            if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                console.warn('[Asaja] No hay datos válidos para los puntos de muestreo de Asaja');
                return;
            }
            map.addSource(this.SOURCE_IDS.ASAJA, {
                type: 'geojson',
                data: geojsonData
            });
            map.addLayer({
                id: this.LAYER_IDS.ASAJA_POINTS,
                type: 'circle',
                source: this.SOURCE_IDS.ASAJA,
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
                    'circle-color': '#9E1B34', // Rojo oscuro igual que Madrid
                    'circle-stroke-color': '#fff',
                    'circle-stroke-width': 2,
                    'circle-opacity': 0.85
                },
                layout: {
                    'visibility': 'visible'
                },
                minzoom: 6
            });
            // Interacción: mostrar tooltip al pasar el ratón por los puntos de Asaja
            map.on('mouseenter', this.LAYER_IDS.ASAJA_POINTS, (e) => {
                map.getCanvas().style.cursor = 'pointer';
                if (e.features.length > 0 && window.setHoveredSample) {
                    const feature = e.features[0];
                    window.setHoveredSample({ ...feature.properties, _asaja: true });
                }
            });
            map.on('mouseleave', this.LAYER_IDS.ASAJA_POINTS, () => {
                map.getCanvas().style.cursor = '';
                window.setHoveredSample && window.setHoveredSample(null);
            });
            console.log('[Asaja] Capa de puntos de Asaja añadida correctamente');
        } catch (error) {
            console.error('[Asaja] Error añadiendo capa de puntos de muestreo de Asaja:', error);
        }
    }
    /**
     * Añade el polígono del recinto de Madrid al mapa
     */
    addMadridShapefileLayer(map, geojson) {
        if (!map || !geojson) return;
        // Eliminar capa y fuente anteriores si existen
        if (map.getLayer('madrid-shapefile-layer')) {
            map.removeLayer('madrid-shapefile-layer');
        }
        if (map.getSource('madrid-shapefile-source')) {
            map.removeSource('madrid-shapefile-source');
        }
        map.addSource('madrid-shapefile-source', {
            type: 'geojson',
            data: geojson
        });
        map.addLayer({
            id: 'madrid-shapefile-layer',
            type: 'fill',
            source: 'madrid-shapefile-source',
            paint: {
                'fill-color': '#9E1B34', // Rojo oscuro
                'fill-opacity': 0.25,
                'fill-outline-color': '#9E1B34'
            }
        });
    }
    constructor() {
        this.LAYER_IDS = {
            SHAPEFILE: 'shapefile-layer',
            SHAPEFILE_FILL: 'shapefile-fill-layer',
            SAMPLING_POINTS: 'sampling-points-layer', // Sevilla
            SAMPLING_LABELS: 'sampling-labels-layer',
            GERMANY_POINTS: 'germany-sampling-points-layer',
            BULGARIA_POINTS: 'bulgaria-sampling-points-layer', // Nueva capa para Bulgaria
            ESTONIA_POINTS: 'estonia-sampling-points-layer', // Nueva capa para Estonia
            LETONIA_POINTS: 'letonia-sampling-points-layer', // Nueva capa para Letonia
            MADRID_POINTS: 'madrid-sampling-points-layer', // Nueva capa para Madrid
            ASAJA_POINTS: 'asaja-sampling-points-layer' // Nueva capa para Asaja
        };
        this.SOURCE_IDS = {
            SHAPEFILE: 'shapefile-source',
            SAMPLING: 'sampling-source', // Sevilla
            GERMANY: 'germany-sampling-source',
            BULGARIA: 'bulgaria-sampling-source', // Nueva fuente para Bulgaria
            ESTONIA: 'estonia-sampling-source', // Nueva fuente para Estonia
            LETONIA: 'letonia-sampling-source', // Nueva fuente para Letonia
            MADRID: 'madrid-sampling-source', // Nueva fuente para Madrid
            ASAJA: 'asaja-sampling-source' // Nueva fuente para Asaja
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

    addMadridSamplingPointsLayer(map, madridData) {
        // Ocultar hover al hacer click en un punto de Madrid
        map.on('click', this.LAYER_IDS.MADRID_POINTS, () => {
            window.setHoveredSample && window.setHoveredSample(null);
        });
        try {
            console.log('[Madrid] Intentando añadir capa de puntos de muestreo...');
            if (!map) {
                console.error('[Madrid] El objeto map no está disponible');
                return;
            }
            // Remove only Madrid layer/source
            if (map.getLayer(this.LAYER_IDS.MADRID_POINTS)) {
                map.removeLayer(this.LAYER_IDS.MADRID_POINTS);
            }
            if (map.getSource(this.SOURCE_IDS.MADRID)) {
                map.removeSource(this.SOURCE_IDS.MADRID);
            }
            let geojsonData;
            console.log('[Madrid] Datos recibidos:', madridData);
                if (madridData && Array.isArray(madridData)) {
                    geojsonData = {
                        type: 'FeatureCollection',
                        features: madridData.map(row => {
                            // Soportar tanto lat/lon como Latitude/Longitude
                            let lat = parseFloat(row.lat);
                            let lon = parseFloat(row.lon);
                            let motivo = '';
                            if (isNaN(lat) || isNaN(lon)) {
                                lat = parseFloat(row.Latitude);
                                lon = parseFloat(row.Longitude);
                                if (isNaN(lat) || isNaN(lon)) {
                                    motivo = `No se pudo parsear lat/lon ni Latitude/Longitude. lat: ${row.lat}, lon: ${row.lon}, Latitude: ${row.Latitude}, Longitude: ${row.Longitude}`;
                                }
                            }
                            if (isNaN(lat) || isNaN(lon)) {
                                console.warn('[Madrid][DESCARTADO] Punto con coordenadas inválidas:', row, 'Motivo:', motivo);
                                return null;
                            }
                            // Verificar rango de coordenadas (España: lat ~36-44, lon ~-10 a 4)
                            if (lat < 36 || lat > 44 || lon < -10 || lon > 4) {
                                console.warn('[Madrid][DESCARTADO] Coordenadas fuera de rango esperado:', row, `lat: ${lat}, lon: ${lon}`);
                                return null;
                            }
                            return {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [lon, lat]
                                },
                                properties: row
                            };
                        }).filter(f => f !== null)
                    };
            } else {
                geojsonData = madridData;
            }
            console.log('[Madrid] GeoJSON generado:', geojsonData);
            if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                console.warn('[Madrid] No hay datos válidos para los puntos de muestreo de Madrid');
                return;
            }
            map.addSource(this.SOURCE_IDS.MADRID, {
                type: 'geojson',
                data: geojsonData
            });
            map.addLayer({
                id: this.LAYER_IDS.MADRID_POINTS,
                type: 'circle',
                source: this.SOURCE_IDS.MADRID,
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
                    'circle-color': '#9E1B34', // Rojo
                    'circle-stroke-color': '#fff',
                    'circle-stroke-width': 2,
                    'circle-opacity': 0.85
                },
                layout: {
                    'visibility': 'visible'
                },
                minzoom: 6
            });
            // Interacción: mostrar tooltip al pasar el ratón por los puntos de Madrid
            map.on('mouseenter', this.LAYER_IDS.MADRID_POINTS, (e) => {
                map.getCanvas().style.cursor = 'pointer';
                if (e.features.length > 0 && window.setHoveredSample) {
                    const feature = e.features[0];
                    window.setHoveredSample({ ...feature.properties, _madrid: true });
                }
            });
            map.on('mouseleave', this.LAYER_IDS.MADRID_POINTS, () => {
                map.getCanvas().style.cursor = '';
                window.setHoveredSample && window.setHoveredSample(null);
            });
            console.log('[Madrid] Capa de puntos de Madrid añadida correctamente');
        } catch (error) {
            console.error('[Madrid] Error añadiendo capa de puntos de muestreo de Madrid:', error);
        }
    }

    /**
     * Añade los puntos de muestreo de Alemania como capa al mapa (color amarillo)
     */

    addLetoniaSamplingPointsLayer(map, letoniaData) {
        // Ocultar hover al hacer click en un punto de Letonia
        map.on('click', this.LAYER_IDS.LETONIA_POINTS, () => {
            window.setHoveredSample && window.setHoveredSample(null);
        });
        try {
            console.log('[Letonia] Intentando añadir capa de puntos de muestreo...');
            if (!map) {
                console.error('[Letonia] El objeto map no está disponible');
                return;
            }
            // Remove only Letonia layer/source
            if (map.getLayer(this.LAYER_IDS.LETONIA_POINTS)) {
                map.removeLayer(this.LAYER_IDS.LETONIA_POINTS);
            }
            if (map.getSource(this.SOURCE_IDS.LETONIA)) {
                map.removeSource(this.SOURCE_IDS.LETONIA);
            }
            let geojsonData;
            console.log('[Letonia] Datos recibidos:', letoniaData);
            if (letoniaData && Array.isArray(letoniaData)) {
                geojsonData = {
                    type: 'FeatureCollection',
                    features: letoniaData.map(row => {
                        const lat = parseFloat(row.lat);
                        const lon = parseFloat(row.lon);
                        console.log('[Letonia][DEBUG] row:', row);
                        console.log(`[Letonia][DEBUG] lat: ${lat}, lon: ${lon}`);
                        if (!isNaN(lat) && !isNaN(lon)) {
                            const feature = {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [lon, lat]
                                },
                                properties: row
                            };
                            console.log('[Letonia][DEBUG] GeoJSON feature:', feature);
                            return feature;
                        }
                        return null;
                    }).filter(f => f !== null)
                };
            } else {
                geojsonData = letoniaData;
            }
            console.log('[Letonia] GeoJSON generado:', geojsonData);
            if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                console.warn('[Letonia] No hay datos válidos para los puntos de muestreo de Letonia');
                return;
            }
            map.addSource(this.SOURCE_IDS.LETONIA, {
                type: 'geojson',
                data: geojsonData
            });
            map.addLayer({
                id: this.LAYER_IDS.LETONIA_POINTS,
                type: 'circle',
                source: this.SOURCE_IDS.LETONIA,
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
                    'circle-color': '#9E1B34', // Rojo
                    'circle-stroke-color': '#fff',
                    'circle-stroke-width': 2,
                    'circle-opacity': 0.85
                },
                layout: {
                    'visibility': 'visible'
                },
                minzoom: 6
            });
            // Interacción: mostrar tooltip al pasar el ratón por los puntos de Letonia
            map.on('mouseenter', this.LAYER_IDS.LETONIA_POINTS, (e) => {
                map.getCanvas().style.cursor = 'pointer';
                if (e.features.length > 0 && window.setHoveredSample) {
                    const feature = e.features[0];
                    window.setHoveredSample({ ...feature.properties, _letonia: true });
                }
            });
            map.on('mouseleave', this.LAYER_IDS.LETONIA_POINTS, () => {
                map.getCanvas().style.cursor = '';
                window.setHoveredSample && window.setHoveredSample(null);
            });
            console.log('[Letonia] Capa de puntos de Letonia añadida correctamente');
        } catch (error) {
            console.error('[Letonia] Error añadiendo capa de puntos de muestreo de Letonia:', error);
        }
    }

    addEstoniaSamplingPointsLayer(map, estoniaData) {
            // Ocultar hover al hacer click en un punto de Estonia
            map.on('click', this.LAYER_IDS.ESTONIA_POINTS, () => {
                window.setHoveredSample && window.setHoveredSample(null);
            });
        try {
            console.log('[Estonia] Intentando añadir capa de puntos de muestreo...');
            if (!map) {
                console.error('[Estonia] El objeto map no está disponible');
                return;
            }
            // Remove only Estonia layer/source
            if (map.getLayer(this.LAYER_IDS.ESTONIA_POINTS)) {
                map.removeLayer(this.LAYER_IDS.ESTONIA_POINTS);
            }
            if (map.getSource(this.SOURCE_IDS.ESTONIA)) {
                map.removeSource(this.SOURCE_IDS.ESTONIA);
            }
            let geojsonData;
            console.log('[Estonia] Datos recibidos:', estoniaData);
            if (estoniaData && Array.isArray(estoniaData)) {
                geojsonData = {
                    type: 'FeatureCollection',
                    features: estoniaData.map(row => {
                        const lat = parseFloat(row.lat);
                        const lon = parseFloat(row.lon);
                        if (!isNaN(lat) && !isNaN(lon)) {
                            return {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [lon, lat]
                                },
                                properties: row
                            };
                        }
                        return null;
                    }).filter(f => f !== null)
                };
            } else {
                geojsonData = estoniaData;
            }
            console.log('[Estonia] GeoJSON generado:', geojsonData);
            if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                console.warn('[Estonia] No hay datos válidos para los puntos de muestreo de Estonia');
                return;
            }
            map.addSource(this.SOURCE_IDS.ESTONIA, {
                type: 'geojson',
                data: geojsonData
            });
            map.addLayer({
                id: this.LAYER_IDS.ESTONIA_POINTS,
                type: 'circle',
                source: this.SOURCE_IDS.ESTONIA,
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
                    'circle-color': '#0072CE', // Verde
                    'circle-stroke-color': '#fff',
                    'circle-stroke-width': 2,
                    'circle-opacity': 0.85
                },
                layout: {
                    'visibility': 'visible'
                },
                minzoom: 6
            });
            // Interacción: mostrar tooltip al pasar el ratón por los puntos de Estonia
            map.on('mouseenter', this.LAYER_IDS.ESTONIA_POINTS, (e) => {
                map.getCanvas().style.cursor = 'pointer';
                if (e.features.length > 0 && window.setHoveredSample) {
                    const feature = e.features[0];
                    window.setHoveredSample({ ...feature.properties, _estonia: true });
                }
            });
            map.on('mouseleave', this.LAYER_IDS.ESTONIA_POINTS, () => {
                map.getCanvas().style.cursor = '';
                window.setHoveredSample && window.setHoveredSample(null);
            });
            console.log('[Estonia] Capa de puntos de Estonia añadida correctamente');
        } catch (error) {
            console.error('[Estonia] Error añadiendo capa de puntos de muestreo de Estonia:', error);
        }
    }

    addBulgariaSamplingPointsLayer(map, bulgariaData) {
            // Ocultar hover al hacer click en un punto de Bulgaria
            map.on('click', this.LAYER_IDS.BULGARIA_POINTS, () => {
                window.setHoveredSample && window.setHoveredSample(null);
            });
        try {
            console.log('[Bulgaria] Intentando añadir capa de puntos de muestreo...');
            if (!map) {
                console.error('[Bulgaria] El objeto map no está disponible');
                return;
            }
            // Remove only Bulgaria layer/source
            if (map.getLayer(this.LAYER_IDS.BULGARIA_POINTS)) {
                map.removeLayer(this.LAYER_IDS.BULGARIA_POINTS);
            }
            if (map.getSource(this.SOURCE_IDS.BULGARIA)) {
                map.removeSource(this.SOURCE_IDS.BULGARIA);
            }
            let geojsonData;
            console.log('[Bulgaria] Datos recibidos:', bulgariaData);
            if (bulgariaData && Array.isArray(bulgariaData)) {
                geojsonData = {
                    type: 'FeatureCollection',
                    features: bulgariaData.map(row => {
                        const lat = parseFloat(row.lat);
                        const lon = parseFloat(row.lon);
                        if (!isNaN(lat) && !isNaN(lon)) {
                            return {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [lon, lat]
                                },
                                properties: row
                            };
                        }
                        return null;
                    }).filter(f => f !== null)
                };
            } else {
                geojsonData = bulgariaData;
            }
            console.log('[Bulgaria] GeoJSON generado:', geojsonData);
            if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                console.warn('[Bulgaria] No hay datos válidos para los puntos de muestreo de Bulgaria');
                return;
            }
            map.addSource(this.SOURCE_IDS.BULGARIA, {
                type: 'geojson',
                data: geojsonData
            });
            map.addLayer({
                id: this.LAYER_IDS.BULGARIA_POINTS,
                type: 'circle',
                source: this.SOURCE_IDS.BULGARIA,
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
                    'circle-color': '#43a047', // Verde
                    'circle-stroke-color': '#fff',
                    'circle-stroke-width': 2,
                    'circle-opacity': 0.85
                },
                layout: {
                    'visibility': 'visible'
                },
                minzoom: 6
            });
            // Interacción: mostrar tooltip al pasar el ratón por los puntos de Bulgaria
            map.on('mouseenter', this.LAYER_IDS.BULGARIA_POINTS, (e) => {
                map.getCanvas().style.cursor = 'pointer';
                if (e.features.length > 0 && window.setHoveredSample) {
                    const feature = e.features[0];
                    window.setHoveredSample({ ...feature.properties, _bulgaria: true });
                }
            });
            map.on('mouseleave', this.LAYER_IDS.BULGARIA_POINTS, () => {
                map.getCanvas().style.cursor = '';
                window.setHoveredSample && window.setHoveredSample(null);
            });
            console.log('[Bulgaria] Capa de puntos de Bulgaria añadida correctamente');
        } catch (error) {
            console.error('[Bulgaria] Error añadiendo capa de puntos de muestreo de Bulgaria:', error);
        }
    }
        

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
                if (e.features.length > 0 && window.setHoveredSample) {
                    const feature = e.features[0];
                    // Marcar como punto de Alemania para el pop-up
                    window.setHoveredSample({ ...feature.properties, _germany: true });
                }
            });
            map.on('mouseleave', this.LAYER_IDS.GERMANY_POINTS, () => {
                map.getCanvas().style.cursor = '';
                window.setHoveredSample && window.setHoveredSample(null);
            });
            // No ajustar la vista automáticamente, la vista inicial será Europa
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