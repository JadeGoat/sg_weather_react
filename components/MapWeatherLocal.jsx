import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/MapWeatherLocal.css'
import { getAirTemperature, getRainfall, getRelativeHumidity } from '../scripts/WeatherApi';
import { getWindDirection, getWindSpeed } from '../scripts/WeatherApi';

const MapWeatherLocal = ({ centerCoordinate, zoomValue, type }) => {

    const [data, setData] = useState()

    useEffect(() => {
        if (type == "air_temp") {
            getAirTemperature("", setData)
        }
        else if (type == "rainfall") {
            getRainfall("", setData)
        }
        else if (type == "relative_humidity") {
            getRelativeHumidity("", setData)
        }
        else if (type == "wind_direction") {
            getWindDirection("", setData)
        }
        else if (type == "wind_speed") {
            getWindSpeed("", setData)
        }
    }, [type]);

    useEffect(() => {
    }, [data]);

  return ( 
      <MapContainer className='mapWeatherLocalContainer' center={centerCoordinate} zoom={zoomValue}>
          <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
      </MapContainer>
  )
}

export default MapWeatherLocal

