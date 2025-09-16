import { useEffect, useRef, useState } from 'react';
import InfoModal from './InfoModal/InfoModal';
import InfoModalYellow from './InfoModal/InfoModalYellow/InfoModalYellow';
import InfoModalYellowBulgaria from './InfoModal/InfoModalBulgaria/InfoModalYellowBulgaria';
import InfoModalEstonia from './InfoModal/InfoModalEstonia/InfoModalEstonia';
import Legend from './Legend/Legend';
import ImageCarousel from './InfoModal/ImageCarousel';
import SamplingDataTable from '../SamplingDataTable/SamplingDataTable';
import styles from './InfoModal/InfoModal.module.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mapboxgl from 'mapbox-gl';
import { useMapStore } from '../../store/mapStore';
import { useGeoData } from '../../hooks/useGeoData';

const Model3DLayer = () => {
  const { map, setSelectedAreaName, samplingData, samplingDataGermany, samplingDataBulgaria } = useMapStore();
  const { loadGermanyData, loadBulgariaData } = useGeoData();
  const markersRef = useRef({
    htmlMarker: null,
    model3D: null,
    currentZoom: 0
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalYellowVisible, setModalYellowVisible] = useState(false);
  const [legendVisible, setLegendVisible] = useState(false);
  const [modalBulgariaVisible, setModalBulgariaVisible] = useState(false);
  const [modalEstoniaVisible, setModalEstoniaVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isClosing, setIsClosing] = useState(false);

  // Función para cerrar ambos: modal y leyenda con animación, luego mostrar tabla
  // Eliminar datos hardcodeados y usar los datos reales del store

  const closeModalAndLegend = (showTable = false) => {
    setIsClosing(true);
    setTimeout(async () => {
      setModalVisible(false);
      setModalYellowVisible(false);
      setLegendVisible(false);
      setModalBulgariaVisible(false);
      setIsClosing(false);
      setTimeout(async () => {
        if (showTable === true) {
          // Alemania
          let germanyData = samplingDataGermany;
          if (!germanyData || germanyData.length === 0) {
            await loadGermanyData();
            await new Promise(resolve => setTimeout(resolve, 200));
            germanyData = useMapStore.getState().samplingDataGermany;
          }
          setTableData(Array.isArray(germanyData) ? germanyData : []);
        } else if (showTable === 'bulgaria') {
          // Bulgaria
          let bulgariaData = samplingDataBulgaria;
          if (!bulgariaData || bulgariaData.length === 0) {
            await loadBulgariaData();
            await new Promise(resolve => setTimeout(resolve, 200));
            bulgariaData = useMapStore.getState().samplingDataBulgaria;
          }
          setTableData(Array.isArray(bulgariaData) ? bulgariaData : []);
        } else if (showTable === 'estonia') {
          // Estonia
          let estoniaData = samplingDataEstonia;
          if (!estoniaData || estoniaData.length === 0) {
            await loadEstoniaData();
            await new Promise(resolve => setTimeout(resolve, 200));
            estoniaData = useMapStore.getState().samplingDataEstonia;
          }
          setTableData(Array.isArray(estoniaData) ? estoniaData : []);
        } else {
          setTableData(Array.isArray(samplingData?.features) ? samplingData.features.map(f => ({ ...f.properties, coordinates: `${f.geometry.coordinates[0]};${f.geometry.coordinates[1]}` })) : []);
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
          useMapStore.getState().setHoveredSample(null);
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
        useMapStore.getState().setHoveredSample(null);
      });
    }
    console.log('Círculo amarillo creado correctamente');
    return true;
  };

  const createEstoniaMarker = () => {
    const estoniaCoordinates = [26.30788, 58.71545];
    if (!map || !map.isStyleLoaded()) {
      console.log('Mapa no está listo, reintentando...');
      setTimeout(() => createEstoniaMarker(), 50);
      return false;
    }
    // Añadir fuente de datos para el círculo verde
    if (!map.getSource('estonia-marker-source')) {
      map.addSource('estonia-marker-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: estoniaCoordinates
          }
        }
      });
    }
    // Añadir capa de círculo verde
    if (!map.getLayer('estonia-marker-circle')) {
      map.addLayer({
        id: 'estonia-marker-circle',
        type: 'circle',
        source: 'estonia-marker-source',
        paint: {
          'circle-radius': 7,
          'circle-color': '#0072CE',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 1
        }
      });
      // Cambiar cursor a pointer cuando se pasa por encima del círculo verde
      map.on('mouseenter', 'estonia-marker-circle', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'estonia-marker-circle', () => {
        map.getCanvas().style.cursor = '';
      });
      // Añadir evento de clic al círculo verde
      map.on('click', 'estonia-marker-circle', (e) => {
        setLegendVisible(true);
        setModalEstoniaVisible && setModalEstoniaVisible(true);
        setSelectedAreaName('Caso de estudio Estonia');
        useMapStore.getState().setHoveredSample(null);
      });
    }
    console.log('Círculo verde Estonia creado correctamente');
    return true;
  };

  // Crear marcador como capa de Mapbox (círculo verde bandera Bulgaria)
  const createBulgariaMarker = () => {
    const bulgariaCoordinates = [24.675, 42.231];
    if (!map || !map.isStyleLoaded()) {
      console.log('Mapa no está listo, reintentando...');
      setTimeout(() => createBulgariaMarker(), 50);
      return false;
    }
    // Añadir fuente de datos para el círculo verde
    if (!map.getSource('bulgaria-marker-source')) {
      map.addSource('bulgaria-marker-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: bulgariaCoordinates
          }
        }
      });
    }
    // Añadir capa de círculo verde
    if (!map.getLayer('bulgaria-marker-circle')) {
      map.addLayer({
        id: 'bulgaria-marker-circle',
        type: 'circle',
        source: 'bulgaria-marker-source',
        paint: {
          'circle-radius': 7,
          'circle-color': '#43a047',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 1
        }
      });
      // Cambiar cursor a pointer cuando se pasa por encima del círculo verde
      map.on('mouseenter', 'bulgaria-marker-circle', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'bulgaria-marker-circle', () => {
        map.getCanvas().style.cursor = '';
      });
      // Añadir evento de clic al círculo verde
      map.on('click', 'bulgaria-marker-circle', (e) => {
        setLegendVisible(true);
        setModalBulgariaVisible(true);
        setSelectedAreaName('Caso de muestreo Bulgaria');
        useMapStore.getState().setHoveredSample(null);
      });
    }
    console.log('Círculo verde Bulgaria creado correctamente');
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
        // Zoom alto: mostrar modelo 3D, ocultar solo los marcadores custom, NO los puntos de muestreo
        if (markersRef.current.htmlMarker) {
          if (map.getLayer('marker-circle')) {
            map.removeLayer('marker-circle');
          }
          if (map.getSource('marker-source')) {
            map.removeSource('marker-source');
          }
          markersRef.current.htmlMarker = null;
        }
        if (map.getLayer('yellow-marker-circle')) {
          map.removeLayer('yellow-marker-circle');
        }
        if (map.getSource('yellow-marker-source')) {
          map.removeSource('yellow-marker-source');
        }
        // NO remover capas de puntos de muestreo (sampling-points-layer, germany-sampling-points-layer)
        if (!markersRef.current.model3D) {
          markersRef.current.model3D = create3DModel();
          map.addLayer(markersRef.current.model3D);
        }
      } else {
        // Zoom bajo: mostrar círculos custom, ocultar modelo 3D
        if (markersRef.current.model3D) {
          if (map.getLayer('3d-model-layer')) {
            map.removeLayer('3d-model-layer');
          }
          markersRef.current.model3D = null;
        }
        if (!markersRef.current.htmlMarker) {
          markersRef.current.htmlMarker = createHtmlMarker();
        }
        createYellowMarker();
        createBulgariaMarker();
        createEstoniaMarker();
        // NO añadir ni remover sampling points layers aquí
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
      <InfoModalEstonia
        visible={modalEstoniaVisible}
        onClose={() => setModalEstoniaVisible(false)}
        isClosing={isClosing}
        onCloseAll={() => {
          setModalEstoniaVisible(false);
          closeModalAndLegend('estonia');
        }}
      />
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
      <InfoModalYellowBulgaria
        visible={modalBulgariaVisible}
        onClose={() => setModalBulgariaVisible(false)}
        isClosing={isClosing}
        onCloseAll={() => closeModalAndLegend('bulgaria')}
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