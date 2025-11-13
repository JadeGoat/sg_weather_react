import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import '../css/LegendLayer.css'

const LegendLayer = ({ legendHtml }) => {
  const map = useMap();

  useEffect(() => {
    
    if (map && legendHtml) {
      const legend = L.control({ position: 'bottomright' });

      // Add new legend at bottom right
      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = legendHtml;
        return div;
      };
      legend.addTo(map);

      // Remove default legend
      return () => {
        legend.remove();
      };
    }
    
  }, [map, legendHtml]);

  return null;
};

export default LegendLayer
