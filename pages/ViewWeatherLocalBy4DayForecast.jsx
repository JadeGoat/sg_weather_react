import { useEffect, useState } from 'react';
import { get4DayForecast } from '../scripts/WeatherApi.js';
import { addDay } from '../scripts/DateFormatUtils.js'

const ViewWeatherLocalBy4DayForecast = ( ) => {

    const [data, setData] = useState()
    const [startDateDesc, setStartDateDesc] = useState();
    const [startDate, setStartDate] = useState();
    const [forecast, setForecast] = useState(null);
    const [forecastDesc, ] = useState("4 Day")

    useEffect(() => {
        get4DayForecast(setData)
    }, []);

    useEffect(() => {
        if (data) {
            const date = data['data']['records'][0]['date']
            setStartDateDesc(`Start Period: ${date}`)
            setStartDate(new Date(date))
            setForecast(data['data']['records'][0]['forecasts'])
        }
    }, [data]);

    if (!forecast) return <p>Loading forecast...</p>;

    return (
        <div>
            <h2>Singapore {forecastDesc} Forecast</h2>
            <h4>{startDateDesc}</h4>
            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Forecast ({forecastDesc})</th>
                        <th>Humidity (Low)</th>
                        <th>Humidity (High)</th>
                        <th>Temperature (Low)</th>
                        <th>Temperature (High)</th>
                        <th>Wind Direction</th>
                        <th>Wind Speed (Low)</th>
                        <th>Wind Speed (High)</th>
                    </tr>
                </thead>
                <tbody>
                    {forecast.map((item, index) => (
                    <tr key={index}>
                        <td>{item.day} ({addDay(startDate, index).toString()})</td>
                        <td>{item.forecast.summary}</td>
                        <td>{item.relativeHumidity.low}</td>
                        <td>{item.relativeHumidity.high}</td>
                        <td>{item.temperature.low}</td>
                        <td>{item.temperature.high}</td>
                        <td>{item.wind.direction}</td>
                        <td>{item.wind.speed.low}</td>
                        <td>{item.wind.speed.low}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
}

export default ViewWeatherLocalBy4DayForecast