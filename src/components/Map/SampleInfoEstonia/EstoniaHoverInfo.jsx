import React, { useState, useEffect } from 'react';
import styles from './EstoniaHoverInfo.module.css';
import { useMapStore } from '../../../store/mapStore';

const EstoniaHoverInfo = () => {
    const { hoveredSample } = useMapStore();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX + 15,
                y: e.clientY + 15
            });
        };
        if (hoveredSample && hoveredSample._estonia) {
            document.addEventListener('mousemove', handleMouseMove);
            return () => document.removeEventListener('mousemove', handleMouseMove);
        }
    }, [hoveredSample]);

    if (!hoveredSample || !hoveredSample._estonia) return null;

    // Helper para mostrar solo si existe (no null/undefined, pero sí 0 o string vacío)
    const showValue = (val) => val !== undefined && val !== null;

    return (
        <div className={styles.tooltip} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <div className={styles.content}>
                <h3 className={styles.title}>{
                  hoveredSample.co2_land_novasoil_id ??
                  hoveredSample.CO2_land_Novasoil_ID ??
                  hoveredSample.code ??
                  'Sample'
                }</h3>
                <div className={styles.infoGrid}>
                    {showValue(hoveredSample.soil_sampling_date) || showValue(hoveredSample['Soil sampling date']) || showValue(hoveredSample.date) ? (
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Date:</span>
                            <span className={styles.value}>{hoveredSample.soil_sampling_date ?? hoveredSample['Soil sampling date'] ?? hoveredSample.date}</span>
                        </div>
                    ) : null}
                    {showValue(hoveredSample.coord_lat__long) || showValue(hoveredSample['Coord (Lat & Long)']) || showValue(hoveredSample.coordinates) ? (
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Coordinates:</span>
                            <span className={styles.coordinates}>{hoveredSample.coord_lat__long ?? hoveredSample['Coord (Lat & Long)'] ?? hoveredSample.coordinates}</span>
                        </div>
                    ) : null}
                    {showValue(hoveredSample.nitrogen_n_) || showValue(hoveredSample['Nitrogen (N) %']) ? (
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Nitrogen (N) %:</span>
                            <span className={styles.value}>{hoveredSample.nitrogen_n_ ?? hoveredSample['Nitrogen (N) %']}</span>
                        </div>
                    ) : null}
                    {showValue(hoveredSample.phosphorus_mgkg) || showValue(hoveredSample['Phosphorus mg/kg']) ? (
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Phosphorus (mg/kg):</span>
                            <span className={styles.value}>{hoveredSample.phosphorus_mgkg ?? hoveredSample['Phosphorus mg/kg']}</span>
                        </div>
                    ) : null}
                    {showValue(hoveredSample.potassium_k_mgkg) || showValue(hoveredSample['Potassium (K) mg/kg']) ? (
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Potassium (K) mg/kg:</span>
                            <span className={styles.value}>{hoveredSample.potassium_k_mgkg ?? hoveredSample['Potassium (K) mg/kg']}</span>
                        </div>
                    ) : null}
                    {showValue(hoveredSample.magnesium_mg_mgkg) || showValue(hoveredSample['Magnesium (Mg) mg/kg']) ? (
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Magnesium (Mg) mg/kg:</span>
                            <span className={styles.value}>{hoveredSample.magnesium_mg_mgkg ?? hoveredSample['Magnesium (Mg) mg/kg']}</span>
                        </div>
                    ) : null}
                    {showValue(hoveredSample.ph) || showValue(hoveredSample.pH) || showValue(hoveredSample['pH']) ? (
                        <div className={styles.infoItem}>
                            <span className={styles.label}>pH:</span>
                            <span className={styles.value}>{hoveredSample.ph ?? hoveredSample.pH ?? hoveredSample['pH']}</span>
                        </div>
                    ) : null}
                    {showValue(hoveredSample.cn) || showValue(hoveredSample['C/N']) ? (
                        <div className={styles.infoItem}>
                            <span className={styles.label}>C/N:</span>
                            <span className={styles.value}>{hoveredSample.cn ?? hoveredSample['C/N']}</span>
                        </div>
                    ) : null}
                    {showValue(hoveredSample.usda_classification_units_soil_texture) || showValue(hoveredSample['USDA Classification (units) soil texture ']) || showValue(hoveredSample['USDA Classification (units)']) ? (
                        <div className={styles.infoItem}>
                            <span className={styles.label}>USDA Classification (units) / Soil Texture:</span>
                            <span className={styles.value}>{hoveredSample.usda_classification_units_soil_texture ?? hoveredSample['USDA Classification (units) soil texture '] ?? hoveredSample['USDA Classification (units)']}</span>
                        </div>
                    ) : null}
                    {showValue(hoveredSample.coordx) || showValue(hoveredSample.coordX) ? (
                        <div className={styles.infoItem}>
                            <span className={styles.label}>CoordX:</span>
                            <span className={styles.value}>{hoveredSample.coordx ?? hoveredSample.coordX}</span>
                        </div>
                    ) : null}
                    {showValue(hoveredSample.coordy) || showValue(hoveredSample.coordY) ? (
                        <div className={styles.infoItem}>
                            <span className={styles.label}>CoordY:</span>
                            <span className={styles.value}>{hoveredSample.coordy ?? hoveredSample.coordY}</span>
                        </div>
                    ) : null}
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

export default EstoniaHoverInfo;
