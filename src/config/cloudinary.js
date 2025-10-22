// Carousel images for Madrid
export const CAROUSEL_IMAGES_MADRID = [
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622194/San_Jose_kokx7j.jpg`,
    title: "Organic Vineyards in Integrated Production",
    description: "Study of texture and water capacity in organic vineyards."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622206/Panadero_bytxc6.jpg`,
    title: "Organic Vineyards in Integrated Production",
    description: "Study of texture and water capacity in organic vineyards."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622215/Pastoriega_nyapkk.jpg`,
    title: "Organic Vineyards in Integrated Production",
    description: "Study of texture and water capacity in organic vineyards."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622223/Pirri_qoyagl.jpg`,
    title: "Organic Vineyards in Integrated Production",
    description: "Study of texture and water capacity in organic vineyards."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622233/Mirador_fvkymd.jpg`,
    title: "Organic Vineyards in Integrated Production",
    description: "Study of texture and water capacity in organic vineyards."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622241/Rodangosto_eccygr.jpg`,
    title: "Organic Vineyards in Integrated Production",
    description: "Study of texture and water capacity in organic vineyards."
  }

];
// Configuración de Cloudinary para el proyecto NovasoiL
// Reemplaza 'your-cloud-name' con tu nombre de cloud real de Cloudinary

export const CLOUDINARY_CONFIG = {
  cloudName: 'your-cloud-name', // Reemplaza con tu cloud name
  uploadPreset: 'novasoil-preset', // Opcional: preset para uploads
  quality: 'auto',
  format: 'auto'
};

// General carousel images (e.g. for Spain, default)
export const CAROUSEL_IMAGES = [
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1757574973/Parque_del_Tamarguillo_09_nn0jmt.jpg`,
    title: "Análisis de Carbono Orgánico",
    description: "Medición de contenido de carbono en diferentes estratos del suelo del Parque Tamarguillo"
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1757575039/Parques-de-sevilla-tamarguillo-00-sevillaconlospeques_iumh0y.webp`,
    title: "Evaluación de pH y Nutrientes",
    description: "Análisis químico completo para determinar la acidez y disponibilidad de nutrientes"
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1757575414/tamarguillo-05-sevillaconlospeques_x2al6u.webp`,
    title: "Evaluación de pH y Nutrientes",
    description: "Análisis químico completo para determinar la acidez y disponibilidad de nutrientes"
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1757575734/1c236567-0637-490c-9037-7642fc40ab6e_16-9-discover-aspect-ratio_default_0_zkp09z.jpg`,
    title: "Evaluación de pH y Nutrientes",
    description: "Análisis químico completo para determinar la acidez y disponibilidad de nutrientes"
  }
];

// Función helper para generar URLs de Cloudinary con transformaciones
export const getCloudinaryUrl = (publicId, transformations = {}) => {
  const {
    width = 800,
    height = 400,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = transformations;

  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/c_${crop},w_${width},h_${height},q_${quality},f_${format}/${publicId}`;
};

// Carousel images for Bulgaria
export const CAROUSEL_IMAGES_BULGARIA = [
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758264026/BG_CS_2_zsrrdz.jpg`,
    title: " Organic Vineyards in Plovdiv Region Bulgarian",
    description: "Images from the ecological vineyard in Bulgaria."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758264017/BG_CS_1_n7gwee.jpg`,
    title: " Organic Vineyards in Plovdiv Region Bulgarian",
    description: "Images from the ecological vineyard in Bulgaria."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758265409/bulgaria-novasoil-long_umdbnp_1_ivthqm.png`,
    title: " Organic Vineyards in Plovdiv Region Bulgarian",
    description: "Images from the ecological vineyard in Bulgaria."
  }

];

export const CAROUSEL_IMAGES_LETONIA = [
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1761052240/Reduced.Tillge-CS_Novasoil_f8ovo2.jpg`,
    title: "ZSA DIH system"
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1761052247/ZSA_DIH_map_preview_onw1ot.png`,
    title: "ZSA DIH system"
  }

];

export const CAROUSEL_IMAGES_ITALY = [
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1759319392/flora_4_bis_td7hr0.jpg`,
    title: "Italian Soil Analysis",
    description: "Soil sample and organic matter analysis in Italy."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1759319406/Immagine6_dzkada.jpg`,
    title: "Italian Soil Analysis",
    description: "Soil sample and organic matter analysis in Italy."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1759319382/flora_3_bis_rkx5mi.jpg`,
    title: "Italian Soil Analysis",
    description: "Soil sample and organic matter analysis in Italy."
  }

];

export const CAROUSEL_IMAGES_GERMANY = [
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760099141/IMG_20250925_154445_f42vrk.jpg`,
    title: "CO2 initiative in Germany",
    description: " Real case study images in Germany."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760099181/PXL_20250925_140345974_l4ld6y.jpg`,
    title: "CO2 initiative in Germany",
    description: " Real case study images in Germany."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760099156/IMG_20250925_155447_dniykp.jpg`,
    title: "CO2 initiative in Germany",
    description: "Real case study images in Germany."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760099146/IMG_20250925_154452_xdwfog.jpg`,
    title: "CO2 initiative in Germany",
    description: "Real case study images in Germany."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760099166/IMG_20250925_163526_y7z7iw.jpg`,
    title: "CO2 initiative in Germany",
    description: " Real case study images in Germany."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760099171/PXL_20250925_134458427_wxvu2k.jpg`,
    title: "CO2 initiative in Germany",
    description: "Real case study images in Germany."
  }
];

export const CAROUSEL_IMAGES_ASAJA = [{
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760609217/55df23b7-9c3b-4c9a-bb4e-90b1a2ed027a_hwers8.jpg`,
    title: "ASAJA: Integrated Olive Production",
    description: "Images of organic olive groves in Andalusia, Estepa."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760609226/f2ba402b-c3ea-4827-bfb5-8673c05d544f_vwcycm.jpg`,
    title: "ASAJA: Integrated Olive Production",
    description: "Images of organic olive groves in Andalusia, Estepa."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760609236/a05a5f5c-b20a-48a5-ac27-3ebc025606b4_mpcel6.jpg`,
    title: "ASAJA: Integrated Olive Production",
    description: "Images of organic olive groves in Andalusia, Estepa."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760609242/ec72972e-abd4-4ea3-b554-50d257076d09_xltwbv.jpg`,
    title: "ASAJA: Integrated Olive Production",
    description: "Images of organic olive groves in Andalusia, Estepa."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760609251/283547f8-7a57-4c08-b976-e4dc7ee7fd87_tdt0yn.jpg`,
    title: "ASAJA: Integrated Olive Production",
    description: "Images of organic olive groves in Andalusia, Estepa."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760609280/9b531d26-81bc-4bc9-bdb3-796a7f8101d9_b3mbfu.jpg`,
    title: "ASAJA: Integrated Olive Production",
    description: "Images of organic olive groves in Andalusia, Estepa."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760609284/a037d1be-f2d0-438a-a591-a35baddf4d43_pgfkuw.jpg`,
    title: "ASAJA: Integrated Olive Production",
    description: "Images of organic olive groves in Andalusia, Estepa."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760609294/18f26887-5ef5-47cc-a4a6-2fcdb61eb914_brvyop.jpg`,
    title: "ASAJA: Integrated Olive Production",
    description: "Images of organic olive groves in Andalusia, Estepa."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760609301/13342ea9-c20b-4102-a7ad-474f627b1cb1_dqkxsu.jpg`,
    title: "ASAJA: Integrated Olive Production",
    description: "Images of organic olive groves in Andalusia, Estepa."
  }

];

// Fallback images for Bulgaria
export const FALLBACK_IMAGES_BULGARIA = [
  {
    url: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234CAF50;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%232E7D32;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='45%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3EBulgaria Soil%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial' font-size='16' fill='white' text-anchor='middle'%3EAnalysis%3C/text%3E%3C/svg%3E",
    title: "Bulgarian Soil",
    description: "Fallback image for Bulgaria soil analysis."
  }
];
 
// URLs de fallback en caso de que Cloudinary no esté disponible
export const FALLBACK_IMAGES = [
  {
    url: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234CAF50;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%232E7D32;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='45%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3EAnálisis de Carbono%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial' font-size='16' fill='white' text-anchor='middle'%3EParque Tamarguillo%3C/text%3E%3C/svg%3E",
    title: "Análisis de Carbono Orgánico",
    description: "Medición de contenido de carbono en diferentes estratos del suelo"
  },
  {
    url: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232196F3;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%231565C0;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad2)'/%3E%3Ctext x='50%25' y='45%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3EEvaluación de pH%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial' font-size='16' fill='white' text-anchor='middle'%3EAnálisis Químico%3C/text%3E%3C/svg%3E",
    title: "Evaluación de pH y Nutrientes",
    description: "Análisis químico completo para determinar la acidez y disponibilidad de nutrientes"
  },
  {
    url: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF9800;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23F57C00;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad3)'/%3E%3Ctext x='50%25' y='45%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3EBiodiversidad%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial' font-size='16' fill='white' text-anchor='middle'%3EMicroorganismos%3C/text%3E%3C/svg%3E",
    title: "Biodiversidad Microbiana",
    description: "Estudio de microorganismos del suelo y su papel en el ciclo del carbono"
  },
  {
    url: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%239C27B0;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%236A1B9A;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad4)'/%3E%3Ctext x='50%25' y='45%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3ERetención de Agua%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial' font-size='16' fill='white' text-anchor='middle'%3ECapacidad Hídrica%3C/text%3E%3C/svg%3E",
    title: "Retención de Agua",
    description: "Capacidad de almacenamiento hídrico y su relación con la estructura del suelo"
  }
];

export const FALLBACK_IMAGES_GERMANY = [
  {
    url: "data:image/svg+xml,%3Csvg width='800' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23000000;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%23DD0000;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FFCE00;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad1)'/%3E%3Ctext x='50%25' y='45%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle'%3EGerman Soil%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial' font-size='16' fill='white' text-anchor='middle'%3EAnalysis%3C/text%3E%3C/svg%3E",
    title: "German Soil",
    description: "Fallback image for Germany soil analysis."
  }
];
