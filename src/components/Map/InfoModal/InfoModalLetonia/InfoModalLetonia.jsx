import React, { useState } from 'react';
import styles from './InfoModal.module.css';
import ImageCarouselLetonia from './ImageCarouselLetonia';

const InfoModalLetonia = ({ visible, onClose, children, onCloseAll }) => {
  const [isClosing, setIsClosing] = useState(false);
  // Handler para animación de cierre
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Debe coincidir con la duración de modalSlideOut
  };
  if (!visible && !isClosing) return null;
  return (
    <div className={styles.overlay}>
      <div className={isClosing ? `${styles.modal} ${styles.modalClosing}` : styles.modal}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Cerrar modal">×</button>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalTitle}>Crop ZSA production and animal farming</h1>
        </div>
        <div className={styles.content}>
          <ImageCarouselLetonia onCloseAll={onCloseAll} />
          {children}
        </div>
        <div className={styles.companyLogo}>
          <img 
            src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1758716919/17_ZS-removebg-preview_au5s3b.png"
            alt="ZEMNIEKU SAEIMA"
            className={styles.companyLogoImage}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoModalLetonia;