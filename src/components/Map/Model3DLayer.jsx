import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mapboxgl from 'mapbox-gl';
import { useMapStore } from '../../store/mapStore';

const Model3DLayer = () => {
  const { map } = useMapStore();

  useEffect(() => {
    if (!map) return;

    // Esperar a que el mapa esté completamente cargado
    const addModel = () => {
      // Coordenadas de Sevilla
      const coordinates = [-5.9845, 37.3891];
      
      // Crear un marcador HTML simple primero para verificar que funciona
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = '#ff0000';
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

      // Añadir marcador HTML
      new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .addTo(map);

      console.log('Marcador añadido en Sevilla:', coordinates);
    };

    if (map.isStyleLoaded()) {
      addModel();
    } else {
      map.on('style.load', addModel);
    }

    // Cleanup
    return () => {
      // Limpiar marcadores si es necesario
    };
  }, [map]);

  return null;
};

export default Model3DLayer;