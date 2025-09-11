import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mapboxgl from 'mapbox-gl';
import { useMapStore } from '../../store/mapStore';

const Model3DLayer = () => {
  const { map } = useMapStore();
  const markersRef = useRef({
    htmlMarker: null,
    model3D: null,
    currentZoom: 0
  });

  useEffect(() => {
    if (!map) return;

  // Coordenadas del Tamarguillo
  const coordinates = [-5.9305, 37.4142];
    const ZOOM_THRESHOLD = 6; // Zoom donde cambia del círculo al modelo 3D (menor = aparece antes)

    // Crear marcador como capa de Mapbox (círculo rojo fijo)
    const createHtmlMarker = () => {
      // Asegurar que el mapa esté listo
      if (!map || !map.isStyleLoaded()) {
        console.log('Mapa no está listo, reintentando...');
        setTimeout(() => createHtmlMarker(), 50);
        return false;
      }

      // Añadir fuente de datos para el círculo
      if (!map.getSource('marker-source')) {
        map.addSource('marker-source', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coordinates
            }
          }
        });
      }

      // Añadir capa de círculo
      if (!map.getLayer('marker-circle')) {
        map.addLayer({
          id: 'marker-circle',
          type: 'circle',
          source: 'marker-source',
          paint: {
            'circle-radius': 7,
            'circle-color': '#ff0000',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 1
          }
        });
      }

      console.log('Círculo rojo creado correctamente');
      return true; // Retornamos true para indicar que se creó correctamente
    };

    // Crear modelo 3D
    const create3DModel = () => {
      const modelAltitude = 0;
      const modelRotate = [Math.PI / 2, 0, 0];

      const modelTransform = {
        translateX: mapboxgl.MercatorCoordinate.fromLngLat(coordinates, modelAltitude).x,
        translateY: mapboxgl.MercatorCoordinate.fromLngLat(coordinates, modelAltitude).y,
        translateZ: mapboxgl.MercatorCoordinate.fromLngLat(coordinates, modelAltitude).z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        scale: 0.0005 // Reducido para hacer el modelo más pequeño (era 0.00001)
      };

      return {
        id: '3d-model-layer',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, gl) {
          this.camera = new THREE.Camera();
          this.scene = new THREE.Scene();

          // Iluminación
          const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
          directionalLight.position.set(0, -70, 100).normalize();
          this.scene.add(directionalLight);

          const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
          this.scene.add(ambientLight);

          // Cargar modelo 3D
          const loader = new GLTFLoader();
          loader.load('/round_3d_location.glb', (gltf) => {
            this.scene.add(gltf.scene);
            map.triggerRepaint();
          }, undefined, (error) => {
            console.error('Error cargando modelo 3D:', error);
          });

          this.map = map;
          this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvasContainer().querySelector('canvas'),
            context: gl,
            antialias: true
          });

          this.renderer.autoClear = false;
        },
        render: function (gl, matrix) {
          const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
          const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
          const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);

          const m = new THREE.Matrix4().fromArray(matrix);
          const l = new THREE.Matrix4()
            .makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
            .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

          this.camera.projectionMatrix = m.multiply(l);
          this.renderer.resetState();
          this.renderer.render(this.scene, this.camera);
          this.map.triggerRepaint();
        }
      };
    };

    // Función para manejar el cambio de zoom
    const handleZoomChange = () => {
      const currentZoom = map.getZoom();
      
      if (currentZoom >= ZOOM_THRESHOLD) {
        // Zoom alto: mostrar modelo 3D, ocultar círculo
        if (markersRef.current.htmlMarker) {
          // Remover capa de círculo
          if (map.getLayer('marker-circle')) {
            map.removeLayer('marker-circle');
          }
          if (map.getSource('marker-source')) {
            map.removeSource('marker-source');
          }
          markersRef.current.htmlMarker = null;
        }
        if (!markersRef.current.model3D) {
          markersRef.current.model3D = create3DModel();
          map.addLayer(markersRef.current.model3D);
        }
      } else {
        // Zoom bajo: mostrar círculo, ocultar modelo 3D
        if (markersRef.current.model3D) {
          if (map.getLayer('3d-model-layer')) {
            map.removeLayer('3d-model-layer');
          }
          markersRef.current.model3D = null;
        }
        if (!markersRef.current.htmlMarker) {
          markersRef.current.htmlMarker = createHtmlMarker();
        }
      }
      
      markersRef.current.currentZoom = currentZoom;
    };

    // Esperar a que el mapa esté completamente cargado
    const addModel = () => {
      // Pequeño delay para asegurar que el mapa esté completamente listo
      setTimeout(() => {
        // Inicializar con el marcador apropiado según el zoom actual
        handleZoomChange();
        
        // Escuchar cambios de zoom
        map.on('zoom', handleZoomChange);
        map.on('zoomend', handleZoomChange);

        console.log('Sistema de marcadores dinámico iniciado en Sevilla:', coordinates);
      }, 100);
    };

    if (map.isStyleLoaded()) {
      addModel();
    } else {
      map.on('style.load', addModel);
    }

    // Cleanup
    return () => {
      if (markersRef.current.htmlMarker) {
        // Remover capa de círculo
        if (map.getLayer('marker-circle')) {
          map.removeLayer('marker-circle');
        }
        if (map.getSource('marker-source')) {
          map.removeSource('marker-source');
        }
      }
      if (markersRef.current.model3D && map.getLayer('3d-model-layer')) {
        map.removeLayer('3d-model-layer');
      }
      map.off('zoom', handleZoomChange);
      map.off('zoomend', handleZoomChange);
    };
  }, [map]);

  return null;
};

export default Model3DLayer;