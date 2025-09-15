import React, { useState } from 'react';
import styles from './SamplingDataTable.module.css';

const SamplingDataTable = ({ visible, onClose, data }) => {
  // Lista de columnas a ocultar solo para Alemania
  const hiddenGermanyColumns = [
    'nitrates_mgkg',
    'total_cadmium_mgkg',
    'total_aluminum_al_mgkg',
    'total_lead_pb_mgkg',
    'total_zinc_zn_mgkg',
    'sulfur_s_mgkg'
  ];
  if (!visible) return null;

  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString('es-ES'));

  // Usar datos por props si existen, si no usar array vacío
  const sampleData = Array.isArray(data) && data.length > 0 ? data : [];

  // Calcular estadísticas
  const totalSamples = sampleData.length;
  const cheSamples = sampleData.filter(sample => sample.type === 'CHE').length;
  const chebioSamples = sampleData.filter(sample => sample.type === 'CHEBIO').length;

  // Función para exportar datos a CSV
  const exportToCSV = () => {
    const headers = [
      'Código', 'ID', 'Coordenadas', 'Fecha', 'Tipo', 'Litología', 'pH', 'Carbono Orgánico', 'Nitrógeno', 'Fósforo'
    ];
    const csvContent = [
      headers.join(','),
      ...sampleData.map(sample => [
        sample.code || '',
        sample.id || '',
        `"${sample.coordinates || ''}"`,
        sample.date || '',
        sample.type || '',
        `"${sample.lithology || ''}"`,
        sample.ph || '',
        sample.organicCarbon || '',
        sample.nitrogen || '',
        sample.phosphorus || ''
      ].join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `muestreo_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastUpdated(new Date().toLocaleString('es-ES'));
    } finally {
      setIsUpdating(false);
    }
  };

  // Detectar todas las claves presentes en los datos
  const allKeys = sampleData.reduce((keys, row) => {
    Object.keys(row).forEach(k => {
      if (!keys.includes(k)) keys.push(k);
    });
    return keys;
  }, []);

  // Generar columnas dinámicas
  // Detectar si es Alemania por la presencia de la columna 'co2_land_novasoil_id'
  const isGermany = allKeys.includes('co2_land_novasoil_id');
  const visibleColumns = allKeys
    .filter(key =>
      sampleData.some(row => row[key] && row[key] !== 'no info' && row[key] !== '') &&
      (!isGermany || !hiddenGermanyColumns.includes(key))
    )
    .map(key => ({ key, label: key }));

  // Preprocesar sampleData para coordX/coordY si existen
  const processedData = sampleData.map(sample => {
    let coordX = sample.coordX || '';
    let coordY = sample.coordY || '';
    // Si hay una columna coordinates tipo string con ;
    if (typeof sample.coordinates === 'string' && sample.coordinates.includes(';')) {
      [coordX, coordY] = sample.coordinates.split(';').map(c => c.trim());
    }
    return { ...sample, coordX, coordY };
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Tabla de Muestreo</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar tabla">✕</button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {visibleColumns.map(col => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processedData.length === 0 ? (
                <tr>
                  <td colSpan={visibleColumns.length} className={styles.emptyState}>
                    <div className={styles.emptyContent}>
                      <div className={styles.emptyIcon}>📊</div>
                      <p className={styles.emptyText}>No hay datos disponibles</p>
                      <p className={styles.emptySubtext}>Los datos de análisis aparecerán aquí una vez procesados</p>
                    </div>
                  </td>
                </tr>
              ) : (
                processedData.map((row, idx) => (
                  <tr key={idx} className={styles.dataRow}>
                    {visibleColumns.map(col => (
                      <td key={col.key}>{row[col.key]}</td>
                    ))}
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
            <button className={styles.actionBtn} onClick={exportToCSV} title="Export data to CSV file">
              📥 Export Data
            </button>
            <button className={`${styles.actionBtn} ${isUpdating ? styles.actionBtnLoading : ''}`} onClick={updateData} disabled={isUpdating} title={`Última actualización: ${lastUpdated}`}>
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
