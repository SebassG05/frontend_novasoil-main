import React, { useState, useEffect } from 'react';
import styles from './AsajaHoverInfo.module.css';
import { useMapStore } from '../../../store/mapStore';

const AsajaHoverInfo = () => {
    const { hoveredSample } = useMapStore();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX + 15,
                y: e.clientY + 15
            });
        };
        if (hoveredSample && hoveredSample._asaja) {
            document.addEventListener('mousemove', handleMouseMove);
            return () => document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [hoveredSample]);

    if (!hoveredSample || !hoveredSample._asaja) return null;

    return (
        <div className={styles.tooltip} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <div className={styles.content}>
                <h3 className={styles.title}>{hoveredSample.co2_land_novasoil_id || hoveredSample.CO2_land_Novasoil_ID || hoveredSample.code || 'Sample'}</h3>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Date:</span>
                        <span className={styles.value}>{hoveredSample.soil_sampling_date || hoveredSample['Soil sampling date'] || hoveredSample.date || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Coordinates:</span>
                        <span className={styles.coordinates}>{hoveredSample.coord_lat__long || hoveredSample['Coord (Lat & Long)'] || hoveredSample.coordinates || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Nitrogen (N) %:</span>
                        <span className={styles.value}>{hoveredSample.nitrogen_n_ || hoveredSample['Nitrogen (N) %'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Phosphorus (mg/kg):</span>
                        <span className={styles.value}>{hoveredSample.phosphorus_mgkg || hoveredSample['Phosphorus mg/kg'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Potassium (K) mg/kg:</span>
                        <span className={styles.value}>{hoveredSample.potassium_k_mgkg || hoveredSample['Potassium (K) mg/kg'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Magnesium (Mg) mg/kg:</span>
                        <span className={styles.value}>{hoveredSample.magnesium_mg_mgkg || hoveredSample['Magnesium (Mg) mg/kg'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>pH:</span>
                        <span className={styles.value}>{hoveredSample.ph || hoveredSample.pH || hoveredSample['pH'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Organic Matter (%w/w):</span>
                        <span className={styles.value}>{hoveredSample.organic_matter_ww || hoveredSample['Organic Matter (%w/w)'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>C/N:</span>
                        <span className={styles.value}>{hoveredSample.cn || hoveredSample['C/N'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>USDA Classification (units) / Soil Texture:</span>
                        <span className={styles.value}>{hoveredSample.usda_classification_units_soil_texture || hoveredSample['USDA Classification (units) soil texture '] || hoveredSample['USDA Classification (units)'] || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>CoordX:</span>
                        <span className={styles.value}>{hoveredSample.coordx || hoveredSample.coordX || <span style={{opacity:0.5}}>N/A</span>}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>CoordY:</span>
                        <span className={styles.value}>{hoveredSample.coordy || hoveredSample.coordY || <span style={{opacity:0.5}}>N/A</span>}</span>
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

export default AsajaHoverInfo;
