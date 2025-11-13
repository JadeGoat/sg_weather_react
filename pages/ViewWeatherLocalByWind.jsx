import { useEffect, useState } from 'react';
import MapWeatherLocal from '../components/MapWeatherLocal.jsx'
import Heatmap from '../components/Heatmap.jsx';
import { convertWeatherData } from '../scripts/ConversionUtils.js'
import { getWindDirection, getWindSpeed } from '../scripts/WeatherApi.js';

const ViewWeatherLocalByWind = () => {

    const [windDirData, setWindDirData] = useState()
    const [windSpeedData, setWindSpeedData] = useState()
    const [weatherWindDirData, setWeatherWindDirData] = useState()
    const [weatherWindSpeedData, setWeatherWindSpeedData] = useState()
    const [heatmapPoints, setHeatmapPoints] = useState()

    useEffect(() => {
        getWindDirection("", setWindDirData)
        getWindSpeed("", setWindSpeedData)
    }, []);

    useEffect(() => {
        if (windDirData) {
            const results = convertWeatherData(windDirData)
            setWeatherWindDirData(results.location_data)
        }
        if (windSpeedData) {
            const results = convertWeatherData(windSpeedData)
            setWeatherWindSpeedData(results.location_data)
            setHeatmapPoints(results.heatmap_data)
        }
    }, [windDirData, windSpeedData]);

    return (
        <div>
            <h2>Pins Map</h2>
            <h4>Wind Speed</h4>
            { weatherWindDirData ?
                <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="wind_speed"
                             weatherData={weatherWindDirData}/>:
                <p>Loading pins map...</p>
            }
            <h4>Wind Direction</h4>
            { weatherWindSpeedData ?
                <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="wind_direction"
                             weatherData={weatherWindSpeedData}/>:
                <p>Loading pins map...</p>
            }
            <h2>HeatMap</h2>
            <h4>Normalized values</h4>
            <h4>** Under construction **</h4>
            <h4>Raw values</h4>
            { heatmapPoints ?
                <Heatmap centerCoordinate={[1.3308, 103.8054]} 
                         zoomValue={11}
                         heatmapCoordinates={heatmapPoints}/>:
                <p>Loading heatmap...</p>
            }
        </div>
    )
}

export default ViewWeatherLocalByWind