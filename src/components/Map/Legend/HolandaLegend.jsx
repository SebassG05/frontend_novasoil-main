import React from 'react';
import { firstSoilcodeColors } from '../../../config/holandaLegend';
import styles from './HolandaLegend.module.css';

// Puedes mejorar el formato de los nombres si tienes un mapeo nombre-código
export default function HolandaLegend() {
  return (
    <aside className={styles.legendContainer}>
      <h3 className={styles.legendTitle}>Legend of soil types</h3>
      <div className={styles.legendList}>
        {Object.entries(firstSoilcodeColors).map(([code, color]) => (
          <div key={code} className={styles.legendItem}>
            <span className={styles.colorBox} style={{ background: color }} />
            <span className={styles.code}>{code}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, textAlign: 'center' }}>
        <a
          href="/holanda/documentoLeyendaTiposdeSuelo.pdf"
          download
          style={{
            color: '#2563eb',
            fontWeight: 400,
            textDecoration: 'none',
            fontSize: '0.57rem',
            cursor: 'pointer',
            letterSpacing: '0.01em',
            transition: 'color 0.18s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            borderRadius: 6,
            padding: '3px 10px 3px 7px',
            background: 'rgba(37,99,235,0.07)',
            boxShadow: '0 1px 3px rgba(37,99,235,0.07)',
            border: '1px solid #e3e8ee',
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(37,99,235,0.13)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(37,99,235,0.07)'}
        >
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{marginRight:3,marginLeft:0,verticalAlign:'middle'}} xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="#2563eb" strokeWidth="2" fill="#fff"/>
            <rect x="9.1" y="6.2" width="1.8" height="1.8" rx="0.9" fill="#2563eb"/>
            <rect x="9.1" y="9.2" width="1.8" height="5.2" rx="0.9" fill="#2563eb"/>
          </svg>
          <span style={{textDecoration:'underline'}}>Download for more info</span>
        </a>
      </div>
    </aside>
  );
}
