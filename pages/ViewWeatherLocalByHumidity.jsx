import MapWeatherLocal from '../components/MapWeatherLocal.jsx'

const ViewWeatherLocalByHumidity = () => {
    return (
        <div>
            <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="relative_humidity"
            />
        </div>
    )
}

export default ViewWeatherLocalByHumidity