import React, { useState, useEffect } from 'react';
import styles from './LetoniaHoverInfo.module.css';
import { useMapStore } from '../../../store/mapStore';

const LetoniaHoverInfo = () => {
    const { hoveredSample } = useMapStore();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX + 15,
                y: e.clientY + 15
            });
        };
        if (hoveredSample && hoveredSample._letonia) {
            document.addEventListener('mousemove', handleMouseMove);
            return () => document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [hoveredSample]);

    if (!hoveredSample || !hoveredSample._letonia) return null;

    return (
        <div className={styles.tooltip} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <div className={styles.content}>
                <h3 className={styles.title}>{hoveredSample['case_study_id'] || hoveredSample['Case Study ID'] || 'Sample'}</h3>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Coordinates:</span>
                        <span className={styles.value}>{hoveredSample['coord_lat__long'] || hoveredSample['Coord (Lat & Long)'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Soil sampling ID:</span>
                        <span className={styles.value}>{hoveredSample['soil_sampling_id'] || hoveredSample['Soil sampling ID'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Soil sampling date:</span>
                        <span className={styles.value}>{hoveredSample['soil_sampling_date'] || hoveredSample['Soil sampling date'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Soil sample depth:</span>
                        <span className={styles.value}>{hoveredSample['soil_sample_depth'] || hoveredSample['Soil sample depth'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Nitrates (mg/Kg):</span>
                        <span className={styles.value}>{hoveredSample['nitrates_mgkg'] || hoveredSample['Nitrates (mg/Kg)'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Phosphorus (mg/kg):</span>
                        <span className={styles.value}>{hoveredSample['phosphorus_mgkg'] || hoveredSample['Phosphorus mg/kg'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Potassium (K) mg/kg:</span>
                        <span className={styles.value}>{hoveredSample['potassium_k_mgkg'] || hoveredSample['Potassium (K) mg/kg'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>

                    <div className={styles.infoItem}>
                        <span className={styles.label}>pH:</span>
                        <span className={styles.value}>{hoveredSample['ph'] || hoveredSample['pH'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Organic Matter (%w/w):</span>
                        <span className={styles.value}>{hoveredSample['organic_matter_ww'] || hoveredSample['Organic Matter (%w/w)'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>


                    <div className={styles.infoItem}>
                        <span className={styles.label}>Clay %:</span>
                        <span className={styles.value}>{hoveredSample['clay_'] || hoveredSample['Clay %'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Silt %:</span>
                        <span className={styles.value}>{hoveredSample['silt_'] || hoveredSample['Silt %'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Sand %:</span>
                        <span className={styles.value}>{hoveredSample['sand_'] || hoveredSample['Sand %'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LetoniaHoverInfo;
