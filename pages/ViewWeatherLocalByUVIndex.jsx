import { useEffect, useState } from 'react';
import { getUltravioletIndex } from '../scripts/WeatherApi.js';
import { formatIsoTimestamp } from '../scripts/DateFormatUtils.js'

const ViewWeatherLocalByUVIndex = ( ) => {

    const [data, setData] = useState()
    const [uvIndexData, setUvIndexData] = useState();

    useEffect(() => {
        getUltravioletIndex(setData)
    }, []);

    useEffect(() => {
        if (data) {
            const readings = data['data']['records'][0]['index']  
            setUvIndexData(readings)  
        }
    }, [data]);

    if (!uvIndexData) return <p>Loading ultraviolet index data...</p>;

    return (
        <div>
            <h2>Ultraviolet Index</h2>
            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Hour</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {uvIndexData.map((item, index) => (
                    <tr key={index}>
                        <td>{formatIsoTimestamp(item.hour)}</td>
                        <td>{item.value}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
}

export default ViewWeatherLocalByUVIndex