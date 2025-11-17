// For pages components
import ViewWeatherLocalBy2HrForecast from './ViewWeatherLocalBy2HrForecast';
import ViewWeatherLocalBy24HrForecast from './ViewWeatherLocalBy24HrForecast';
import ViewWeatherLocalBy4DayForecast from './ViewWeatherLocalBy4DayForecast';

import ViewWeatherLocalByHumidity from './ViewWeatherLocalByHumidity';
import ViewWeatherLocalByRainfall from './ViewWeatherLocalByRainfall';
import ViewWeatherLocalByTemp from './ViewWeatherLocalByTemp';
import ViewWeatherLocalByWind from './ViewWeatherLocalByWind';

import ViewWeatherByCloud from './ViewWeatherByCloud';
import ViewWeatherByPrecipitation from './ViewWeatherByPrecipitation';
import ViewWeatherByTemp from './ViewWeatherByTemp';
import ViewWeatherByWind from './ViewWeatherByWind';
import ViewWeatherByPressure from './ViewWeatherByPressure';

import FloodAlertText from '../components/FloodAlertText';
import ViewWeatherLocalByWBGT from './ViewWeatherLocalByWBGT';
import ViewWeatherLocalByLightning from './ViewWeatherLocalByLightning';
import ViewWeatherLocalByAirQuality from './ViewWeatherLocalByAirQuality';
import ViewWeatherLocalByUVIndex from './ViewWeatherLocalByUVIndex';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Viewer = () => {

  return (
    <div>
      <div>
        <FloodAlertText/>
      </div>

      <div>
          
          <Tabs defaultIndex={0}>
            
            <TabList>
              <Tab>View Forecast</Tab>
              <Tab>View Local</Tab>
              <Tab>View Regional</Tab>
              <Tab>View Safety</Tab>
            </TabList>
            
            <TabPanel>
              {/* Main tab - View Local */}
              <Tabs>
                <TabList>
                  <Tab>2 Hour Forecast</Tab>
                  <Tab>24 Hour Forecast</Tab>
                  <Tab>4 Days Forecast</Tab>
                </TabList>

                {/* Sub tab 1 - 2 Hour Forecast */}
                <TabPanel><ViewWeatherLocalBy2HrForecast/></TabPanel>

                {/* Sub tab 1 - 24 Hour Forecast */}
                <TabPanel><ViewWeatherLocalBy24HrForecast/></TabPanel>

                {/* Sub tab 1 - 4 Day Forecast */}
                <TabPanel><ViewWeatherLocalBy4DayForecast/></TabPanel>
              </Tabs>
            </TabPanel>

            <TabPanel>
              {/* Main tab - View Local */}
              <Tabs>
                <TabList>
                  <Tab>Humidity</Tab>
                  <Tab>Rainfall</Tab>
                  <Tab>Wind</Tab>
                  <Tab>Temperature</Tab>
                </TabList>

                {/* Sub tab 1 - Humidity */}
                <TabPanel><ViewWeatherLocalByHumidity/></TabPanel>

                {/* Sub tab 2 - Rainfall */}
                <TabPanel><ViewWeatherLocalByRainfall/></TabPanel>

                {/* Sub tab 3 - Wind */}
                <TabPanel><ViewWeatherLocalByWind/></TabPanel>

                {/* Sub tab 4 - Temperature */}
                <TabPanel><ViewWeatherLocalByTemp/></TabPanel>
              </Tabs>
            </TabPanel>

            <TabPanel>
              {/* Main tab - View Regional */}
              <Tabs>
                <TabList>
                  <Tab>Clouds</Tab>
                  <Tab>Precipitation</Tab>
                  <Tab>Wind Speed</Tab>
                  <Tab>Temperature</Tab>
                  {/* <Tab>Pressure</Tab> */}
                </TabList>

                {/* Sub tab 1 - Clouds */}
                <TabPanel><ViewWeatherByCloud/></TabPanel>

                {/* Sub tab 2 - Precipitation */}
                <TabPanel><ViewWeatherByPrecipitation/></TabPanel>

                {/* Sub tab 3 - Wind speed */}
                <TabPanel><ViewWeatherByWind/></TabPanel>

                {/* Sub tab 4 - Temperature */}
                <TabPanel><ViewWeatherByTemp/></TabPanel>

                {/* Sub tab 5 - Pressure */}
                {/* <TabPanel><ViewWeatherByPressure/></TabPanel> */}
              </Tabs>
            </TabPanel>

            <TabPanel>
              {/* Main tab - View Safely */}
              <Tabs>
                <TabList>
                  <Tab>WBGT Observations</Tab>
                  <Tab>Lightning Observations</Tab>
                  <Tab>Air Quality</Tab>
                  <Tab>Ultraviolet Index</Tab>
                </TabList>

                {/* Sub tab 1 - WBGT Observations */}
                <TabPanel><ViewWeatherLocalByWBGT/></TabPanel>

                {/* Sub tab 2 - Lightning Observations */}
                <TabPanel><ViewWeatherLocalByLightning/></TabPanel>

                {/* Sub tab 3 - Air Quality (PM2.5, PMI) */}
                <TabPanel><ViewWeatherLocalByAirQuality/></TabPanel>

                {/* Sub tab 4 - Ultraviolet Index */}
                <TabPanel><ViewWeatherLocalByUVIndex/></TabPanel>
              </Tabs>
            </TabPanel>
          </Tabs>
      </div>
    </div>
  )
}

export default Viewer