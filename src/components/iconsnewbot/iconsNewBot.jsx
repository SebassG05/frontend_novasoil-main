import React, { useState } from 'react';
import './iconsNewBot.css';
import IndicatorInfoModal from '../IndicatorInfoModal/IndicatorInfoModal';
import InfoSoilThreat from '../InfoSoilThreat/InfoSoilThreat';

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
  const [soilThreatModal, setSoilThreatModal] = useState({ open: false, indicator: '' });

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

  // Si el modal de Soil Threat está abierto, solo mostrarlo
  if (soilThreatModal.open) {
    return (
      <InfoSoilThreat
        visible={soilThreatModal.open}
        indicator={soilThreatModal.indicator}
        onClose={() => setSoilThreatModal({ open: false, indicator: '' })}
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

  // Función para manejar clic en imágenes
  const handleImageClick = (indicator) => {
    setTransitioning(true);
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setSoilThreatModal({ open: true, indicator });
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
          {empty ? (
            <h2 className={`title`}>Soil Threat Indicators</h2>
          ) : (
            <h2 className={`title`}>Soil Health Indicators</h2>
          )}
          <button className={`closeBtn`} onClick={handleClose} aria-label="Close table">✕</button>
        </div>
        <div className={`cardGridWrapper`}>
          <div className={`cardGridUnified`}>
            {empty ? (
              // Modal completamente vacío - solo estructura para agregar contenido después
              <div style={{ 
                minHeight: '300px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: '-10%',
                marginLeft: '-1%',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px 20px',
                alignContent: 'center'
              }}>
                <img 
                  src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1759483268/A%C3%B1adir_un_t%C3%ADtulo-removebg-preview_dxwbif.png" 
                  alt="Soil Compaction" 
                  style={{ 
                    width: '190px', 
                    height: '190px', 
                    opacity: 0.8,
                    marginLeft: '70px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleImageClick('Soil Compaction')}
                />
                <img 
                  src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1759483719/A%C3%B1adir_un_t%C3%ADtulo_1_soae8e-removebg-preview_lzbimi.png" 
                  alt="Soil Biodiversity" 
                  style={{ 
                    width: '180px', 
                    height: '190px', 
                    opacity: 0.8,
                    margin: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleImageClick('Soil Biodiversity')}
                />
                <img 
                  src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1759484062/A%C3%B1adir_un_t%C3%ADtulo__6_-removebg-preview_uuwehx.png" 
                  alt="Soil Organic Carbon" 
                  style={{ 
                    width: '320px', 
                    height: '310px', 
                    opacity: 0.8,
                    marginLeft: '-45px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleImageClick('Soil Organic Carbon')}
                />
                <img 
                  src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1759484283/A%C3%B1adir_un_t%C3%ADtulo__8_-removebg-preview_seew8j.png" 
                  alt="Soil pH Balance" 
                  style={{ 
                    width: '260px', 
                    height: '260px', 
                    opacity: 0.8,
                    marginLeft: '0px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleImageClick('Soil pH Balance')}
                />
                <img 
                  src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1759484400/A%C3%B1adir_un_t%C3%ADtulo__9_-removebg-preview_pplssf.png" 
                  alt="Soil Pollution" 
                  style={{ 
                    width: '250px', 
                    height: '250px', 
                    opacity: 0.8,
                    marginLeft: '-49px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleImageClick('Soil Pollution')}
                />
                <img 
                  src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1759484497/A%C3%B1adir_un_t%C3%ADtulo__10_-removebg-preview_tkjccj.png" 
                  alt="Soil Sealing" 
                  style={{ 
                    width: '260px', 
                    height: '260px', 
                    opacity: 0.8,
                    marginLeft: '-45px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleImageClick('Soil Sealing')}
                />
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
