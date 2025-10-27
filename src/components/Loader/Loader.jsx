import React from 'react';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loaderBackdrop}>
    <div className={styles.loaderContainer}>
      <div className={styles.loaderSpinner}></div>
      <div className={styles.loaderText}>Loading soil type layer...</div>
    </div>
  </div>
);

export default Loader;
