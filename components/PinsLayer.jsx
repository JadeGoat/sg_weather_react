import { Marker, Popup } from 'react-leaflet';
import { getIcons } from '../scripts/MapUtils.js'

const PinsLayer = ( {locations, upper_threshold, lower_threshold} ) => {

  const { orangeIcon, 
          greenIcon,  
          defaultIcon 
        } = getIcons(0.7);

  return (
    <div>
        {
            locations.map((loc, idx) => (
            <Marker key={idx} 
                    position={[loc.lat, loc.lon]}
                    // Customize pins here
                    icon={(loc.value >= upper_threshold) ? orangeIcon : 
                          (lower_threshold && loc.value <= lower_threshold) ? defaultIcon : greenIcon }
            > 
              { loc.name ?
                  <Popup>{loc.name}<br/>{loc.label}</Popup> :
                  <Popup>{loc.label}</Popup>
              }
            </Marker>
        ))}
    </div>
  )
}

export default PinsLayer