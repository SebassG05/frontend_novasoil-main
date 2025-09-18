import React, { useState, useRef, useEffect } from 'react';
import { useMapStore } from '../../store/mapStore';
import { Palette, Settings } from 'lucide-react';
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

const FloatingMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activePanel, setActivePanel] = useState(null);
    const [selectedWMSLayer, setSelectedWMSLayerState] = useState(null);
    const [wmsLayers, setWmsLayers] = useState([]);
    const [showVisualizations, setShowVisualizations] = useState(false);
    const [loadingWMS, setLoadingWMS] = useState(false);
    const [successWMS, setSuccessWMS] = useState(false);
    const [showLegend, setShowLegend] = useState(false);
    const setSelectedWMSLayer = useMapStore((state) => state.setSelectedWMSLayer);
    const map = useMapStore((state) => state.map);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const bubblesRef = useRef(null);
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
        setSelectedWMSLayer({
            name: 'Suoli Emilia-Romagna',
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
            {loadingWMS && (
                <div className="absolute left-0 bottom-24 min-w-[220px] flex items-center gap-3 bg-blue-600/95 text-white px-5 py-3 rounded-xl notif-animate-in notif-shadow border border-blue-200" style={{zIndex: 999}}>
                    <svg className="animate-spin mr-2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.2"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
                    <div>
                        <div className="font-semibold text-base">Loading WMS layer…</div>
                        <div className="text-xs opacity-80">Please wait while the layer loads</div>
                    </div>
                </div>
            )}
            {successWMS && (
                <div className="absolute left-0 bottom-24 min-w-[220px] flex items-center gap-3 bg-green-600/95 text-white px-5 py-3 rounded-xl notif-animate-in notif-animate-out notif-shadow border border-green-200" style={{zIndex: 999}}>
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeOpacity="0.2"/><path d="M6 12l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <div>
                        <div className="font-semibold text-base">Layer loaded!</div>
                        <div className="text-xs opacity-80">WMS layer added successfully</div>
                    </div>
                </div>
            )}

            {/* Panel flotante de leyenda WMS */}
            {showLegend && selectedWMSLayer && (
                <div className="fixed left-1 bottom-44 bg-white border border-green-300 rounded-xl shadow-xl px-4 py-3 flex flex-col items-start gap-2 z-[9999] animate-[fadeIn_0.4s]" style={{minWidth:220, maxWidth:220, minHeight:200,marginLeft:20}}>
                    <div className="flex w-full justify-between items-center mb-1">
                        <span className="text-green-700 font-semibold text-base flex items-center gap-2">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                            Legend
                        </span>
                        <button onClick={() => setShowLegend(false)} className="ml-2 text-gray-400 hover:text-red-500 rounded-full p-1.5 transition-colors" aria-label="Close legend">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <img
                        src={`https://servizigis.regione.emilia-romagna.it/geoags/services/portale/suoli/MapServer/WmsServer?request=GetLegendGraphic&version=1.1.1&format=image/png&layer=${selectedWMSLayer.name}`}
                        alt="Legend"
                        style={{ minHeight: 180, minWidth: 160, background: '#fff', borderRadius: 6, border: '1px solid #e0e0e0' }}
                    />
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
                            aria-label="Estilos de mapa"
                        >
                            <Palette size={20} />
                            <div className="absolute top-0 left-full ml-2 translate-y-[-50%] opacity-0 
                                          group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                    Estilos de mapa
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
                                    Estilos de mapa
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
                            bottom: { xs: '120px', sm: '130px' },
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
                                    {/* Opción general para agrupar todas las subcapas */}
                                    <li>
                                        <button
                                            onClick={() => setShowVisualizations((v) => !v)}
                                            className="w-full text-left px-6 py-3 rounded-xl border-2 border-green-500 bg-gradient-to-r from-green-100 to-green-50 hover:from-green-200 hover:to-green-100 font-bold text-green-900 shadow-md transition-all duration-300 flex flex-col items-start"
                                            style={{ fontSize: '1.1rem', letterSpacing: '0.01em' }}
                                        >
                                            <div className="flex w-full items-center justify-between">
                                                <span>Suoli Emilia-Romagna</span>
                                                <span className="ml-4 text-green-700 text-lg transition-transform duration-300" style={{ transform: showVisualizations ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                                    ▲
                                                </span>
                                            </div>
                                            <span className="block mt-1 text-green-700 font-normal text-sm">({wmsLayers.length} sublayers)</span>
                                        </button>
                                        {/* Submenú de subcapas reales con animación */}
                                        <div
                                            style={{
                                                maxHeight: showVisualizations ? 320 : 0,
                                                opacity: showVisualizations ? 1 : 0,
                                                transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <ul className="mt-2 space-y-2 pl-2 overflow-y-auto scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-50" style={{maxHeight: 300, overflowX: 'hidden'}}>
                                                {wmsLayers.length === 0 && (
                                                    <li className="text-gray-500 text-sm">No WMS sublayers found.</li>
                                                )}
                                                {wmsLayers.map((layer) => (
                                                    <li key={layer.name}>
                                                        <button
                                                            onClick={() => handleSelectWMSLayer(layer)}
                                                            className="w-full text-left px-4 py-2 rounded-lg border border-green-200 bg-white hover:bg-green-50 text-green-800 font-medium shadow-sm transition-all duration-200"
                                                        >
                                                            <span>{layer.title}</span>
                                                            <div className="text-xs text-green-600 truncate">{layer.name}</div>
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