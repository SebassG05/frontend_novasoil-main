import React from 'react';
import styles from './IndicatorInfoModal.module.css';

const PH_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759220288/istockphoto-1470724451-612x612-removebg-preview_kp4nri.png';
const EC_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759230252/unnamed-removebg-preview_17_h3d5xr.png';
const CEC_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759234144/unnamed-removebg-preview_19_oubnuj.png';
const METALS = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759236603/unnamed-removebg-preview_20_r9edhk.png';
const MACROELEMENTS = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759237797/unnamed-removebg-preview_21_n0ikrz.png';
const MICROELEMENTS = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759300659/unnamed-removebg-preview_22_gvh0cw.png';

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
              {indicator === 'CEC (mEq/100 g)' && (
                <img src={CEC_IMAGE_URL} alt="CEC" className={styles.cecImg} />
              )}
              {indicator === 'Heavy metals (mg/kg)' && (
                <img src={METALS} alt="Heavy metals" className={styles.cecImg} />
              )}
                {indicator === 'Macroelements (mg/kg)' && (
                <img src={MACROELEMENTS} alt="Macroelements" className={styles.cecImg} />
              )}
                {indicator === 'Micronutrients (mb/kg)' && (
                <img src={MICROELEMENTS} alt="Micronutrients" className={styles.cecImg} />
              )}
              
            </div>
            {/* PH_DESCRIPTION_2, EC_DESCRIPTION_2, CEC_DESCRIPTION_2, or HEAVY_METALS_DESCRIPTION_2 below the image, outside imageBox */}
            {(indicator === 'pH' || indicator === 'EC (μS/cm)' || indicator === 'CEC (mEq/100 g)' || indicator === 'Heavy metals (mg/kg)' || indicator === 'Macroelements (mg/kg)' || indicator === 'Micronutrients (mb/kg)') && (
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
                  {indicator === 'CEC (mEq/100 g)' && [
                    <span key="low"><b>Low CEC (&lt; 10 mEq/100 g):</b> soils retain few nutrients, may need frequent fertilization.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate CEC (10–20 mEq/100 g):</b> soils hold nutrients moderately well, suitable for most crops.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High CEC (&gt; 20 mEq/100 g):</b> soils retain and supply nutrients efficiently, supporting healthy plant growth.</span>
                  ]}
                  {indicator === 'Heavy metals (mg/kg)' && [
                    <span key="low"><b>Low heavy metals (&lt; 50 mg/kg):</b> minimal contamination, safe for crops.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate heavy metals (50–200 mg/kg):</b> some contamination, may affect crops.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High heavy metals (&gt; 200 mg/kg):</b> highly contaminated, toxic for plants.</span>
                  ]}
                  {indicator === 'Macroelements (mg/kg)' && [
                    <span key="low"><b>Low macroelements (&lt; 500 mg/kg):</b> soils lack essential nutrients, limiting crop growth.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate macroelements (500–1500 mg/kg):</b> adequate nutrient levels, suitable for most crops.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High macroelements (&gt; 1500 mg/kg):</b> excess nutrients may cause imbalances or environmental risks.</span>
                  ]}
                  {indicator === 'Micronutrients (mb/kg)' && [
                    <span key="low"><b>Low micronutrients (&lt; 10 mb/kg):</b> deficiency risk, may limit plant growth and yield.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate micronutrients (10–50 mb/kg):</b> adequate levels, support healthy crop development.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High micronutrients (&gt; 50 mb/kg):</b> excess may cause toxicity and affect plant health.</span>
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
              {indicator === 'CEC (mEq/100 g)' && (
                <p className={styles.description}>
                  Cation exchange capacity (CEC) measures <b>the soil’s ability to hold and exchange essential nutrient cations</b>, influencing nutrient availability, soil fertility, and plant growth.
                </p>
              )}
                {indicator === 'Heavy metals (mg/kg)' && (
                <p className={styles.description}>
                  Heavy metals in soil, like lead, cadmium, and mercury, can harm plants and microbes even at low levels. Monitoring them is <b>key for soil health</b>, safe crops, and environmental protection.
                </p>
              )}
              {indicator === 'Macroelements (mg/kg)' && (
                <p className={styles.description}>
                  Macroelements such as nitrogen (N), phosphorus (P), potassium (K), calcium (Ca), magnesium (Mg), and sulfur (S) are <b>essential nutrients</b> required in large amounts for plant growth and development.
                </p>
              )}
              {indicator === 'Micronutrients (mb/kg)' && (
                <p className={styles.description}>
                  Micronutrients such as iron (Fe), manganese (Mn), zinc (Zn), copper (Cu), molybdenum (Mo), boron (B), and chlorine (Cl) are <b>essential nutrients</b> required in small amounts for plant growth and development.
                </p>
              )}
            </div>
            <div className={styles.divider}>
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
            {indicator === 'CEC (mEq/100 g)' && (
              <div className={styles.bottomRightBox2}>
               Maintaining a balanced soil cation exchange capacity (CEC) is essential for the health and development of crops. CEC reflects the soil’s ability to hold and exchange essential nutrient cations, which directly influences nutrient availability, soil fertility, and overall plant growth. Proper CEC levels ensure that plants can efficiently take up essential nutrients such as nitrogen, phosphorus, potassium, and micronutrients, while preventing the negative effects of nutrient deficiencies.
              </div>
            )}
            {indicator === 'Heavy metals (mg/kg)' && (
              <div className={styles.bottomRightBox2}>
               Monitoring and managing heavy metal levels in soil is crucial for maintaining soil health, ensuring safe crop production, and protecting environmental quality. Excessive concentrations of heavy metals can lead to toxicity in plants, reduced microbial activity, and contamination of the food chain. Implementing proper agronomic practices, such as phytoremediation, soil amendments, and crop rotation, can help mitigate the risks associated with heavy metals and promote sustainable agricultural practices.
              </div>
            )}
            {indicator === 'Macroelements (mg/kg)' && (
              <div className={styles.bottomRightBox2}>
               Ensuring adequate levels of macroelements in soil is vital for optimal plant growth, development, and crop yield. Macroelements such as nitrogen (N), phosphorus (P), potassium (K), calcium (Ca), magnesium (Mg), and sulfur (S) play crucial roles in various physiological processes, including photosynthesis, energy transfer, and protein synthesis. Proper management of these nutrients through soil testing, fertilization, and crop rotation can enhance nutrient availability, improve soil fertility, and promote sustainable agricultural practices.
              </div>
            )}
            {indicator === 'Micronutrients (mb/kg)' && (
              <div className={styles.bottomRightBox2}>
               Ensuring adequate levels of micronutrients in soil is vital for optimal plant growth, development, and crop yield. Micronutrients such as iron (Fe), manganese (Mn), zinc (Zn), copper (Cu), molybdenum (Mo), boron (B), and chlorine (Cl) play crucial roles in various physiological processes, including enzyme activation, photosynthesis, and hormone regulation. Proper management of these nutrients through soil testing, fertilization, and crop rotation can enhance nutrient availability, improve soil fertility, and promote sustainable agricultural practices.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorInfoModal;
