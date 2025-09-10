import React, { useEffect, useState, useRef } from 'react';
import { useMapStore } from '../../store/mapStore';

const SplashScreen = () => {
  const { isLoaded, map } = useMapStore();
  const [visible, setVisible] = useState(true);
  const [resourcesLoaded, setResourcesLoaded] = useState({
    map: false,
    styles: false,
    data: false
  });
  const [progress, setProgress] = useState(0);
  const [showFadeOut, setShowFadeOut] = useState(false);
  const [loadingText, setLoadingText] = useState('Inicializando análisis de suelos...');
  const timerRef = useRef(null);
  
  // Verificar el estado real de carga de los recursos
  useEffect(() => {
    // Cuando el mapa está cargado
    if (isLoaded && map) {
      setResourcesLoaded(prev => ({ ...prev, map: true }));
      
      // Verificar si los estilos están cargados
      if (map.isStyleLoaded()) {
        setResourcesLoaded(prev => ({ ...prev, styles: true }));
      } else {
        // Escuchar el evento de carga de estilos
        const styleHandler = () => {
          setResourcesLoaded(prev => ({ ...prev, styles: true }));
          map.off('style.load', styleHandler);
        };
        map.on('style.load', styleHandler);
      }
      
      // Simular carga de datos (en una app real esto dependería de tus APIs/datos)
      timerRef.current = setTimeout(() => {
        setResourcesLoaded(prev => ({ ...prev, data: true }));
      }, 1500);
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (map) map.off('style.load');
    };
  }, [isLoaded, map]);
  
  // Actualizar el progreso basado en recursos reales cargados
  useEffect(() => {
    const loadedCount = Object.values(resourcesLoaded).filter(Boolean).length;
    const totalResources = Object.keys(resourcesLoaded).length;
    const calculatedProgress = Math.round((loadedCount / totalResources) * 100);
    
    // Progreso gradual para una experiencia más suave
    const interval = setInterval(() => {
      setProgress(prev => {
        const target = calculatedProgress;
        if (prev < target) return prev + 1;
        if (prev > target) return target; // Corregir si de alguna manera es mayor
        return prev;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, [resourcesLoaded]);
  
  // Actualizar textos de carga
  useEffect(() => {
    if (resourcesLoaded.map) {
      setLoadingText('Cargando capas y estilos de visualización...');
    }
    if (resourcesLoaded.styles) {
      setLoadingText('Procesando datos de análisis de suelos...');
    }
    if (resourcesLoaded.data) {
      setLoadingText('Preparando interfaz de análisis...');
    }
  }, [resourcesLoaded]);
  
  // Iniciar animación de desvanecimiento cuando todo esté cargado
  useEffect(() => {
    const allLoaded = Object.values(resourcesLoaded).every(Boolean);
    
    if (allLoaded && progress >= 99) {
      // Dar un pequeño retraso para asegurar que todo está realmente listo
      setTimeout(() => {
        setShowFadeOut(true);
        setTimeout(() => setVisible(false), 1200);
      }, 600);
    }
  }, [resourcesLoaded, progress]);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center 
                bg-gradient-to-br from-amber-900/95 to-emerald-900/95 backdrop-blur-sm
                transition-opacity duration-1200 ease-in-out
                ${showFadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="text-center p-8 max-w-md">
        {/* Logo - Icono de análisis de suelos */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 border-t-4 border-l-4 border-green-400 absolute top-0 left-0 animate-pulse"></div>
            <div className="w-24 h-24 border-b-4 border-r-4 border-amber-400 absolute bottom-0 right-0 animate-pulse" 
                 style={{animationDelay: "0.5s"}}></div>
            
            <svg className="w-28 h-28 text-green-200 relative z-10" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                    stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M19.5 12H4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" 
                    stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" 
                    fill="currentColor" fillOpacity="0.2" />
            </svg>
          </div>
          
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-amber-300">Nova</span>
            <span className="text-green-300">soil</span>
          </h1>
          <p className="text-amber-100 text-sm sm:text-base font-light">
            Análisis avanzado de suelos y terrenos
          </p>
        </div>
        
        {/* Barra de progreso */}
        <div className="w-64 sm:w-80 h-3 bg-gray-800/60 rounded-full overflow-hidden mb-4 backdrop-blur-sm border border-amber-900/20">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-green-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Texto de estado */}
        <p className="text-amber-100 text-sm font-light">
          {loadingText}
        </p>
        
        {/* Porcentaje de carga */}
        <p className="text-amber-200 text-xl font-medium mt-2">
          {progress}%
        </p>
      </div>
      
      {/* Animación de partículas - representando análisis de suelos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Representación de capas de suelo */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-800/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-700/10 to-transparent"></div>
        
        {/* Elementos flotantes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full border border-green-500/20 animate-float opacity-30" 
             style={{animationDuration: '7s'}}></div>
        <div className="absolute top-2/3 right-1/4 w-12 h-12 rounded-full border border-amber-500/30 animate-float" 
             style={{animationDuration: '5s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-green-400/20 animate-float rotate-45" 
             style={{animationDuration: '8s'}}></div>
             
        {/* Puntos de datos */}
        <div className="absolute top-1/5 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping" 
             style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-1/4 left-1/5 w-2 h-2 bg-amber-400 rounded-full animate-ping" 
             style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute top-2/5 right-1/4 w-2 h-2 bg-green-300 rounded-full animate-ping" 
             style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>
      </div>
    </div>
  );
};

export default SplashScreen;