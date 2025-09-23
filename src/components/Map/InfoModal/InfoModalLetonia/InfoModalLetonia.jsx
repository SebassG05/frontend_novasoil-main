import React from 'react';
import styles from './InfoModal.module.css';
import ImageCarouselLetonia from './ImageCarouselLetonia';

const InfoModalLetonia = ({ visible, onClose, isClosing, children, onCloseAll }) => {
  if (!visible) return null;
  return (
    <div className={styles.overlay}>
      <div className={isClosing ? `${styles.modal} ${styles.modalClosing}` : styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">×</button>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>Crop ZSA production and animal farming</h1>
        </div>
        <div className={styles.content}>
          <ImageCarouselLetonia onCloseAll={onCloseAll} />
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

export default InfoModalLetonia;