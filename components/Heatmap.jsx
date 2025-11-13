import { MapContainer, TileLayer } from 'react-leaflet';
import HeatmapLayer from './HeatmapLayer';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import '../css/Heatmap.css'

const Heatmap = ( {centerCoordinate, zoomValue, heatmapCoordinates} ) => {
  
  return (
    <MapContainer className='heatmapContainer' center={centerCoordinate} zoom={zoomValue}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatmapLayer points={heatmapCoordinates} />
    </MapContainer>
  );
};

export default Heatmap;
