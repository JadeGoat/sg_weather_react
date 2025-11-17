import { useEffect, useState } from 'react';
import MapWeatherLocal from '../components/MapWeatherLocal.jsx'
import Heatmap from '../components/Heatmap.jsx';
import { convertLightningData } from '../scripts/ConversionUtils.js'
import { getLightningObservations } from '../scripts/WeatherApi.js';
import '../css/ViewWeatherByLocal.css'

const ViewWeatherLocalByLightning = () => {

    const [data, setData] = useState()
    const [weatherData, setWeatherData] = useState()
    
    useEffect(() => {
        getLightningObservations(setData)
    }, []);
    
    useEffect(() => {
        if (data) {
            const results = convertLightningData(data)
            console.log(results)
            setWeatherData(results)
        }
    }, [data]);

    return (
        <div className='localWeatherContainer'>
            <div>
                <h2>Pins Map</h2>
                { weatherData ?
                    <MapWeatherLocal centerCoordinate={[1.3408, 103.8054]} 
                                zoomValue={10}
                                type="lightning"
                                weatherData={weatherData}/>:
                    <p>Loading pins map...</p>
                }
            </div>
        </div>
    )
}

export default ViewWeatherLocalByLightning