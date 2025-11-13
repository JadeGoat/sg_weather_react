import { useEffect, useState } from 'react';
import MapWeatherLocal from '../components/MapWeatherLocal.jsx'
import { convertDataToLocation } from '../scripts/ConversionUtils.js'
import { getRelativeHumidity } from '../scripts/WeatherApi.js';

const ViewWeatherLocalByHumidity = () => {

    const [data, setData] = useState()
    const [weatherData, setWeatherData] = useState()

    useEffect(() => {
        getRelativeHumidity("", setData)
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
                             type="relative_humidity"
                             weatherData={weatherData}
            />
            <h2>HeatMap</h2>
            <h4>WIP</h4>
        </div>
    )
}

export default ViewWeatherLocalByHumidity