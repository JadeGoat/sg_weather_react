import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import ArrowsLayer from './ArrowsLayer.jsx';
import PinsLayer from './PinsLayer.jsx';
import PinsLegendLayer from './LegendLayer.jsx';
import { createLegend } from '../scripts/MapUtils.js'
import '../css/MapWeatherLocal.css'

const MapWeatherLocal = ({ centerCoordinate, zoomValue, type, weatherData }) => {

    const [weatherStations, setWeatherStationsData] = useState()

    // Customize legend here
    const [legendIconColorList, setLegendIconColorList] = useState(["-green"])
    const [legendIconDescList, setLegendIconDescList] = useState()
    const [legendHtml, setLegendHtml] = useState()
    const [isWindData, setIsWindData] = useState(false)
    const [upperThreshold, setUpperThreshold] = useState(null)
    const [lowerThreshold, setLowerThreshold] = useState(null)

    useEffect(() => {
        if (type == "air_temp") {
            setLegendIconDescList(["High", "Normal", "Low"])
            setLegendIconColorList(["-orange", "-green", ""])
            setUpperThreshold(34)
            setLowerThreshold(23)
        }
        else if (type == "rainfall") {
            setLegendIconDescList(["Rain", "Dry"])
            setLegendIconColorList(["-orange", "-green"])
            setUpperThreshold(0.001)
            setLowerThreshold(null)
        }
        else if (type == "relative_humidity") {
            setLegendIconDescList(["High", "Normal", "Low"])
            setLegendIconColorList(["-orange", "-green", ""])
            setUpperThreshold(90)
            setLowerThreshold(60)
        }
        else if (type == "wind_direction") {
            setLegendIconColorList(["-arrow"])
            setIsWindData(true)
        }
        else if (type == "wind_speed") {
            setLegendIconDescList(["High", "Normal", "Low"])
            setLegendIconColorList(["-orange", "-green", ""])
            setUpperThreshold(30)
            setLowerThreshold(5)
        }
        else if (type == "wbgt") {
            // Note if using threshold instead of category
            // < 25	    Low	        Normal activity
            // 25–28	Moderate	Increase hydration, monitor vulnerable individuals
            // 28–30	High	    Shorten work/rest cycles, limit strenuous activity
            setLegendIconDescList(["High", "Moderate", "Low"])
            setLegendIconColorList(["-orange", "-green", ""])
        }
        else if (type == "lightning") {
            setLegendIconDescList(["Cloud-to-Ground", "Cloud-to-Cloud"])
            setLegendIconColorList(["-orange", "-green"])
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
          { weatherStations ? 
            ( isWindData ? 
                <ArrowsLayer locations={weatherStations}/> :
                <PinsLayer locations={weatherStations} 
                           upper_threshold={upperThreshold} 
                           lower_threshold={lowerThreshold} />
            ) : 
            <></>
          }
          <PinsLegendLayer legendHtml={legendHtml} />
      </MapContainer>
  )
}

export default MapWeatherLocal

