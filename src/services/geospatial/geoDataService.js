// API base URL
const API_BASE_URL = 'http://localhost:3000/api/geo';

/**
 * Servicio para manejar las comunicaciones con el backend de datos geoespaciales
 */
class GeoDataService {
    /**
     * Realiza una petición HTTP al backend
     */
    async makeRequest(endpoint, options = {}) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error en petición a ${endpoint}:`, error);
            throw error;
        }
    }

    /**
     * Obtiene el shapefile procesado en formato GeoJSON
     */
    async getShapefile() {
        try {
            const response = await this.makeRequest('/shapefile');
            return response.data;
        } catch (error) {
            console.error('Error obteniendo shapefile:', error);
            throw error;
        }
    }

    /**
     * Obtiene información básica del shapefile
     */
    async getShapefileInfo() {
        try {
            const response = await this.makeRequest('/shapefile/info');
            return response.data;
        } catch (error) {
            console.error('Error obteniendo información del shapefile:', error);
            throw error;
        }
    }

    /**
     * Obtiene los datos de muestreo en formato GeoJSON
     */
    async getSamplingData() {
        try {
            const response = await this.makeRequest('/sampling');
            return response.data;
        } catch (error) {
            console.error('Error obteniendo datos de muestreo:', error);
            throw error;
        }
    }

    /**
     * Obtiene estadísticas de los datos de muestreo
     */
    async getSamplingStats() {
        try {
            const response = await this.makeRequest('/sampling/stats');
            return response.data;
        } catch (error) {
            console.error('Error obteniendo estadísticas de muestreo:', error);
            throw error;
        }
    }

    /**
     * Obtiene una muestra específica por código
     */
    async getSampleByCode(code) {
        try {
            const response = await this.makeRequest(`/sampling/${code}`);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo muestra por código:', error);
            throw error;
        }
    }

    /**
     * Obtiene todos los datos geoespaciales (shapefile + muestras)
     */
    async getAllGeoData() {
        try {
            const response = await this.makeRequest('/all');
            return response.data;
        } catch (error) {
            console.error('Error obteniendo todos los datos geoespaciales:', error);
            throw error;
        }
    }
}

export default new GeoDataService();
