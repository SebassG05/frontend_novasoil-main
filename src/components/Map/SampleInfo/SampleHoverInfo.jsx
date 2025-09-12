import React, { useState, useEffect } from 'react';
import { useMapStore } from '../../../store/mapStore';
import styles from './SampleHoverInfo.module.css';

const SampleHoverInfo = () => {
    const { hoveredSample } = useMapStore();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX + 15, // Offset para que no esté exactamente sobre el cursor
                y: e.clientY + 15
            });
        };

        if (hoveredSample) {
            document.addEventListener('mousemove', handleMouseMove);
            return () => document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [hoveredSample]);

    if (!hoveredSample) return null;

    return (
        <div 
            className={styles.tooltip}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
            <div className={styles.content}>
                <h3 className={styles.title}>{hoveredSample.code}</h3>
                
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Fecha:</span>
                        <span className={styles.value}>{hoveredSample.date}</span>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Tipo de muestreo:</span>
                        <span className={`${styles.badge} ${
                            hoveredSample.samplingType === 'CHE' 
                                ? styles.badgeCHE 
                                : hoveredSample.samplingType === 'CHE-BIO' || hoveredSample.samplingType === 'CHEBIO'
                                    ? styles.badgeCHEBIO
                                    : styles.badgeDefault
                        }`}>
                            {hoveredSample.samplingType}
                        </span>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Litología:</span>
                        <span className={styles.value}>{hoveredSample.lithologyDescription}</span>
                    </div>
                    
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Coordenadas:</span>
                        <span className={`${styles.value} ${styles.coordinates}`}>
                            {hoveredSample.coordinates?.longitude?.toFixed(6)}, {hoveredSample.coordinates?.latitude?.toFixed(6)}
                        </span>
                    </div>
                </div>
                
                {hoveredSample.observations && (
                    <div className={styles.observations}>
                        <span className={styles.label}>Observaciones:</span>
                        <p className={styles.observationText}>
                            {hoveredSample.observations}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SampleHoverInfo;
