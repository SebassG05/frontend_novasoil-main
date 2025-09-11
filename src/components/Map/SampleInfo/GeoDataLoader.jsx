import React from 'react';
import { useMapStore } from '../../../store/mapStore';

const GeoDataLoader = () => {
    const { isLoadingGeoData, geoDataError } = useMapStore();

    if (!isLoadingGeoData && !geoDataError) return null;

    if (geoDataError) {
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg max-w-md">
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 className="font-medium">Error cargando datos</h3>
                            <p className="text-sm mt-1">{geoDataError}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 border">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <div>
                    <h3 className="font-medium text-gray-800">Cargando datos geoespaciales</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Procesando shapefile y datos de muestreo...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GeoDataLoader;
