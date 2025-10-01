import React from 'react';
import styles from './IndicatorInfoModal.module.css';

const PH_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759220288/istockphoto-1470724451-612x612-removebg-preview_kp4nri.png';
const EC_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759230252/unnamed-removebg-preview_17_h3d5xr.png';
const CEC_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759234144/unnamed-removebg-preview_19_oubnuj.png';
const METALS = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759236603/unnamed-removebg-preview_20_r9edhk.png';
const MACROELEMENTS = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759237797/unnamed-removebg-preview_21_n0ikrz.png';
const MICROELEMENTS = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759300659/unnamed-removebg-preview_22_gvh0cw.png';
const ORGANICMATTER = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759301796/unnamed-removebg-preview_23_z0xhzg.png';
const SOC_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759302541/shutterstock_2346693365_uvetrx.webp';
const Clay_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759303763/2021-04-22-OnsiteBlogging-42052438-1-1920w_tjuwgf.webp';
const Silt_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759304364/person-digging-shovel-into-silt-soil-garden_qvbwrh.avif';
const Sand_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759304568/blade-4110620_1920_xkazod.jpg';
const BULK_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759304982/Phys_-_BD_Meas_Fig2_d6flol.png';
const Nematoda_IMAGE_URL = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759305918/dae67458-1b8d-475c-9ec6-53525557a6d7_cdhhc1.jpg';
const FungiPresence = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759308760/7489488d-9157-48e5-80d7-2d1980726613_ej5qzi.jpg';
const Microbiological = 'https://res.cloudinary.com/drwlnxvqr/image/upload/v1759310105/aristilde-sugar970__FocusFillMaxWyIwLjAwIiwiMC4wMCIsMTIwMCw2MzBd_rlfxw7.jpg';

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
  'Nematoda UD/100gr': 'biological',
  'Fungi presence': 'biological',
  'Microbiological respiration': 'biological',
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
                {indicator === 'Organic matter (%)' && (
                <img src={ORGANICMATTER} alt="Organic matter" className={styles.cecImg} />
              )}
                {indicator === 'Soil Organic Carbon (%)' && (
                <img src={SOC_IMAGE_URL} alt="Soil Organic Carbon" className={styles.cecImg} />
              )}
                {indicator === 'Clay (%)' && (
                <img src={Clay_IMAGE_URL} alt="Clay" className={styles.clayImg} />
              )}
                {indicator === 'Silt (%)' && (
                <img src={Silt_IMAGE_URL} alt="Silt" className={styles.clayImg} />
              )}
                {indicator === 'Sand (%)' && (
                <img src={Sand_IMAGE_URL} alt="Sand" className={styles.clayImg} />
              )}
                {indicator === 'Bulk density (g/cc)' && (
                <img src={BULK_IMAGE_URL} alt="Bulk density" className={styles.clayImg} />
              )}
                {indicator === 'Nematoda UD/100gr' && (
                <img src={Nematoda_IMAGE_URL} alt="Nematoda" className={styles.clayImg} />
              )}
                {indicator === 'Fungi presence' && (
                <img src={FungiPresence} alt="Fungi presence" className={styles.clayImg} />
              )}
              {indicator === 'Microbiological respiration' && (
                <img src={Microbiological} alt="Microbiological respiration" className={styles.clayImg} />
              )}
            </div>
            {/* PH_DESCRIPTION_2, EC_DESCRIPTION_2, CEC_DESCRIPTION_2, or HEAVY_METALS_DESCRIPTION_2 below the image, outside imageBox */}
            {(indicator === 'pH' || indicator === 'EC (μS/cm)' || indicator === 'CEC (mEq/100 g)' || indicator === 'Heavy metals (mg/kg)' || indicator === 'Macroelements (mg/kg)' || indicator === 'Micronutrients (mb/kg)' || indicator === 'Organic matter (%)' || indicator === 'Soil Organic Carbon (%)' || indicator === 'Clay (%)' || indicator === 'Silt (%)' || indicator === 'Sand (%)' || indicator === 'Bulk density (g/cc)' || indicator === 'Nematoda UD/100gr' || indicator === 'Fungi presence' || indicator === 'Microbiological respiration') && (
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
                  {indicator === 'Organic matter (%)' && [
                    <span key="low"><b>Low organic matter (&lt; 2%):</b> soils have poor structure and low fertility.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate organic matter (2–5%):</b> good fertility and microbial activity, suitable for most crops.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High organic matter (&gt; 5%):</b> very fertile soils, enhance nutrient retention and water holding capacity.</span>
                  ]}
                  {indicator === 'Soil Organic Carbon (%)' && [
                    <span key="low"><b>Low SOC (&lt; 1%):</b> soils have poor structure, low fertility, and limited nutrient retention.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate SOC (1–3%):</b> supports nutrient cycling, microbial activity, and healthy crop growth.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High SOC (&gt; 3%):</b> enhances soil structure, water retention, fertility, and overall soil health.</span>
                  ]}
                  {indicator === 'Clay (%)' && [
                    <span key="low"><b>Low clay (&lt; 20%):</b> soils are sandy, drain quickly, and retain fewer nutrients.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate clay (20–40%):</b> balanced texture, good water and nutrient retention, suitable for most crops.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High clay (&gt; 40%):</b> soils hold water and nutrients well but may have poor drainage and workability.</span>
                  ]}
                  {indicator === 'Silt (%)' && [
                    <span key="low"><b>Low silt (&lt; 10%):</b> soils are coarse-textured, drain quickly, and retain fewer nutrients.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate silt (10–30%):</b> balanced texture, improves water and nutrient retention, suitable for most crops.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High silt (&gt; 30%):</b> soils retain water and nutrients well but may be prone to compaction and erosion.</span>
                  ]}
                  {indicator === 'Sand (%)' && [
                    <span key="low"><b>Low sand (&lt; 30%):</b> soils retain water and nutrients well but may have poor drainage.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate sand (30–60%):</b> balanced texture, good drainage, suitable for most crops.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High sand (&gt; 60%):</b> coarse soils, drain quickly, low water, may require frequent irrigation and fertilization.</span>
                  ]}
                  {indicator === 'Bulk density (g/cc)' && [
                    <span key="low"><b>Low bulk density (&lt; 1.2 g/cc):</b> soils are well-aerated, but may have lower nutrient content.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate bulk density (1.2–1.6 g/cc):</b> ideal for root growth, water infiltration, and nutrient availability.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High bulk density (&gt; 1.6 g/cc):</b> soils are compacted, restrict root growth, water movement, and nutrient uptake.</span>
                  ]}
                  {indicator === 'Nematoda UD/100gr' && [
                    <span key="low"><b>Low nematodes (&lt; 50 UD/100 g):</b> soils have few nematodes, indicating low biological activity.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate nematodes (50–200 UD/100 g):</b> healthy population, supports soil nutrient cycling and ecosystem balance.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High nematodes (&gt; 200 UD/100 g):</b> very active soil fauna; excessive populations may indicate pest risk for some crops.</span>
                  ]}
                  {indicator === 'Fungi presence' && [
                    <span key="low"><b>Low fungi (&lt; 50 UD/100 g):</b> soils have few fungi, indicating low microbial activity.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate fungi (50–200 UD/100 g):</b> healthy fungal population, supports nutrient cycling and soil balance.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High fungi (&gt; 200 UD/100 g):</b> very active fungal community; may indicate high organic matter decomposition.</span>
                  ]}
                  {indicator === 'Microbiological respiration' && [
                    <span key="low"><b>Low respiration (&lt; 50 mg CO2/100 g):</b> soils have low microbial activity.</span>,
                    <br key="br1" />, <br key="br2" />,
                    <span key="mod"><b>Moderate respiration (50–200 mg CO2/100 g):</b> healthy microbial activity, supports nutrient cycling.</span>,
                    <br key="br3" />, <br key="br4" />,
                    <span key="high"><b>High respiration (&gt; 200 mg CO2/100 g):</b> rapid decomposition and nutrient turnover.</span>
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
              {indicator === 'Organic matter (%)' && (
                <p className={styles.description}>
                  Soil organic matter (SOM) is a complex mixture of decomposed plant and animal residues, living microorganisms, and humus. It plays a <b>crucial role in maintaining soil health </b>, fertility, and structure.
                </p>
              )}
              {indicator === 'Soil Organic Carbon (%)' && (
                <p className={styles.description}>
                  Soil Organic Carbon (SOC) is a key component of soil organic matter, consisting of carbon compounds derived from decomposed plant and animal residues. <b>It is vital for soil fertility, structure, and overall health.</b>
                </p>
              )}
              {indicator === 'Clay (%)' && (
                <div className={styles.description}>
                  Clay (%) represents the proportion of fine mineral particles in the soil. <b>It influences water retention, nutrient availability, soil structure, and workability, all of which are crucial for plant growth and soil health.</b></div>
              )}
              {indicator === 'Silt (%)' && (
                <div className={styles.description}>
                  Silt (%) represents the proportion of fine mineral particles in the soil. <b>It influences water retention, nutrient availability, soil structure, and workability, all of which are crucial for plant growth and soil health.</b></div>
              )}
              {indicator === 'Sand (%)' && (
                <div className={styles.description}>
                  Sand (%) represents the proportion of coarse mineral particles in the soil. <b>It influences drainage, aeration, and soil texture, all of which are crucial for plant growth and soil health.</b></div>
              )}
              {indicator === 'Bulk density (g/cc)' && (
                <div className={styles.description}>
                  Bulk density (g/cc) measures the mass of soil per unit volume, including pore spaces. <b>It affects root growth, water infiltration, and aeration, all of which are vital for healthy plant development and soil function.</b></div>
              )}
              {indicator === 'Nematoda UD/100gr' && (
                <div className={styles.description}>
                  Nematoda UD/100gr indicates the density of nematodes in the soil, which are microscopic roundworms. <b>They play essential roles in nutrient cycling, organic matter decomposition, contributing to overall soil health and fertility.</b></div>
              )}
              {indicator === 'Fungi presence' && (
                <div className={styles.description}>
                  Fungi presence reflects the abundance of fungal species in soil, essential for nutrient cycling and organic matter decomposition. <b>They form symbiotic relationships</b> with plant roots, improving water and nutrient uptake and supporting .</div>
              )}
              {indicator === 'Microbiological respiration' && (
                <div className={styles.description}>
                 Microbiological respiration  measures the amount of carbon dioxide produced by soil microorganisms during respiration. <b>It is an important indicator of soil microbial activity, organic matter decomposition, and overall soil health.</b></div>
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
            {indicator === 'Organic matter (%)' && (
              <div className={styles.bottomRightBox2}>
               Maintaining adequate levels of soil organic matter (SOM) is essential for soil health, fertility, and overall ecosystem sustainability. SOM improves soil structure, enhances water retention, and promotes nutrient cycling, which are crucial for optimal plant growth and development. Implementing practices such as cover cropping, reduced tillage, and organic amendments can help increase SOM levels, leading to improved soil quality and agricultural productivity.
              </div>
            )}
            {indicator === 'Soil Organic Carbon (%)' && (
              <div className={styles.bottomRightBox2}>
                Maintaining adequate SOC is essential for soil health, fertility, and crop productivity. SOC improves structure, water retention, and nutrient cycling, and practices like cover cropping, reduced tillage, and adding organic amendments can increase SOC for more sustainable soils.
              </div>
            )}
            {indicator === 'Clay (%)' && (
              <div className={styles.bottomRightBox2}>
                Maintaining adequate levels of clay in soil is essential for soil health, fertility, and overall ecosystem sustainability. Clay particles improve soil structure, enhance water retention, and promote nutrient cycling, which are crucial for optimal plant growth and development. Implementing practices such as cover cropping, reduced tillage, and organic amendments can help increase clay levels, leading to improved soil quality and agricultural productivity.
              </div>
            )}
            {indicator === 'Silt (%)' && (
              <div className={styles.bottomRightBox2}>
                Maintaining adequate levels of silt in soil is essential for soil health, fertility, and overall ecosystem sustainability. Silt particles improve soil structure, enhance water retention, and promote nutrient cycling, which are crucial for optimal plant growth and development. Implementing practices such as cover cropping, reduced tillage, and organic amendments can help increase silt levels, leading to improved soil quality and agricultural productivity.
              </div>
            )}
            {indicator === 'Sand (%)' && (
              <div className={styles.bottomRightBox2}>
                Maintaining adequate levels of sand in soil is essential for soil health, fertility, and overall ecosystem sustainability. Sand particles improve soil drainage, aeration, and root penetration, which are crucial for optimal plant growth and development. Implementing practices such as cover cropping, reduced tillage, and organic amendments can help balance sand levels, leading to improved soil quality and agricultural productivity.
              </div>
            )}
            {indicator === 'Bulk density (g/cc)' && (
              <div className={styles.bottomRightBox2}>
                Maintaining optimal bulk density in soil is crucial for soil health, fertility, and overall ecosystem sustainability. Proper bulk density ensures adequate pore space for air and water movement, promoting healthy root growth and microbial activity. Implementing practices such as reduced tillage, cover cropping, and organic amendments can help manage bulk density, leading to improved soil quality and agricultural productivity.
              </div>
            )}
            {indicator === 'Nematoda UD/100gr' && (
              <div className={styles.bottomRightBox2}>
                Maintaining a healthy population of nematodes in soil is essential for soil health, fertility, and overall ecosystem sustainability. Nematodes play crucial roles in nutrient cycling, organic matter decomposition, and pest control, which are vital for optimal plant growth and development. Implementing practices such as crop rotation, organic amendments, and reduced pesticide use can help support beneficial nematode populations, leading to improved soil quality and agricultural productivity.
              </div>
            )}
            {indicator === 'Fungi presence' && (
              <div className={styles.bottomRightBox2}>
                Maintaining a healthy population of soil fungi is essential for soil health, fertility, and overall ecosystem sustainability. Fungi play key roles in decomposing organic matter, nutrient cycling, and forming symbiotic relationships with plants, which support optimal growth and development. Implementing practices such as adding organic amendments, reducing tillage, and minimizing chemical inputs can help promote beneficial fungal populations, enhancing soil quality and agricultural productivity.
              </div>
            )}
            {indicator === 'Microbiological respiration' && (
              <div className={styles.bottomRightBox3}>
            Maintaining adequate microbiological respiration is essential for soil health and fertility. It reflects microbial activity, crucial for organic matter decomposition, nutrient cycling, and soil structure. Practices like adding organic amendments, crop rotation, and reducing chemical inputs help stimulate microbes, improving soil quality and crop productivity. 
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorInfoModal;
