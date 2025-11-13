import MapWeatherRegional from '../components/MapWeatherRegional'

const ViewWeatherByPrecipitation = () => {
    return (
        <div>
            <MapWeatherRegional centerCoordinate={[1.3558, 103.8254]} 
                                zoomValue={5}
                                layer="precipitation_new"
                                opacity={0.5}
                                brightness={1.2}
                                saturation={2.0}
                                //contrast={1.0} 
            />
        </div>
    )
}

export default ViewWeatherByPrecipitation