import React, { useState } from 'react';
import styles from './InfoModal.module.css';
import ImageCarouselMadrid from './ImageCarouselMadrid';

const InfoModalMadrid = ({ visible, onClose, children, onCloseAll }) => {
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
          <h1 className={styles.modalTitle}>Organic Vineyards</h1>
        </div>
        <div className={styles.content}>
          <ImageCarouselMadrid onCloseAll={onCloseAll} />
          {children}
        </div>
        <div className={styles.companyLogo}>
          <img 
            src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1758717364/LOGOTIPO_leyenda_color_JPG-removebg-preview_vfs7pb.png"
            alt="UPM"
            className={styles.companyLogoImage}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoModalMadrid;