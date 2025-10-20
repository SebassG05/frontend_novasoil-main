import React from 'react';
import styles from './ModalHeader.module.css';

const ModalHeader = ({ title, onClose }) => (
  <div className={styles.header}>
    <h2 className={styles.title}>{title}</h2>
    <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">✕</button>
  </div>
);

export default ModalHeader;
