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

    return (
        <div className={styles.tooltip} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <div className={styles.content}>
                <h3 className={styles.title}>{hoveredSample.sampling_id || hoveredSample.code || 'Sample'}</h3>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Date:</span>
                        <span className={styles.value}>{hoveredSample.sampling_date || hoveredSample.date || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Coordinates:</span>
                        <span className={styles.coordinates}>{hoveredSample.coords || `${hoveredSample.lat}, ${hoveredSample.lon}` || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Soil name (BG):</span>
                        <span className={styles.value}>{hoveredSample.soil_name_bg_classification || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Soil name (WRB):</span>
                        <span className={styles.value}>{hoveredSample.soil_name_wrb_2014 || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Nitrogen (%):</span>
                        <span className={styles.value}>{hoveredSample.nitrogen_ ?? <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Carbonates (%):</span>
                        <span className={styles.value}>{hoveredSample.carbonates_ ?? <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Organic Carbon (%):</span>
                        <span className={styles.value}>{hoveredSample.organic_carbon_ ?? <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Zinc (mg/kg):</span>
                        <span className={styles.value}>{hoveredSample.zinc_mgkg ?? <span style={{opacity:0.5}}>N/A</span>}</span>
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
