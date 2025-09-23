import { useEffect, useRef, useState } from 'react';
import InfoModal from './InfoModal/InfoModal';
import InfoModalYellow from './InfoModal/InfoModalYellow/InfoModalYellow';
import InfoModalYellowBulgaria from './InfoModal/InfoModalBulgaria/InfoModalYellowBulgaria';
import InfoModalEstonia from './InfoModal/InfoModalEstonia/InfoModalEstonia';
import InfoModalLetonia from './InfoModal/InfoModalLetonia/InfoModalLetonia';
import InfoModalMadrid from './InfoModal/InfoModalMadrid/InfoModalMadrid';
import Legend from './Legend/Legend';
import ImageCarousel from './InfoModal/ImageCarousel';
import SamplingDataTable from '../SamplingDataTable/SamplingDataTable';
import styles from './InfoModal/InfoModal.module.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import mapboxgl from 'mapbox-gl';
import { useMapStore } from '../../store/mapStore';
import { useGeoData } from '../../hooks/useGeoData';
import { create } from 'zustand';

const Model3DLayer = () => {
  const { map, setSelectedAreaName, samplingData, samplingDataGermany, samplingDataBulgaria, samplingDataEstonia, samplingDataLetonia } = useMapStore();
  const { loadGermanyData, loadBulgariaData, loadEstoniaData, loadLetoniaData } = useGeoData();
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
  const [modalLetoniaVisible, setModalLetoniaVisible] = useState(false);
  const [modalMadridVisible, setModalMadridVisible] = useState(false);
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
        } else if (showTable === 'letonia') {
          // Letonia
          let letoniaData = samplingDataLetonia;
          if (!letoniaData || letoniaData.length === 0) {
            await loadLetoniaData();
            await new Promise(resolve => setTimeout(resolve, 200));
            letoniaData = useMapStore.getState().samplingDataLetonia;
          }
          setTableData(Array.isArray(letoniaData) ? letoniaData : []);
        } else {
          setTableData(Array.isArray(samplingData?.features) ? samplingData.features.map(f => ({ ...f.properties, coordinates: `${f.geometry.coordinates[0]};${f.geometry.coordinates[1]}` })) : []);
        }
        setTableVisible(true);
      }, 200);
    }, 300);
  };


  // useRef solo en el cuerpo principal (¡fuera de useEffect!)
  const pulseTimers = useRef({});

  useEffect(() => {
    if (!map) return;

    // Cargar automáticamente los puntos de muestreo de Letonia y Estonia al iniciar el mapa
    loadLetoniaData();
    loadEstoniaData();

    // Coordenadas del centro del Parque Tamarguillo (calculadas a partir de las muestras)
    const coordinates = [-5.911, 37.406];
    const ZOOM_THRESHOLD = 6; // Zoom donde cambia del círculo al modelo 3D (menor = aparece antes)

    // Recibe pulseTimers como argumento para evitar hooks en funciones auxiliares
    const createPulseLayer = (id, color, coordinates, timersRef) => {
    // Capa base (círculo principal)
    if (!map.getSource(`${id}-source`)) {
      // Inicializar con propiedades pulse-radius y pulse-opacity para evitar null
      map.addSource(`${id}-source`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates
          },
          properties: {
            'pulse-radius': 18, // más grande
            'pulse-opacity': 0.85 // más visible
          }
        }
      });
    }
    if (!map.getLayer(`${id}-circle`)) {
      map.addLayer({
        id: `${id}-circle`,
        type: 'circle',
        source: `${id}-source`,
        paint: {
          'circle-radius': 9,
          'circle-color': color,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff',
          'circle-opacity': 1,
          'circle-blur': 0.1
        }
      });
      // Interacción
      map.on('mouseenter', `${id}-circle`, () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', `${id}-circle`, () => { map.getCanvas().style.cursor = ''; });
    }
    // Capa pulse (animada)
    if (!map.getLayer(`${id}-pulse`)) {
      map.addLayer({
        id: `${id}-pulse`,
        type: 'circle',
        source: `${id}-source`,
        paint: {
          'circle-radius': ["get", "pulse-radius"],
          'circle-color': color,
          'circle-opacity': ["get", "pulse-opacity"],
          'circle-blur': 1.2 // más difuminado
        }
      }, `${id}-circle`); // debajo del círculo base
    }
    // Inicializar propiedades animadas
    let pulseRadius = 18;
    let pulseOpacity = 0.85;
    let growing = true;
    // Limpia timer anterior si existe
    if (timersRef.current[id]) clearInterval(timersRef.current[id]);
    // Animación
    timersRef.current[id] = setInterval(() => {
      if (growing) {
        pulseRadius += 1.2; // crece más rápido
        pulseOpacity -= 0.025; // baja opacidad más lento
        if (pulseRadius > 48) growing = false; // radio máximo más grande
      } else {
        pulseRadius = 18;
        pulseOpacity = 0.85;
        growing = true;
      }
      // Actualiza fuente con nuevas propiedades
      const source = map.getSource(`${id}-source`);
      if (source) {
        source.setData({
          type: 'Feature',
          geometry: { type: 'Point', coordinates },
          properties: { 'pulse-radius': pulseRadius, 'pulse-opacity': Math.max(0, pulseOpacity) }
        });
      }
    }, 55); // ciclo más lento
  };

  // Crear marcador como capa de Mapbox (círculo rojo con pulse)
  const createHtmlMarker = () => {
    if (!map || !map.isStyleLoaded()) {
      setTimeout(() => createHtmlMarker(), 50);
      return false;
    }
    createPulseLayer('marker', '#ff0000', coordinates, pulseTimers);
    // Evento click
    map.on('click', 'marker-circle', () => {
      setModalVisible(true);
      setLegendVisible(true);
      setSelectedAreaName('Limits of Tamarguillo Park');
      useMapStore.getState().setHoveredSample(null);
    });
    return true;
  };

  // Crear marcador amarillo con pulse
  const createYellowMarker = () => {
    const yellowCoordinates = [9.060, 48.281];
    if (!map || !map.isStyleLoaded()) {
      setTimeout(() => createYellowMarker(), 50);
      return false;
    }
    createPulseLayer('yellow-marker', '#FFD600', yellowCoordinates, pulseTimers);
    map.on('click', 'yellow-marker-circle', () => {
      setModalYellowVisible(true);
      setLegendVisible(true);
      setSelectedAreaName('Area study Germany');
      useMapStore.getState().setHoveredSample(null);
    });
    return true;
  };

  const createMadridMarker = () => {
    const madridCoordinates = [-4.938573, 41.422618];
    if (!map || !map.isStyleLoaded()) {
      setTimeout(() => createMadridMarker(), 50);
      return false;
    }
    createPulseLayer('madrid-marker', '#9E1B34', madridCoordinates, pulseTimers);
    map.on('click', 'madrid-marker-circle', (e) => {
      setLegendVisible(true);
      setModalMadridVisible && setModalMadridVisible(true);
      setSelectedAreaName('Case study Madrid');
      useMapStore.getState().setHoveredSample(null);
    });
    return true;
  };

  const createLetoniaMarker = () => {
    const letoniaCoordinates = [24.178259, 56.715607];
    if (!map || !map.isStyleLoaded()) {
      setTimeout(() => createLetoniaMarker(), 50);
      return false;
    }
    createPulseLayer('letonia-marker', '#9E1B34', letoniaCoordinates, pulseTimers);
    map.on('click', 'letonia-marker-circle', (e) => {
      setLegendVisible(true);
      setModalLetoniaVisible && setModalLetoniaVisible(true);
      setSelectedAreaName('Case study Letonia');
      useMapStore.getState().setHoveredSample(null);
    });
    return true;
  };

  // Crear marcador Estonia con pulse
  const createEstoniaMarker = () => {
    const estoniaCoordinates = [26.30788, 58.71545];
    if (!map || !map.isStyleLoaded()) {
      setTimeout(() => createEstoniaMarker(), 50);
      return false;
    }
    createPulseLayer('estonia-marker', '#0072CE', estoniaCoordinates, pulseTimers);
    map.on('click', 'estonia-marker-circle', (e) => {
      setLegendVisible(true);
      setModalEstoniaVisible && setModalEstoniaVisible(true);
      setSelectedAreaName('Case study Estonia');
      useMapStore.getState().setHoveredSample(null);
    });
    return true;
  };

  // Crear marcador Bulgaria con pulse
  const createBulgariaMarker = () => {
    const bulgariaCoordinates = [24.675, 42.231];
    if (!map || !map.isStyleLoaded()) {
      setTimeout(() => createBulgariaMarker(), 50);
      return false;
    }
    createPulseLayer('bulgaria-marker', '#43a047', bulgariaCoordinates, pulseTimers);
    map.on('click', 'bulgaria-marker-circle', (e) => {
      setLegendVisible(true);
      setModalBulgariaVisible(true);
      setSelectedAreaName('Case study Bulgaria');
      useMapStore.getState().setHoveredSample(null);
    });
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
          // Eliminar pulse y circle antes de la source
          ['marker-pulse', 'marker-circle'].forEach(layerId => {
            if (map.getLayer(layerId)) map.removeLayer(layerId);
          });
          if (map.getSource('marker-source')) {
            map.removeSource('marker-source');
          }
          markersRef.current.htmlMarker = null;
        }
        ['yellow-marker-pulse', 'yellow-marker-circle'].forEach(layerId => {
          if (map.getLayer(layerId)) map.removeLayer(layerId);
        });
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
        createLetoniaMarker();
        createMadridMarker();
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
      // Limpiar timers de pulse
      Object.values(pulseTimers.current).forEach(timer => clearInterval(timer));
      // Remover todas las capas y fuentes de pulse
      [
        'marker', 'yellow-marker', 'estonia-marker', 'bulgaria-marker'
      ].forEach(id => {
        // Eliminar primero las layers, luego la source
        if (map.getLayer(`${id}-pulse`)) map.removeLayer(`${id}-pulse`);
        if (map.getLayer(`${id}-circle`)) map.removeLayer(`${id}-circle`);
        if (map.getSource(`${id}-source`)) map.removeSource(`${id}-source`);
      });
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
      <InfoModalMadrid
        visible={modalMadridVisible}
        onClose={() => setModalMadridVisible(false)}
        isClosing={isClosing}
        onCloseAll={() => {
          setModalMadridVisible(false);
          closeModalAndLegend('madrid');
        }}
      />
      <InfoModalLetonia
        visible={modalLetoniaVisible}
        onClose={() => setModalLetoniaVisible(false)}
        isClosing={isClosing}
        onCloseAll={() => {
          setModalLetoniaVisible(false);
          closeModalAndLegend('letonia');
        }}
      />
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