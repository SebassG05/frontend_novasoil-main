import React, { useState, useEffect, useRef } from 'react';
import styles from './ImageCarouselLetonia.module.css';
// IMPORTANTE: Cambia estas imágenes por las de Bulgaria
import { CAROUSEL_IMAGES_LETONIA, FALLBACK_IMAGES} from '../../../../config/cloudinary';

const ImageCarousel = ({ onCloseAll }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [usesFallback, setUsesFallback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressKey, setProgressKey] = useState(0); // Para reiniciar la animación
  const trackRef = useRef(null);

  // Usar imágenes de Cloudinary o fallback según disponibilidad
  const images = usesFallback ? FALLBACK_IMAGES : CAROUSEL_IMAGES_LETONIA;

  // Auto-play functionality con bucle simple
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, isTransitioning]);

  // Función para ir a una slide específica
  const goToSlide = (index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    setProgressKey(prev => prev + 1); // Reiniciar animación de progreso
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * (100 / images.length)}%)`;
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
    
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const nextIndex = (currentSlide + 1) % images.length;
    setCurrentSlide(nextIndex);
    setProgressKey(prev => prev + 1); // Reiniciar animación de progreso
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${nextIndex * (100 / images.length)}%)`;
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const prevIndex = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(prevIndex);
    setProgressKey(prev => prev + 1); // Reiniciar animación de progreso
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${prevIndex * (100 / images.length)}%)`;
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
    
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Logos/Imágenes arriba del carrusel */}
      <div className={styles.logosContainer}>
        <div className={styles.logoItem}>
          <img 
            src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757581496/unnamed-removebg-preview_3_umuxjr.png"
            alt="Logo 1"
            className={styles.logoImage}
          />
        </div>
        <div className={styles.logoItem}>
          <img 
            src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1758614263/unnamed-removebg-preview_15_nbiogt.png"
            alt="Logo 2"
            className={`${styles.logoImage} ${styles.logoImage2}`}
          />
        </div>
        
        <div className={styles.logoItem}>
          <img 
            src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757586884/unnamed-removebg-preview_9_n9kw60.png"
            alt="Logo 3"
            className={`${styles.logoImage} ${styles.logoImage2}`}
          />
        </div>
        <div className={styles.logoItem}>
          <img 
            src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757585769/unnamed-removebg-preview_5_mf8cuf.png"
            alt="Logo 4"
            className={`${styles.logoImage} ${styles.logoImage2}`}
          />
        </div>
        <div className={styles.logoItem}>
          <img 
            src="https://res.cloudinary.com/drwlnxvqr/image/upload/v1757586023/unnamed-removebg-preview_8_srp4yt.png"
            alt="Logo 5"
            className={`${styles.logoImage} ${styles.logoImage2}`}
          />
        </div>
      </div>

      <div className={styles.carousel}>
        <div 
          ref={trackRef}
          className={styles.carouselTrack}
          style={{ 
            width: `${images.length * 100}%`,
            transform: `translateX(-${currentSlide * (100 / images.length)}%)`
          }}
        >
          {images.map((image, index) => (
            <div key={`${index}-${image.title}`} className={styles.slide} style={{ width: `${100 / images.length}%` }}>
              <div className={styles.imageContainer}>
                <img 
                  src={image.url} 
                  alt={image.title}
                  className={styles.image}
                  onError={(e) => {
                    // Si falla la imagen de Cloudinary, cambiar a fallback
                    if (!usesFallback) {
                      setUsesFallback(true);
                    } else {
                      // Fallback final - imagen placeholder
                      e.target.src = "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' fill='%236b7280' text-anchor='middle' dy='.3em'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                    }
                  }}
                />
                <div className={styles.overlay}>
                  <h3 className={styles.imageTitle}>{image.title}</h3>
                  <p className={styles.imageDescription}>{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Imagen anterior"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Imagen siguiente"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>

        {/* Indicators */}
        <div className={styles.indicators}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentSlide ? styles.activeIndicator : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className={styles.progressContainer}>
          <div 
            key={progressKey} // Fuerza reinicio de animación
            className={styles.progressBar}
            style={{ 
              animationDuration: isAutoPlaying && !isTransitioning ? '4s' : 'paused',
              animationPlayState: isAutoPlaying && !isTransitioning ? 'running' : 'paused'
            }}
          />
        </div>
      </div>
      
      {/* Call to action elegante */}
      <div className={styles.callToAction}>
        <p className={styles.ctaText}>
          More information about the case study
        </p>
        <button className={styles.ctaLink} onClick={(e) => {
          // Crear efecto ripple
          const button = e.currentTarget;
          const ripple = document.createElement('span');
          const rect = button.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
          `;
          
          button.style.position = 'relative';
          button.style.overflow = 'hidden';
          button.appendChild(ripple);
          
          // Remover el ripple después de la animación
          setTimeout(() => {
            if (ripple.parentNode) {
              ripple.parentNode.removeChild(ripple);
            }
          }, 600);
          
          // Cerrar tanto el modal como la leyenda
          if (onCloseAll) {
            onCloseAll();
          }
          console.log('Modal y leyenda cerrados');
        }}>
          Click here
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
