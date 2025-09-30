import React from 'react';
import styles from './IndicatorInfoModal.module.css';

const PH_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759220288/istockphoto-1470724451-612x612-removebg-preview_kp4nri.png';

const GROUPS = {
  'pH': 'chemical',
  'EC (μS/cm)': 'chemical',
  'CEC (mEq/100 g)': 'chemical',
  'Heavy metals (mg/kg)': 'chemical',
  'Macroelements (mg/kg)': 'chemical',
  'Micronutrients (mb/kg)': 'chemical',
  'Organic matter (%)': 'chemical',
  'Soil Organic Carbon (%)': 'chemical',
  'Clay (%)': 'physical',
  'Silt (%)': 'physical',
  'Sand (%)': 'physical',
  'Bulk density (g/cc)': 'physical',
  'Nematoda (Saprophytes) UD/100gr': 'biological',
  'Nematoda (Phytopathogens) UD/100gr': 'biological',
  'Fungi presence (Trichoderma, Paecilomyces...)': 'biological',
  'Microbiological respiration (mg CO2/100g)': 'biological',
  'Annelid presence (number of individuals)': 'biological',
};

const PH_DESCRIPTION_1 = (
  <>
    Soil pH is an <b>important aspect</b> of soil health, influencing nutrient availability, microbial activity, and overall plant growth..
  </>
);


const PH_DESCRIPTION_2 = [
  <span key="acidic"><b>Acidic (&lt; 6):</b> limits the availability of essential nutrients and can release toxic metals.</span>,
  <br key="br1" />,
  <br key="br2" />,
  <span key="neutral"><b>Neutral (6–7):</b> optimal for most crops and soil microorganisms.</span>,
  <br key="br3" />,
  <br key="br4" />,
  <span key="alkaline"><b>Alkaline (&gt; 7.5):</b> reduces the uptake of nutrients such as iron and zinc.</span>
];


const IndicatorInfoModal = ({ visible, onClose, indicator }) => {
  if (!visible) return null;
  const group = GROUPS[indicator] || '';
  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close info">✕</button>
        <div className={styles.contentRow}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={styles.imageBox}>
              {indicator === 'pH' && (
                <img src={PH_IMAGE_URL} alt="pH scale" />
              )}
            </div>
            {/* PH_DESCRIPTION_2 below the image, outside imageBox */}
            {indicator === 'pH' && (
              <div className={styles.phBox}>
                <p className={styles.description}>{PH_DESCRIPTION_2}</p>
              </div>
            )}
          </div>
          <div className={styles.rightCol}>
            <div className={styles.titleWrapper}>
              <h3 className={styles.title}>{indicator || ''}</h3>
              {group && (
                <span className={styles.groupLabel}>({group})</span>
              )}
              {indicator === 'pH' && (
                <p className={styles.description}>{PH_DESCRIPTION_1}</p>
              )}
            </div>
            {/* Info box at bottom right of rightCol */}
            {indicator === 'pH' && (
              <div className={styles.bottomRightBox}>
                Maintaining a balanced soil pH is essential for the health and development of crops. An appropriate pH promotes the efficient uptake of essential nutrients, stimulates the activity of beneficial microorganisms, and contributes to higher agricultural productivity and ecosystem sustainability. Adjusting pH through proper agronomic practices helps prevent deficiencies or toxicities, optimizing plant growth and quality.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorInfoModal;
