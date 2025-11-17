import { useEffect, useState } from 'react';
import MapWeatherLocal from '../components/MapWeatherLocal.jsx'
import Heatmap from '../components/Heatmap.jsx';
import { convertLightningData } from '../scripts/ConversionUtils.js'
import { getLightningObservations } from '../scripts/WeatherApi.js';
import '../css/ViewWeatherByLocal.css'

const ViewWeatherLocalByLightning = () => {

    const [data, setData] = useState()
    const [weatherData, setWeatherData] = useState()
    const [weatherHighValueData, setWeatherHighValueData] = useState()

    useEffect(() => {
        getLightningObservations(setData)
    }, []);
    
    useEffect(() => {
        if (data) {
            const results = convertLightningData(data)
            setWeatherData(results.location_data)
            setWeatherHighValueData(results.location_high_value_data)
        }
    }, [data]);

    return (
        <div className='localWeatherContainer'>
            <div>
                <h2>Pins Map</h2>
                <div>
                    <h4>Filtered values</h4>
                    { weatherHighValueData ?
                        <MapWeatherLocal centerCoordinate={[1.3408, 103.8054]} 
                                    zoomValue={10}
                                    type="lightning_ground"
                                    weatherData={weatherHighValueData}/>:
                        <p>Loading pins map...</p>
                    }
                </div>
                <div>
                    <h4>Raw values</h4>
                    { weatherData ?
                        <MapWeatherLocal centerCoordinate={[1.3408, 103.8054]} 
                                    zoomValue={10}
                                    type="lightning"
                                    weatherData={weatherData}/>:
                        <p>Loading pins map...</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewWeatherLocalByLightning