
import React from 'react';
import styles from './InfoModal.module.css';
import ImageCarouselYellow from './ImageCarouselYellow';

const InfoModalYellow = ({ visible, onClose, isClosing, children, onCloseAll }) => {
  if (!visible) return null;
  return (
    <div className={styles.overlay}>
      <div className={isClosing ? `${styles.modal} ${styles.modalClosing}` : styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">×</button>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>CO2-Land Initiative in Germany</h1>
        </div>
        <div className={styles.content}>
          <ImageCarouselYellow onCloseAll={onCloseAll} />
          {children}
        </div>
        <div className={styles.companyLogo}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757578071/Logo_CONSOLE-removebg-preview_xxfxxl.png"
                    alt="Evenor-Tech"
                    className={styles.companyLogoImage}
                  />
                </div>
      </div>
    </div>
  );
};

export default InfoModalYellow;
