import MapWeatherLocal from '../components/MapWeatherLocal.jsx'

const ViewWeatherLocalByHumidity = () => {
    return (
        <div>
            <MapWeatherLocal centerCoordinate={[1.3558, 103.8254]} 
                             zoomValue={11}
                             type="relative_humidity"
            />
        </div>
    )
}

export default ViewWeatherLocalByHumidity