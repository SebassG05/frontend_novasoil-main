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
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM10_25',
      id: 1,
      coordinates: '-5.9125844, 37.4010659',
      date: '21/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM11_25',
      id: 3,
      coordinates: '-5.909343, 37.3947783',
      date: '21/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM12_25',
      id: 1,
      coordinates: '-5.9031276, 37.3949413',
      date: '21/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM13_25',
      id: 1,
      coordinates: '-5.904018, 37.401701',
      date: '21/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM14_25',
      id: 1,
      coordinates: '-5.908577, 37.404466',
      date: '21/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM15_25',
      id: 1,
      coordinates: '-5.9056794, 37.4059209',
      date: '21/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM16_25',
      id: 3,
      coordinates: '-5.903217, 37.408139',
      date: '21/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM2_25',
      id: 3,
      coordinates: '-5.917351, 37.412195',
      date: '13/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM3_25',
      id: 3,
      coordinates: '-5.913833, 37.414194',
      date: '13/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM4_25',
      id: 1,
      coordinates: '-5.911917, 37.413972',
      date: '13/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM5_25',
      id: 3,
      coordinates: '-5.90975, 37.410778',
      date: '13/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM6_25',
      id: 3,
      coordinates: '-5.903611, 37.410944',
      date: '13/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM7_25',
      id: 1,
      coordinates: '-5.908417, 37.403833',
      date: '13/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM8_25',
      id: 1,
      coordinates: '-5.905833, 37.401722',
      date: '13/12/2023',
      type: 'CHEBIO',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    },
    {
      code: 'STAM9_25',
      id: 3,
      coordinates: '-5.909614, 37.3974502',
      date: '13/12/2023',
      type: 'CHE',
      lithology: 'CANTOS RODADOS,ARENA Y ARCILLAS',
      ph: 'no info',
      organicCarbon: 'no info',
      nitrogen: 'no info',
      phosphorus: 'no info'
    }
  ];

  // Calcular estadísticas
  const totalSamples = sampleData.length;
  const cheSamples = sampleData.filter(sample => sample.type === 'CHE').length;
  const chebioSamples = sampleData.filter(sample => sample.type === 'CHEBIO').length;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Sampling Analysis
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
                <th>Sample code</th>
                <th>Type</th>
                <th>coordinate X</th>
                <th>coordinate Y</th>
                <th>pH</th>
                <th>Organic Carbon</th>
                <th>Nitrogen</th>
                <th>Phosphorus</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyState}>
                    <div className={styles.emptyContent}>
                      <div className={styles.emptyIcon}>📊</div>
                      <p className={styles.emptyText}>No hay datos disponibles</p>
                      <p className={styles.emptySubtext}>Los datos de análisis aparecerán aquí una vez procesados</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sampleData.map((sample, index) => {
                  // Separar coordenadas en X e Y
                  const [coordX, coordY] = sample.coordinates.split(',').map(c => c.trim());
                  return (
                    <tr key={index} className={styles.dataRow}>
                      <td>{sample.code}</td>
                      <td>
                        <span className={`${styles.badge} ${styles[`badge${sample.type}`]}`}>
                          {sample.type}
                        </span>
                      </td>
                      <td>{coordX}</td>
                      <td>{coordY}</td>
                      <td>{sample.ph}</td>
                      <td>{sample.organicCarbon}</td>
                      <td>{sample.nitrogen}</td>
                      <td>{sample.phosphorus}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.footer}>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{totalSamples}</span>
              <span className={styles.statLabel}>Samples</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{cheSamples}</span>
              <span className={styles.statLabel}>CHE</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{chebioSamples}</span>
              <span className={styles.statLabel}>CHEBIO</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button 
              className={styles.actionBtn} 
              onClick={exportToCSV}
              title="Export data to CSV file"
            >
              📥 Export Data
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
                  Updating...
                </>
              ) : (
                '🔄 Update'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplingDataTable;
