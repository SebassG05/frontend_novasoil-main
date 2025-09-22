import React, { useState, useRef, useEffect } from 'react';
import { useMapStore } from '../../store/mapStore';
import { Palette, Settings } from 'lucide-react';
import { holandaSublayers } from '../../config/holandaSublayers';
import holandaLegend, { firstSoilcodeColors } from '../../config/holandaLegend';
import bbox from '@turf/bbox';
import StyleSelector from './StyleSelector';
import { Paper } from '@mui/material';


// Función para extraer subcapas reales del XML (Name y Title)
function parseWMSLayers(xmlString) {
    const parser = new window.DOMParser();
    const xml = parser.parseFromString(xmlString, 'text/xml');
    const layers = [];
    // Buscar todos los <Layer queryable="1">
    const layerNodes = Array.from(xml.querySelectorAll('Layer[queryable="1"]'));
    for (const node of layerNodes) {
        const name = node.querySelector('Name')?.textContent;
        const title = node.querySelector('Title')?.textContent;
        if (name && title) {
            layers.push({ name, title });
        }
    }
    return layers;
}

// Diccionario de nombres amigables para sublayers
const sublayerNames = {
    'Dotazione_sostanza_organica_0_30_cm_rst': 'Organic matter content',
    'Erosione_idrica_gravitativa': 'Water and gravitational erosion',
    'Macro_elementi_fertilita': 'Macroelements fertility',
    'Valori_Fosforo_P_ass_0_30_cm_rst': 'Phosphorus (0-30 cm)',
    'Valori_Potassio_K_scamb_0_30_cm_rst': 'Potassium (0-30 cm)',
    'Valori_Azoto_N_tot_0_30_cm_rst': 'Nitrogen (0-30 cm)',
    'Carte_applicative': 'Application maps',
    'Gruppi_idrologici': 'Hydrological groups',
    'Conducibilita_idraulica_satura_Ksat': 'Saturated hydraulic conductivity (Ksat)',
    'Servizi_ecosistemici_rst': 'Ecosystem services',
    'Capacita_uso_suoli': 'Soil use capacity',
    'Metalli_pesanti': 'Heavy metals',
    'Fondo_naturale_antropico': 'Anthropogenic natural fund',
    'Fondo_nat_antropico_Zn_ICP-MS': 'Anthropogenic natural fund (Zn, ICP-MS)',
    'Fondo_nat_antropico_V_ICP-MS': 'Anthropogenic natural fund (V, ICP-MS)',
    'Fondo_nat_antropico_Sn_ICP-MS': 'Anthropogenic natural fund (Sn, ICP-MS)',
    'Fondo_nat_antropico_Cu_ICP-MS': 'Anthropogenic natural fund (Cu, ICP-MS)',
    'Fondo_nat_antropico_Pb_ICP-MS': 'Anthropogenic natural fund (Pb, ICP-MS)',
    'Fondo_nat_antropico_Ni_ICP-MS': 'Anthropogenic natural fund (Ni, ICP-MS)',
    'Fondo_nat_antropico_Cr_ICP-MS': 'Anthropogenic natural fund (Cr, ICP-MS)',
    'Fondo_nat_antropico_Cd_ICP-MS': 'Anthropogenic natural fund (Cd, ICP-MS)',
    'Fondo_nat_antropico_As_ICP-MS': 'Anthropogenic natural fund (As, ICP-MS)',
    'Fondo_nat_antropico_ICP-MS': 'Anthropogenic natural fund (ICP-MS)',
    'Fondo_naturale': 'Natural background',
    'Fondo_naturale_Zn_XRF': 'Natural background Zn XRF',
    'Fondo_naturale_V_XRF': 'Natural background V XRF',
    'Fondo_naturale_Pb_XRF': 'Natural background Pb XRF',
    'Fondo_naturale_Ni_XRF': 'Natural background Ni XRF',
    'Fondo_naturale_Cr_XRF': 'Natural background Cr XRF',
    'Fondo_naturale_Co_XRF': 'Natural background Co XRF',
    'Fondo_naturale_Cu_XRF': 'Natural background Cu XRF',
    'Fondo_naturale_XRF': 'Natural background XRF',
    'Carbonio_organico': 'Organic carbon',
    'Contenuto_perc_carbonio_organico_pianura_0_100_cm': 'Carbonio organico (0-100 cm)',
    'Contenuto_perc_carbonio_organico_pianura_0_100_cm_rst': 'Carbonio organico (0-100 cm) (rst)',
    'Contenuto_perc_carbonio_organico_pianura_0_100_cm': 'Organic carbon percentage content plain 0–100 cm',
    'Contenuto_perc_carbonio_organico_0_30_cm': 'Organic carbon percentage content 0–30 cm',
    'Contenuto_perc_carbonio_organico_0_30_cm_rst': 'Organic carbon percentage content 0–30 cm (rst)',
    'Carbonio_organico_stock_0_30_cm_rst': 'Organic carbon stock 0–30 cm (rst)',
    'Contenuto_perc_carbonio_organico_pianura_0_100_cm_rst': 'Organic carbon percentage content plain 0–100 cm (rst)',
    'Carbonio_organico_stock_Appennino_0_100_cm': 'Organic carbon stock Apennines 0–100 cm',
    'Carbonio_organico_stock_pianura_0_100_cm': 'Organic carbon stock plain 0–100 cm',
    'Salinita_pianura_50_100_cm': 'Salinity plain 50–100 cm',
    'Salinita_pianura_0_50_cm': 'Salinity plain 0–50 cm',
    'Valori_ph_0_30_cm_rst': 'pH values 0–30 cm (rst)',
    'Tessitura_0_30_cm_rst': 'Texture 0–30 cm (rst)',
    'Batterie_falde_superficiali': 'Shallow aquifer batteries',
    'Campioni_analisi_terreni': 'Soil analysis samples',
    'Carta_Suoli_250k_ed_1994': 'Soil map 1:250,000 edition 1994',
    'Carta_Suoli_50k': 'Soil map 1:50,000',
    'Contenuto_perc_carbonio_organico_pianura_0_100_cm': 'Organic carbon percentage content plain 0–100 cm'
};

const FloatingMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activePanel, setActivePanel] = useState(null);
    const [selectedWMSLayer, setSelectedWMSLayerState] = useState(null);
    const [wmsLayers, setWmsLayers] = useState([]);
    // Puede ser 'italia', 'holanda' o null
    const [showVisualizations, setShowVisualizations] = useState(null);
    const [loadingWMS, setLoadingWMS] = useState(false);
    const [successWMS, setSuccessWMS] = useState(false);
    const [showLegend, setShowLegend] = useState(false);
    const addWMSLayer = useMapStore((state) => state.addWMSLayer);
    const map = useMapStore((state) => state.map);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const bubblesRef = useRef(null);
    // Estado para la pestaña activa de la leyenda WMS (siempre visible)
    const wmsLayersForLegend = useMapStore((state) => state.selectedWMSLayers);
    const [activeLegendTab, setActiveLegendTab] = useState(wmsLayersForLegend[0]?.name);
    // Estado de opacidad por capa WMS
    const [wmsOpacities, setWmsOpacities] = useState(() => {
        const initial = {};
        wmsLayersForLegend.forEach(l => { initial[l.name] = 1; });
        // Inicializar global para MapContainer
        window.wmsOpacities = initial;
        return initial;
    });
    // Sincronizar opacidades si cambian las capas
    useEffect(() => {
        setWmsOpacities(prev => {
            const updated = { ...prev };
            wmsLayersForLegend.forEach(l => {
                if (updated[l.name] === undefined) updated[l.name] = 1;
            });
            // Eliminar opacidades de capas que ya no están
            Object.keys(updated).forEach(k => {
                if (!wmsLayersForLegend.find(l => l.name === k)) delete updated[k];
            });
            // Actualizar global y emitir evento
            window.wmsOpacities = updated;
            window.dispatchEvent(new Event('wmsOpacitiesChanged'));
            return updated;
        });
    }, [wmsLayersForLegend]);
    // Cambiar opacidad de la capa en el mapa (0 = transparente, 1 = opaco)
    const handleOpacityChange = (layerName, value) => {
        setWmsOpacities(prev => {
            const updated = { ...prev, [layerName]: value };
            window.wmsOpacities = updated;
            window.dispatchEvent(new Event('wmsOpacitiesChanged'));
            return updated;
        });
    };
    useEffect(() => {
        if (!wmsLayersForLegend.some(l => l.name === activeLegendTab) && wmsLayersForLegend.length > 0) {
            setActiveLegendTab(wmsLayersForLegend[0].name);
        }
    }, [wmsLayersForLegend, activeLegendTab]);
    // Cargar y parsear el XML de subcapas reales al montar el componente
    useEffect(() => {
        // Puedes mover el archivo WmsServer a la carpeta public/ y usar la ruta relativa
        fetch('/WmsServer')
            .then(res => res.text())
            .then(xmlString => {
                const layers = parseWMSLayers(xmlString);
                setWmsLayers(layers);
            })
            .catch(() => setWmsLayers([]));
    }, []);

    // Cerrar el menú cuando se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if ((isOpen || activePanel) &&
                buttonRef.current && !buttonRef.current.contains(event.target) &&
                (!bubblesRef.current || !bubblesRef.current.contains(event.target)) &&
                (!menuRef.current || !menuRef.current.contains(event.target))) {
                // Cerrar todo
                setActivePanel(null);
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, activePanel]);

    // Manejar clic en el botón principal
    const handleMainButtonClick = () => {
        if (activePanel) {
            // Cerrar el panel activo y volver al estado inicial
            setActivePanel(null);
            setIsOpen(false);
        } else {
            // Abrir/cerrar menú de burbujas
            setIsOpen(!isOpen);
        }
    };


    // Manejar clic en la burbuja de estilos
    const handleStyleBubbleClick = () => {
        setActivePanel('styles');
        setIsOpen(false);
    };

    // Manejar clic en la burbuja de WMS
    const handleWMSBubbleClick = () => {
        setActivePanel('wms');
        setIsOpen(false);
    };

    // Seleccionar una subcapa WMS real
    const handleSelectWMSLayer = (layer) => {
        setSelectedWMSLayerState(layer);
        setLoadingWMS(true);
        setSuccessWMS(false);
        setShowLegend(false);
        addWMSLayer({
            name: layer.name,
            url: 'https://servizigis.regione.emilia-romagna.it/geoags/services/portale/suoli/MapServer/WmsServer?',
            layerName: layer.name
        });
        setActivePanel(null);
    };

    // Escuchar cuando la capa WMS se carga en el mapa
    useEffect(() => {
        if (!map || !loadingWMS) return;
        const onSourceData = (e) => {
            if (e.sourceId === 'wms-source' && e.isSourceLoaded) {
                setLoadingWMS(false);
                setSuccessWMS(true);
                setShowLegend(true);
                // Zoom automático a Emilia-Romagna (aprox)
                map.fitBounds([
                    [9.2, 43.77],   // suroeste
                    [12.83, 45.14]  // noreste
                ], { padding: 40, duration: 1500 });
                setTimeout(() => setSuccessWMS(false), 2000);
            }
        };
        map.on('sourcedata', onSourceData);
        return () => map.off('sourcedata', onSourceData);
    }, [map, loadingWMS]);

    // Cerrar panel
    const handleClosePanel = () => {
        setActivePanel(null);
        // No reabrimos las burbujas automáticamente
    };

    // Añadir keyframes para las animaciones
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bubbleUp {
                from { opacity: 0; transform: scale(0.5) translateY(10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes panelIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div className="fixed left-4 sm:left-6 md:left-8 bottom-4 sm:bottom-6 md:bottom-8 z-50">
            {/* Mensaje de carga y éxito */}
            {/* Notificación de carga/cargado con animación y diseño moderno */}
            <style>{`
                @keyframes slideInNotif {
                    from { opacity: 0; transform: translateY(30px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes fadeOutNotif {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                .notif-animate-in { animation: slideInNotif 0.5s cubic-bezier(0.4,0,0.2,1) forwards; }
                .notif-animate-out { animation: fadeOutNotif 0.5s 1.5s forwards; }
                .notif-shadow { box-shadow: 0 6px 24px 0 rgba(0,0,0,0.18), 0 1.5px 4px 0 rgba(0,0,0,0.12); }
            `}</style>
            {/* Loader y mensaje de éxito eliminados por solicitud del usuario */}

            {/* Leyenda WMS con pestañas por capa, SIEMPRE visible como recuadro flotante */}
            {wmsLayersForLegend.length > 0 && (
                <div className="fixed left-4 top-4 z-[9999] bg-white border border-green-300 rounded-xl shadow-xl px-4 pt-2 pb-3 animate-[fadeIn_0.4s]" style={{minWidth:240, maxWidth:260, minHeight:220}}>
                    <div className="flex border-b border-green-200 mb-2 gap-1">
                        {wmsLayersForLegend.map((layer, idx) => {
                            // Si hay 4 o más pestañas, reducir el ancho máximo
                            const tabCount = wmsLayersForLegend.length;
                            let maxWidth = 110;
                            let minWidth = 60;
                            let labelMaxWidth = 90;
                            if (tabCount >= 4) {
                                maxWidth = Math.max(60, 220 / tabCount);
                                minWidth = Math.max(40, 120 / tabCount);
                                labelMaxWidth = maxWidth - 20;
                            }
                            return (
                                <button
                                    key={layer.name}
                                    onClick={() => setActiveLegendTab(layer.name)}
                                    className={`px-2 py-1 text-xs font-semibold rounded-t ${activeLegendTab === layer.name ? 'bg-green-100 text-green-800 border-t-2 border-green-400' : 'bg-gray-100 text-gray-500'}`}
                                    style={{
                                        marginRight: 2,
                                        minWidth,
                                        maxWidth,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        display: 'inline-block',
                                        verticalAlign: 'middle',
                                        paddingRight: 18
                                    }}
                                >
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            maxWidth: labelMaxWidth,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            verticalAlign: 'middle',
                                            position: 'relative',
                                        }}
                                    >
                                        {layer.layerName || layer.name}
                                    </span>
                                    <span
                                        style={{
                                            content: '""',
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            height: '100%',
                                            width: 18,
                                            background: 'linear-gradient(to right, rgba(255,255,255,0), #f0fdf4 80%)',
                                            pointerEvents: 'none',
                                            display: 'block',
                                        }}
                                    />
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex flex-col items-center">
                        <img
                            src={`https://servizigis.regione.emilia-romagna.it/geoags/services/portale/suoli/MapServer/WmsServer?request=GetLegendGraphic&version=1.1.1&format=image/png&layer=${(wmsLayersForLegend.find(l => l.name === activeLegendTab) || wmsLayersForLegend[0]).name}`}
                            alt={`Legend for ${(wmsLayersForLegend.find(l => l.name === activeLegendTab) || wmsLayersForLegend[0]).layerName || (wmsLayersForLegend.find(l => l.name === activeLegendTab) || wmsLayersForLegend[0]).name}`}
                            style={{ minHeight: 180, minWidth: 160, background: '#fff', borderRadius: 6, border: '1px solid #e0e0e0' }}
                        />
                        {/* Barra de opacidad */}
                        <div className="w-full flex flex-col items-center mt-2">
                            <label htmlFor={`opacity-slider-${activeLegendTab}`} className="text-xs text-gray-600 mb-1">Layer opacity</label>
                            <input
                                id={`opacity-slider-${activeLegendTab}`}
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={wmsOpacities[activeLegendTab] ?? 1}
                                onChange={e => handleOpacityChange(activeLegendTab, parseFloat(e.target.value))}
                                className="w-32 accent-green-500"
                                style={{ direction: 'ltr' }}
                            />
                            <span className="text-xs text-gray-500 mt-1">{Math.round((wmsOpacities[activeLegendTab] ?? 1) * 100)}%</span>
                            <span className="text-[10px] text-gray-400">0 = transparent, 100 = opaque</span>
                        </div>
                    </div>
                </div>
            )}
            {/* Contenedor principal */}
            <div className="relative">
                {/* Botón principal */}
                <button
                    ref={buttonRef}
                    onClick={handleMainButtonClick}
                    className={`relative bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 
                               shadow-lg border-none flex items-center justify-center transition-all duration-300 ease-in-out
                               ${isOpen ? 'ring-2 ring-blue-100' : ''}
                               ${activePanel ? 'ring-2 ring-blue-300 bg-blue-700' : ''}`}
                    aria-label="Menú de opciones"
                >
                    <Settings
                        size={24}
                        className={`transition-all duration-300 ease-in-out
                                   ${isOpen ? 'rotate-90' : ''}
                                   ${activePanel ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* Burbuja de opción "WMS" - Encima de la de estilos */}
                {isOpen && !activePanel && (
                    <div ref={bubblesRef} className="flex flex-col items-start space-y-6 absolute left-1 " style={{top: '-130px'}}>
                        <button
                            onClick={handleWMSBubbleClick}
                            className="bg-white text-green-600 w-10 h-10 sm:w-12 sm:h-12 
                                     rounded-full shadow-md border-none flex items-center justify-center
                                     hover:bg-green-50 hover:shadow-lg active:scale-95 
                                     transform transition-all duration-300"
                            style={{ animation: 'bubbleUp 0.4s ease-out forwards' }}
                            aria-label="Capas WMS"
                        >
                            {/* Icono simple para WMS */}
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" /></svg>
                            <div className="absolute top-0 left-full ml-2 translate-y-[-50%] opacity-0 
                                          group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                    Capas WMS
                                </div>
                            </div>
                        </button>
                        {/* Burbuja de opción "Estilos" */}
                        <button
                            onClick={handleStyleBubbleClick}
                            className="bg-white text-blue-600 w-10 h-10 sm:w-12 sm:h-12 
                                     rounded-full shadow-md border-none flex items-center justify-center
                                     hover:bg-blue-50 hover:shadow-lg active:scale-95 
                                     transform transition-all duration-300"
                            style={{ animation: 'bubbleUp 0.4s ease-out forwards' }}
                            aria-label="Map styles"
                        >
                            <Palette size={20} />
                            <div className="absolute top-0 left-full ml-2 translate-y-[-50%] opacity-0 
                                          group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                    Map styles
                                </div>
                            </div>
                        </button>
                    </div>
                )}

                {/* Panel de estilos */}
                {activePanel === 'styles' && (
                    <Paper
                        ref={menuRef}
                        elevation={4}
                        sx={{
                            position: 'absolute',
                            bottom: { xs: '75px', sm: '85px' },
                            left: '-12px',
                            width: { xs: '280px', sm: '350px', md: '420px' },
                            maxWidth: 'calc(100vw - 32px)',
                            maxHeight: 'calc(100vh - 120px)',
                            borderRadius: '18px',
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(200, 200, 200, 0.3)',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)',
                            overflow: 'auto',
                            transform: 'translateZ(0)',
                            zIndex: 100,
                            animation: 'panelIn 0.3s ease-out forwards'
                        }}
                    >
                        <div className="p-4 sm:p-5">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                                <h3 className="text-blue-600 font-semibold flex items-center gap-2 text-sm sm:text-base">
                                    <Palette size={18} />
                                    Map styles
                                </h3>
                                <button
                                    onClick={handleClosePanel}
                                    className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 
                                             rounded-full p-1.5 transition-colors duration-200"
                                    aria-label="Cerrar panel"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                            <div className="overflow-auto max-h-[60vh]">
                                <StyleSelector />
                            </div>
                        </div>
                    </Paper>
                )}

                {/* Panel de selección de subcapas WMS agrupadas */}
                {activePanel === 'wms' && (
                    <Paper
                        ref={menuRef}
                        elevation={4}
                        sx={{
                            position: 'absolute',
                            bottom: { xs: '50px', sm: '70px' }, // Más abajo para no tapar la leyenda
                            left: '-12px',
                            width: { xs: '280px', sm: '350px', md: '420px' },
                            maxWidth: 'calc(100vw - 32px)',
                            maxHeight: 'calc(100vh - 120px)',
                            borderRadius: '18px',
                            backgroundColor: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(200, 200, 200, 0.3)',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)',
                            overflow: 'auto',
                            transform: 'translateZ(0)',
                            zIndex: 100,
                            animation: 'panelIn 0.3s ease-out forwards'
                        }}
                    >
                        <div className="p-4 sm:p-5">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
                                <h3 className="text-green-700 font-bold flex items-center gap-2 text-base sm:text-lg tracking-wide">
                                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" /></svg>
                                    Real WMS Layers
                                </h3>
                                <button
                                    onClick={handleClosePanel}
                                    className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 
                                             rounded-full p-1.5 transition-colors duration-200"
                                    aria-label="Cerrar panel"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                            <div className="overflow-auto max-h-[60vh]">
                                <ul className="space-y-2">
                                    {/* Opción general para agrupar todas las subcapas - ITALIA */}
                                    <li>
                                        <button
                                            onClick={() => setShowVisualizations(v => v === 'italia' ? null : 'italia')}
                                            className="w-full text-left px-6 py-3 rounded-xl border-2 border-green-500 bg-gradient-to-r from-green-100 to-green-50 hover:from-green-200 hover:to-green-100 font-bold text-green-900 shadow-md transition-all duration-300 flex flex-col items-start"
                                            style={{ fontSize: '1.1rem', letterSpacing: '0.01em' }}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <span>Suoli Emilia-Romagna</span>
                                                <span className="ml-4 text-green-700 text-lg transition-transform duration-300" style={{ transform: showVisualizations === 'italia' ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                                    ▲
                                                </span>
                                            </div>
                                            <span className="block mt-1 text-green-700 font-normal text-sm">({wmsLayers.length} sublayers)</span>
                                        </button>
                                        {/* Submenú de subcapas reales con animación */}
                                        <div
                                            style={{
                                                maxHeight: showVisualizations === 'italia' ? 320 : 0,
                                                opacity: showVisualizations === 'italia' ? 1 : 0,
                                                transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <ul className="mt-2 space-y-2 pl-2 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-50" style={{maxHeight: 300, overflowX: 'hidden'}}>
                                                {wmsLayers.length === 0 && (
                                                    <li className="text-gray-500 text-sm">No WMS sublayers found.</li>
                                                )}
                                                {(() => {
                                                    // Generar keys únicas incluso si hay nombres repetidos
                                                    const nameCount = {};
                                                    return wmsLayers.map((layer, idx) => {
                                                        let key = layer.name;
                                                        if (nameCount[key] !== undefined) {
                                                            nameCount[key]++;
                                                            key = key + '_' + nameCount[key];
                                                        } else {
                                                            nameCount[key] = 0;
                                                        }
                                                        return (
                                                            <li key={key}>
                                                                <button
                                                                    onClick={() => handleSelectWMSLayer(layer)}
                                                                    className="w-full text-left px-4 py-2 rounded-lg border border-green-200 bg-white hover:bg-green-50 text-green-800 font-medium shadow-sm transition-all duration-200"
                                                                >
                                                                    <span>{sublayerNames[layer.name] || layer.title}</span>
                                                                    <div className="text-xs text-green-600 truncate">{layer.name}</div>
                                                                </button>
                                                            </li>
                                                        );
                                                    });
                                                })()}
                                            </ul>
                                        </div>
                                    </li>

                                    {/* Opción general para agrupar subcapas de Holanda */}
                                    <li>
                                        <button
                                            onClick={() => setShowVisualizations(v => v === 'holanda' ? null : 'holanda')}
                                            className="w-full text-left px-6 py-3 rounded-xl border-2 border-orange-500 bg-gradient-to-r from-orange-100 to-orange-50 hover:from-orange-200 hover:to-orange-100 font-bold text-orange-900 shadow-md transition-all duration-300 flex flex-col items-start"
                                            style={{ fontSize: '1.1rem', letterSpacing: '0.01em' }}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <span>Holanda</span>
                                                <span className="ml-4 text-orange-700 text-lg transition-transform duration-300" style={{ transform: showVisualizations === 'holanda' ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                                    ▲
                                                </span>
                                            </div>
                                            <span className="block mt-1 text-orange-700 font-normal text-sm">({holandaSublayers.length} sublayers)</span>
                                        </button>
                                        {/* Submenú de subcapas de Holanda */}
                                        <div
                                            style={{
                                                maxHeight: showVisualizations === 'holanda' ? 320 : 0,
                                                opacity: showVisualizations === 'holanda' ? 1 : 0,
                                                transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <ul className="mt-2 space-y-2 pl-2 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-orange-50" style={{maxHeight: 300, overflowX: 'hidden'}}>
                                                {holandaSublayers.length === 0 && (
                                                    <li className="text-gray-500 text-sm">No sublayers found.</li>
                                                )}
                                                {holandaSublayers.map((sublayer, idx) => (
                                                    <li key={sublayer.name}>
                                                        <button
                                                            className="w-full text-left px-4 py-2 rounded-lg border border-orange-200 bg-white hover:bg-orange-50 text-orange-800 font-medium shadow-sm transition-all duration-200"
                                                            onClick={async () => {
                                                                try {
                                                                    const { fetchHolandaGeojsonZip } = await import('../../services/geospatial/holandaGeojsonService');
                                                                    const geojson = await fetchHolandaGeojsonZip();
                                                                    const map = window?.mapboxMap || useMapStore.getState().map;
                                                                    // Mapeo de valores a colores según SLD
                                                                    const pedologicalinterestColors = {
                                                                        'Water': '#D3FEFE',
                                                                        'Moeras': '#D3FEFE',
                                                                        'Dijk': '#FE02A7',
                                                                        'Terp': '#FE02A7',
                                                                        'Groeve': '#FFFFFF',
                                                                        'Sterk afgegraven terrein': '#FFFFFF',
                                                                        'Sterk ge-egaliseerd': '#FFFFFF',
                                                                        'Sterk verwerkt terrein': '#FFFFFF',
                                                                        'Mijnstort': '#FFFFFF',
                                                                        'Bebouwd gebied': '#FFFFFF',
                                                                        'Bovenland': '#FFFFFF',
                                                                        'Sterk opgehoogd terrein': '#FFFFFF',
                                                                        'Met huisvuil opgehoogde gronden': '#D3D3A7',
                                                                    };
                                                                                                                                        // Colores para los códigos de Holanda importados del SLD
                                                                                                                                        // Usar firstSoilcodeColors importado de holandaLegend.js
                                                                                                                                        // Si quieres mostrar el nombre en un popup o tooltip, puedes usar holandaLegend[code]
                                                                    // Expresión Mapbox para fill-color
                                                                    const fillColorExpression = [
                                                                        'case',
                                                                        // Por pedologicalinterest
                                                                        ['has', 'pedologicalinterest'],
                                                                        [
                                                                            'match',
                                                                            ['get', 'pedologicalinterest'],
                                                                            ...Object.entries(pedologicalinterestColors).flat(),
                                                                            // Si no hay match, probar con first_soilcode
                                                                            [
                                                                                'match',
                                                                                ['get', 'first_soilcode'],
                                                                                ...Object.entries(firstSoilcodeColors).flat(),
                                                                                '#cccccc' // color por defecto
                                                                            ]
                                                                        ],
                                                                        // Si no tiene pedologicalinterest, usar first_soilcode
                                                                        [
                                                                            'match',
                                                                            ['get', 'first_soilcode'],
                                                                            ...Object.entries(firstSoilcodeColors).flat(),
                                                                            '#cccccc'
                                                                        ]
                                                                    ];
                                                                    if (!map.getSource('holanda-geojson')) {
                                                                        map.addSource('holanda-geojson', {
                                                                            type: 'geojson',
                                                                            data: geojson
                                                                        });
                                                                        map.addLayer({
                                                                            id: 'holanda-geojson-layer',
                                                                            type: 'fill',
                                                                            source: 'holanda-geojson',
                                                                            paint: {
                                                                                'fill-color': fillColorExpression,
                                                                                'fill-opacity': 0.95,
                                                                                'fill-outline-color': 'rgba(0,0,0,0)'
                                                                            }
                                                                        });
                                                                        map.fitBounds(bbox(geojson), { padding: 40, duration: 1200 });
                                                                    } else {
                                                                        map.setLayoutProperty('holanda-geojson-layer', 'visibility', 'visible');
                                                                    }
                                                                } catch (e) {
                                                                    alert('Error cargando capa Holanda: ' + e.message);
                                                                }
                                                            }}
                                                        >
                                                            <span>{sublayer.title}</span>
                                                            <div className="text-xs text-orange-600 truncate">{sublayer.name}</div>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Paper>
                )}
            </div>
        </div>
    );
};

export default FloatingMenu;