import React, { useState, useRef, useEffect } from 'react';
import { Palette, Settings } from 'lucide-react';
import StyleSelector from './StyleSelector';
import { Paper } from '@mui/material';

const FloatingMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activePanel, setActivePanel] = useState(null);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const bubbleRef = useRef(null);

    // Cerrar el menú cuando se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if ((isOpen || activePanel) &&
                buttonRef.current && !buttonRef.current.contains(event.target) &&
                (!bubbleRef.current || !bubbleRef.current.contains(event.target)) &&
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
        // Cerrar burbujas cuando se abre un panel
        setIsOpen(false);
    };

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

                {/* Burbuja de opción "Estilos" - Solo visible cuando el menú está abierto y no hay panel activo */}
                {isOpen && !activePanel && (
                    <button
                        ref={bubbleRef}
                        onClick={handleStyleBubbleClick}
                        className="absolute -top-16 left-1 bg-white text-blue-600 w-10 h-10 sm:w-12 sm:h-12 
                                 rounded-full shadow-md border-none flex items-center justify-center
                                 hover:bg-blue-50 hover:shadow-lg active:scale-95 
                                 transform transition-all duration-300"
                        style={{ animation: 'bubbleUp 0.4s ease-out forwards' }}
                        aria-label="Estilos de mapa"
                    >
                        <Palette size={20} />

                        {/* Tooltip mejorado */}
                        <div className="absolute top-0 left-full ml-2 translate-y-[-50%] opacity-0 
                                      group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                Estilos de mapa
                            </div>
                        </div>
                    </button>
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
            </div>
        </div>
    );
};

export default FloatingMenu;