import { create } from 'zustand';
import { MAP_STYLES, DEFAULT_VIEWPORT } from '../config/mapbox';

export const useMapStore = create((set, get) => ({
    // Estado del mapa
    map: null,
    viewport: DEFAULT_VIEWPORT,
    mapStyle: MAP_STYLES.streets,
    isLoaded: false,

    // Controles UI
    showControls: true,
    selectedTool: null,

    // Acciones
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
    }
}));