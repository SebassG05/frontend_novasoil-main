// Servicio para descargar y descomprimir el zip de Holanda y devolver el GeoJSON
// Usa fflate (más ligera que jszip)

export async function fetchHolandaGeojsonZip() {
  // Descargar el geojson directamente del backend
  let base = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : 'http://localhost:3000/api';
  // Si la base termina en /geo, quitarlo para la capa de Holanda
  if (base.endsWith('/geo')) {
    base = base.slice(0, -4);
  }
  const response = await fetch(`${base}/holanda/holanda-geojson`);
  if (!response.ok) throw new Error('No se pudo descargar el geojson de Holanda');
  return await response.json();
}
