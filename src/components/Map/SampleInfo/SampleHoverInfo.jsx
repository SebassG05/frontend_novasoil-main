import React from 'react';
import { useMapStore } from '../../../store/mapStore';

const SampleHoverInfo = () => {
    const { hoveredSample } = useMapStore();

    if (!hoveredSample) return null;

    return (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-10 border">
            <div className="space-y-2">
                <h3 className="font-bold text-lg text-gray-800">{hoveredSample.code}</h3>
                
                <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                        <span className="font-medium text-gray-600">Fecha:</span>
                        <span className="ml-2 text-gray-800">{hoveredSample.date}</span>
                    </div>
                    
                    <div>
                        <span className="font-medium text-gray-600">Tipo de muestreo:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                            hoveredSample.samplingType === 'CHE' 
                                ? 'bg-red-100 text-red-800' 
                                : hoveredSample.samplingType === 'CHE-BIO'
                                    ? 'bg-teal-100 text-teal-800'
                                    : 'bg-gray-100 text-gray-800'
                        }`}>
                            {hoveredSample.samplingType}
                        </span>
                    </div>
                    
                    <div>
                        <span className="font-medium text-gray-600">Litología:</span>
                        <span className="ml-2 text-gray-800">{hoveredSample.lithologyDescription}</span>
                    </div>
                    
                    <div>
                        <span className="font-medium text-gray-600">Coordenadas:</span>
                        <span className="ml-2 text-gray-800 font-mono text-xs">
                            {hoveredSample.coordinates?.longitude?.toFixed(6)}, {hoveredSample.coordinates?.latitude?.toFixed(6)}
                        </span>
                    </div>
                </div>
                
                {hoveredSample.observations && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <span className="font-medium text-gray-600 block mb-1">Observaciones:</span>
                        <p className="text-sm text-gray-800 leading-relaxed">
                            {hoveredSample.observations}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SampleHoverInfo;
