# Introduction
Main goal: To have a holistic view of the weather around SG whether it is using local data or global data

Open Weather API was also discovered to have mapping capabilities, and first implemented as part of the viewer. Although it is world-based data and probably not very suitable for SG use-case. Hence at a later stage, local weather api was later integrated into the viewer.

Finally, this project is free for usage, however it should not be commericalize for any use of profit.

# Implementation
### Local view
The local view is using api data from https://api-open.data.gov.sg/. The data retrieve is the latest data and returns the readings from the weather stations around SG. Data formatting was performed to fit into the pins map and the heatmap. For the heatmap, it was observed that the raw values are either to small or clamped together in a certain range. Hence normalized was performed within 0.5 to 1 (values less than 0.5 is not very visible) for better understanding of which area are more/less affected. It is to be use together with raw values, as sometime normalized heatmap has no meaning (eg. no rainfall across SG)

Weather readings includes
- Humidity (which measures the amount of water vapor in the air)
- Rainfall (which measures specific type of precipitation)
- Wind (Both Speed and Direction)
- Temperature

Forecast includes
- 2 Hour forecast
- 24 Hour forecast
- 4 Days forecast

Safety readings includes
- Wet Bulb Globe Temperature (WBGT) observations which measures heat stress assessment
- Lightning observations

### Regional view
The regional view is using api data from https://tile.openweathermap.org, the TileServer script is responsible for retrieving the tile map data from the https://tile.openweathermap.org and enhancing before sending to the client react. The tile map data is then overlay with the map. The pressure map is available, but disable as it affects mostly the northern and southern part of the world.

Weather readings includes
- Clouds
- Precipitation (which measures all forms of water that fall from the atmosphere)
- Wind Speed
- Temperature

# Setup
#### Installing node packages
a. Using repo package.json
```
npm install
```

b. Using fresh vite@latest package.json
```
npm install
npm install express cors axios dotenv
npm install sharp
npm install chart.js react-chartjs-2
npm install framer-motion
npm install react-leaflet leaflet leaflet.heat
npm install react-tabs
```

#### Preparing .env file
Creating .env in root folder with the following fields

IMPORTANT: There must be "VITE_" prefix in the names
```
VITE_OPEN_WEATHER_API = <register_openweathermap_api_key_and_fill_in>
VITE_TILE_HOST = <to_fill_in_database_url>
VITE_TILE_PORT = <to_fill_in_tile_port>
```

# Usage
#### Running server
To read from MySQL database and serves API request
```
node ./scripts/TileServer.js
```

#### Running the react client
```
npm run dev
```

# Features Log
1. Added Weather Map viewable by region's point of view

   <u>Cloud Map</u>

   ![Alt text](./images/sample_weather_cloud_map.png)

   <u>Precipitation Map</u>

   ![Alt text](./images/sample_weather_precipitation_map.png)

   <u>Temperature Map</u>

   ![Alt text](./images/sample_weather_temp_map.png)

   <u>Wind Speed Map</u>

   ![Alt text](./images/sample_weather_wind_map.png)

2. Added Weather Map viewable by local's point of view using data from data.gov.sg (NEA). Map available in pins map and heatmap.

3. Added normalized heatmap as the raw values are either to small or clamped together in a certain range.
   
   <u>Humidity Map</u>

   ![Alt text](./images/sample_weather_local_humidity.png)

   <u>Rainfall Map</u>

   ![Alt text](./images/sample_weather_local_rainfall.png)

   <u>Temperature Map</u>

   ![Alt text](./images/sample_weather_local_temperature.png)

4. Modified wind direction to include arrow head instead of pins

   <u>Wind speed & direction Map</u>
   ![Alt text](./images/sample_weather_local_wind_speed.png)

5. Modified pins map to include upper and lower threshold and set the rainfall to normalize within 0 to 1. Shown in the above updated images

6. Added forecast for two hour, twenty-four hour and four day using data from data.gov.sg (NEA) 

   <u>Forecast 2 Hour</u>

   ![Alt text](./images/sample_weather_local_forecast_2hr.png)

   <u>Forecast 24 Hour</u>

   ![Alt text](./images/sample_weather_local_forecast_24hr.png)

   <u>Forecast 4 Days</u>

   ![Alt text](./images/sample_weather_local_forecast_4days.png)

7. Added rolling text for flood alert using api from data.gov.sg (PUB)

8. Added Weather Map viewable by safety using data from data.gov.sg (NEA) in both Wet Bulb Globe Temperature (WBGT) and Lightning observation

   <u>WBGT Observation Map</u>

   ![Alt text](./images/sample_weather_local_wgbt.png)

   <u>Lightning Observation Map</u>
   
   ![Alt text](./images/sample_weather_local_lightning.png)
   