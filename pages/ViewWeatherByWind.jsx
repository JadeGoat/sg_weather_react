import MapWeather from '../components/MapWeather'

const ViewWeatherByWind = () => {
    return (
        <div>
            <MapWeather centerCoordinate={[1.3558, 103.8254]} 
                        zoomValue={5}
                        layer="wind_new"
                        opacity={0.4}
                        brightness={1.2}
                        saturation={5.0}
                        //contrast={1.0} 
            />
        </div>
    )
}

export default ViewWeatherByWind