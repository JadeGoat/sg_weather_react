import { useEffect, useState } from 'react';
import MapWeatherLocal from '../components/MapWeatherLocal.jsx'
import Heatmap from '../components/Heatmap.jsx';
import { convertWeatherData, normalizeToRange } from '../scripts/ConversionUtils.js'
import { getRainfall } from '../scripts/WeatherApi.js';
import '../css/ViewWeatherByLocal.css'

const ViewWeatherLocalByRainfall = () => {

    const [data, setData] = useState()
    const [weatherData, setWeatherData] = useState()
    const [heatmapPoints, setHeatmapPoints] = useState()
    const [normalizedHeatmapPoints, setNormalizedHeatmapPoints] = useState()

    useEffect(() => {
        getRainfall("", setData)
    }, []);

    useEffect(() => {
        if (data) {
            const results = convertWeatherData(data)
            setWeatherData(results.location_data)
            setHeatmapPoints(results.heatmap_data)
            const normalizeData = normalizeToRange(results.heatmap_data, 0, 1)
            setNormalizedHeatmapPoints(normalizeData)
        }
    }, [data]);

    return (
        <div className='localWeatherContainer'>
            <div>
                <h2>Pins Map</h2>
                { weatherData ?
                    <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                                zoomValue={11}
                                type="rainfall"
                                weatherData={weatherData}/>:
                    <p>Loading pins map...</p>
                }
            </div>
            <div>
                <h2>HeatMap</h2>
                <div>
                    <h4>Normalized values</h4>
                    { normalizedHeatmapPoints ?
                        <Heatmap centerCoordinate={[1.3308, 103.8054]} 
                                zoomValue={11}
                                heatmapCoordinates={normalizedHeatmapPoints}/>:
                        <p>Loading heatmap...</p>
                    }
                </div>
                <div>
                    <h4>Raw values</h4>
                    { heatmapPoints ?
                        <Heatmap centerCoordinate={[1.3308, 103.8054]} 
                                zoomValue={11}
                                heatmapCoordinates={heatmapPoints}/>:
                        <p>Loading heatmap...</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewWeatherLocalByRainfall