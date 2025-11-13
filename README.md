# Introduction
Main goal: To have a holistic view of the weather around SG whether it is using local data or global data

# Implementation
The local view is using api data from https://api-open.data.gov.sg/. The data retrieve is the latest data and returns the readings from the weather stations around SG. Data formatting was performed to fit into the pins map and the heatmap. For the heatmap, it was observed that the raw values are either to small or clamped together in a certain range. Hence normalized was performed within 0.5 to 1 (values less than 0.5 is not very visible) for better understanding of which area are more/less affected.

The regional data is using api data from https://tile.openweathermap.org, the TileServer script is responsible for retrieve the tile map data from the https://tile.openweathermap.org and enhancing before sending to the client react. The tile map data is then overlay with the map. The pressure map is available, but disable as it affects mostly the northern and southern part of the world.

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

2. Added Weather Map viewable by local's point of view. Map available in pins map and heatmap.

3. Added normalized heatmap as the raw values are either to small or clamped together in a certain range.
   
   ![Alt text](./images/sample_weather_local_humidity.png)

   ![Alt text](./images/sample_weather_local_temperature.png)

   ![Alt text](./images/sample_weather_local_wind_speed.png)