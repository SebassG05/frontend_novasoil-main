import React, { useState, useEffect } from 'react';
import styles from './BulgariaHoverInfo.module.css';
import { useMapStore } from '../../../store/mapStore';

const BulgariaHoverInfo = () => {
    const { hoveredSample } = useMapStore();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX + 15,
                y: e.clientY + 15
            });
        };
        if (hoveredSample && hoveredSample._bulgaria) {
            document.addEventListener('mousemove', handleMouseMove);
            return () => document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [hoveredSample]);

    if (!hoveredSample || !hoveredSample._bulgaria) return null;

    // Helper para buscar el valor por varias claves posibles
    const getValue = (...keys) => {
        for (const k of keys) {
            if (hoveredSample[k] !== undefined && hoveredSample[k] !== null && hoveredSample[k] !== '') return hoveredSample[k];
        }
        return <span style={{opacity:0.5}}>N/A</span>;
    };

    return (
        <div className={styles.tooltip} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <div className={styles.content}>
                <h3 className={styles.title}>{getValue('Sampling ID', 'sampling_id', 'code', 'Sample')}</h3>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Date:</span>
                        <span className={styles.value}>{getValue('Sampling date', 'sampling_date', 'date')}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Coordinates:</span>
                        <span className={styles.coordinates}>{getValue('Coords', 'coords', 'lat', 'lon')}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Soil name (BG):</span>
                        <span className={styles.value}>{getValue('Soil name (BG classification)', 'soil_name_bg_classification')}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Soil name (WRB):</span>
                        <span className={styles.value}>{getValue('Soil name (WRB 2014)', 'soil_name_wrb_2014')}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Nitrogen (%):</span>
                        <span className={styles.value}>{getValue('Nitrogen (%)', 'nitrogen_')}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Carbonates (%):</span>
                        <span className={styles.value}>{getValue('Carbonates (%)', 'carbonates_')}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Organic Carbon (%):</span>
                        <span className={styles.value}>{getValue('Organic Carbon (%)', 'organic_carbon_')}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Zinc (mg/kg):</span>
                        <span className={styles.value}>{getValue('Zinc (mg/kg)', 'zinc_mgkg')}</span>
                    </div>
                </div>
                {hoveredSample.observations && (
                    <div className={styles.observations}>
                        <span className={styles.label}>Observations:</span>
                        <p className={styles.observationText}>{hoveredSample.observations}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulgariaHoverInfo;
