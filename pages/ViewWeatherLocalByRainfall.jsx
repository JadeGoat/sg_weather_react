import MapWeatherLocal from '../components/MapWeatherLocal.jsx'

const ViewWeatherLocalByRainfall = () => {
    return (
        <div>
            <MapWeatherLocal centerCoordinate={[1.3558, 103.8254]} 
                             zoomValue={11}
                             type="rainfall"
            />
        </div>
    )
}

export default ViewWeatherLocalByRainfall