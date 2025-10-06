import React, { useState } from 'react';
import './InfoSoilThreat.css';

const InfoSoilThreat = ({ visible, onClose, indicator }) => {
  const [closing, setClosing] = useState(false);

  if (!visible && !closing) {
    return null;
  }

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 400);
  };

  // URL de la imagen de Soil Compaction (puedes cambiarla por la que prefieras)
  const SOIL_COMPACTION_IMAGE_URL = "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759741088/istockphoto-1221232054-612x612_kty2mf.jpg";

  return (
    <div className="overlay">
      <div className={`container ${closing ? 'soilThreatFadeOut' : 'soilThreatFadeIn'}`}
        style={{ position: 'relative' }}>
        <button className="closeBtn" onClick={handleClose} aria-label="Close modal"
          style={{ position: 'absolute', top: 24, right: 32, zIndex: 10 }}>
          ✕
        </button>
        <div className="contentRow">
          <div className="leftCol">
            <div className="imageBox">
              <img src={SOIL_COMPACTION_IMAGE_URL} alt="Soil Compaction" />
            </div>
            <div className="phBox">
              <h3
                style={{
                  marginBottom: '18px',
                  fontSize: '1.05rem',
                  color: '#4fc97a',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  textShadow: '0 2px 8px #e6f7ee',
                  textAlign: 'left',
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  display: 'block',
                  textTransform: 'uppercase',
                }}
              >
                What NOVASOIL recommends...
              </h3>
            <p className="description">
            <b>Bulk Density (Db)</b>:
                Represents the dry mass of soil per unit volume <b>(g cm⁻³ or Mg m⁻³)</b>.
                High values indicate compacted soil with reduced root and water movement.<br /><br />

            <b>SOC/Clay Ratio (Structural Stability Index)</b>:
                Combines soil organic carbon (SOC) and clay to indicate soil structure resilience. <br /><br />

            <b>Clay Content (%)</b>:
                Determines mechanical sensitivity: clay-rich soils are more compactable when wet, but more resistant when dry.<br /><br />

            <b>Air Capacity (AC %)</b>:
                Percentage of air-filled porosity.
                <br /><br />
            </p>
          </div>
          </div>
          <div className="rightCol">
            <div className="titleWrapper">
              <h3 className="title">Soil Compaction</h3>
            </div>
            <p className="description">
             Soil compaction is a physical process in which soil particles are pressed together, reducing pore space and <b>limiting air and water movement</b>. This leads to decreased <b>porosity, infiltration, and biological activity, affecting root growth and crop productivity.</b><br></br> <br></br>Topsoil compaction can sometimes be reversed through tillage or biological activity, while <b>subsoil compaction is persistent and long-lasting</b>, making it a critical soil degradation threat in intensive agricultural systems.
            </p>
            <div className="divider"></div>
            <div className="bottomRightBox">
            Maintaining low soil compaction preserves soil structure, aeration, and water flow. Managing bulk density, clay content, and the SOC/clay ratio helps prevent structural degradation. Reducing machinery traffic, using controlled tillage, and deep-rooted crops improves porosity, supporting root growth, biological activity, and soil productivity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSoilThreat;
