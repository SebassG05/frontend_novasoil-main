import React from 'react';
import styles from './InfoModal.module.css';
import ImageCarouselYellow from './ImageCarouselBulgaria';

const InfoModalYellowBulgaria = ({ visible, onClose, isClosing, children, onCloseAll }) => {
  if (!visible) return null;
  return (
    <div className={styles.overlay}>
      <div className={isClosing ? `${styles.modal} ${styles.modalClosing}` : styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">×</button>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>Data for soils in Plovdiv District_Bulgaria</h1>
        </div>
        <div className={styles.content}>
          <ImageCarouselYellow onCloseAll={onCloseAll} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoModalYellowBulgaria;
