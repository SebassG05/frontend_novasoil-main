import React, { useState, useEffect } from 'react';
import styles from './SamplingDataTable.module.css';

const SamplingDataTable = ({ visible, onClose, data, isItalyCiraa = false, isTamarguillo = false, onDatasetChange, activeDataset: externalActiveDataset }) => {
  // Lista de columnas a ocultar solo para Alemania
  const hiddenGermanyColumns = [
    'nitrates_mgkg',
    'total_cadmium_mgkg',
    'total_aluminum_al_mgkg',
    'total_lead_pb_mgkg',
    'total_zinc_zn_mgkg',
    'sulfur_s_mgkg'
  ];
  if (!visible) return null;



  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString('es-ES'));
  // CIRAA: 'ciraa1', 'ciraa2', 'ciraa3' | Tamarguillo: 'tamarguillo1', 'tamarguillo2', 'tamarguillo3'
  const [activeDataset, setActiveDataset] = useState(externalActiveDataset || (isTamarguillo ? 'tamarguillo1' : 'ciraa1'));

  // Sincronizar con el dataset activo externo (Model3DLayer)
  useEffect(() => {
    if (externalActiveDataset && externalActiveDataset !== activeDataset) {
      setActiveDataset(externalActiveDataset);
    }
  }, [externalActiveDataset]);

  // Si cambia el tab visual (botón), notificar al padre para que cambie el dataset real
  const handleDatasetChange = (newDataset) => {
    setIsTransitioning(true);
    setActiveDataset(newDataset);
    setTimeout(() => {
      if (onDatasetChange && newDataset !== externalActiveDataset) onDatasetChange(newDataset);
    }, 150);
    setTimeout(() => {
      setIsTransitioning(false);
      setTableKey(prev => prev + 1);
    }, 300);
  };
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  // Usar datos por props si existen, si no usar array vacío
  const sampleData = Array.isArray(data) && data.length > 0 ? data : [];

  // Efecto para manejar cambios de datos con animación
  useEffect(() => {
    if (isItalyCiraa || isTamarguillo) {
      setIsTransitioning(true);
      setTableKey(prev => prev + 1);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data, isItalyCiraa, isTamarguillo]);

    // DEBUG: Mostrar props para depuración visual
  useEffect(() => {
    console.log('[SamplingDataTable] Props:', { isItalyCiraa, isTamarguillo, activeDataset: externalActiveDataset, visible, data });
  }, [isItalyCiraa, isTamarguillo, externalActiveDataset, visible, data]);




  // Calcular estadísticas
  const totalSamples = sampleData.length;
  const cheSamples = sampleData.filter(sample => sample.type === 'CHE').length;
  const chebioSamples = sampleData.filter(sample => sample.type === 'CHEBIO').length;

  // Detectar países por sus características únicas
  const isMadrid = sampleData.length > 0 && (
    (sampleData[0]['Case Study ID'] !== undefined || sampleData[0]['case_study_id'] !== undefined) &&
    (sampleData[0]['Latitude'] !== undefined || sampleData[0]['latitude'] !== undefined) &&
    (sampleData[0]['Longitude'] !== undefined || sampleData[0]['longitude'] !== undefined)
  );
  const isItaly = sampleData.length > 0 && (
    sampleData[0]['Nitrogen (N) ‰'] !== undefined || 
    sampleData[0]['Cation exchange capacity(mEq/100g)'] !== undefined ||
    sampleData[0]['nitrogen_n_permille'] !== undefined ||
    sampleData[0]['cation_exchange_capacity_meq100g'] !== undefined
  );
  const isLetonia = sampleData.length > 0 && !isMadrid && !isItaly && (
    (sampleData[0]['case_study_id'] !== undefined || sampleData[0]['Case Study ID'] !== undefined) &&
    (sampleData[0]['coord_lat__long'] !== undefined || sampleData[0]['Coord (Lat & Long)'] !== undefined)
  );
  const isEstonia = sampleData.length > 0 && !isMadrid && !isItaly && !isLetonia && (sampleData[0]['Case Study ID'] !== undefined || sampleData[0]['case_study_id'] !== undefined);

  // Función para exportar datos a CSV
  const exportToCSV = () => {
    // Si es Alemania, usar los headers y orden exactos del CSV original
    const bulgariaHeaders = [
      'Soil name (BG classification)', 'Soil name (WRB 2014)', 'Object', 'Coords', 'Sampling ID', 'Sampling date', 'Horizont', 'Depth (cm)', 'Clay content (%)', 'Bulk density (g/cm3)', 'pH (H2O)', 'Organic Matter (%)', 'Organic Carbon (%)', 'Nitrogen (%)', 'Field Capacity (mm)', 'Carbonates (%)', 'Silt (%)', 'Sand (%)', 'Zinc (mg/kg)', 'Degree of solonetization (%)'
    ];
    const isGermany = sampleData.length > 0 && (sampleData[0].co2_land_novasoil_id !== undefined || sampleData[0].CO2_land_Novasoil_ID !== undefined);
    const isBulgaria = sampleData.length > 0 && (sampleData[0]['Soil name (BG classification)'] !== undefined || sampleData[0]['Soil name (WRB 2014)'] !== undefined);
    const isMadrid = sampleData.length > 0 && (
      (sampleData[0]['Case Study ID'] !== undefined || sampleData[0]['case_study_id'] !== undefined) &&
      (sampleData[0]['Latitude'] !== undefined || sampleData[0]['latitude'] !== undefined) &&
      (sampleData[0]['Longitude'] !== undefined || sampleData[0]['longitude'] !== undefined)
    );
    const isItaly = sampleData.length > 0 && (
      sampleData[0]['Nitrogen (N) ‰'] !== undefined || 
      sampleData[0]['Cation exchange capacity(mEq/100g)'] !== undefined ||
      sampleData[0]['nitrogen_n_permille'] !== undefined ||
      sampleData[0]['cation_exchange_capacity_meq100g'] !== undefined
    );
    const isLetonia = sampleData.length > 0 && !isMadrid && !isItaly && (
      (sampleData[0]['case_study_id'] !== undefined || sampleData[0]['Case Study ID'] !== undefined) &&
      (sampleData[0]['coord_lat__long'] !== undefined || sampleData[0]['Coord (Lat & Long)'] !== undefined)
    );
    let csvContent;
    if (isAsajaTable) {
      // Exportar todos los campos presentes en el CSV original de Asaja
      const asajaHeaders = allKeys;
      csvContent = [
        asajaHeaders.join(';'),
        ...sampleData.map(sample =>
          asajaHeaders.map(h => sample[h] !== undefined ? sample[h] : '').join(';')
        )
      ].join('\n');
    } else if (isGermany) {
      // Alemania: exportar exactamente lo que se ve en la tabla (columnas visibles y datos procesados)
      csvContent = [
        visibleColumns.map(col => col.label).join(';'),
        ...processedData.map(row =>
          visibleColumns.map(col => row[col.key] !== undefined ? row[col.key] : '').join(';')
        )
      ].join('\n');
  } else if (isBulgaria) {
      // Mapear headers originales a campos normalizados
      const bulgariaHeadersOriginal = [
        'Soil name (BG classification)',
        'Soil name (WRB 2014)',
        'Object',
        'Coords',
        'Sampling ID',
        'Sampling date',
        'Horizont',
        'Depth (cm)',
        'Clay content (%)',
        'Bulk density (g/cm3)',
        'pH (H2O)',
        'Organic Matter (%)',
        'Organic Carbon (%)',
        'Nitrogen (%)',
        'Field Capacity (mm)',
        'Carbonates (%)',
        'Silt (%)',
        'Sand (%)',
        'Zinc (mg/kg)',
        'Degree of solonetization (%)'
      ];
      csvContent = [
        bulgariaHeadersOriginal.join(','),
        ...sampleData.map(sample =>
          bulgariaHeadersOriginal.map(h => sample[h] !== undefined ? sample[h] : '').join(',')
        )
      ].join('\n');
    } else if (isItaly) {
      // Headers específicos para Italia
      const italyHeaders = [
        'Case Study ID',
        'Coord (Lat & Long)',
        'Soil sampling date',
        'Soil sample depth',
        'Nitrates (mg/Kg)',
        'Nitrogen (N) ‰',
        'Phosphorus mg/kg',
        'Potassium (K) mg/kg',
        'pH',
        'Electrical Conductivity (µS/cm)',
        'Organic Matter (%w/w)',
        'Organic Carbon (%)',
        'C/N',
        'Active Lime (% w/w)',
        'Carbonates (‰)',
        'USDA Classification (units)',
        'Clay %',
        'Silt %',
        'Sand %',
        'Cation exchange capacity(mEq/100g)',
        'P.S.I (% Exchangeable Sodium)',
        'Bulk Density (g/cc of soil)',
        'Water Volume per Ha (m3 /Ha)'
      ];
      csvContent = [
        italyHeaders.join(','),
        ...sampleData.map(sample =>
          italyHeaders.map(h => sample[h] !== undefined ? sample[h] : sample[h.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()] || '').join(',')
        )
      ].join('\n');
    } else if (isLetonia) {
      // ...código Letonia...
      const letoniaHeaders = [
        'Case Study ID','Coord (Lat & Long)','Soil sampling ID','Soil sampling date','Soil sample depth','Nitrates (mg/Kg)','Total Cadmium (mg/Kg)','Total Aluminum (Al) mg/kg','Total Lead (Pb) mg/kg','Total Zinc (Zn) mg/kg','Sulfur (S) mg/kg','Nitrogen (N) %','Phosphorus mg/kg','Potassium (K) mg/kg','Magnesium (Mg) mg/kg','Calcium (Ca) mg/kg','Sodium mg/kg','Boron (B) mg/kg','Iron (Fe) mg/kg','Copper (Cu) mg/kg','Zinc (Zn) mg/kg','Manganese (Mn) mg/kg','pH','Electrical Conductivity (µS/cm)','Organic Matter (%w/w)','Organic Carbon (mg/ha)','C/N','Active Lime (% w/w)','Carbonates (%)','USDA Classification (units)','Clay %','Silt %','Sand %','C.I.C (mEq/100g)','P.S.I (% Exchangeable Sodium)','Field Capacity (% w/w)','Wilting Point (% w/w)','Available Water (% w/w)','% Base Saturation (% w/w)','Bulk Density (g/cc of soil)','Water Volume per Ha (m3 /Ha)','Saprophytes','Anguina spp','Aphelenchoides spp','Aphelenchus spp','Belonolaimus spp','Criconema spp','Criconemoides spp','Ditylenchus spp','Globodera spp','Helicotylenchus spp','Hemicotylenchus spp','Hemicyclophora spp','Heterodera spp','Hoplolaimus spp','Longidorus spp','Meloidogyne spp','Paratylenchus spp','Pratylenchus spp','Radopholus spp','Rotylenchulus spp','Trichodorus spp','Tylenchulus spp','Tylenchus spp','Tylencorhynchus spp','Xiphinema spp','Aureobasidium sp','Aspergillus sp','Penicillium sp.','Mortierella sp.','Chaetomium sp.','Paecilomyces sp.','Thichoderma sp.','Didymellaceae','Epicoccum sp.','Septoria sp.','Cladosporium sp.','Fusarium sp.','Mucorales','Phytaceas (Phytopthora) ','Acremonium','Myrothecium','Humicola','Helminthosporium sp.'
      ];
      csvContent = [
        letoniaHeaders.join(','),
        ...sampleData.map(sample =>
          letoniaHeaders.map(h => sample[h] !== undefined ? sample[h] : sample[h.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()] || '').join(',')
        )
      ].join('\n');
    } else if (isMadrid) {
      // Madrid: exportar exactamente lo que se ve en la tabla (columnas visibles y datos procesados)
      csvContent = [
        visibleColumns.map(col => col.label).join(';'),
        ...processedData.map(row =>
          visibleColumns.map(col => row[col.key] !== undefined ? row[col.key] : '').join(';')
        )
      ].join('\n');
    } else if (isItalyCiraa) {
      // CIRAA: exportar todas las columnas presentes en los datos
      const ciraaHeaders = Object.keys(sampleData[0] || {}).filter(key => 
        sampleData.some(row => row[key] !== undefined && row[key] !== '' && row[key] !== null)
      );
      csvContent = [
        ciraaHeaders.join(','),
        ...sampleData.map(sample =>
          ciraaHeaders.map(h => sample[h] !== undefined ? sample[h] : '').join(',')
        )
      ].join('\n');
    } else if (isEstonia) {
      // Estonia: usar los headers originales del CSV
      const estoniaHeaders = [
        'Case Study ID','Field name','Field ID','Coord (Lat)','Coord (Long)','Soil sampling ID','Soil sampling date','Soil sample depth','Nitrates (mg/Kg)','Nitrogen (N) %','Phosphorus mg/kg','Potassium (K) mg/kg','Magnesium (Mg) mg/kg','Calcium (Ca) mg/kg','pH','Soil Texture','Organic Carbon (%)','C/N','Comments','Total Aluminum (Al) mg/kg','Total Lead (Pb) mg/kg','Total Zinc (Zn) mg/kg','Sulfur (S) mg/kg','Manganese (Mn) mg/kg','Electrical Conductivity (µS/cm)','Organic Matter (%w/w)','Active Lime (% w/w)','Carbonates (%)','USDA Classification (units)','Clay %','Silt %','Sand %','C.I.C (mEq/100g)','P.S.I (% Exchangeable Sodium)','Field Capacity (% w/w)','Wilting Point (% w/w)','Available Water (% w/w)','% Base Saturation (% w/w)','Bulk Density (g/cc of soil)','Water Volume per Ha (m3 /Ha)','Saprophytes','Anguina spp','Aphelenchoides spp','Aphelenchus spp','Belonolaimus spp','Criconema spp','Criconemoides spp','Ditylenchus spp','Globodera spp','Helicotylenchus spp','Hemicotylenchus spp','Hemicyclophora spp','Heterodera spp','Hoplolaimus spp','Longidorus spp','Meloidogyne spp','Paratylenchus spp','Pratylenchus spp','Radopholus spp','Rotylenchulus spp','Trichodorus spp','Tylenchulus spp','Tylenchus spp','Tylencorhynchus spp','Xiphinema spp','Aureobasidium sp','Aspergillus sp','Penicillium sp.','Mortierella sp.','Chaetomium sp.','Paecilomyces sp.','Thichoderma sp.','Didymellaceae','Epicoccum sp.','Septoria sp.','Cladosporium sp.','Fusarium sp.','Mucorales','Phytaceas (Phytopthora) ','Acremonium','Myrothecium','Humicola','Helminthosporium sp.'
      ];
      csvContent = [
        estoniaHeaders.join(','),
        ...sampleData.map(sample =>
          estoniaHeaders.map(h => sample[h] !== undefined ? sample[h] : '').join(',')
        )
      ].join('\n');
    } else {
      // Tamarguillo: exportar exactamente lo que se ve en la tabla (columnas visibles y datos procesados)
      csvContent = [
        visibleColumns.map(col => col.label).join(';'),
        ...processedData.map(row =>
          visibleColumns.map(col => row[col.key] !== undefined ? row[col.key] : '').join(';')
        )
      ].join('\n');
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    let exportFileName = 'tamarguillo';
    if (isTamarguillo) {
      // Usar el texto del botón activo para el nombre del archivo
      if (activeDataset === 'tamarguillo1') {
        exportFileName = 'General_Information';
      } else if (activeDataset === 'tamarguillo2') {
        exportFileName = 'Depth_25_50_cm';
      } else if (activeDataset === 'tamarguillo3') {
        exportFileName = 'Depth_0_25_cm';
      } else {
        exportFileName = 'tamarguillo';
      }
    } else if (isAsajaTable) {
      exportFileName = 'Asaja';
    } else if (isGermany) {
      exportFileName = 'alemania';
    } else if (isBulgaria) {
      exportFileName = 'bulgaria';
    } else if (isItaly) {
      exportFileName = 'ItaliaCaseStudy2';
    } else if (isItalyCiraa) {
      // Para CIRAA, usar nombre específico según el tab activo
      if (activeDataset === 'ciraa1') {
        exportFileName = 'cover_crops';
      } else if (activeDataset === 'ciraa2') {
        exportFileName = 'tillage_systems';
      } else if (activeDataset === 'ciraa3') {
        exportFileName = 'mascot_project';
      } else {
        exportFileName = 'italy_ciraa';
      }
    } else if (isLetonia) {
      exportFileName = 'letonia';
    } else if (isMadrid) {
      exportFileName = 'madrid';
    } else if (sampleData.length > 0 && (sampleData[0]['Case Study ID'] !== undefined || sampleData[0]['case_study_id'] !== undefined)) {
      exportFileName = 'estonia';
    }
    link.setAttribute('download', `${exportFileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('NovaSOIL - Exportación Exitosa', {
        body: `Se han exportado ${sampleData.length} muestras a CSV`,
        icon: '/favicon.ico'
      });
    }
  };

  // Función para simular actualización de datos
  const updateData = async () => {
    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastUpdated(new Date().toLocaleString('es-ES'));
    } finally {
      setIsUpdating(false);
    }
  };

  // Detectar todas las claves presentes en los datos
  const allKeys = sampleData.reduce((keys, row) => {
    Object.keys(row).forEach(k => {
      if (!keys.includes(k)) keys.push(k);
    });
    return keys;
  }, []);

  // Generar columnas dinámicas
  // Detectar si es Alemania por la presencia de la columna 'co2_land_novasoil_id'
  const isGermanyTable = allKeys.includes('co2_land_novasoil_id');
  const isBulgariaTable = allKeys.includes('Soil name (BG classification)') || allKeys.includes('Soil name (WRB 2014)');
  const isMadridTable = allKeys.includes('Latitude') && allKeys.includes('Longitude') && allKeys.includes('Case Study ID');
  const isItalyTable = allKeys.includes('Nitrogen (N) ‰') || allKeys.includes('Cation exchange capacity(mEq/100g)') || allKeys.includes('nitrogen_n_permille') || allKeys.includes('cation_exchange_capacity_meq100g');
  // Detectar tabla Asaja por columnas únicas (normalizadas)
  const isAsajaTable = allKeys.includes('coord_x') && allKeys.includes('coord_y') && allKeys.includes('parcela');
  let visibleColumns;
  if (isMadridTable || isItalyTable) {
    // Mostrar todas las columnas presentes en el CSV de Madrid e Italia, excepto las vacías en todas las filas
    visibleColumns = allKeys
      .filter(key => sampleData.some(row => row[key] && row[key] !== 'no info' && row[key] !== ''))
      .map(key => ({ key, label: key }));
  } else if (isAsajaTable) {
    // Mostrar todas las columnas presentes en el CSV de Asaja, excepto las vacías en todas las filas
    visibleColumns = allKeys
      .filter(key => sampleData.some(row => row[key] && row[key] !== 'no info' && row[key] !== ''))
      .map(key => ({ key, label: key }));
  } else {
    visibleColumns = allKeys
      .filter(key =>
        sampleData.some(row => row[key] && row[key] !== 'no info' && row[key] !== '') &&
        (!isGermanyTable || !hiddenGermanyColumns.includes(key))
      )
      .map(key => ({ key, label: key }));
  }

  // Preprocesar sampleData para coordX/coordY si existen
  const processedData = sampleData.map(sample => {
    let coordX = sample.coordX || '';
    let coordY = sample.coordY || '';
    // Si hay una columna coordinates tipo string con ;
    if (typeof sample.coordinates === 'string' && sample.coordinates.includes(';')) {
      [coordX, coordY] = sample.coordinates.split(';').map(c => c.trim());
    }
    return { ...sample, coordX, coordY };
  });

  return (
  <div className={`${styles.overlay} sampling-table-modal`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Sampling table</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar tabla">✕</button>
        </div>
        <div className={`${styles.tableWrapper} ${isTransitioning ? styles.fadeOut : styles.fadeIn}`}>
          {isTransitioning && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}></div>
            </div>
          )}
          <table className={styles.table} key={tableKey}>
            <thead>
              <tr>
                {visibleColumns.map(col => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.tableContent}>
              {processedData.length === 0 ? (
                <tr>
                  <td colSpan={visibleColumns.length} className={styles.emptyState}>
                    <div className={styles.emptyContent}>
                      <div className={styles.emptyIcon}>📊</div>
                      <p className={styles.emptyText}>No hay datos disponibles</p>
                      <p className={styles.emptySubtext}>Los datos de análisis aparecerán aquí una vez procesados</p>
                    </div>
                  </td>
                </tr>
              ) : (
                processedData.map((row, idx) => (
                  <tr key={idx} className={styles.dataRow}>
                    {visibleColumns.map(col => (
                      <td key={col.key}>
                        {typeof row[col.key] === 'object' && row[col.key] !== null
                          ? Array.isArray(row[col.key])
                            ? row[col.key].join(';')
                            : row[col.key].longitude !== undefined && row[col.key].latitude !== undefined
                              ? `${row[col.key].longitude};${row[col.key].latitude}`
                              : JSON.stringify(row[col.key])
                          : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Botones para cambiar dataset de Italy CIRAA o Tamarguillo */}
  {/* Solo mostrar los botones de un dataset a la vez */}
  {isItalyCiraa && !isTamarguillo && (
    <div className={styles.datasetSwitcher}>
      <button 
        onClick={() => handleDatasetChange('ciraa1')}
        className={`${styles.datasetButton} ${activeDataset === 'ciraa1' ? styles.datasetButtonActive : ''}`}
      >
        🌱 Cover Crops
      </button>
      <button 
        onClick={() => handleDatasetChange('ciraa2')}
        className={`${styles.datasetButton} ${activeDataset === 'ciraa2' ? styles.datasetButtonActive : ''}`}
      >
        🚜 Tillage Systems
      </button>
      <button 
        onClick={() => handleDatasetChange('ciraa3')}
        className={`${styles.datasetButton} ${activeDataset === 'ciraa3' ? styles.datasetButtonActive : ''}`}
      >
        🌿 MASCOT Project
      </button>
    </div>
  )}
  {isTamarguillo && !isItalyCiraa && (
    <div className={styles.datasetSwitcher}>
      <button
        onClick={() => handleDatasetChange('tamarguillo1')}
        className={`${styles.datasetButton} ${activeDataset === 'tamarguillo1' ? styles.datasetButtonActive : ''}`}
      >
        🟢 General Information
      </button>
      <button
        onClick={() => handleDatasetChange('tamarguillo3')}
        className={`${styles.datasetButton} ${activeDataset === 'tamarguillo3' ? styles.datasetButtonActive : ''}`}
      >
        🟣 Depth 0 - 25 cm
      </button>
      <button
        onClick={() => handleDatasetChange('tamarguillo2')}
        className={`${styles.datasetButton} ${activeDataset === 'tamarguillo2' ? styles.datasetButtonActive : ''}`}
      >
        🟡 Depth 25 - 50 cm
      </button>
    </div>
  )}
        
        <div className={styles.footer}>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{totalSamples}</span>
              <span className={styles.statLabel}>Samples</span>
            </div>
            {/* CHE y CHEBIO ocultos para Tamarguillo */}
          </div>
          <div className={styles.actions}>
            <button className={styles.actionBtn} onClick={exportToCSV} title="Export data to CSV file">
              📥 Export Data
            </button>
            <button className={`${styles.actionBtn} ${isUpdating ? styles.actionBtnLoading : ''}`} onClick={updateData} disabled={isUpdating} title={`Última actualización: ${lastUpdated}`}>
              {isUpdating ? (
                <>
                  <span className={styles.spinner}></span>
                  Updating...
                </>
              ) : (
                '🔄 UPDATE'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default SamplingDataTable;
