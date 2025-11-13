import MapWeatherLocal from '../components/MapWeatherLocal.jsx'

const ViewWeatherByTemp = () => {
    return (
        <div>
            <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="air_temp"
            />
        </div>
    )
}

export default ViewWeatherByTemp