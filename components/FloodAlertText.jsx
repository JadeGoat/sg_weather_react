import { useEffect, useState } from 'react';
import RollingText from '../components/RollingText.jsx';
// Uncomment this and comment the next line after to test
import { getFloodAlerts } from '../scripts/WeatherApi.js';
//import { getFloodAlerts } from '../scripts/MockWeatherData.js';
import '../css/FloodAlertDiv.css'

const FloodAlertText = () => {

    const [data, setData] = useState()
    const [alertHeadlines, setAlertHeadlines] = useState()
    const [alertDesc, setAlertDesc] = useState()
    const [alertInstruction, setAlertInstruction] = useState()

    useEffect(() => {
        getFloodAlerts(setData)
    }, []);

    useEffect(() => {
        console.log(data)
        if (data) {
            
            const records = data["data"]["records"]
            
            // Extract alert from data
            const results = records.map(record => {
                const readings = record.item.readings
                if (readings.length <= 0) return null
                return readings.map(reading => {
                    return { 
                            event: reading.event,
                            headline: reading.headline,
                            description: reading.description,
                            instruction: reading.instruction,
                            area: reading.area
                    }
                })
            }).filter(Boolean);

            // Set text if there is an alert
            if (results.length > 0) {
                setAlertHeadlines(`Headlines: ${results[0][0].headline}`)
                setAlertDesc(results[0][0].description)
                setAlertInstruction(results[0][0].instruction)
            }
        }
    }, [data]);

    if (!alertHeadlines) return <></>;

    return (
        <div className="floodAlertContainer">
            <div>
                <RollingText text={alertHeadlines} />
            </div>
            <div>
                <RollingText text={alertDesc} />
            </div>
            <div>
                <RollingText text={alertInstruction} />
            </div>
        </div>
    )
}

export default FloodAlertText