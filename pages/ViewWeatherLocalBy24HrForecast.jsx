import { useEffect, useState } from 'react';
import { get24HourForecast } from '../scripts/WeatherApi.js';
import { formatIsoTimestamp } from '../scripts/DateFormatUtils.js'

const ViewWeatherLocalBy24HrForecast = ({ forecastMode }) => {

    const [data, setData] = useState()
    const [forecast, setForecast] = useState(null);
    const [forecastDesc, ] = useState("24Hr")

    useEffect(() => {
        get24HourForecast(setData)
    }, []);

    useEffect(() => {
        if (data) {
            setForecast(data['data']['records'][0]['periods'])
        }
    }, [data]);

    if (!forecast) return <p>Loading forecast...</p>;

    return (
        <div>
            <h2>Singapore {forecastDesc} Forecast</h2>
            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Time Period</th>
                        <th>Forecast (Central)</th>
                        <th>Forecast (East)</th>
                        <th>Forecast (North)</th>
                        <th>Forecast (South)</th>
                        <th>Forecast (West)</th>
                    </tr>
                </thead>
                <tbody>
                    {forecast.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <pre>
                                {formatIsoTimestamp(item.timePeriod.start)} -<br/>
                                {formatIsoTimestamp(item.timePeriod.end)}
                            </pre>
                        </td>    
                        <td>{item.regions.central.text}</td>
                        <td>{item.regions.east.text}</td>
                        <td>{item.regions.north.text}</td>
                        <td>{item.regions.south.text}</td>
                        <td>{item.regions.west.text}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
}

export default ViewWeatherLocalBy24HrForecast