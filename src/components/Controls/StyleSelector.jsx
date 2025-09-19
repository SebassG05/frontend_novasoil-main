import React, { useState, useEffect } from 'react';
import { Palette, Satellite, Sun, Moon, Map, Layers } from 'lucide-react';
import { useMapStore } from '../../store/mapStore';
import { MAP_STYLES } from '../../config/mapbox';

const styleOptions = [
    { key: 'streets', name: 'Streets', icon: Map, description: 'Street detail and points of interest' },
    { key: 'satellite', name: 'Satellite', icon: Satellite, description: 'High-resolution satellite imagery' },
    { key: 'outdoors', name: 'Outdoors', icon: Layers, description: 'Terrain and natural routes' },
    { key: 'light', name: 'Light', icon: Sun, description: 'Light theme with soft colors' },
    { key: 'dark', name: 'Dark', icon: Moon, description: 'Dark theme for nighttime use' },
    { key: 'satelliteStreets', name: 'HHybrid', icon: Palette, description: 'Satellite with street layers' }
];

const StyleSelector = () => {
    const { mapStyle, setMapStyle } = useMapStore();
    const [selectedStyle, setSelectedStyle] = useState('streets');
    const [changing, setChanging] = useState(false);

    useEffect(() => {
        const currentStyleKey = Object.keys(MAP_STYLES).find(
            key => MAP_STYLES[key] === mapStyle
        );
        if (currentStyleKey) {
            setSelectedStyle(currentStyleKey);
        }
    }, [mapStyle]);

    const handleStyleChange = (styleKey) => {
        if (styleKey === selectedStyle) return;

        setChanging(true);
        setSelectedStyle(styleKey);
        setMapStyle(MAP_STYLES[styleKey]);

        // Reset changing state after animation
        setTimeout(() => {
            setChanging(false);
        }, 500);
    };

    // Determinar el número de columnas basado en la cantidad de opciones
    // Esto permite una mejor visualización para pocos elementos
    const optionsCount = styleOptions.length;
    const gridCols = optionsCount <= 3 ? optionsCount : 'responsive';

    return (
        <div className="rounded-3xl overflow-hidden transition-all duration-300 max-h-[60vh] overflow-y-auto">
            <div className={`grid ${gridCols === 'responsive'
                ? 'grid-cols-1 xs:grid-cols-2 lg:grid-cols-3'
                : `grid-cols-${gridCols}`
                } gap-2 sm:gap-3 p-1`}>
                {styleOptions.map(option => {
                    const { key, name, icon: Icon, description } = option;
                    const isSelected = selectedStyle === key;

                    return (
                        <button
                            key={key}
                            onClick={() => handleStyleChange(key)}
                            className={`flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-2xl border 
                                      ${isSelected
                                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-100'
                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'}
                                      transition-all duration-200 relative overflow-hidden
                                      ${isSelected && changing ? 'scale-95' : 'scale-100'}`}
                        >
                            {/* Indicador de selección animado */}
                            {isSelected && (
                                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-blue-600 animate-[pulse_2s_infinite]" />
                            )}

                            <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-1
                                           ${isSelected
                                    ? 'bg-blue-100 text-blue-600 shadow-inner'
                                    : 'bg-gray-50 text-gray-500 shadow-sm'}
                                           transition-colors duration-200`}>
                                <Icon size={22} strokeWidth={isSelected ? 2.5 : 2} />
                            </div>

                            <span className={`text-xs sm:text-sm ${isSelected ? 'font-bold' : 'font-medium'}`}>
                                {name}
                            </span>

                            <span className="text-[10px] sm:text-xs text-gray-500 text-center leading-tight opacity-80 max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-1">
                                {description}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default StyleSelector;