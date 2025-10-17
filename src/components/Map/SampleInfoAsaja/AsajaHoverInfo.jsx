import React, { useState, useEffect } from 'react';
import styles from './AsajaHoverInfo.module.css';
import { useMapStore } from '../../../store/mapStore';

const AsajaHoverInfo = () => {
    // Utilidad para mostrar valores limpios
    const showValue = (value) => {
        if (!value || value === 'NA') return <span style={{color:'#888', opacity:0.7}}>N/A</span>;
        return value;
    };
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
                <h3 className={styles.title}>{showValue(hoveredSample.referencia) || showValue(hoveredSample.parcela) || 'Sample'}</h3>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}><span className={styles.label}>Referencia:</span><span className={styles.value}>{showValue(hoveredSample.referencia)}</span></div>
                    <div className={styles.infoItem}><span className={styles.label}>Parcela:</span><span className={styles.value}>{showValue(hoveredSample.parcela)}</span></div>
                    <div className={styles.infoItem}><span className={styles.label}>pH (15):</span><span className={styles.value}>{showValue(hoveredSample.ph_15)}</span></div>
                    <div className={styles.infoItem}><span className={styles.label}>Textura:</span><span className={styles.value}>{showValue(hoveredSample.textura)}</span></div>
                    <div className={styles.infoItem}><span className={styles.label}>Carbono Orgánico:</span><span className={styles.value}>{showValue(hoveredSample.carbono_organico)}</span></div>
                    <div className={styles.infoItem}><span className={styles.label}>Coord X:</span><span className={styles.value}>{showValue(hoveredSample.coord_x)}</span></div>
                    <div className={styles.infoItem}><span className={styles.label}>Coord Y:</span><span className={styles.value}>{showValue(hoveredSample.coord_y)}</span></div>
                </div>
            </div>
        </div>
    );
};

export default AsajaHoverInfo;
