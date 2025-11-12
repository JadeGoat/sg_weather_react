import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import '../css/MapWeather.css'
const tile_host = import.meta.env.VITE_TILE_HOST;
const tile_port = import.meta.env.VITE_TILE_PORT;

const MapWeather = ({ centerCoordinate, zoomValue, layer, opacity, brightness, saturation, contrast }) => {

  const [tileUrl, setTileUrl] = useState("")

  useEffect(() => {
    // Baseline url 
    var tempUrl = `http://${tile_host}:${tile_port}/tiles/${layer}/{z}/{x}/{y}.png`

    // Construct optional query params if present
    if (brightness || saturation || contrast ) {
      var first_var = true
      tempUrl += "?"
      if (brightness) {
        tempUrl += `brightness=${brightness}`
        first_var = false
      }
      if (saturation) {
        if (first_var == false) tempUrl += "&"
        tempUrl += `saturation=${saturation}`
        first_var = false 
      }
      if (contrast) {
        if (first_var == false) tempUrl += "&"
        tempUrl += `contrast=${contrast}`
        first_var = false 
      }
    }
    setTileUrl(tempUrl)
  }, [layer, brightness, saturation, contrast]);

  return ( 
      <MapContainer className='mapWeatherContainer' center={centerCoordinate} zoom={zoomValue}>
          <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              opacity={opacity}
          />
          
          <TileLayer
              url={tileUrl}
              attribution="&copy; OpenWeatherMap"
          />
      </MapContainer>
  )
}

export default MapWeather

