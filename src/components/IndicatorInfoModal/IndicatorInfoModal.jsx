import React from 'react';
import styles from './IndicatorInfoModal.module.css';

const PH_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759220288/istockphoto-1470724451-612x612-removebg-preview_kp4nri.png';
const EC_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759230252/unnamed-removebg-preview_17_h3d5xr.png';

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
              {indicator === 'EC (μS/cm)' && (
                <img src={EC_IMAGE_URL} alt="EC scale" className={styles.ecImg} />
              )}
            </div>
            {/* PH_DESCRIPTION_2 or EC_DESCRIPTION_2 below the image, outside imageBox */}
            {(indicator === 'pH' || indicator === 'EC (μS/cm)') && (
              <div className={styles.phBox}>
                <p className={styles.description}>
                  {indicator === 'pH' && PH_DESCRIPTION_2}
                  {indicator === 'EC (μS/cm)' && [
                    <span key="low"><b>Low EC (&lt; 0.8 μS/cm):</b> soils very low in salts, may require additional fertilization.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate EC (0.8–2.0 μS/cm):</b> ideal for most crops; good nutrient availability without salinity risk.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High EC (&gt; 2.0 μS/cm):</b> saline soils; hinders water and nutrient uptake, affecting plant growth.</span>
                  ]}
                </p>
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
              {indicator === 'EC (μS/cm)' && (
                <p className={styles.description}>
                  Electrical conductivity (EC) measures <b>the amount of soluble salts in the soil</b>, indicating its salinity and affecting water and nutrient availability for plants
                </p>
              )}
            </div>
            {/* Info box at bottom right of rightCol */}
            {indicator === 'pH' && (
              <div className={styles.bottomRightBox}>
                Maintaining a balanced soil pH is essential for the health and development of crops. An appropriate pH promotes the efficient uptake of essential nutrients, stimulates the activity of beneficial microorganisms, and contributes to higher agricultural productivity and ecosystem sustainability. Adjusting pH through proper agronomic practices helps prevent deficiencies or toxicities, optimizing plant growth and quality.
              </div>
            )}
            {indicator === 'EC (μS/cm)' && (
              <div className={styles.bottomRightBox2}>
               Maintaining a balanced soil electrical conductivity (EC) is essential for the health and development of crops. EC reflects the level of soluble salts in the soil, which directly influences water availability, nutrient absorption, and overall plant growth. Proper EC levels ensure that plants can efficiently take up essential nutrients such as nitrogen, phosphorus, potassium, and micronutrients, while preventing the negative effects of excessive salinity.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorInfoModal;
