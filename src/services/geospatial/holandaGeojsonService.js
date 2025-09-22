// Servicio para descargar y descomprimir el zip de Holanda y devolver el GeoJSON
// Usa fflate (más ligera que jszip)

export async function fetchHolandaGeojsonZip() {
  // Descargar el geojson directamente del backend
  const response = await fetch('http://localhost:3000/api/holanda/holanda-geojson');
  if (!response.ok) throw new Error('No se pudo descargar el geojson de Holanda');
  return await response.json();
}
