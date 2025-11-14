import { Marker, Popup } from 'react-leaflet';
import { createArrowIcon } from '../scripts/MapUtils.js'

const ArrowsLayer = ( {locations} ) => {

  return (
    <div>
        {
            locations.map((loc, idx) => (
            <Marker key={idx} 
                    position={[loc.lat, loc.lon]}
                    icon={createArrowIcon(loc.direction, loc.speed, 20, 10)}
            >
                  <Popup>{loc.name}<br/>{loc.label}</Popup>
            </Marker>
        ))}
    </div>
  )
}

export default ArrowsLayer