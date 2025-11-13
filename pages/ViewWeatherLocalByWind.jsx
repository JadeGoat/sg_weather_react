import { useEffect, useState } from 'react';
import MapWeatherLocal from '../components/MapWeatherLocal.jsx'
import Heatmap from '../components/Heatmap.jsx';
import { convertWeatherData, normalizeToRange } from '../scripts/ConversionUtils.js'
import { getWindDirection, getWindSpeed } from '../scripts/WeatherApi.js';

const ViewWeatherLocalByWind = () => {

    const [windDirData, setWindDirData] = useState()
    const [windSpeedData, setWindSpeedData] = useState()
    const [weatherWindDirData, setWeatherWindDirData] = useState()
    const [weatherWindSpeedData, setWeatherWindSpeedData] = useState()
    const [heatmapPoints, setHeatmapPoints] = useState()
    const [normalizedHeatmapPoints, setNormalizedHeatmapPoints] = useState()

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
            const normalizeData = normalizeToRange(results.heatmap_data)
            setNormalizedHeatmapPoints(normalizeData)
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
            { normalizedHeatmapPoints ?
                <Heatmap centerCoordinate={[1.3308, 103.8054]} 
                         zoomValue={11}
                         heatmapCoordinates={normalizedHeatmapPoints}/>:
                <p>Loading heatmap...</p>
            }
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