import { useEffect, useState } from 'react';
import { getAirQualityPm25, getAirQualityPsi } from '../scripts/WeatherApi.js';

const ViewWeatherLocalByAirQuality = ( ) => {

    const [pm25Data, setPm25] = useState();
    const [pmiData, setPmiData] = useState();
    const [pm25Readings, setPm25Readings] = useState();
    const [psiReadings, setPsiReadings] = useState();

    useEffect(() => {
        getAirQualityPm25(setPm25)
        getAirQualityPsi(setPmiData)
    }, []);

    useEffect(() => {
        if (pm25Data) {
            const readings = pm25Data['data']['items'][0]['readings']['pm25_one_hourly']
            setPm25Readings(readings)
        }
        if (pmiData) {
            const readings = pmiData['data']['items'][0]['readings']
            setPsiReadings(readings)
        }
    }, [pm25Data, pmiData]);

    if (!pm25Readings || !psiReadings) return <p>Loading air quality...</p>;

    return (
        <div>
            <div>
                <h2>PM2.5 (One Hourly)</h2>
                <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Area</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(pm25Readings).map(([key, value]) => {
                                const capKey = key.charAt(0).toUpperCase() + key.slice(1);
                                return (<tr key={key}>
                                            <td>{capKey}</td>
                                            <td>{value}</td>
                                        </tr>);
                            }
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <h2>Pollutant Standards Index (PSI)</h2>
                <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Central</th>
                            <th>East</th>
                            <th>North</th>
                            <th>South</th>
                            <th>West</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(psiReadings).map(([key, value]) => {
                                return (<tr key={key}>
                                            <td>{key}</td>
                                            <td>{value.central}</td>
                                            <td>{value.east}</td>
                                            <td>{value.north}</td>
                                            <td>{value.south}</td>
                                            <td>{value.west}</td>
                                        </tr>);
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
  );
}

export default ViewWeatherLocalByAirQuality