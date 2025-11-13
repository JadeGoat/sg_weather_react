import MapWeatherRegional from '../components/MapWeatherRegional'

const ViewWeatherByPressure = () => {
    return (
        <div>
            <MapWeatherRegional centerCoordinate={[1.3558, 103.8254]} 
                                zoomValue={5}
                                layer="pressure_new"
                                opacity={0.3}
                                brightness={1.2}
                                saturation={15.0}
                                //contrast={1.0} 
            />
        </div>
    )
}

export default ViewWeatherByPressure