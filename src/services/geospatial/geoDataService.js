// Use Vite env variable VITE_API_URL if provided (should include /api),
// Use Vite env variable VITE_API_URL if provided (should include /api),
// otherwise fallback to localhost for development.
const API_BASE_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:3000/api/geo';

class GeoDataService {
    
     // Tamarguillo General (Sampling Tamarguillo Park.csv)
    async getTamarguilloGeneral() {
        try {
            const response = await this.makeRequest('/sampling/tamarguillo3');
            return response.data;
        } catch (error) {
            console.error('Error obteniendo Tamarguillo General:', error);
            throw error;
        }
    }

    /**
     * Obtiene la tabla Tamarguillo 1
     */
    // Tamarguillo Depth 0-25cm
    async getTamarguilloDepth0_25() {
        try {
            const response = await this.makeRequest('/sampling/tamarguillo-depth-0-25');
            return response.data;
        } catch (error) {
            console.error('Error obteniendo Tamarguillo 0-25cm:', error);
            throw error;
        }
    }

    // Tamarguillo Depth 25-50cm
    async getTamarguilloDepth25_50() {
        try {
            const response = await this.makeRequest('/sampling/tamarguillo-depth-25-50');
            return response.data;
        } catch (error) {
            console.error('Error obteniendo Tamarguillo 25-50cm:', error);
            throw error;
        }
    }
    /**
     * Obtiene la tabla TOPSOIL del CSV ESTADISTICOS.SUELO - R. F-Q (1).csv
     */
    async getEstadisticosTopsoil() {
        try {
            const response = await this.makeRequest('/sampling/estadisticos-topsoil');
            return response.data;
        } catch (error) {
            console.error('Error obteniendo TOPSOIL:', error);
            throw error;
        }
    }

    /**
     * Obtiene la tabla SUBSOIL del CSV ESTADISTICOS.SUELO - R. F-Q (1).csv
     */
    async getEstadisticosSubsoil() {
        try {
            const response = await this.makeRequest('/sampling/estadisticos-subsoil');
            return response.data;
        } catch (error) {
            console.error('Error obteniendo SUBSOIL:', error);
            throw error;
        }
    }
    async getMadridShapefile() {
        try {
            const response = await this.makeRequest('/shapefile?area=madrid');
            return response.data;
        } catch (error) {
            console.error('Error obteniendo shapefile de Madrid:', error);
            throw error;
        }
    }
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
