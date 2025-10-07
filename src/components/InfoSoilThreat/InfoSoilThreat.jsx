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
        image: "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759821697/56d97a0d72_maonh8.jpg",
        description: ' Soil biodiversity refers to the variety of living organisms in the soil — from <b>microbes (bacteria, fungi, archaea)</b> to <b>mesofauna (nematodes, collembolans)</b> and <b>macrofauna (earthworms, arthropods)</b> — that sustain essential ecosystem functions. These organisms drive nutrient cycling, organic matter decomposition, carbon storage, soil structure formation, and plant health. <br> </br> <b> Biodiversity loss</b> reduces these functions, leading to poorer fertility, lower resilience, and disrupted ecosystem balance. <b> Key pressures include land-use intensification, pollution, organic matter decline, soil sealing, and climate change </b>.',
        recommendation: 'Monitoring soil biodiversity relies on measurable indicators that reflect biological activity and ecosystem functioning. Key variables include <b> microbial biomass and respiration, earthworm and nematode diversity, and enzyme or DNA-based indicators of microbial richness</b>. These metrics provide insight into nutrient cycling, organic matter stability, and soil resilience. Integrating biological data with <b> soil properties such as organic carbon and texture </b> allows for a better understanding of how management practices influence biodiversity and soil health.'
      },
      'Soil Organic Carbon': {
        title: 'Soil Organic Carbon',
        image: "https://res.cloudinary.com/drwlnxvqr/image/upload/v1759822889/ngeo_hero_collections_Jul20-aa081b1cc04e462788eaef23b8e46bff_gn3o9w.jpg",
        description: 'Soil Organic Carbon <b>(SOC)</b> is the carbon component of organic matter in the soil — originating from plant and animal residues, root exudates, and microbial biomass. It is <b>crucial for soil fertility, structure, nutrient retention, and water regulation</b>, and acts as a major <b>carbon sink</b>, helping mitigate climate change.<br> </br>Loss of SOC reduces soil productivity, increases erosion and compaction risk, and decreases resilience to drought and degradation. Key drivers of SOC decline include <b>intensive tillage, removal of residues, low organic inputs, erosion, and land-use change</b>.',
        recommendation: 'Monitoring SOC relies on indicators that reflect both its quantity and stability. The main variables include SOC content and stock, which show how much carbon is stored, and the <b>SOC/clay ratio</b>, a key indicator of soil structure and vulnerability to degradation. <b>Bulk density</b> and the <b>C/N ratio</b> help assess how carbon interacts with soil texture and organic matter turnover. Tracking these parameters allows identification of soils at risk of carbon loss and guides management actions to maintain fertility, structure, and long-term carbon sequestration potential.'
      }
    };
    return contents[indicator] || contents['Soil Compaction'];
  };

  // Función para obtener recomendaciones detalladas dinámicas
  const getDetailedRecommendations = (indicator) => {
    const recommendations = {
      'Soil Compaction': {
        cards: [
          {
            title: 'Bulk Density (Db):',
            description: 'Represents the dry mass of soil per unit volume <span className="font-semibold text-green-700">(g cm⁻³ or Mg m⁻³)</span>. High values indicate compacted soil with reduced root and water movement.',
            color: 'green'
          },
          {
            title: 'SOC/Clay Ratio (Structural Stability Index):',
            description: 'Combines soil organic carbon (SOC) and clay to indicate soil structure resilience.',
            color: 'blue'
          },
          {
            title: 'Clay Content (%):',
            description: 'Determines mechanical sensitivity: clay-rich soils are more compactable when wet, but more resistant when dry.',
            color: 'amber'
          },
          {
            title: 'Air Capacity (AC %):',
            description: 'Percentage of air-filled porosity.',
            color: 'purple'
          }
        ],
        additionalText: 'Monitor these indicators regularly to maintain optimal soil health and prevent compaction issues. Implement controlled traffic farming and avoid heavy machinery during wet conditions.'
      },
      'Soil Biodiversity': {
        cards: [
          {
            title: 'Microbial Biomass & Respiration:',
            description: 'Measures total microbial activity and carbon cycling capacity. Higher values indicate active soil communities supporting nutrient availability.',
            color: 'green'
          },
          {
            title: 'Earthworm & Nematode Diversity:',
            description: 'Reflects soil food web complexity and ecosystem functionality. Diverse populations enhance soil structure and nutrient cycling.',
            color: 'blue'
          },
          {
            title: 'Nematode community composition:',
            description: 'Represents trophic diversity and soil food web structure. Links microbial processes with nutrient cycling and ecosystem stability.',
            color: 'amber'
          },
          {
            title: 'DNA-based Microbial Richness:',
            description: 'Advanced molecular techniques to assess microbial community diversity and functional potential in soil ecosystems.',
            color: 'purple'
          }
        ],
        additionalText: 'Promote biodiversity through organic amendments, reduced tillage, and cover crops. Avoid excessive pesticides and maintain soil moisture for optimal microbial communities.'
      },
      'Soil Organic Carbon': {
        cards: [
          {
            title: 'SOC content (%) or g C/kg soil:',
            description: 'Core measure of organic carbon in the soil; indicates soil fertility and degradation risk. Directly shows how much carbon is in the fine soil fraction.',
            color: 'green'
          },
          {
            title: 'SOC stock (t C/ha):',
            description: 'Represents the total carbon stored in a soil layer; crucial for carbon budgeting and climate impact. Integrates SOC content with depth and bulk density.',
            color: 'blue'
          },
          {
            title: 'Bulk density (g/cm³):',
            description: 'Essential for converting SOC content to SOC stock.Also influences aeration, root growth, and microbial activity.',
            color: 'amber'
          },
          {
            title: 'SOC/Clay ratio:',
            description: 'Reflects soil structural stability and susceptibility to degradation. Important for long-term soil health and erosion resistance.',
            color: 'purple'
          }
        ],
        additionalText: 'SOC decline below critical thresholds indicates reduced soil fertility and higher degradation risk. Combining SOC content, SOC/clay ratio, and bulk density gives a robust view of soil carbon status. Maintaining adequate SOC supports soil structure, water retention, and nutrient cycling, enhancing climate resilience.'
      }
    };
    return recommendations[indicator] || recommendations['Soil Compaction'];
  };

  const content = getIndicatorContent(indicator);
  const detailedRecs = getDetailedRecommendations(indicator);

  const getColorClasses = (color) => {
    const colorMap = {
      green: {
        bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
        border: 'border-green-400',
        text: 'text-green-600',
        dot: 'bg-green-500'
      },
      blue: {
        bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
        border: 'border-blue-400',
        text: 'text-blue-600',
        dot: 'bg-blue-500'
      },
      amber: {
        bg: 'bg-gradient-to-r from-amber-50 to-orange-50',
        border: 'border-amber-400',
        text: 'text-amber-600',
        dot: 'bg-amber-500'
      },
      purple: {
        bg: 'bg-gradient-to-r from-purple-50 to-violet-50',
        border: 'border-purple-400',
        text: 'text-purple-600',
        dot: 'bg-purple-500'
      }
    };
    return colorMap[color] || colorMap.green;
  };

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
                {detailedRecs.cards.map((card, index) => {
                  const colors = getColorClasses(card.color);
                  return (
                    <div key={index} className={`${colors.bg} border-l-4 ${colors.border} rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300`}>
                      <h4 className={`text-lg font-bold ${colors.text} mb-3 flex items-center`}>
                        <span className={`w-3 h-3 ${colors.dot} rounded-full mr-3`}></span>
                        {card.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: card.description }}>
                      </p>
                    </div>
                  );
                })}

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
                  <p className="text-emerald-800 leading-relaxed text-lg" style={{ textAlign: 'justify' }}>
                    {detailedRecs.additionalText}
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
