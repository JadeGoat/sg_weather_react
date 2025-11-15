import { useEffect, useState } from 'react';
import { getWBGTObservations } from '../scripts/WeatherApi.js';

const ViewWeatherLocalByWBGT = () => {

    const [data, setData] = useState()

    useEffect(() => {
        getWBGTObservations(setData)
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

export default ViewWeatherLocalByWBGT