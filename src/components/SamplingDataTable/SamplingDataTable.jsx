import React, { useState, useEffect } from 'react';
import styles from './SamplingDataTable.module.css';

const SamplingDataTable = ({ visible, onClose, data, isItalyCiraa = false, isTamarguillo = false, onDatasetChange, activeDataset: externalActiveDataset }) => {
  // Lista de columnas a ocultar solo para Alemania (nombres tal como salen tras limpiar espacios/caracteres)
  // Usaremos comparación normalizada (sin caracteres especiales y en lower case) para ser robustos
  const hiddenGermanyColumns = [
    'Nitrates_mgKg',
    'Total_Cadmium_mgKg',
    'Total_Aluminum_Al_mgkg',
    'Total_Lead_Pb_mgkg',
    'Total_Zinc_Zn_mgkg',
    'Sulfur_S_mgkg'
  ];
  const hiddenGermanySet = new Set(hiddenGermanyColumns.map(h => String(h).trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()));
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
      // Bulgaria: exportar exactamente lo que se ve en la tabla (columnas visibles y datos procesados)
      csvContent = [
        visibleColumns.map(col => col.label).join(';'),
        ...processedData.map(row =>
          visibleColumns.map(col => row[col.key] !== undefined ? row[col.key] : '').join(';')
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
        // Letonia: exportar exactamente lo que se ve en la tabla (columnas visibles y datos procesados)
        csvContent = [
          visibleColumns.map(col => col.label).join(';'),
          ...processedData.map(row =>
            visibleColumns.map(col => row[col.key] !== undefined ? row[col.key] : '').join(';')
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
    if (isAsajaTable) {
      link.setAttribute('download', `Olive groves Integrated Production.csv`);
    } else if (isTamarguillo) {
      if (activeDataset === 'tamarguillo1') {
        link.setAttribute('download', 'General_Information.csv');
      } else if (activeDataset === 'tamarguillo2') {
        link.setAttribute('download', 'Depth_25_50_cm.csv');
      } else if (activeDataset === 'tamarguillo3') {
        link.setAttribute('download', 'Depth_0_25_cm.csv');
      } else {
        link.setAttribute('download', 'tamarguillo.csv');
      }
    } else if (isGermany) {
      link.setAttribute('download', 'Bodenfruchtbarkeitsfonds.csv');
    } else if (isBulgaria) {
      link.setAttribute('download', 'Integrated production in the vineyards with vinery and rural tourism.csv');
    } else if (isItaly) {
      link.setAttribute('download', 'A model for multifunctional and sustainable development of marginal areas.csv');
    } else if (isItalyCiraa) {
      if (activeDataset === 'ciraa1') {
        link.setAttribute('download', 'cover_crops.csv');
      } else if (activeDataset === 'ciraa2') {
        link.setAttribute('download', 'tillage_systems.csv');
      } else if (activeDataset === 'ciraa3') {
        link.setAttribute('download', 'mascot_project.csv');
      } else {
        link.setAttribute('download', 'italy_ciraa.csv');
      }
    } else if (isLetonia) {
      link.setAttribute('download', 'Crop ZSA production and animal farming.csv');
    } else if (isMadrid) {
      link.setAttribute('download', 'Organic Vineyards.csv');
    } else if (sampleData.length > 0 && (sampleData[0]['Case Study ID'] !== undefined || sampleData[0]['case_study_id'] !== undefined)) {
      link.setAttribute('download', 'Integrated Production.csv');
    } else {
      link.setAttribute('download', 'Olive groves Integrated Production.csv');
    }
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

  // Detectar todas las claves presentes en los datos, excluyendo claves internas (p.ej. __originalHeaderMap)
  const allKeys = sampleData.reduce((keys, row) => {
    Object.keys(row).forEach(k => {
      if (typeof k === 'string' && k.startsWith('__')) return; // ignore internal fields
      if (!keys.includes(k)) keys.push(k);
    });
    return keys;
  }, []);

  // Si el backend proporcionó un mapa de encabezados originales (p.ej. para Alemania), haremos uso de él
  const originalHeaderMap = sampleData.length > 0 ? sampleData[0].__originalHeaderMap || {} : {};

  // Función para formatear labels: preferir el label original si existe, si no convertir snake_case/camelCase a Title Case
  const formatHeaderLabel = (key) => {
    if (!key || typeof key !== 'string') return key;
    if (originalHeaderMap && originalHeaderMap[key]) return originalHeaderMap[key];
    // Reemplazar guiones/underscores y normalizar espacios
    const s = key.replace(/[_\-]+/g, ' ').replace(/\s+/g, ' ').trim();
    // Si parece estar todo en mayúsculas, devolverlo tal cual (posible acrónimo)
    if (s === s.toUpperCase()) return s;
    // Convertir a Title Case (Primera letra mayúscula, resto minúscula) para cada palabra
    return s.split(' ').map(w => w.length > 0 ? w[0].toUpperCase() + w.slice(1).toLowerCase() : '').join(' ');
  };

  // Generar columnas dinámicas
  // Detectar si es Alemania por la presencia de la columna 'co2_land_novasoil_id' (case-insensitive)
  const isGermanyTable = allKeys.some(k => String(k).trim().toLowerCase() === 'co2_land_novasoil_id');
  const isBulgariaTable = allKeys.includes('Soil name (BG classification)') || allKeys.includes('Soil name (WRB 2014)');
  const isMadridTable = allKeys.includes('Latitude') && allKeys.includes('Longitude') && allKeys.includes('Case Study ID');
  const isItalyTable = allKeys.includes('Nitrogen (N) ‰') || allKeys.includes('Cation exchange capacity(mEq/100g)') || allKeys.includes('nitrogen_n_permille') || allKeys.includes('cation_exchange_capacity_meq100g');
  // Detectar tabla Asaja por columnas únicas (normalizadas)
  const allKeysLower = allKeys.map(k => k.toLowerCase());
  const isAsajaTable = (allKeysLower.includes('coord_x') && allKeysLower.includes('coord_y'));
  let visibleColumns;
  if (isMadridTable || isItalyTable) {
    // Mostrar todas las columnas presentes en el CSV de Madrid e Italia, excepto las vacías en todas las filas
    // Para Madrid ocultar columnas redundantes de coordenadas y columnas con nombres tipo _###
    const madridHiddenRegex = /^_\d{1,4}$/; // p.ej. _124 _125 _126
    visibleColumns = allKeys
      .filter(key =>
        sampleData.some(row => row[key] && row[key] !== 'no info' && row[key] !== '') &&
        !(isMadridTable && (key.toLowerCase() === 'latitude' || key.toLowerCase() === 'longitude' || madridHiddenRegex.test(key.trim())))
      )
  .map(key => ({ key, label: formatHeaderLabel(key) }));
  } else if (isAsajaTable) {
    // Mostrar todas las columnas presentes en el CSV de Asaja, excepto las vacías en todas las filas
    visibleColumns = allKeys
      .filter(key => sampleData.some(row => row[key] && row[key] !== 'no info' && row[key] !== ''))
      .map(key => ({ key, label: formatHeaderLabel(key) }));
  } else {
    // Para Estonia ocultamos explícitamente las columnas de latitud/longitud (lat, lon, latitude, longitude, coord (lat), coord (long), coords)
    const coordKeys = ['lat', 'lon', 'latitude', 'longitude', 'coord (lat)', 'coord (long)', 'coords', 'coord_x', 'coord_y', 'coordx', 'coordy'];
  // Para Bulgaria ocultar columnas pequeñas/numéricas que aparecen como ".20", ".21", ".22" u otras variantes
  const bulgariaNumericHeaderRegex = /^[_\.]?\d{1,3}$/; // ejemplo: .20  _21  22
  // Además ocultar columnas relacionadas con coordenadas en formato DMS (por ejemplo 'COORDS') para Bulgaria
  const bulgariaCoordKeyRegex = /coord/i;
  // Para Alemania ocultar únicamente la columna de coordenadas en DMS: 'coord_lat__long' o variantes similares
  const germanyCoordExactRegex = /^coord[_\s-]*lat[_\s-]*_{0,2}long$/i;
  visibleColumns = allKeys
      .filter(key =>
        sampleData.some(row => row[key] && row[key] !== 'no info' && row[key] !== '') &&
        // Para Alemania usar comparación normalizada (case-insensitive) contra el set oculto
        (!isGermanyTable || !hiddenGermanySet.has(String(key).trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase())) &&
        // Si es Estonia, filtrar claves de coordenadas
        !(isEstonia && coordKeys.includes(key.toLowerCase())) &&
  // Si es Bulgaria, filtrar columnas que son solo números o comienzan por . o _ seguidas de números
  !(isBulgariaTable && bulgariaNumericHeaderRegex.test(key.trim())) &&
  // Si es Bulgaria, filtrar columnas que contienen 'coord' (p.ej. la columna COORDS en DMS)
  !(isBulgariaTable && bulgariaCoordKeyRegex.test(key))
  &&
  // Si es Alemania, filtrar únicamente la columna coord_lat__long (no coordx/coordy)
  !(isGermanyTable && germanyCoordExactRegex.test(key.trim()))
      )
    .map(key => ({ key, label: isBulgariaTable ? formatHeaderLabel(key) : (isTamarguillo ? formatHeaderLabel(key) : (originalHeaderMap[key] || key)) }));
  }

  // Para Italia (CIRAA / Flora) forzar labels formateados si corresponde
  if ((isItalyTable || isItalyCiraa) && Array.isArray(visibleColumns)) {
    visibleColumns = visibleColumns.map(c => ({ ...c, label: formatHeaderLabel(c.key) }));
  }

  // Para Letonia y Estonia forzar labels formateados
  if ((isLetonia || isEstonia) && Array.isArray(visibleColumns)) {
    visibleColumns = visibleColumns.map(c => ({ ...c, label: formatHeaderLabel(c.key) }));
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

  // Normalizaciones extras para Tamarguillo
  // Problema: algunos valores vienen partidos en dos columnas con comillas, p.ej. '"0' y '92"'
  // Queremos unirlos en un único valor '0,92' y eliminar comillas sobrantes.
  if (isTamarguillo && processedData.length > 0) {
    processedData.forEach(row => {
      const keys = Object.keys(row);
      // Primero combinamos pares partidos por comillas (basado en el valor original)
      for (let i = 0; i < keys.length - 1; i++) {
        const aKey = keys[i];
        const bKey = keys[i + 1];
        const aRaw = row[aKey] !== undefined && row[aKey] !== null ? String(row[aKey]) : '';
        const bRaw = row[bKey] !== undefined && row[bKey] !== null ? String(row[bKey]) : '';
        const aTrim = aRaw.trim();
        const bTrim = bRaw.trim();
        // Patrón: a comienza con comilla y no termina con ella, b termina con comilla y no empieza con ella
        if (aTrim.startsWith('"') && !aTrim.endsWith('"') && bTrim.endsWith('"') && !bTrim.startsWith('"')) {
          const aClean = aTrim.replace(/^"+/, '');
          const bClean = bTrim.replace(/"+$/, '');
          // Unir con coma (formato como en Excel: 0,92)
          row[aKey] = `${aClean.replace(/,$/, '')},${bClean.replace(/^,/, '')}`;
          row[bKey] = '';
          i++; // saltar la siguiente clave ya procesada
          continue;
        }
        // Otro caso: a termina con comilla y b comienza con comilla (raro) -> similar manejo
        if (aTrim.endsWith('"') && !bTrim.endsWith('"') && bTrim.startsWith('"')) {
          const aClean = aTrim.replace(/"+$/, '');
          const bClean = bTrim.replace(/^"+/, '');
          row[aKey] = `${aClean.replace(/,$/, '')},${bClean.replace(/^,/, '')}`;
          row[bKey] = '';
          i++;
          continue;
        }
      }

      // Luego limpiar comillas sobrantes en todas las celdas (p. ej. "0" -> 0)
      keys.forEach(k => {
        if (row[k] !== undefined && row[k] !== null && typeof row[k] === 'string') {
          // eliminar comillas dobles al inicio/final y espacios
          row[k] = row[k].replace(/^"+|"+$/g, '').trim();
        }
      });
    });
  }

      // Tamarguillo: insertar columna "Depth (cm)" entre Topsoil y Nitrates y mover
      // valores num E9ricos tipo "0,92"/"1.12" a la columna de Nitratos cuando est E1 vac EDa.
      if (isTamarguillo) {
        // determinar claves relevantes
        const nitrateKey = allKeys.find(k => /nitrate|nitrat|nitratos/i.test(String(k)));
        const cadmiumKey = allKeys.find(k => /cadmi|cadmium|cd\b/i.test(String(k)));
        const topsoilKey = allKeys.find(k => /topsoil|muestra topsoil|muestra_topsoil/i.test(String(k)));
        const syntheticDepthKey = '__tamarguillo_depth_cm';

        // Insertar la columna sint E9tica en visibleColumns entre topsoil y nitrates
        try {
          if (!visibleColumns.some(c => c.key === syntheticDepthKey)) {
            let insertAt = -1;
            if (topsoilKey) {
              insertAt = visibleColumns.findIndex(c => c.key === topsoilKey);
              if (insertAt >= 0) insertAt = insertAt + 1; // después de topsoil
            }
            if (insertAt === -1 && nitrateKey) {
              insertAt = visibleColumns.findIndex(c => c.key === nitrateKey);
            }
            if (insertAt === -1) insertAt = visibleColumns.length;
            visibleColumns.splice(insertAt, 0, { key: syntheticDepthKey, label: 'Depth (cm)' });
          }
        } catch (e) {
          // en caso de error no bloquear la renderización
          console.warn('Error inserting Tamarguillo depth column', e);
        }

        // Rellenar la columna de profundidad con 25 y priorizar mover valores desde Cadmio a Nitratos
        processedData.forEach(row => {
          // poner 25 por defecto cuando no exista valor
          if (row[syntheticDepthKey] === undefined || row[syntheticDepthKey] === null || String(row[syntheticDepthKey]).trim() === '') {
            row[syntheticDepthKey] = '25';
          }

          if (!nitrateKey) return;
          const cur = row[nitrateKey];
          const curStr = cur === undefined || cur === null ? '' : String(cur).trim();

          // Si la celda de nitratos est E1 vac EDa o contiene el valor 25, intentar tomar el valor desde Cadmio primero
          if (curStr === '' || curStr === '25') {
            if (cadmiumKey) {
              const cadValRaw = row[cadmiumKey] === undefined || row[cadmiumKey] === null ? '' : String(row[cadmiumKey]).trim();
              if (/^\d+[\.,]\d+$/.test(cadValRaw) || (/^\d+$/.test(cadValRaw) && cadValRaw !== '25')) {
                row[nitrateKey] = cadValRaw;
                row[cadmiumKey] = '';
                return; // ya movimos, siguiente fila
              }
            }

            // Fallback: buscar valores decimales cerca de la columna de nitratos (derecha/izquierda hasta 3 columnas)
            const idxN = allKeys.indexOf(nitrateKey);
            const tryOffsets = [1,2,3,-1,-2,-3];
            for (const off of tryOffsets) {
              const j = idxN + off;
              if (j < 0 || j >= allKeys.length) continue;
              const keyJ = allKeys[j];
              if (!keyJ) continue;
              if (keyJ === syntheticDepthKey) continue;
              const val = row[keyJ];
              if (val === undefined || val === null) continue;
              const s = String(val).trim();
              // coincidir con 0,92 o 1.12 o enteros pero evitar mover el valor 25
              if (/^\d+[\.,]\d+$/.test(s) || (/^\d+$/.test(s) && s !== '25')) {
                row[nitrateKey] = s;
                row[keyJ] = '';
                break;
              }
            }
          }
        });
      }

        // Tamarguillo: shift all columns two positions to the left starting from Total Cadmium
        if (isTamarguillo) {
          try {
            // find index in visibleColumns for cadmium
            const cadIdx = visibleColumns.findIndex(c => /cadmi/i.test(String(c.label)) || c.key === 'CADMIUM_MG_KG' || /cadmi/i.test(String(c.key)));
            if (cadIdx >= 0) {
              // for every row, shift values left by 2 from cadIdx to end
              processedData.forEach(row => {
                for (let i = cadIdx; i < visibleColumns.length; i++) {
                  const fromIndex = i + 2;
                  const toKey = visibleColumns[i].key;
                  if (fromIndex < visibleColumns.length) {
                    const fromKey = visibleColumns[fromIndex].key;
                    row[toKey] = row[fromKey] !== undefined && row[fromKey] !== null ? row[fromKey] : '';
                    // clear source
                    row[fromKey] = '';
                  } else {
                    // no source to shift from; leave as-is or blank
                    row[toKey] = row[toKey] !== undefined && row[toKey] !== null ? row[toKey] : '';
                  }
                }
              });
            }
          } catch (e) {
            console.warn('Error shifting Tamarguillo columns:', e);
          }
        }

        // Tamarguillo: move Total Lead values into Total Aluminum, then consolidate misaligned columns
        if (isTamarguillo) {
          try {
            const findIdx = (re) => visibleColumns.findIndex(c => re.test(String(c.label)) || re.test(String(c.key)));
            const alumIdx = findIdx(/alumin|aluminium|aluminum|total aluminum|al \(al\)/i);
            const leadIdx = findIdx(/lead|plom|pb\b|total lead/i);

            if (alumIdx >= 0 && leadIdx >= 0 && alumIdx !== leadIdx) {
              processedData.forEach(row => {
                const leadKey = visibleColumns[leadIdx]?.key;
                const alumKey = visibleColumns[alumIdx]?.key;
                if (!leadKey || !alumKey) return;
                const leadVal = row[leadKey] === undefined || row[leadKey] === null ? '' : String(row[leadKey]).trim();
                const alumVal = row[alumKey] === undefined || row[alumKey] === null ? '' : String(row[alumKey]).trim();
                // if aluminum empty but lead has numeric, move it
                if ((alumVal === '' || alumVal === '0') && leadVal !== '') {
                  row[alumKey] = leadVal;
                  row[leadKey] = '';
                }
              });
            }

            // Consolidate misaligned columns starting from Cadmium index (if found), otherwise from 0
            const startIdx = (() => {
              const idx = visibleColumns.findIndex(c => /cadmi/i.test(String(c.label)) || /cadmi/i.test(String(c.key)) || c.key === 'CADMIUM_MG_KG');
              return idx >= 0 ? idx : 0;
            })();

            // compute fill counts per column
            const fillCounts = visibleColumns.map(col => {
              const k = col.key;
              return processedData.reduce((acc, r) => acc + (r[k] !== undefined && r[k] !== null && String(r[k]).trim() !== '' ? 1 : 0), 0);
            });

            // For each column i in range startIdx..end, find column with max fills in range and move singleton/non-empty values there
            for (let i = startIdx; i < visibleColumns.length; i++) {
              // find the column with the highest fillCount in [i..end]
              let maxIdx = i;
              for (let j = i + 1; j < visibleColumns.length; j++) {
                if (fillCounts[j] > fillCounts[maxIdx]) maxIdx = j;
              }
              if (maxIdx !== i && fillCounts[maxIdx] > fillCounts[i]) {
                const targetKey = visibleColumns[maxIdx].key;
                const sourceKey = visibleColumns[i].key;
                processedData.forEach(row => {
                  const src = row[sourceKey] === undefined || row[sourceKey] === null ? '' : String(row[sourceKey]).trim();
                  const tgt = row[targetKey] === undefined || row[targetKey] === null ? '' : String(row[targetKey]).trim();
                  if (src !== '' && (tgt === '' || tgt === '0')) {
                    row[targetKey] = src;
                    row[sourceKey] = '';
                  }
                });
                // update fillCounts to reflect moved values
                const moved = processedData.reduce((acc, r) => acc + (r[targetKey] !== undefined && r[targetKey] !== null && String(r[targetKey]).trim() !== '' ? 1 : 0), 0);
                fillCounts[maxIdx] = moved;
                fillCounts[i] = processedData.reduce((acc, r) => acc + (r[sourceKey] !== undefined && r[sourceKey] !== null && String(r[sourceKey]).trim() !== '' ? 1 : 0), 0);
              }
            }
          } catch (e) {
            console.warn('Error consolidating Tamarguillo columns:', e);
          }
        }

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
                {visibleColumns.map(col => {
                  const labelLower = col.label.toLowerCase();
                  const isCoordHeader = [
                    'coord_x', 'coord_y', 'coordx', 'coordy', 'coord_lat__long',
                    'coord (lat)', 'coord (long)', 'coords', 'lat', 'lon', 'coordinates', 'coord (lat & long)',
                    'x_wg84','y_wg84'
                  ].includes(labelLower);
                  // For Germany, Asaja, Tamarguillo and Madrid tables, preserve the CSV's original casing for headers
                  const thClass = (isGermanyTable || isAsajaTable || isTamarguillo || isMadridTable || isItalyTable || isItalyCiraa || isBulgariaTable || isLetonia || isEstonia) ? styles.noTransform : '';
                  return (
                    <th key={col.key} className={thClass}>
                      {col.label}
                      {isCoordHeader && (
                        <div style={{ fontSize: '0.8em', color: '#e74c3c', fontWeight: 'bold', marginTop: '2px' }}>(EPSG:4326 WGS84)</div>
                      )}
                    </th>
                  );
                })}
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
