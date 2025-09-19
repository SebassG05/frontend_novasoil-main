import { create } from 'zustand';
import { MAP_STYLES, DEFAULT_VIEWPORT, STUDY_AREA, EUROPE_VIEW } from '../config/mapbox';

export const useMapStore = create((set, get) => ({
    // Capas WMS seleccionadas (array)
    selectedWMSLayers: [],
    addWMSLayer: (layer) => {
        const current = get().selectedWMSLayers;
        // Evitar duplicados por nombre
        if (!current.some(l => l.name === layer.name)) {
            set({ selectedWMSLayers: [...current, layer] });
        }
    },
    removeWMSLayer: (layerName) => {
        const current = get().selectedWMSLayers;
        set({ selectedWMSLayers: current.filter(l => l.name !== layerName) });
    },
    // Área de estudio seleccionada (solo nombre)
    selectedAreaName: 'Tamarguillo Park Boundaries',
    setSelectedAreaName: (name) => set({ selectedAreaName: name }),
    // Estado del mapa
    map: null,
    viewport: EUROPE_VIEW,
    mapStyle: MAP_STYLES.streets,
    isLoaded: false,

    // Controles UI
    showControls: true,
    selectedTool: null,

    // Datos geoespaciales
    shapefileData: null,
    samplingData: null,
    samplingDataGermany: null,
    samplingDataBulgaria: null,
    samplingDataEstonia: null,
    isLoadingGeoData: false,
    geoDataError: null,
    hoveredSample: null,

    // Flag para indicar cuando se está cambiando el estilo
    isChangingStyle: false,

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
        set({ isChangingStyle: true, mapStyle: style });
        if (map) {
            map.setStyle(style);
        }
    },
    setIsLoaded: (loaded) => set({ isLoaded: loaded }),
    setShowControls: (show) => set({ showControls: show }),
    setSelectedTool: (tool) => set({ selectedTool: tool }),
    setIsChangingStyle: (changing) => set({ isChangingStyle: changing }),

    // Acciones de datos geoespaciales
    setShapefileData: (data) => set({ shapefileData: data }),
    setSamplingData: (data) => set({ samplingData: data }),
    setSamplingDataGermany: (data) => set({ samplingDataGermany: data }),
    setSamplingDataBulgaria: (data) => set({ samplingDataBulgaria: data }),
    setSamplingDataEstonia: (data) => set({ samplingDataEstonia: data }),
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