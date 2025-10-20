import React, { useState } from 'react';
import styles from './InfoModal.module.css';
import ImageCarouselFlora from './ImageCarouselFlora';

const InfoModalItaly = ({ visible, onClose, children, onCloseAll }) => {
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
          <h1 className={styles.modalTitle}>A model for multifunctional and sustainable development of marginal areas.</h1>
        </div>
        <div className={styles.content}>
          <ImageCarouselFlora onCloseAll={onCloseAll} />
          {children}
        </div>
        <div className={styles.companyLogo}>
          <img 
            src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1759319924/marchio_unipi_orizz_pant541-removebg-preview_un0uxt.png"
            alt="Italian Partner"
            className={styles.companyLogoImage}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoModalItaly;