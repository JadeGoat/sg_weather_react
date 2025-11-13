import { useEffect, useState } from 'react';
import MapWeatherLocal from '../components/MapWeatherLocal.jsx'
import { convertDataToLocation } from '../scripts/ConversionUtils.js'
import { getRainfall } from '../scripts/WeatherApi.js';

const ViewWeatherLocalByRainfall = () => {

    const [data, setData] = useState()
    const [weatherData, setWeatherData] = useState()

    useEffect(() => {
        getRainfall("", setData)
    }, []);

    useEffect(() => {
        if (data) {
            const locations =  convertDataToLocation(data)
            setWeatherData(locations)
        }
    }, [data]);

    return (
        <div>
            <h2>Pins Map</h2>
            <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="rainfall"
                             weatherData={weatherData}
            />
            <h2>HeatMap</h2>
            <h4>WIP</h4>
        </div>
    )
}

export default ViewWeatherLocalByRainfall