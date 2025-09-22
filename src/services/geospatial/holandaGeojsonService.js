// Servicio para descargar y descomprimir el zip de Holanda y devolver el GeoJSON
// Usa fflate (más ligera que jszip)
import { unzipSync, strFromU8 } from 'fflate';

export async function fetchHolandaGeojsonZip() {
  // Descargar el zip del backend
  const response = await fetch('http://localhost:3000/api/holanda/holanda-geojson');
  if (!response.ok) throw new Error('No se pudo descargar el zip de Holanda');
  const blob = await response.arrayBuffer();
  // Descomprimir el zip
  const files = unzipSync(new Uint8Array(blob));
  // Buscar el primer archivo .geojson
  const geojsonFile = Object.keys(files).find(f => f.endsWith('.geojson'));
  if (!geojsonFile) throw new Error('No se encontró ningún .geojson en el zip');
  const geojsonText = strFromU8(files[geojsonFile]);
  return JSON.parse(geojsonText);
}
