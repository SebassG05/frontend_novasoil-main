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

    return null;
};

export default BulgariaHoverInfo;
