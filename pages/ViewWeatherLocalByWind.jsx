import { useEffect, useState } from 'react';
import MapWeatherLocal from '../components/MapWeatherLocal.jsx'
import { convertDataToLocation } from '../scripts/ConversionUtils.js'
import { getWindDirection, getWindSpeed } from '../scripts/WeatherApi.js';

const ViewWeatherLocalByWind = () => {

    const [windDirData, setWindDirData] = useState()
    const [windSpeedData, setWindSpeedData] = useState()
    const [weatherWindDirData, setWeatherWindDirData] = useState()
    const [weatherWindSpeedData, setWeatherWindSpeedData] = useState()

    useEffect(() => {
        getWindDirection("", setWindDirData)
        getWindSpeed("", setWindSpeedData)
    }, []);

    useEffect(() => {
        if (windDirData) {
            const locations =  convertDataToLocation(windDirData)
            setWeatherWindDirData(locations)
        }
        if (windSpeedData) {
            const locations =  convertDataToLocation(windSpeedData)
            setWeatherWindSpeedData(locations)
        }
    }, [windDirData, windSpeedData]);

    return (
        <div>
            <h2>Pins Map</h2>
            <h4>Wind Speed</h4>
            <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="wind_speed"
                             weatherData={weatherWindDirData}
            />
            <h4>Wind Direction</h4>
            <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="wind_direction"
                             weatherData={weatherWindSpeedData}
            />
            <h2>HeatMap</h2>
            <h4>WIP</h4>
        </div>
    )
}

export default ViewWeatherLocalByWind