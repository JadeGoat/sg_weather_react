# Introduction
Main goal: To

# Implementation
To ....

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
