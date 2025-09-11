// Configuración de Mapbox
export const MAPBOX_TOKEN = 'pk.eyJ1IjoieWxpdWRldiIsImEiOiJja2ZldGpkZTcwNDN4MnpvYThsbno3OGd0In0.7OiaH8u5zpRSF7tjly1l7A';

export const MAP_STYLES = {
    streets: 'mapbox://styles/mapbox/streets-v12',
    satellite: 'mapbox://styles/mapbox/satellite-v9',
    outdoors: 'mapbox://styles/mapbox/outdoors-v12',
    light: 'mapbox://styles/mapbox/light-v11',
    dark: 'mapbox://styles/mapbox/dark-v11',
    satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v12'
};

// Vista inicial centrada en Europa
export const DEFAULT_VIEWPORT = {
    longitude: 10.0,
    latitude: 50.0,
    zoom: 4
};

// Configuración específica para el área de estudio (Parque Tamarguillo)
export const STUDY_AREA = {
    center: [-5.911, 37.406],
    bounds: [
        [-5.925, 37.395], // southwest
        [-5.900, 37.420]  // northeast
    ],
    zoom: {
        default: 13,
        detail: 16,
        overview: 11
    }
};

// Vista inicial centrada en Europa
export const EUROPE_VIEW = {
    longitude: 10.0,
    latitude: 50.0,
    zoom: 4
};