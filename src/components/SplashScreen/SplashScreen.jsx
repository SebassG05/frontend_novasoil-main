import React, { useEffect, useState, useRef } from 'react';
import { useMapStore } from '../../store/mapStore';
import logoNovasoil from '../../assets/images/logonovasoil.png';

const SplashScreen = ({ onFinish }) => {
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

  useEffect(() => {
    if (!visible && typeof onFinish === 'function') {
      onFinish();
    }
  }, [visible, onFinish]);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center 
                transition-opacity duration-1200 ease-in-out backdrop-blur-sm
                ${showFadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background: 'linear-gradient(to bottom, #f0e6d2 0%, #f4e4bc 25%, #f8e8c0 45%, #faf0d0 55%, #f8e8c0 65%, #f4e4bc 100%)'
      }}
    >
      <div className="text-center p-8 max-w-md">
        {/* Logo - Icono de análisis de suelos */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-4">           
            <img 
              src={logoNovasoil} 
              alt="Novasoil Logo" 
              className="w-80 h-60 relative z-10 object-contain filter drop-shadow-lg"
            />
          </div>
          <p className="text-green-900 text-sm sm:text-base font-light">
            Análisis avanzado de suelos y terrenos
          </p>
        </div>
        
        {/* Barra de progreso */}
        <div className="w-64 sm:w-80 h-3 bg-gray-200/80 rounded-full overflow-hidden mb-4 backdrop-blur-sm border border-green-800/30 mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-green-800 to-green-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Texto de estado */}
        <p className="text-green-900 text-sm font-light">
          {loadingText}
        </p>
        
        {/* Porcentaje de carga */}
        <p className="text-green-800 text-xl font-medium mt-2">
          {progress}%
        </p>
      </div>
      
      {/* Animación de partículas - representando análisis de suelos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        
        {/* Elementos flotantes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full border border-green-800/60 animate-float opacity-70" 
             style={{animationDuration: '7s'}}></div>
        <div className="absolute top-2/3 right-1/4 w-12 h-12 rounded-full border border-orange-600/0 animate-float" 
             style={{animationDuration: '5s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-green-700/70 animate-float rotate-45" 
             style={{animationDuration: '8s'}}></div>
             
        {/* Puntos de datos */}
        <div className="absolute top-1/5 right-1/3 w-2 h-2 bg-green-800 rounded-full animate-ping" 
             style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-1/4 left-1/5 w-2 h-2 bg-orange-600 rounded-full animate-ping" 
             style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute top-2/5 right-1/4 w-2 h-2 bg-green-700 rounded-full animate-ping" 
             style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>
      </div>
    </div>
  );
};

export default SplashScreen;