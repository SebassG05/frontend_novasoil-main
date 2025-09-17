import React, { useState } from 'react';
import styles from './SamplingDataTable.module.css';

const SamplingDataTable = ({ visible, onClose, data }) => {
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

  // Usar datos por props si existen, si no usar array vacío
  const sampleData = Array.isArray(data) && data.length > 0 ? data : [];

  // Calcular estadísticas
  const totalSamples = sampleData.length;
  const cheSamples = sampleData.filter(sample => sample.type === 'CHE').length;
  const chebioSamples = sampleData.filter(sample => sample.type === 'CHEBIO').length;

  // Función para exportar datos a CSV
  const exportToCSV = () => {
    // Si es Alemania, usar los headers y orden exactos del CSV original
    const bulgariaHeaders = [
      'Soil name (BG classification)', 'Soil name (WRB 2014)', 'Object', 'Coords', 'Sampling ID', 'Sampling date', 'Horizont', 'Depth (cm)', 'Clay content (%)', 'Bulk density (g/cm3)', 'pH (H2O)', 'Organic Matter (%)', 'Organic Carbon (%)', 'Nitrogen (%)', 'Field Capacity (mm)', 'Carbonates (%)', 'Silt (%)', 'Sand (%)', 'Zinc (mg/kg)', 'Degree of solonetization (%)'
    ];
    const isGermany = sampleData.length > 0 && (sampleData[0].co2_land_novasoil_id !== undefined || sampleData[0].CO2_land_Novasoil_ID !== undefined);
  const isBulgaria = sampleData.length > 0 && (sampleData[0].soil_name_bg_classification !== undefined || sampleData[0].soil_name_wrb_2014 !== undefined);
    let csvContent;
    if (isGermany) {
      const germanyHeaders = [
        'CO2_land_Novasoil_ID', 'Coord (Lat & Long)', 'Soil sampling date', 'Nitrates (mg/Kg)', 'Total Cadmium (mg/Kg)', 'Total Aluminum (Al) mg/kg', 'Total Lead (Pb) mg/kg', 'Total Zinc (Zn) mg/kg', 'Sulfur (S) mg/kg', 'Nitrogen (N) %', 'Phosphorus mg/kg', 'Potassium (K) mg/kg', 'Magnesium (Mg) mg/kg', 'Calcium (Ca) mg/kg', 'Sodium mg/kg', 'Boron (B) mg/kg', 'Iron (Fe) mg/kg', 'Copper (Cu) mg/kg', 'Zinc (Zn) mg/kg', 'Manganese (Mn) mg/kg', 'pH', 'Electrical Conductivity (µS/cm)', 'Organic Matter (%w/w)', 'Organic Carbon (mg/ha)', 'C/N', 'Active Lime (% w/w)', 'Carbonates (%)', 'USDA Classification (units) soil texture ', 'Clay %', 'Silt %', 'Sand %', 'C.I.C (mEq/100g)', 'P.S.I (% Exchangeable Sodium)', 'Field Capacity (% w/w)', 'Wilting Point (% w/w)', 'Available Water (% w/w)', '% Base Saturation (% w/w)', 'Bulk Density (g/cc of soil)', 'Water Volume per Ha (m3 /Ha)', 'Saprophytes', 'Anguina spp', 'Aphelenchoides spp', 'Aphelenchus spp', 'Belonolaimus spp', 'Criconema spp', 'Criconemoides spp', 'Ditylenchus spp', 'Globodera spp', 'Helicotylenchus spp', 'Hemicotylenchus spp', 'Hemicyclophora spp', 'Heterodera spp', 'Hoplolaimus spp', 'Longidorus spp', 'Meloidogyne spp', 'Paratylenchus spp', 'Pratylenchus spp', 'Radopholus spp', 'Rotylenchulus spp', 'Trichodorus spp', 'Tylenchulus spp', 'Tylenchus spp', 'Tylencorhynchus spp', 'Xiphinema spp', 'Aureobasidium sp', 'Aspergillus sp', 'Penicillium sp.', 'Mortierella sp.', 'Chaetomium sp.', 'Paecilomyces sp.', 'Thichoderma sp.', 'Didymellaceae', 'Epicoccum sp.', 'Septoria sp.', 'Cladosporium sp.', 'Fusarium sp.', 'Mucorales', 'Phytaceas (Phytopthora) ', 'Acremonium', 'Myrothecium', 'Humicola', 'Helminthosporium sp.'
      ];
      csvContent = [
        germanyHeaders.join(','),
        ...sampleData.map(sample =>
          germanyHeaders.map(h => (sample[h] !== undefined ? sample[h] : sample[h.replace(/ /g, '_').replace(/[().,%/]/g, '').toLowerCase()] || '')).join(',')
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
      const bulgariaHeaderMap = {
        'Soil name (BG classification)': 'soil_name_bg_classification',
        'Soil name (WRB 2014)': 'soil_name_wrb_2014',
        'Object': 'object',
        'Coords': 'coords',
        'Sampling ID': 'sampling_id',
        'Sampling date': 'sampling_date',
        'Horizont': 'horizont',
        'Depth (cm)': 'depth_cm',
        'Clay content (%)': 'clay_content',
        'Bulk density (g/cm3)': 'bulk_density_gcm3',
        'pH (H2O)': 'ph_h2o',
        'Organic Matter (%)': 'organic_matter',
        'Organic Carbon (%)': 'organic_carbon',
        'Nitrogen (%)': 'nitrogen',
        'Field Capacity (mm)': 'field_capacity_mm',
        'Carbonates (%)': 'carbonates',
        'Silt (%)': 'silt',
        'Sand (%)': 'sand',
        'Zinc (mg/kg)': 'zinc_mgkg',
        'Degree of solonetization (%)': 'degree_of_solonetization'
      };
      csvContent = [
        bulgariaHeadersOriginal.join(','),
        ...sampleData.map(sample =>
          bulgariaHeadersOriginal.map(h => sample[bulgariaHeaderMap[h]] !== undefined ? sample[bulgariaHeaderMap[h]] : '').join(',')
        )
      ].join('\n');
    } else if (sampleData.length > 0 && (sampleData[0].case_study_id !== undefined || sampleData[0]['case_study_id'] !== undefined)) {
      // Estonia: usar los nombres normalizados que llegan del backend
      const estoniaHeadersSnake = [
        'case_study_id','field_name','field_id','coord_lat','coord_long','soil_sampling_id','soil_sampling_date','soil_sample_depth','nitrates_mgkg','nitrogen_n','phosphorus_mgkg','potassium_kkg','magnesium_mgkg','calcium_mgkg','ph','soil_texture','organic_carbon','cn','comments','total_aluminum_al_mgkg','total_lead_pb_mgkg','total_zinc_zn_mgkg','sulfur_s_mgkg','manganese_mgkg','electrical_conductivity_uscm','organic_matter','active_lime','carbonates','usda_classification_units','clay','silt','sand','cic_meq_100g','psi_exchangeable_sodium','field_capacity','wilting_point','available_water','base_saturation','bulk_density_gcc_of_soil','water_volume_per_ha_m3_ha','saprophytes','anguina_spp','aphelenchoides_spp','aphelenchus_spp','belonolaimus_spp','criconema_spp','criconemoides_spp','ditylenchus_spp','globodera_spp','helicotylenchus_spp','hemicotylenchus_spp','hemicyclophora_spp','heterodera_spp','hoplolaimus_spp','longidorus_spp','meloidogyne_spp','paratylenchus_spp','pratylenchus_spp','radopholus_spp','rotylenchulus_spp','trichodorus_spp','tylenchulus_spp','tylenchus_spp','tylencorhynchus_spp','xiphinema_spp','aureobasidium_sp','aspergillus_sp','penicillium_sp','mortierella_sp','chaetomium_sp','paecilomyces_sp','thichoderma_sp','didymellaceae','epicoccum_sp','septoria_sp','cladosporium_sp','fusarium_sp','mucorales','phytaceas_phytopthora','acremonium','myrothecium','humicola','helminthosporium_sp'
      ];
      csvContent = [
        estoniaHeadersSnake.join(','),
        ...sampleData.map(sample =>
          estoniaHeadersSnake.map(h => sample[h] !== undefined ? sample[h] : '').join(',')
        )
      ].join('\n');
    } else {
      // Tamarguillo: usar los nombres normalizados que llegan del backend
      const tamarguilloHeadersSnake = [
        'code',
        'id',
        'x_wg84',
        'y_wg84',
        'date',
        'sampling_type',
        'lithology_description',
        'observations'
      ];
      csvContent = [
        tamarguilloHeadersSnake.join(';'),
        ...sampleData.map(sample =>
          tamarguilloHeadersSnake.map(h => sample[h] !== undefined ? sample[h] : '').join(';')
        )
      ].join('\n');
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    let exportFileName = 'tamarguillo';
    if (isGermany) {
      exportFileName = 'alemania';
    } else if (isBulgaria) {
      exportFileName = 'bulgaria';
    } else if (sampleData.length > 0 && (sampleData[0].case_study_id !== undefined || sampleData[0]['case_study_id'] !== undefined)) {
      exportFileName = 'estonia';
    }
    link.setAttribute('download', `${exportFileName}_${new Date().toISOString().slice(0, 10)}.csv`);
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
  const isGermany = allKeys.includes('co2_land_novasoil_id');
  const visibleColumns = allKeys
    .filter(key =>
      sampleData.some(row => row[key] && row[key] !== 'no info' && row[key] !== '') &&
      (!isGermany || !hiddenGermanyColumns.includes(key))
    )
    .map(key => ({ key, label: key }));

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
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Tabla de Muestreo</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar tabla">✕</button>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {visibleColumns.map(col => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
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
                      <td key={col.key}>{row[col.key]}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.footer}>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{totalSamples}</span>
              <span className={styles.statLabel}>Samples</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{cheSamples}</span>
              <span className={styles.statLabel}>CHE</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{chebioSamples}</span>
              <span className={styles.statLabel}>CHEBIO</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.actionBtn} onClick={exportToCSV} title="Export data to CSV file">
              📥 Export Data
            </button>
            <button className={`${styles.actionBtn} ${isUpdating ? styles.actionBtnLoading : ''}`} onClick={updateData} disabled={isUpdating} title={`Última actualización: ${lastUpdated}`}>
              {isUpdating ? (
                <>
                  <span className={styles.spinner}></span>
                  Actualizando...
                </>
              ) : (
                '🔄 Actualizar'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default SamplingDataTable;
