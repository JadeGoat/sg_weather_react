// For pages components
import ViewWeatherByCloud from './ViewWeatherByCloud';
import ViewWeatherByPrecipitation from './ViewWeatherByPrecipitation';
import ViewWeatherByTemp from './ViewWeatherByTemp';
import ViewWeatherByWind from './ViewWeatherByWind';
import ViewWeatherByPressure from './ViewWeatherByPressure';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Viewer = () => {

  return (
    <div>
        <Tabs defaultIndex={0}>
          
          <TabList>
            <Tab>View By Weather</Tab>
          </TabList>

          <TabPanel>
            {/* Main tab - By Weather */}
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
        </Tabs>
    </div>
  )
}

export default Viewer