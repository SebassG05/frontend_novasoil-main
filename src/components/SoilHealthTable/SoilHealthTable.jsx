import React, { useState } from 'react';
import styles from './SoilHealthTable.module.css';

const SOIL_HEALTH_DATA = [
  {
    chemical: 'pH',
    physical: 'Clay (%)',
    biological: 'Nematoda (Saprophytes) UD/100gr',
  },
  {
    chemical: 'EC (μS/cm)',
    physical: 'Silt (%)',
    biological: 'Nematoda (Phytopathogens) UD/100gr',
  },
  {
    chemical: 'CEC (mEq/100 g)',
    physical: 'Sand (%)',
    biological: 'Fungi presence (Trichoderma, Paecilomyces...)',
  },
  {
    chemical: 'Heavy metals (mg/kg)',
    physical: 'Bulk density (g/cc)',
    biological: 'Microbiological respiration (mg CO2/100g)',
  },
  {
    chemical: 'Macroelements (mg/kg)',
    physical: '',
    biological: 'Annelid presence (number of individuals)',
  },
  {
    chemical: 'Micronutrients (mb/kg)',
    physical: '',
    biological: '',
  },
  {
    chemical: 'Organic matter (%)',
    physical: '',
    biological: '',
  },
  {
    chemical: 'Soil Organic Carbon (%)',
    physical: '',
    biological: '',
  },
];

const SoilHealthTable = ({ visible, onClose }) => {
  const [closing, setClosing] = useState(false);
  if (!visible && !closing) return null;
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 400);
  };
  // Unificar todos los datos en un solo array de tarjetas con grupo
  const allCards = [
    ...SOIL_HEALTH_DATA.map((row) => row.chemical ? { label: row.chemical, group: 'Chemical' } : null).filter(Boolean),
    ...SOIL_HEALTH_DATA.map((row) => row.physical ? { label: row.physical, group: 'Physical' } : null).filter(Boolean),
    ...SOIL_HEALTH_DATA.map((row) => row.biological ? { label: row.biological, group: 'Biological' } : null).filter(Boolean),
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.container + ' ' + (closing ? styles.soilHealthFadeOut : styles.soilHealthFadeIn)}>
        <div className={styles.header}>
          <h2 className={styles.title}>Soil Health Indicators</h2>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close table">✕</button>
        </div>
        <div className={styles.cardGridWrapper}>
          <div className={styles.cardGridUnified}>
            {allCards.map((item, idx) => (
              <div className={styles.card} key={idx}>
                <span className={styles.cardLabel}>{item.label}</span>
                <span className={styles.cardGroup}>{item.group}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilHealthTable;
