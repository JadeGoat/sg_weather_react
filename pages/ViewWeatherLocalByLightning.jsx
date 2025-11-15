import { useEffect, useState } from 'react';
import { getLightningObservations } from '../scripts/WeatherApi.js';

const ViewWeatherLocalByLightning = () => {

    const [data, setData] = useState()
    
    useEffect(() => {
        getLightningObservations(setData)
    }, []);
    
    useEffect(() => {
        if (data) {
            console.log(data)
        }
    }, [data]);

    return (
        <div>
            <div>Under Construction</div>
        </div>
    )
}

export default ViewWeatherLocalByLightning