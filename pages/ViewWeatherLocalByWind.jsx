import MapWeatherLocal from '../components/MapWeatherLocal.jsx'

const ViewWeatherLocalByWind = () => {
    return (
        <div>
            <MapWeatherLocal centerCoordinate={[1.3558, 103.8254]} 
                             zoomValue={11}
                             type="wind_speed"
            />
            <MapWeatherLocal centerCoordinate={[1.3558, 103.8254]} 
                             zoomValue={11}
                             type="wind_direction"
            />
        </div>
    )
}

export default ViewWeatherLocalByWind