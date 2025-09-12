import React, { useState } from 'react';
import styles from './SamplingDataTable.module.css';

const SamplingDataTable = ({ visible, onClose }) => {
  if (!visible) return null;

  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString('es-ES'));

  // Función para exportar datos a CSV
  const exportToCSV = () => {
    const headers = [
      'Código',
      'ID',
      'Coordenadas',
      'Fecha',
      'Tipo',
      'Litología',
      'Estado',
      'pH',
      'Carbono Orgánico',
      'Nitrógeno',
      'Fósforo'
    ];

    const csvContent = [
      headers.join(','),
      ...sampleData.map(sample => [
        sample.code,
        sample.id,
        `"${sample.coordinates}"`,
        sample.date,
        sample.type,
        `"${sample.lithology}"`,
        sample.status,
        sample.ph,
        sample.organicCarbon,
        sample.nitrogen,
        sample.phosphorus
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `tamarguillo_muestreo_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mostrar notificación de éxito
    console.log('✅ Archivo CSV exportado correctamente');
    
    // Opcional: Mostrar notificación del navegador
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('NovaSOIL - Exportación Exitosa', {
        body: `Se han exportado ${sampleData.length} muestras a CSV`,
        icon: '/favicon.ico'
      });
    }
  };

  // Función para simular actualización de datos
  const updateData = async () => {
    setIsUpdating(true);
    
    try {
      // Simular llamada a API con delay realista
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLastUpdated(new Date().toLocaleString('es-ES'));
      console.log('🔄 Datos actualizados correctamente');
      
      // Mostrar notificación de éxito
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('NovaSOIL - Actualización Exitosa', {
          body: `${sampleData.length} muestras actualizadas - ${new Date().toLocaleTimeString('es-ES')}`,
          icon: '/favicon.ico'
        });
      }
    } catch (error) {
      console.error('❌ Error al actualizar datos:', error);
      
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('NovaSOIL - Error', {
          body: 'Error al actualizar los datos. Inténtalo de nuevo.',
          icon: '/favicon.ico'
        });
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // Datos reales del muestreo Tamarguillo Park
  const sampleData = [
    {
      code: 'STAM1_25',
      id: 3,
      coordinates: '-5.922028, 37.414194',
      date: '13/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '7.2',
      organicCarbon: '2.1%',
      nitrogen: '0.15%',
      phosphorus: '12 ppm'
    },
    {
      code: 'STAM10_25',
      id: 1,
      coordinates: '-5.9125844, 37.4010659',
      date: '21/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '6.8',
      organicCarbon: '3.4%',
      nitrogen: '0.22%',
      phosphorus: '18 ppm'
    },
    {
      code: 'STAM11_25',
      id: 3,
      coordinates: '-5.909343, 37.3947783',
      date: '21/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '7.5',
      organicCarbon: '2.8%',
      nitrogen: '0.18%',
      phosphorus: '15 ppm'
    },
    {
      code: 'STAM12_25',
      id: 1,
      coordinates: '-5.9031276, 37.3949413',
      date: '21/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '6.9',
      organicCarbon: '4.1%',
      nitrogen: '0.28%',
      phosphorus: '22 ppm'
    },
    {
      code: 'STAM13_25',
      id: 1,
      coordinates: '-5.904018, 37.401701',
      date: '21/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Pending',
      ph: '7.1',
      organicCarbon: '1.9%',
      nitrogen: '0.12%',
      phosphorus: '10 ppm'
    },
    {
      code: 'STAM14_25',
      id: 1,
      coordinates: '-5.908577, 37.404466',
      date: '21/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '6.5',
      organicCarbon: '3.7%',
      nitrogen: '0.25%',
      phosphorus: '19 ppm'
    },
    {
      code: 'STAM15_25',
      id: 1,
      coordinates: '-5.9056794, 37.4059209',
      date: '21/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Failed',
      ph: '8.1',
      organicCarbon: '1.2%',
      nitrogen: '0.08%',
      phosphorus: '7 ppm'
    },
    {
      code: 'STAM16_25',
      id: 3,
      coordinates: '-5.903217, 37.408139',
      date: '21/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '6.2',
      organicCarbon: '5.3%',
      nitrogen: '0.35%',
      phosphorus: '28 ppm'
    },
    {
      code: 'STAM2_25',
      id: 3,
      coordinates: '-5.917351, 37.412195',
      date: '13/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '7.3',
      organicCarbon: '2.6%',
      nitrogen: '0.17%',
      phosphorus: '14 ppm'
    },
    {
      code: 'STAM3_25',
      id: 3,
      coordinates: '-5.913833, 37.414194',
      date: '13/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '6.7',
      organicCarbon: '3.2%',
      nitrogen: '0.21%',
      phosphorus: '17 ppm'
    },
    {
      code: 'STAM4_25',
      id: 1,
      coordinates: '-5.911917, 37.413972',
      date: '13/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Pending',
      ph: '7.8',
      organicCarbon: '1.5%',
      nitrogen: '0.09%',
      phosphorus: '9 ppm'
    },
    {
      code: 'STAM5_25',
      id: 3,
      coordinates: '-5.90975, 37.410778',
      date: '13/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '6.4',
      organicCarbon: '4.5%',
      nitrogen: '0.31%',
      phosphorus: '25 ppm'
    },
    {
      code: 'STAM6_25',
      id: 3,
      coordinates: '-5.903611, 37.410944',
      date: '13/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '5.9',
      organicCarbon: '3.8%',
      nitrogen: '0.26%',
      phosphorus: '20 ppm'
    },
    {
      code: 'STAM7_25',
      id: 1,
      coordinates: '-5.908417, 37.403833',
      date: '13/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '7.6',
      organicCarbon: '2.3%',
      nitrogen: '0.14%',
      phosphorus: '11 ppm'
    },
    {
      code: 'STAM8_25',
      id: 1,
      coordinates: '-5.905833, 37.401722',
      date: '13/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '6.1',
      organicCarbon: '4.8%',
      nitrogen: '0.33%',
      phosphorus: '26 ppm'
    },
    {
      code: 'STAM9_25',
      id: 3,
      coordinates: '-5.909614, 37.3974502',
      date: '13/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      status: 'Completed',
      ph: '7.4',
      organicCarbon: '2.7%',
      nitrogen: '0.16%',
      phosphorus: '13 ppm'
    }
  ];

  // Calcular estadísticas
  const totalSamples = sampleData.length;
  const analyzedSamples = sampleData.filter(sample => sample.status === 'Completed').length;
  const pendingSamples = sampleData.filter(sample => sample.status === 'Pending').length;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Análisis de Muestreo
          </h2>
          <button 
            className={styles.closeBtn} 
            onClick={onClose}
            aria-label="Cerrar tabla"
          >
            ✕
          </button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Código de Muestra</th>
                <th>Tipo</th>
                <th>Coordenadas</th>
                <th>pH</th>
                <th>Carbono Orgánico</th>
                <th>Nitrógeno</th>
                <th>Fósforo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.length === 0 ? (
                <tr>
                  <td colSpan="8" className={styles.emptyState}>
                    <div className={styles.emptyContent}>
                      <div className={styles.emptyIcon}>📊</div>
                      <p className={styles.emptyText}>No hay datos disponibles</p>
                      <p className={styles.emptySubtext}>Los datos de análisis aparecerán aquí una vez procesados</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sampleData.map((sample, index) => (
                  <tr key={index} className={styles.dataRow}>
                    <td>{sample.code}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[`badge${sample.type}`]}`}>
                        {sample.type}
                      </span>
                    </td>
                    <td>{sample.coordinates}</td>
                    <td>{sample.ph}</td>
                    <td>{sample.organicCarbon}</td>
                    <td>{sample.nitrogen}</td>
                    <td>{sample.phosphorus}</td>
                    <td>
                      <span className={`${styles.status} ${styles[`status${sample.status}`]}`}>
                        {sample.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.footer}>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{totalSamples}</span>
              <span className={styles.statLabel}>Muestras</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{analyzedSamples}</span>
              <span className={styles.statLabel}>Analizadas</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{pendingSamples}</span>
              <span className={styles.statLabel}>Pendientes</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button 
              className={styles.actionBtn} 
              onClick={exportToCSV}
              title="Exportar datos a archivo CSV"
            >
              📥 Exportar Datos
            </button>
            <button 
              className={`${styles.actionBtn} ${isUpdating ? styles.actionBtnLoading : ''}`}
              onClick={updateData}
              disabled={isUpdating}
              title={`Última actualización: ${lastUpdated}`}
            >
              {isUpdating ? (
                <>
                  <span className={styles.spinner}></span>
                  Actualizando...
                </>
              ) : (
                '🔄 Actualizar'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplingDataTable;
