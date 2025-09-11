import { create } from 'zustand';
import { MAP_STYLES, DEFAULT_VIEWPORT, STUDY_AREA, EUROPE_VIEW } from '../config/mapbox';

export const useMapStore = create((set, get) => ({
    // Estado del mapa
    map: null,
    viewport: DEFAULT_VIEWPORT,
    mapStyle: MAP_STYLES.streets,
    isLoaded: false,

    // Controles UI
    showControls: true,
    selectedTool: null,

    // Datos geoespaciales
    shapefileData: null,
    samplingData: null,
    isLoadingGeoData: false,
    geoDataError: null,
    hoveredSample: null,

    // Visibilidad de capas
    layersVisibility: {
        shapefile: true,
        samplingPoints: true,
        samplingLabels: true
    },

    // Acciones del mapa
    setMap: (map) => set({ map }),
    setViewport: (viewport) => set({ viewport }),
    setMapStyle: (style) => {
        const { map } = get();
        if (map) {
            map.setStyle(style);
        }
        set({ mapStyle: style });
    },
    setIsLoaded: (loaded) => set({ isLoaded: loaded }),
    setShowControls: (show) => set({ showControls: show }),
    setSelectedTool: (tool) => set({ selectedTool: tool }),

    // Acciones de datos geoespaciales
    setShapefileData: (data) => set({ shapefileData: data }),
    setSamplingData: (data) => set({ samplingData: data }),
    setIsLoadingGeoData: (loading) => set({ isLoadingGeoData: loading }),
    setGeoDataError: (error) => set({ geoDataError: error }),
    setHoveredSample: (sample) => set({ hoveredSample: sample }),

    // Acciones de visibilidad de capas
    toggleLayerVisibility: (layerName) => set((state) => ({
        layersVisibility: {
            ...state.layersVisibility,
            [layerName]: !state.layersVisibility[layerName]
        }
    })),

    setLayerVisibility: (layerName, visible) => set((state) => ({
        layersVisibility: {
            ...state.layersVisibility,
            [layerName]: visible
        }
    })),

    // Funciones del mapa
    flyTo: (coordinates, zoom = 12) => {
        const { map } = get();
        if (map) {
            map.flyTo({
                center: coordinates,
                zoom: zoom,
                duration: 2000
            });
        }
    },

    // Navegar al área de estudio (Parque Tamarguillo)
    flyToStudyArea: () => {
        const { map } = get();
        if (map) {
            map.flyTo({
                center: STUDY_AREA.center,
                zoom: STUDY_AREA.zoom.default,
                duration: 2000
            });
        }
    },

    // Navegar a la vista de Europa
    flyToEurope: () => {
        const { map } = get();
        if (map) {
            map.flyTo({
                center: [EUROPE_VIEW.longitude, EUROPE_VIEW.latitude],
                zoom: EUROPE_VIEW.zoom,
                duration: 2000
            });
        }
    },

    // Limpiar datos
    clearGeoData: () => set({
        shapefileData: null,
        samplingData: null,
        geoDataError: null,
        hoveredSample: null
    })
}));