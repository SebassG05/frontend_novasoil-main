// Configuración de Cloudinary para el proyecto NovasoiL
// Reemplaza 'your-cloud-name' con tu nombre de cloud real de Cloudinary

export const CLOUDINARY_CONFIG = {
  cloudName: 'your-cloud-name', // Reemplaza con tu cloud name
  uploadPreset: 'novasoil-preset', // Opcional: preset para uploads
  quality: 'auto',
  format: 'auto'
};

// URLs de las imágenes del carrusel - Actualiza estas URLs con tus imágenes reales
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
