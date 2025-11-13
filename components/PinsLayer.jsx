import { Marker, Popup } from 'react-leaflet';
import { getIcons } from '../scripts/MapUtils.js'

const PinsLayer = ( {locations, color} ) => {

  const { redIcon, 
          greenIcon, 
          orangeIcon, 
          defaultIcon 
        } = getIcons(0.7);

  return (
    <div>
        {
            locations.map((loc, idx) => (
            <Marker key={idx} 
                    position={[loc.lat, loc.lon]}
                    // Customize pins here
                    icon={color==="red" ? redIcon :
                          color==="green" ? greenIcon : 
                          color==="orange" ? orangeIcon: defaultIcon} 
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