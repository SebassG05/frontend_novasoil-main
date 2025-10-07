import React, { useState } from 'react';
import './InfoSoilThreat.css';

const InfoSoilThreat = ({ visible, onClose, indicator }) => {
  const [closing, setClosing] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendationsClosing, setRecommendationsClosing] = useState(false);

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

  const handleShowRecommendations = () => {
    setShowRecommendations(true);
  };

  const handleCloseRecommendations = () => {
    setRecommendationsClosing(true);
    setTimeout(() => {
      setRecommendationsClosing(false);
      setShowRecommendations(false);
    }, 600);
  };

  // Función para obtener contenido dinámico
  const getIndicatorContent = (indicator) => {
    const contents = {
      'Soil Compaction': {
        title: 'Soil Compaction',
        image: "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759741088/istockphoto-1221232054-612x612_kty2mf.jpg",
        description: 'Soil compaction is a physical process in which soil particles are pressed together, reducing pore space and <b>limiting air and water movement</b>. This leads to decreased <b>porosity, infiltration, and biological activity, affecting root growth and crop productivity.</b><br></br>Topsoil compaction can sometimes be reversed through tillage or biological activity, while <b>subsoil compaction is persistent and long-lasting</b>, making it a critical soil degradation threat in intensive agricultural systems.',
        recommendation: 'Maintaining low soil compaction preserves <b>soil structure, aeration, and water flow</b>. Managing bulk density, clay content, and the SOC/clay ratio helps <b>prevent structural degradation</b>. Reducing machinery traffic, using controlled tillage, and deep-rooted crops improves porosity, supporting root growth, biological activity, and soil productivity.'
      },
      'Soil Biodiversity': {
        title: 'Soil Biodiversity',
        image: "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759483719/A%C3%B1adir_un_t%C3%ADtulo_1_soae8e-removebg-preview_lzbimi.png",
        description: 'Soil biodiversity refers to the variety of life forms that exist within soil ecosystems, including <b>bacteria, fungi, protozoa, nematodes, arthropods, and other microorganisms</b>. This diversity is essential for <b>nutrient cycling, organic matter decomposition, and soil structure formation.</b><br></br>High soil biodiversity indicates a healthy ecosystem that supports <b>plant growth, disease suppression, and ecosystem resilience</b>, making it a critical indicator for sustainable agriculture and environmental health.',
        recommendation: 'Enhancing soil biodiversity promotes <b>ecosystem health, nutrient cycling, and natural pest control</b>. Implementing organic amendments, cover crops, and reduced tillage helps <b>support diverse soil communities</b>. Avoiding excessive pesticides, maintaining soil moisture, and promoting crop rotation creates favorable conditions for beneficial microorganisms and soil fauna.'
      }
    };
    return contents[indicator] || contents['Soil Compaction'];
  };

  const content = getIndicatorContent(indicator);

  return (
    <div className="overlay">
      <div className={`container ${closing ? 'soilThreatFadeOut' : 'soilThreatFadeIn'}`}
        style={{ position: 'relative', display: showRecommendations ? 'none' : 'flex' }}>
        <button className="closeBtn" onClick={handleClose} aria-label="Close modal"
          style={{ position: 'absolute', top: 24, right: 32, zIndex: 10 }}>
          ✕
        </button>
        <div className="contentRow">
          <div className="leftCol">
            <div className="imageBox">
              <img src={content.image} alt={content.title} />
            </div>
          </div>
          <div className="rightCol">
            <div className="titleWrapper">
              <h3 className="title">{content.title}</h3>
            </div>
            <p className="description" style={{marginBottom: '10px'}} dangerouslySetInnerHTML={{ __html: content.description }}>
            </p>
            <div className="divider"></div>
          </div>
        </div>
        <div className="recommendationBox" style={{width: '100%', marginBottom: '4%', marginTop: '-6%', padding: '18px 32px 0 32px', fontSize: '1rem', color: '#2d5016', fontWeight: 500, textAlign: 'justify'}}>
          <span dangerouslySetInnerHTML={{ __html: content.recommendation }}></span>
          
          <button 
            className="recommendationsBtn" 
            onClick={handleShowRecommendations}
            style={{
              display: 'block',
              margin: '20px auto 0 auto',
              background: '#4e7c2b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(78, 124, 43, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#2d5016';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(78, 124, 43, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#4e7c2b';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(78, 124, 43, 0.3)';
            }}
          >
            View Recommendations
          </button>
        </div>
      </div>

      {/* Modal de Recomendaciones */}
      {(showRecommendations || recommendationsClosing) && (
        <div className="recommendationsOverlay">
          <div className={`recommendationsContainer ${recommendationsClosing ? 'recommendationsSlideOut' : 'recommendationsSlideIn'}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0' }}>
            <button 
              className="closeBtn" 
              onClick={handleCloseRecommendations} 
              aria-label="Close recommendations modal"
              style={{ position: 'absolute', top: 24, right: 32, zIndex: 10 }}
            >
              ✕
            </button>
            <div className="flex flex-col items-center justify-start w-full h-full p-4 overflow-y-auto" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#4fc97a #e6f7ee'
            }}>
              <style jsx>{`
                div::-webkit-scrollbar {
                  width: 8px;
                }
                div::-webkit-scrollbar-track {
                  background: #f0fdf4;
                  border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb {
                  background: linear-gradient(180deg, #4fc97a 0%, #2d5016 100%);
                  border-radius: 10px;
                  border: 2px solid #f0fdf4;
                }
                div::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(180deg, #2d5016 0%, #1a3009 100%);
                }
              `}</style>
              <h3 className="mb-6 text-2xl font-extrabold text-center text-green-500 tracking-widest uppercase font-montserrat drop-shadow-sm">
                WHAT NOVASOIL RECOMMENDS...
              </h3>
              
              <div className="w-full max-w-2xl space-y-3">
                {/* Bulk Density Card */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-bold text-green-600 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Bulk Density (Db):
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Represents the dry mass of soil per unit volume <span className="font-semibold text-green-700">(g cm⁻³ or Mg m⁻³)</span>. 
                    High values indicate compacted soil with reduced root and water movement.
                  </p>
                </div>

                {/* SOC/Clay Ratio Card */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-bold text-blue-600 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    SOC/Clay Ratio (Structural Stability Index):
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Combines soil organic carbon (SOC) and clay to indicate soil structure resilience.
                  </p>
                </div>

                {/* Clay Content Card */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-bold text-amber-600 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                    Clay Content (%):
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Determines mechanical sensitivity: clay-rich soils are more compactable when wet, but more resistant when dry.
                  </p>
                </div>

                {/* Air Capacity Card */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-l-4 border-purple-400 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-bold text-purple-600 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                    Air Capacity (AC %):
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Percentage of air-filled porosity.
                  </p>
                </div>

                {/* Additional Recommendations Card */}
                <div className="bg-gradient-to-r from-emerald-100 to-green-100 border-2 border-emerald-300 rounded-xl p-8 shadow-lg mt-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-500 rounded-full p-2 mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-emerald-700">Additional Recommendations</h4>
                  </div>
                  <p className="text-emerald-800 leading-relaxed text-lg">
                    Monitor these indicators regularly to maintain optimal soil health and prevent compaction issues. 
                    Implement controlled traffic farming and avoid heavy machinery during wet conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoSoilThreat;
