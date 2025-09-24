// Este archivo sirve para registrar y centralizar los sublayers de Holanda
export const holandaSublayers = [
  {
    name: 'Layer of soil types',
    title: 'Layer of soil types',
    geojsonUrl: '/CapaHRepr.geojson',
  },
  // Puedes añadir más sublayers aquí
  {
    name: 'ph_raster',
    title: 'Soil pH (KCl) 0–5 cm',
    type: 'raster',
    tiles: [
      'http://192.168.0.99:8080/geoserver/gwc/service/tms/1.0.0/med:pH_KCl_d_0_5_QRF_PI90@EPSG%3A900913@png/{z}/{x}/{y}.png'
    ],
    tileSize: 256,
    opacity: 1
  }
];
