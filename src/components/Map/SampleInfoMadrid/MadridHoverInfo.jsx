import React, { useState, useEffect } from 'react';
import styles from './MadridHoverInfo.module.css';
import { useMapStore } from '../../../store/mapStore';

const MadridHoverInfo = () => {
    const { hoveredSample } = useMapStore();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX + 15,
                y: e.clientY + 15
            });
        };
        if (hoveredSample && hoveredSample._madrid) {
            document.addEventListener('mousemove', handleMouseMove);
            return () => document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [hoveredSample]);

    if (!hoveredSample || !hoveredSample._madrid) return null;

    return (
        <div className={styles.tooltip} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <div className={styles.content}>
                <h3 className={styles.title}>{hoveredSample['Case Study ID'] || hoveredSample['case_study_id'] || 'Sample'}</h3>
                <div className={styles.infoGrid}>
                    
                    <div className={styles.infoItem}><span className={styles.label}>Phosphorus mg/kg:</span> <span className={styles.value}>{hoveredSample['Phosphorus mg/kg'] ?? <span style={{opacity:0.5}}>N/A</span>}</span></div>
                    <div className={styles.infoItem}><span className={styles.label}>Sodium (Na) mg/kg:</span> <span className={styles.value}>{hoveredSample['Sodium (Na) mg/kg'] ?? <span style={{opacity:0.5}}>N/A</span>}</span></div>
                    <div className={styles.infoItem}><span className={styles.label}>Clay %:</span> <span className={styles.value}>{hoveredSample['Clay %'] ?? <span style={{opacity:0.5}}>N/A</span>}</span></div>
                    <div className={styles.infoItem}><span className={styles.label}>Latitude:</span> <span className={styles.value}>{hoveredSample['Latitude'] ?? <span style={{opacity:0.5}}>N/A</span>}</span></div>
                    <div className={styles.infoItem}><span className={styles.label}>Longitude:</span> <span className={styles.value}>{hoveredSample['Longitude'] ?? <span style={{opacity:0.5}}>N/A</span>}</span></div>
                </div>
            </div>
        </div>
    );
};

export default MadridHoverInfo;
