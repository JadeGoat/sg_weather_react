import MapWeatherLocal from '../components/MapWeatherLocal.jsx'

const ViewWeatherLocalByRainfall = () => {
    return (
        <div>
            <MapWeatherLocal centerCoordinate={[1.3308, 103.8054]} 
                             zoomValue={11}
                             type="rainfall"
            />
        </div>
    )
}

export default ViewWeatherLocalByRainfall