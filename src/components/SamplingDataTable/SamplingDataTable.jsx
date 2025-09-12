import React from 'react';
import styles from './SamplingDataTable.module.css';

const SamplingDataTable = ({ visible, onClose }) => {
  if (!visible) return null;

  // Datos de ejemplo para la tabla (por ahora vacía, pero con estructura)
  const sampleData = [];

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleIcon}>🌱</span>
            Análisis de Datos de Muestreo
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
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Muestras</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Analizadas</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>0</span>
              <span className={styles.statLabel}>Pendientes</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              📥 Exportar Datos
            </button>
            <button className={styles.actionBtn}>
              🔄 Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplingDataTable;
