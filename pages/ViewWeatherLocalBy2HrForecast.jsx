import { useEffect, useState } from 'react';
import { get2HourForecast } from '../scripts/WeatherApi.js';
import { formatIsoTimestamp } from '../scripts/DateFormatUtils.js'

const ViewWeatherLocalBy2HrForecast = ( ) => {

    const [data, setData] = useState()
    const [periodDesc, setPeriodDesc] = useState();
    const [forecast, setForecast] = useState();
    const [forecastDesc, ] = useState("2Hr")

    useEffect(() => {
        get2HourForecast(setData)
    }, []);

    useEffect(() => {
        if (data) {
            // Extract the forecast data
            const dataItems = data['data']['items'][0]
            setForecast(dataItems['forecasts'])

            // Format the start and end period
            const startDate = formatIsoTimestamp(dataItems['valid_period']['start'])
            const endDate = formatIsoTimestamp(dataItems['valid_period']['end'])
            const desc = `Period:\n${startDate} -\n${endDate}  `
            setPeriodDesc(desc)        
        }
    }, [data]);

    if (!forecast) return <p>Loading forecast...</p>;

    return (
        <div>
            <h2>Singapore {forecastDesc} Forecast</h2>
            <h4><pre>{periodDesc}</pre></h4>
            <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Area</th>
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

export default ViewWeatherLocalBy2HrForecast