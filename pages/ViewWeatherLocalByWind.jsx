import MapWeatherLocal from '../components/MapWeatherLocal.jsx'

const ViewWeatherLocalByWind = () => {
    return (
        <div>
            <h2>Wind Speed</h2>
            <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="wind_speed"
            />
            <h2>Wind Direction</h2>
            <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="wind_direction"
            />
        </div>
    )
}

export default ViewWeatherLocalByWind