import React, { useState } from 'react';
import styles from './InfoModal.module.css';

const InfoModal = ({ visible, onClose, children }) => {
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
    <div className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}>
      <div className={`${styles.modal} ${isClosing ? styles.modalClosing : ''}`}>
        <button className={styles.closeBtn} onClick={handleClose}>&times;</button>
        <div className={styles.content}>{children}</div>
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

export default InfoModal;
