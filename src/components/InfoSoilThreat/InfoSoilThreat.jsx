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

  return (
    <div className="overlay">
      <div className={`container ${closing ? 'soilThreatFadeOut' : 'soilThreatFadeIn'}`}>
        <div className="header">
          <h2 className="title">{indicator || 'Soil Threat Information'}</h2>
          <button className="closeBtn" onClick={handleClose} aria-label="Close modal">✕</button>
        </div>
        <div className="contentWrapper">
          <div className="emptyContent">
            {/* Contenido vacío - aquí puedes agregar información específica del indicador */}
            <p className="emptyMessage">Information about {indicator} will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSoilThreat;
