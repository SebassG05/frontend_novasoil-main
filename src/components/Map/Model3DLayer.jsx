import { useEffect, useRef, useState } from 'react';
import InfoModal from './InfoModal/InfoModal';
import InfoModalYellow from './InfoModal/InfoModalYellow/InfoModalYellow';
import Legend from './Legend/Legend';
import ImageCarousel from './InfoModal/ImageCarousel';
import SamplingDataTable from '../SamplingDataTable/SamplingDataTable';
import styles from './InfoModal/InfoModal.module.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mapboxgl from 'mapbox-gl';
import { useMapStore } from '../../store/mapStore';

const Model3DLayer = () => {
  const { map, setSelectedAreaName } = useMapStore();
  const markersRef = useRef({
    htmlMarker: null,
    model3D: null,
    currentZoom: 0
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalYellowVisible, setModalYellowVisible] = useState(false);
  const [legendVisible, setLegendVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isClosing, setIsClosing] = useState(false);

  // Función para cerrar ambos: modal y leyenda con animación, luego mostrar tabla
  // Datos de Sevilla (ya definidos en SamplingDataTable.jsx)
  const sevillaData = undefined; // Si quieres, puedes importarlos o dejarlos como undefined para usar los internos

  // Datos de Alemania (primeros 10 registros del CSV)
  const germanyData = [
    { code: 'CO2-land_data 1', coordinates: "48° 17' 59.40'' N;  9° 4' 55.37'' O", date: '7/5/2022', nitrogen: '0,42', phosphorus: '2,62', potassium: '27,39', magnesium: '7,1', ph: '7,6' },
    { code: 'CO2-land_data 2', coordinates: "48° 18' 19.97'' N;  9° 4' 26.54'' O", date: '7/5/2022', nitrogen: '0,38', phosphorus: '0,87', potassium: '18,26', magnesium: '7,4', ph: '7,5' },
    { code: 'CO2-land_data 3', coordinates: "48° 18' 18.90'' N;  9° 4' 22.97'' O", date: '7/5/2022', nitrogen: '0,38', phosphorus: '0,87', potassium: '17,43', magnesium: '7', ph: '7,5' },
    { code: 'CO2-land_data 4', coordinates: "48° 18' 27.99'' N;  9° 5' 26.58'' O", date: '7/5/2022', nitrogen: '0,51', phosphorus: '1,75', potassium: '18,26', magnesium: '7,9', ph: '7,5' },
    { code: 'CO2-land_data 5', coordinates: "48° 17' 18.85'' N;  9° 4' 25.07'' O", date: '7/5/2022', nitrogen: '0,45', phosphorus: '0,87', potassium: '12,45', magnesium: '6,5', ph: '7,5' },
    { code: 'CO2-land_data 6', coordinates: "48° 16' 43.92'' N;  9° 4' 2.203'' O", date: '7/5/2022', nitrogen: '0,47', phosphorus: '<0,44', potassium: '9,96', magnesium: '7,9', ph: '7,2' },
    { code: 'CO2-land_data 7', coordinates: "48° 16' 41.01'' N;  9° 4' 3.632'' O", date: '7/5/2022', nitrogen: '0,41', phosphorus: '0,44', potassium: '9,13', magnesium: '6,9', ph: '7,2' },
    { code: 'CO2-land_data 8', coordinates: "48° 16' 56.66'' N;  9° 3' 0.831'' O", date: '7/5/2022', nitrogen: '0,44', phosphorus: '0,87', potassium: '9,96', magnesium: '8', ph: '7,2' },
    { code: 'CO2-land_data 9', coordinates: "48° 16' 52.05'' N;  9° 3' 20.69'' O", date: '7/5/2022', nitrogen: '0,52', phosphorus: '0,44', potassium: '10,79', magnesium: '7,4', ph: '7,2' },
    { code: 'CO2-land_data 10', coordinates: "48° 16' 48.14'' N;  9° 3' 27.26'' O", date: '7/5/2022', nitrogen: '0,44', phosphorus: '0,87', potassium: '18,26', magnesium: '8,7', ph: '7,1' }
  ];

  const closeModalAndLegend = (showGermanyTable = false) => {
    setIsClosing(true);
    setTimeout(() => {
      setModalVisible(false);
      setModalYellowVisible(false);
      setLegendVisible(false);
      setIsClosing(false);
      setTimeout(() => {
        if (showGermanyTable) {
          setTableData(germanyData);
        } else {
          setTableData(sevillaData);
        }
        setTableVisible(true);
      }, 200);
    }, 300);
  };

  useEffect(() => {
    if (!map) return;

  // Coordenadas del centro del Parque Tamarguillo (calculadas a partir de las muestras)
  const coordinates = [-5.911, 37.406];
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
        // Cambiar cursor a pointer (manita) cuando se pasa por encima del círculo rojo
        map.on('mouseenter', 'marker-circle', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'marker-circle', () => {
          map.getCanvas().style.cursor = '';
        });
        // Añadir evento de clic al círculo rojo
        map.on('click', 'marker-circle', () => {
          setModalVisible(true);
          setLegendVisible(true);
          setSelectedAreaName('Límites del parque Tamarguillo');
        });
      }

      console.log('Círculo rojo creado correctamente');
      return true; // Retornamos true para indicar que se creó correctamente
    };

  // Crear marcador como capa de Mapbox (círculo amarillo en otra coordenada)
  const createYellowMarker = () => {
    const yellowCoordinates = [9.060, 48.281];
    if (!map || !map.isStyleLoaded()) {
      console.log('Mapa no está listo, reintentando...');
      setTimeout(() => createYellowMarker(), 50);
      return false;
    }
    // Añadir fuente de datos para el círculo amarillo
    if (!map.getSource('yellow-marker-source')) {
      map.addSource('yellow-marker-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: yellowCoordinates
          }
        }
      });
    }
    // Añadir capa de círculo amarillo
    if (!map.getLayer('yellow-marker-circle')) {
      map.addLayer({
        id: 'yellow-marker-circle',
        type: 'circle',
        source: 'yellow-marker-source',
        paint: {
          'circle-radius': 7,
          'circle-color': '#FFD600',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 1
        }
      });
      // Cambiar cursor a pointer cuando se pasa por encima del círculo amarillo
      map.on('mouseenter', 'yellow-marker-circle', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'yellow-marker-circle', () => {
        map.getCanvas().style.cursor = '';
      });
      // Añadir evento de clic al círculo amarillo
      map.on('click', 'yellow-marker-circle', () => {
  setModalYellowVisible(true);
  setLegendVisible(true);
  setSelectedAreaName('Área de estudio Alemania');
      });
    }
    console.log('Círculo amarillo creado correctamente');
    return true;
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
            // Detectar clic específicamente en el modelo 3D (desactivado para evitar conflictos)
            // const canvas = map.getCanvasContainer().querySelector('canvas');
            // if (canvas) {
            //   canvas.addEventListener('click', (e) => {
            //     // Solo mostrar si el modelo está visible (zoom alto)
            //     if (map.getZoom() >= ZOOM_THRESHOLD) {
            //       setModalVisible(true);
            //     }
            //   });
            // }
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
        // Zoom alto: mostrar modelo 3D, ocultar círculos
        if (markersRef.current.htmlMarker) {
          // Remover capa de círculo rojo
          if (map.getLayer('marker-circle')) {
            map.removeLayer('marker-circle');
          }
          if (map.getSource('marker-source')) {
            map.removeSource('marker-source');
          }
          markersRef.current.htmlMarker = null;
        }
        // Remover círculo amarillo si existe
        if (map.getLayer('yellow-marker-circle')) {
          map.removeLayer('yellow-marker-circle');
        }
        if (map.getSource('yellow-marker-source')) {
          map.removeSource('yellow-marker-source');
        }
        if (!markersRef.current.model3D) {
          markersRef.current.model3D = create3DModel();
          map.addLayer(markersRef.current.model3D);
        }
      } else {
        // Zoom bajo: mostrar círculos, ocultar modelo 3D
        if (markersRef.current.model3D) {
          if (map.getLayer('3d-model-layer')) {
            map.removeLayer('3d-model-layer');
          }
          markersRef.current.model3D = null;
        }
        if (!markersRef.current.htmlMarker) {
          markersRef.current.htmlMarker = createHtmlMarker();
        }
        // Crear círculo amarillo
        createYellowMarker();
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

        console.log('Sistema de marcadores dinámico iniciado en Parque Tamarguillo:', coordinates);
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
        // Remover capa de círculo rojo
        if (map.getLayer('marker-circle')) {
          map.removeLayer('marker-circle');
        }
        if (map.getSource('marker-source')) {
          map.removeSource('marker-source');
        }
      }
      // Remover círculo amarillo
      if (map.getLayer('yellow-marker-circle')) {
        map.removeLayer('yellow-marker-circle');
      }
      if (map.getSource('yellow-marker-source')) {
        map.removeSource('yellow-marker-source');
      }
      if (markersRef.current.model3D && map.getLayer('3d-model-layer')) {
        map.removeLayer('3d-model-layer');
      }
      map.off('zoom', handleZoomChange);
      map.off('zoomend', handleZoomChange);
    };
  }, [map]);

  return (
    <>
      <InfoModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        isClosing={isClosing}
      >
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>CO2-Land Initiative in Seville</h1>
          <h2 className={styles.modalSubtitle}>(Parque Tamarguillo)</h2>
        </div>
        <ImageCarousel onCloseAll={closeModalAndLegend} />
      </InfoModal>
      <InfoModalYellow
        visible={modalYellowVisible}
        onClose={() => setModalYellowVisible(false)}
        isClosing={isClosing}
        onCloseAll={() => closeModalAndLegend(true)}
      />
      
      <Legend 
        isOpen={legendVisible} 
        onClose={() => setLegendVisible(false)}
        isClosing={isClosing}
      />
      
      <SamplingDataTable 
        visible={tableVisible}
        onClose={() => setTableVisible(false)}
        data={tableData}
      />
      {/* Tabla Alemania, solo visible tras cerrar modal amarillo */}
      {/* <SamplingDataTableGermany 
        visible={tableGermanyVisible}
        onClose={() => setTableGermanyVisible(false)}
      /> */}
    </>
  );
};

export default Model3DLayer;