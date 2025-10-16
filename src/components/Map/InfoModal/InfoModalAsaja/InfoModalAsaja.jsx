import React from 'react';
import styles from './InfoModalAsaja.module.css';
import ImageCarouselAsaja from './ImageCarouselAsaja';

const InfoModalAsaja = ({ visible, onClose, isClosing, children, onCloseAll }) => {
  if (!visible) return null;
  return (
    <div className={styles.overlay}>
      <div className={isClosing ? `${styles.modal} ${styles.modalClosing}` : styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">×</button>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>ASAJA: Producción Integrada en Olivar</h1>
        </div>
        <div className={styles.content}>
          <ImageCarouselAsaja onCloseAll={onCloseAll} />
          {children}
        </div>
        <div className={styles.companyLogo}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1760615463/Logo_ASAJA-removebg-preview_ngjoga.png"
                    alt="ASAJA"
                    className={styles.companyLogoImage}
                  />
                </div>
      </div>
    </div>
  );
};

export default InfoModalAsaja;