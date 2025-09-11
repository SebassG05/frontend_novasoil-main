import React, { useState } from 'react';
import styles from './Legend.module.css';

const Legend = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const totalPages = 3; // Total de páginas de la leyenda

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
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Page 2 Content</h2>
            <p className={styles.placeholder}>Contenido de la página 2 - Aquí puedes agregar más secciones</p>
          </div>
        );
      case 3:
        return (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Page 3 Content</h2>
            <p className={styles.placeholder}>Contenido de la página 3 - Aquí puedes agregar más secciones</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
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
