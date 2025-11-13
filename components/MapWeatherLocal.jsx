import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import PinsLayer from './PinsLayer.jsx';
import PinsLegendLayer from './LegendLayer.jsx';
import { createLegend } from '../scripts/MapUtils.js'
import { getAirTemperature, getRainfall, getRelativeHumidity } from '../scripts/WeatherApi.js';
import { getWindDirection, getWindSpeed } from '../scripts/WeatherApi.js';
import '../css/MapWeatherLocal.css'

const MapWeatherLocal = ({ centerCoordinate, zoomValue, type }) => {

    const [data, setData] = useState()
    const [weatherStations, setWeatherStationsData] = useState()

    // Customize legend here
    const [legendIconColorList, _] = useState(["-green"])
    const [legendIconDescList, setLegendIconDescList] = useState()
    const [legendHtml, setLegendHtml] = useState()

    useEffect(() => {
        if (type == "air_temp") {
            getAirTemperature("", setData)
            setLegendIconDescList(["Air Temp"])
        }
        else if (type == "rainfall") {
            getRainfall("", setData)
            setLegendIconDescList(["Rainfall"])
        }
        else if (type == "relative_humidity") {
            getRelativeHumidity("", setData)
            setLegendIconDescList(["Humidity"])
        }
        else if (type == "wind_direction") {
            getWindDirection("", setData)
            setLegendIconDescList(["Wind Direction"])
        }
        else if (type == "wind_speed") {
            getWindSpeed("", setData)
            setLegendIconDescList(["Wind Speed"])
        }
    }, [type]);

    useEffect(() => {
        if (data) {

            // Get the two list of the weather data
            const stations = data['data']['stations']
            const readings = data['data']['readings'][0]['data']

            // Convert reading unit to shorter form
            var readingUnit = data['data']['readingUnit']
            if (readingUnit == "percentage") {
                readingUnit = "%"
            }
            else if (readingUnit == "deg C") {
                readingUnit = "°C"
            }
            else if (readingUnit == "degrees") {
                readingUnit = "°"
            }

            // Combine the two list using the stationId and reading's id
            const map2 = new Map(readings.map(item => [item.stationId, item.value]));
            var combined = stations.map(item1 => {
                const item2_value = map2.get(item1.id);
                return item2_value ? { id: item1.id, 
                                       name: item1.name, 
                                       label: `${item2_value} ${readingUnit}`, 
                                       lat: item1.location['latitude'], 
                                       lon: item1.location['longitude'],
                                     } : null;
            });
            // Remove empty rows
            combined = combined.filter(Boolean)
            
            setWeatherStationsData(combined)
        }
        if (legendIconColorList && legendIconDescList) {
            setLegendHtml(createLegend(legendIconColorList, 
                                       legendIconDescList))
        }
    }, [data, legendIconColorList, legendIconDescList]);

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

