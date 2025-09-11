import React, { useState, useEffect, useRef } from 'react';
import styles from './ImageCarousel.module.css';
import { CAROUSEL_IMAGES, FALLBACK_IMAGES } from '../../../config/cloudinary';

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [usesFallback, setUsesFallback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressKey, setProgressKey] = useState(0); // Para reiniciar la animación
  const trackRef = useRef(null);

  // Usar imágenes de Cloudinary o fallback según disponibilidad
  const images = usesFallback ? FALLBACK_IMAGES : CAROUSEL_IMAGES;

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
        <button className={styles.ctaLink} onClick={() => {
          // Aquí puedes agregar la lógica para abrir más información
          console.log('Opening case study details...');
        }}>
          click here
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
