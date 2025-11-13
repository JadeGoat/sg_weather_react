import MapWeatherLocal from '../components/MapWeatherLocal.jsx'

const ViewWeatherByTemp = () => {
    return (
        <div>
            <MapWeatherLocal centerCoordinate={[1.3558, 103.8254]} 
                             zoomValue={14}
                             type="air_temp"
            />
        </div>
    )
}

export default ViewWeatherByTemp