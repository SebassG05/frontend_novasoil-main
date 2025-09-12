
import React from 'react';
import styles from './InfoModal.module.css';
import ImageCarouselYellow from './ImageCarouselYellow';

const InfoModalYellow = ({ visible, onClose, isClosing, children }) => {
  if (!visible) return null;
  return (
    <div className={styles.overlay}>
      <div className={isClosing ? `${styles.modal} ${styles.modalClosing}` : styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">×</button>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>CO2-Land Initiative in Germany</h1>
        </div>
        <div className={styles.content}>
          <ImageCarouselYellow onCloseAll={onClose} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoModalYellow;
