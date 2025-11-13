import { useEffect, useState } from 'react';
import MapWeatherLocal from '../components/MapWeatherLocal.jsx'
import Heatmap from '../components/Heatmap.jsx';
import { convertWeatherData } from '../scripts/ConversionUtils.js'
import { getRelativeHumidity } from '../scripts/WeatherApi.js';

const ViewWeatherLocalByHumidity = () => {

    const [data, setData] = useState()
    const [weatherData, setWeatherData] = useState()
    const [heatmapPoints, setHeatmapPoints] = useState()

    useEffect(() => {
        getRelativeHumidity("", setData)
    }, []);

    useEffect(() => {
        if (data) {
            const results = convertWeatherData(data)
            setWeatherData(results.location_data)
            setHeatmapPoints(results.heatmap_data)
        }
    }, [data]);

    return (
        <div>
            <h2>Pins Map</h2>
            { weatherData ?
                <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                                zoomValue={11}
                                type="relative_humidity"
                                weatherData={weatherData}/>:
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

export default ViewWeatherLocalByHumidity