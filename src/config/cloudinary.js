// Carousel images for Madrid
export const CAROUSEL_IMAGES_MADRID = [
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622194/San_Jose_kokx7j.jpg`,
    title: "Madrid Soil Analysis 1",
    description: "Análisis de suelo y materia orgánica en Madrid."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622206/Panadero_bytxc6.jpg`,
    title: "Madrid Soil Analysis 2",
    description: "Muestreo y análisis de nutrientes en suelos de Madrid."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622215/Pastoriega_nyapkk.jpg`,
    title: "Madrid Soil Analysis 3",
    description: "Estudio de textura y capacidad hídrica en suelos de Madrid."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622223/Pirri_qoyagl.jpg`,
    title: "Madrid Soil Analysis 4",
    description: "Evaluación de biodiversidad microbiana en suelos agrícolas."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622233/Mirador_fvkymd.jpg`,
    title: "Madrid Soil Analysis 5",
    description: "Medición de carbono orgánico y suelos saludables."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758622241/Rodangosto_eccygr.jpg`,
    title: "Madrid Soil Analysis 6",
    description: "Análisis integral de suelos en viñedos orgánicos."
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
    title: "Bulgarian Soil Analysis",
    description: "Soil sample and organic matter analysis in Bulgaria."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758264017/BG_CS_1_n7gwee.jpg`,
    title: "Bulgarian Soil Analysis",
    description: "Soil sample and organic matter analysis in Bulgaria."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1758265409/bulgaria-novasoil-long_umdbnp_1_ivthqm.png`,
    title: "Bulgarian Soil Analysis",
    description: "Soil sample and organic matter analysis in Bulgaria."
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
    title: "German Soil Analysis 1",
    description: "Análisis de suelo y materia orgánica en Alemania."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760099181/PXL_20250925_140345974_l4ld6y.jpg`,
    title: "German Soil Analysis 2",
    description: "Muestreo y análisis de nutrientes en suelos de Alemania."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760099156/IMG_20250925_155447_dniykp.jpg`,
    title: "German Soil Analysis 3",
    description: "Estudio de textura y capacidad hídrica en suelos alemanes."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760099146/IMG_20250925_154452_xdwfog.jpg`,
    title: "German Soil Analysis 4",
    description: "Evaluación de biodiversidad microbiana en suelos forestales."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760099166/IMG_20250925_163526_y7z7iw.jpg`,
    title: "German Soil Analysis 5",
    description: "Medición de carbono orgánico y suelos saludables."
  },
  {
    url: `https://res.cloudinary.com/drwlnxvqr/image/upload/v1760099171/PXL_20250925_134458427_wxvu2k.jpg`,
    title: "German Soil Analysis 6",
    description: "Análisis integral de suelos en zonas agrícolas."
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
