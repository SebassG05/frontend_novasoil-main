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
            <p className="description">
              <b>1. Bulk Density (ρb):</b> Represents the mass of dry soil per unit volume <b>(g/cm³ or Mg/m³)</b>. 
              High values <b>(1.6 g/cm³ in clay soils)</b> indicate severe compaction and reduced root and water movement.<br /><br />

              <b>2. Penetration Resistance:</b> Measured with a penetrometer, expressing the force required to penetrate the soil <b>(MPa)</b>. 
              Values above 2 MPa typically restrict root elongation and limit infiltration.<br /><br />

              <b>3. Total Porosity (%):</b> Derived from bulk density and particle density. 
              Lower porosity indicates limited aeration, water infiltration, and biological activity.<br /><br />
            </p>
          </div>
          </div>
          <div className="rightCol">
            <div className="titleWrapper">
              <h3 className="title">Soil Compaction</h3>
            </div>
            <p className="description">
             <b>Soil compaction</b> is a physical process in which soil particles are pressed together, reducing the pore space between them. This results in decreased <b>total porosity</b>, limiting the soil’s ability to store and transmit air and water. Compaction negatively affects <b>root growth, water infiltration, and biological activity</b>, making it a major threat to <b>soil quality and agricultural productivity</b>, particularly in intensively managed systems or where heavy machinery traffic occurs.
            </p>
            <div className="divider"></div>
            <div className="bottomRightBox">
             Maintaining low soil compaction preserves structure, aeration, and water infiltration. Managing <b>bulk density, penetration resistance, and porosity</b> supports root growth and biological activity. Practices like reducing machinery traffic, controlled tillage, and rotations with deep-rooted crops help minimize compaction, enhancing soil health and agricultural productivity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSoilThreat;
