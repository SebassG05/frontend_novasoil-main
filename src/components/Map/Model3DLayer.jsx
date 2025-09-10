import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mapboxgl from 'mapbox-gl';
import { useMapStore } from '../../store/mapStore';

const Model3DLayer = () => {
  const { map } = useMapStore();
  const modelLayerId = 'custom-3d-model';
  const modelRef = useRef(null);

  // Coordenadas de Sevilla
  const sevillaCoordinates = [-5.9845, 37.3891]; 

  useEffect(() => {
    if (!map || map.getLayer(modelLayerId)) return;
    
    // Verificar que el mapa está cargado y con estilo
    if (!map.isStyleLoaded()) {
      map.once('style.load', () => addModelLayer());
    } else {
      addModelLayer();
    }

    function addModelLayer() {
      // Crear una capa personalizada para el modelo 3D
      const modelLayer = {
        id: modelLayerId,
        type: 'custom',
        renderingMode: '3d',
        onAdd: function(map, gl) {
          // Configurar Three.js
          const camera = new THREE.Camera();
          const scene = new THREE.Scene();
          
          // Añadir luces
          const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
          directionalLight.position.set(0, -70, 100).normalize();
          scene.add(directionalLight);
          
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
          scene.add(ambientLight);
          
          // Cargar el modelo 3D
          const loader = new GLTFLoader();
          loader.load('/round_3d_location.glb', (gltf) => {
            modelRef.current = gltf.scene;
            
            // Escalar y rotar el modelo según necesites
            modelRef.current.scale.set(20, 20, 20); // Ajustar según el tamaño deseado
            
            scene.add(modelRef.current);
          });
          
          this.map = map;
          this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
          });
          
          this.renderer.autoClear = false;
          this.camera = camera;
          this.scene = scene;

        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Rojo brillante
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);
        },
        
        render: function(gl, matrix) {
          if (!modelRef.current) return;
          
          const modelTransform = mapboxgl.MercatorCoordinate.fromLngLat(
            sevillaCoordinates,
            0 // elevación
          );
          
          // Transformación del modelo para adaptarlo a las coordenadas de Mapbox
          const modelAltitude = 0;
          const modelRotate = [Math.PI / 2, 0, 0];
          
          const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
            sevillaCoordinates,
            modelAltitude
          );
          
          // Escala del modelo según el nivel de zoom
          const modelScale = modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 10000;
          
          const rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            modelRotate[0]
          );
          const rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelRotate[1]
          );
          const rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelRotate[2]
          );
          
          const m = new THREE.Matrix4().fromArray(matrix);
          const l = new THREE.Matrix4()
            .makeTranslation(
              modelTransform.x,
              modelTransform.y,
              modelTransform.z
            )
            .scale(
              new THREE.Vector3(modelScale, -modelScale, modelScale)
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);
          
          this.camera.projectionMatrix = m.multiply(l);
          this.renderer.resetState();
          this.renderer.render(this.scene, this.camera);
        }
      };
      
      map.addLayer(modelLayer);
    }
    
    return () => {
      if (map && map.getLayer(modelLayerId)) {
        map.removeLayer(modelLayerId);
      }
    };
  }, [map]);
  
  return null; // Este componente no renderiza nada visible directamente
};

export default Model3DLayer;