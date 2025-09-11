import React from 'react';
import styles from './Legend.module.css';

const Legend = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Cerrar leyenda"
        >
          ×
        </button>
        
        <div className={styles.content}>
          {/* Contenido de la leyenda - por ahora en blanco */}
        </div>
      </div>
    </div>
  );
};

export default Legend;
