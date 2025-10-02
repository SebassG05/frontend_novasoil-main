import React, { useState } from 'react';
import './iconsNewBot.css';
import IndicatorInfoModal from '../IndicatorInfoModal/IndicatorInfoModal';

const SOIL_HEALTH_DATA = [
  {
    chemical: 'pH',
    physical: 'Clay (%)',
    biological: 'Nematoda UD/100gr',
  },
  {
    chemical: 'EC (μS/cm)',
    physical: 'Silt (%)',
  },
  {
    chemical: 'CEC (mEq/100 g)',
    physical: 'Sand (%)',
    biological: 'Fungi presence',
  },
  {
    chemical: 'Heavy metals (mg/kg)',
    physical: 'Bulk density (g/cc)',
    biological: 'Microbiological respiration',
  },
  {
    chemical: 'Macroelements (mg/kg)',
    physical: '',
    biological: 'Annelid presence',
  },
  {
    chemical: 'Micronutrients (mg/kg)',
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

const SoilHealthTable = ({ visible, onClose, empty }) => {
  const [closing, setClosing] = useState(false);
  const [infoModal, setInfoModal] = useState({ open: false, indicator: '' });
  const [transitioning, setTransitioning] = useState(false);

  // Si el modal informativo está abierto, solo mostrarlo
  if ((!visible && !closing) || (infoModal.open && !transitioning)) {
    return (
      <IndicatorInfoModal
        visible={infoModal.open}
        indicator={infoModal.indicator}
        onClose={() => setInfoModal({ open: false, indicator: '' })}
        onIndicatorChange={(newIndicator) => setInfoModal({ open: true, indicator: newIndicator })}
      />
    );
  }

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 400);
  };

  // Animación de transición al abrir el modal informativo
  const handleCardClick = (label) => {
    setTransitioning(true);
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setInfoModal({ open: true, indicator: label });
      setTransitioning(false);
    }, 400);
  };

  // Unificar todos los datos en un solo array de tarjetas con grupo
  const allCards = [
    ...SOIL_HEALTH_DATA.map((row) => row.chemical ? { label: row.chemical, group: 'Chemical' } : null).filter(Boolean),
    ...SOIL_HEALTH_DATA.map((row) => row.physical ? { label: row.physical, group: 'Physical' } : null).filter(Boolean),
    ...SOIL_HEALTH_DATA.map((row) => row.biological ? { label: row.biological, group: 'Biological' } : null).filter(Boolean),
  ];

  return (
    <div className={`overlay`}>
      <div className={`container ${closing ? 'soilHealthFadeOut' : 'soilHealthFadeIn'}`}>
        <div className={`header`}>
          {!empty && <h2 className={`title`}>Soil Health Indicators</h2>}
          <button className={`closeBtn`} onClick={handleClose} aria-label="Close table">✕</button>
        </div>
        <div className={`cardGridWrapper`}>
          <div className={`cardGridUnified`}>
            {empty ? (
              // Modal completamente vacío - solo estructura para agregar contenido después
              <div style={{ 
                minHeight: '300px',
                width: '100%'
              }}>
                {/* Aquí puedes agregar tu contenido personalizado */}
              </div>
            ) : (
              // Modal con las tarjetas normales
              allCards.map((item, idx) => (
                <div
                  className={`card`}
                  key={idx}
                  onClick={() => handleCardClick(item.label)}
                  style={{ cursor: 'pointer' }}
                >
                  <span className={`cardLabel`}>{item.label}</span>
                  <span className={`cardGroup`}>{item.group}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilHealthTable;
