import React from 'react';
import soilStyles from '../SoilHealthTable/SoilHealthTable.module.css';

const bigCardStyle = {
  minWidth: '200px',
  maxWidth: '200px',
  minHeight: '200px',
  maxHeight: '200px',
  padding: '2.2rem 1.2rem 1.2rem 1.2rem',
  gap: '0.7rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export const GeneralDocuments = ({ onClick }) => {
  return (
    <button className={soilStyles.card} style={bigCardStyle} onClick={onClick} aria-label="Ver documentos generales">
      <span style={{marginBottom: '0.7rem'}}>
        {/* Icono de carpeta/documento */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="12" width="32" height="26" rx="6" fill="#f3f4f6" stroke="#7ec46e" strokeWidth="2"/>
          <rect x="6" y="6" width="14" height="10" rx="3" fill="#7ec46e" stroke="#7ec46e" strokeWidth="2"/>
          <rect x="22" y="6" width="16" height="10" rx="3" fill="#eafbe7" stroke="#7ec46e" strokeWidth="2"/>
        </svg>
      </span>
      <span className={soilStyles.cardLabel}>General Documents</span>
      <span className={soilStyles.cardGroup}>DOCUMENTS</span>
    </button>
  );
};

export const SpecialDocuments = ({ onClick }) => {
  return (
    <button className={soilStyles.card} style={bigCardStyle} onClick={onClick} aria-label="Ver documentos especiales">
      <span style={{marginBottom: '0.7rem'}}>
        {/* Icono de estrella/documento especial */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="12" width="32" height="29" rx="6" fill="#f3f4f6" stroke="#f7b731" strokeWidth="2"/>
          <rect x="6" y="6" width="14" height="10" rx="3" fill="#f7b731" stroke="#f7b731" strokeWidth="2"/>
          <rect x="22" y="6" width="16" height="10" rx="3" fill="#ffe9b3" stroke="#f7b731" strokeWidth="2"/>
          <polygon points="22,22 24,28 30,28 25,32 27,38 22,34 17,38 19,32 14,28 20,28" fill="#f7b731" stroke="#e2a500" strokeWidth="1"/>
        </svg>
      </span>
      <span className={soilStyles.cardLabel}>Special Documents</span>
      <span className={soilStyles.cardGroup}>SPECIAL</span>
    </button>
  );
};
