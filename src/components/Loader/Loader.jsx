import React from 'react';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loaderBackdrop}>
    <div className={styles.loaderContainer}>
      <div className={styles.loaderSpinner}></div>
      <div className={styles.loaderText}>Cargando capa de tipos de suelo...</div>
    </div>
  </div>
);

export default Loader;
