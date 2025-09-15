import React, { useState } from 'react';
import { useMapStore } from '../../../store/mapStore';
import { useGeoData } from '../../../hooks/useGeoData';
import styles from './Legend.module.css';

const Legend = ({ isOpen, onClose, isClosing }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalPages = 4; // Aumentamos las páginas para incluir datos geoespaciales
  
  const { 
    shapefileData, 
    samplingData, 
    layersVisibility, 
    isLoadingGeoData,
    selectedAreaName
  } = useMapStore();
  
  const { toggleLayerVisibility } = useGeoData();

  if (!isOpen) return null;

  const changePage = (newPage) => {
    if (newPage === currentPage || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Pequeño delay para la animación de salida
    setTimeout(() => {
      setCurrentPage(newPage);
      
      // Delay para la animación de entrada
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    changePage(page);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            {/* Business Models Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Business Models</h2>
              <div className={styles.imageGrid}>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757577144/c42862fa-44e8-4a14-811b-defffcf7128e_cxwdme.png" 
                    alt="Value Chain"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Value Chain</span>
                </div>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757581187/unnamed-removebg-preview_2_zdyfgu.png" 
                    alt="Collective"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Collective</span>
                </div>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757577035/unnamed-removebg-preview_nf2mag.png" 
                    alt="Credit Carbon"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Credit Carbon</span>
                </div>
              </div>
            </div>

            {/* Land Uses Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Land Uses</h2>
              <div className={styles.imageGrid}>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757581496/unnamed-removebg-preview_3_umuxjr.png" 
                    alt="Agriculture Soils"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Agriculture Soils</span>
                </div>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757581602/unnamed-removebg-preview_4_olui7c.png" 
                    alt="Agriculture & Urban Soils"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Agriculture & Urban Soils</span>
                </div>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757577220/unnamed-removebg-preview_1_wxbkxt.png" 
                    alt="Urban Soils"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Urban Soils</span>
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            {/* Business Models Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Ecosystem Services</h2>
              <div className={styles.imageGrid}>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757585769/unnamed-removebg-preview_5_mf8cuf.png" 
                    alt="Biodiversity"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Biodiversity</span>
                </div>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757585860/unnamed-removebg-preview_6_gm4mwz.png" 
                    alt="Carbon Storage"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Carbon Storage</span>
                </div>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757585933/unnamed-removebg-preview_7_wtiibk.png" 
                    alt="Water Quantity"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Water Quantity</span>
                </div>


                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757586023/unnamed-removebg-preview_8_srp4yt.png" 
                    alt="Soil Quality"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Soil Quality</span>
                </div>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757586884/unnamed-removebg-preview_9_n9kw60.png" 
                    alt="Landscape and Scenery"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Landscape and Scenery</span>
                </div>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757586960/unnamed-removebg-preview_10_cznjsg.png" 
                    alt="Rural viability"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Rural viability</span>
                </div>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            {/* Business Models Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Ecosystem Services</h2>
              <div className={styles.imageGrid}>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757587058/unnamed-removebg-preview_11_tr2mh5.png" 
                    alt="Cultural heritage"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Cultural heritage</span>
                </div>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757587209/unnamed-removebg-preview_12_xhci7y.png" 
                    alt="Water quality"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Water quality</span>
                </div>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757587793/unnamed-removebg-preview_13_x0rnjr.png" 
                    alt="Recreational Access"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Recreational Access</span>
                </div>
                <div className={styles.imageItem}>
                  <img 
                    src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757588087/unnamed-removebg-preview_14_wvmi00.png" 
                    alt="Resilience to natural hazards"
                    className={styles.businessImage}
                  />
                  <span className={styles.imageLabel}>Resilience to natural hazards</span>
                </div>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            {/* Datos Geoespaciales Section */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Datos Geoespaciales</h2>
              
              {isLoadingGeoData ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                  <span>Cargando datos...</span>
                </div>
              ) : (
                <>
                  {/* Shapefile Layer Control */}
                  <div className={styles.layerControl}>
                    <h3 className={styles.layerTitle}>Área de Estudio</h3>
                    <div className={styles.layerItem}>
                      <label className={styles.layerLabel}>
                        <input
                          type="checkbox"
                          checked={layersVisibility.shapefile}
                          onChange={() => toggleLayerVisibility('shapefile')}
                          className={styles.layerCheckbox}
                        />
                        <div className={styles.layerSymbol} style={{ backgroundColor: '#088', opacity: 0.3 }}></div>
                        <span>{selectedAreaName}</span>
                      </label>
                      {shapefileData && (
                        <div className={styles.layerInfo}>
                          <small>{shapefileData.features?.length || 0} geometrías cargadas</small>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className={styles.section}>
                    <h3 className={styles.layerTitle}>Información</h3>
                    <div className={styles.infoText}>
                      <p>• Pasa el cursor sobre los puntos para ver los detalles</p>
                      <p>• Haz clic en un punto para ver información completa</p>
                      <p>• Los colores indican el tipo de muestreo</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}>
      <div className={`${styles.modal} ${isClosing ? styles.modalClosing : ''}`}>
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Cerrar leyenda"
        >
          ×
        </button>
        
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>Legend</h1>
          </div>
          
          {/* Contenido de la página actual */}
          <div className={`${styles.pageContent} ${isTransitioning ? styles.transitioning : styles.visible}`}>
            {renderPageContent()}
          </div>
          
          {/* Controles de paginación */}
          <div className={styles.pagination}>
            
            
            <div className={styles.pageIndicators}>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`${styles.pageIndicator} ${currentPage === index + 1 ? styles.active : ''}`}
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
        
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Legend;
