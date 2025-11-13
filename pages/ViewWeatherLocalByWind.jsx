import MapWeatherLocal from '../components/MapWeatherLocal.jsx'

const ViewWeatherLocalByWind = () => {
    return (
        <div>
            <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="wind_speed"
            />
            <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="wind_direction"
            />
        </div>
    )
}

export default ViewWeatherLocalByWind