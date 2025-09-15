import React, { useState } from 'react';
import styles from './SamplingDataTable.module.css';

const SamplingDataTable = ({ visible, onClose, data }) => {
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

  // Determinar qué columnas tienen información
  const columns = [
    { key: 'code', label: 'Código' },
    { key: 'id', label: 'ID' },
    { key: 'coordX', label: 'Coordenada X' },
    { key: 'coordY', label: 'Coordenada Y' },
    { key: 'date', label: 'Fecha' },
    { key: 'type', label: 'Tipo' },
    { key: 'lithology', label: 'Litología' },
    { key: 'ph', label: 'pH' },
    { key: 'organicCarbon', label: 'Carbono Orgánico' },
    { key: 'nitrogen', label: 'Nitrógeno' },
    { key: 'phosphorus', label: 'Fósforo' },
  ];

  // Preprocesar sampleData para coordX/coordY
  const processedData = sampleData.map(sample => {
    let coordX = '';
    let coordY = '';
    if (typeof sample.coordinates === 'string' && sample.coordinates.includes(';')) {
      [coordX, coordY] = sample.coordinates.split(';').map(c => c.trim());
    } else {
      coordX = sample.coordinates || '';
      coordY = '';
    }
    return { ...sample, coordX, coordY };
  });

  // Calcular columnas visibles (al menos un valor no vacío/no 'no info')
  const visibleColumns = columns.filter(col =>
    processedData.some(row => row[col.key] && row[col.key] !== 'no info' && row[col.key] !== '')
  );

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
