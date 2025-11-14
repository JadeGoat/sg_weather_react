import { useEffect, useState } from 'react';
import { get4DayForecast } from '../scripts/WeatherApi.js';

const ViewWeatherLocalBy4DayForecast = ({ forecastMode }) => {
    const [data, setData] = useState()
    const [forecast, setForecast] = useState(null);
    const [forecastDesc, setForecastDesc] = useState("4 Day")

    useEffect(() => {
        get4DayForecast(setData)
        setForecastDesc()
    }, []);

    useEffect(() => {
        if (data) {
            console.log(forecastMode)  
        }
    }, [data]);

    if (!forecast) return <p>Loading forecast...</p>;
    console.log(forecast)
    return (
        <div>
            <h2>Singapore {forecastDesc} Forecast</h2>
            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Time Period</th>
                        <th>Area/Region</th>
                        <th>Forecast ({forecastDesc})</th>
                    </tr>
                </thead>
                <tbody>
                    {forecast.map((item, index) => (
                    <tr key={index}>
                        <td>{item.area}</td>
                        <td>{item.forecast}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
}

export default ViewWeatherLocalBy4DayForecast