import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import PinsLayer from './PinsLayer.jsx';
import PinsLegendLayer from './LegendLayer.jsx';
import { createLegend } from '../scripts/MapUtils.js'
import '../css/MapWeatherLocal.css'

const MapWeatherLocal = ({ centerCoordinate, zoomValue, type, weatherData }) => {

    const [weatherStations, setWeatherStationsData] = useState()

    // Customize legend here
    const [legendIconColorList, _] = useState(["-green"])
    const [legendIconDescList, setLegendIconDescList] = useState()
    const [legendHtml, setLegendHtml] = useState()

    useEffect(() => {
        if (type == "air_temp") {
            setLegendIconDescList(["Air Temp"])
        }
        else if (type == "rainfall") {
            setLegendIconDescList(["Rainfall"])
        }
        else if (type == "relative_humidity") {
            setLegendIconDescList(["Humidity"])
        }
        else if (type == "wind_direction") {
            setLegendIconDescList(["Wind Direction"])
        }
        else if (type == "wind_speed") {
            setLegendIconDescList(["Wind Speed"])
        }
        else if (type == "wind") {
            setLegendIconDescList(["Wind Direction", "Wind Speed"])
        }
    }, [type]);

    useEffect(() => {
        if (legendIconColorList && legendIconDescList) {
            setLegendHtml(createLegend(legendIconColorList, 
                                       legendIconDescList))
        }
    }, [legendIconColorList, legendIconDescList]);

    useEffect(() => {
        if (weatherData) {
            setWeatherStationsData(weatherData)
        }
    }, [weatherData]);

  return ( 
      <MapContainer className='mapWeatherLocalContainer' center={centerCoordinate} zoom={zoomValue}>
          <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {weatherStations ? 
            <PinsLayer locations={weatherStations} color="green" /> : <></>
          }
          <PinsLegendLayer legendHtml={legendHtml} />
      </MapContainer>
  )
}

export default MapWeatherLocal

