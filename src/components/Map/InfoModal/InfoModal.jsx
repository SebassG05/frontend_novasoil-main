import React from 'react';
import styles from './InfoModal.module.css';

const InfoModal = ({ visible, onClose, children }) => {
  if (!visible) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
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
