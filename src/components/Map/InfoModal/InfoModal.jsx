import React from 'react';
import styles from './InfoModal.module.css';

const InfoModal = ({ visible, onClose, children }) => {
  if (!visible) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default InfoModal;
