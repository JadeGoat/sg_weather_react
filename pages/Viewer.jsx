// For pages components
import ViewRentalByYear from './ViewRentalByYear';
import ViewRentalByTown from './ViewRentalByTown';
import ViewResaleByYear from './ViewResaleByYear';
import ViewResaleByTown from './ViewResaleByTown';
import ViewCarparkByTown from './ViewCarparkByTown';
import ViewPublicTransportByTown from './ViewPublicTransportByTown';
import ViewPersonalCareByTown from './ViewPersonalCareByTown';
import ViewMedicalCareByTown from './ViewMedicalCareByTown';
import ViewFoodServicesByTown from './ViewFoodServicesByTown';
import ViewRetailServicesByTown from './ViewRetailServicesByTown';
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
            <Tab>View By Year</Tab>
            <Tab>View By Town</Tab>
            <Tab>View By Weather</Tab>
          </TabList>

          <TabPanel>
            {/* Main tab - By Year */}
            <Tabs>
              <TabList>
                <Tab>Resale</Tab>
                <Tab>Rental</Tab>
              </TabList>

              {/* Sub tab 1 - Resale */}
              <TabPanel><ViewResaleByYear/></TabPanel>

              {/* Sub tab 2 - Rental */}
              <TabPanel><ViewRentalByYear/></TabPanel>
            </Tabs>
          </TabPanel>

          <TabPanel>
            {/* Main tab - By Town */}
            <Tabs>
              <TabList>
                  <Tab>Property</Tab>
                  <Tab>Transport</Tab>
                  <Tab>Lifecare & Healthcare Care</Tab>
                  <Tab>Food & Retail Services</Tab>
              </TabList>

              {/* Sub tab 1 - Property */}
              <TabPanel>
                <Tabs>
                  <TabList>
                    <Tab>Resale</Tab>
                    <Tab>Rental</Tab>
                  </TabList>
                  <TabPanel><ViewResaleByTown/></TabPanel>
                  <TabPanel><ViewRentalByTown/></TabPanel>
                </Tabs>
              </TabPanel>

              {/* Sub tab 2 - Transport */}
              <TabPanel>
                <Tabs>
                  <TabList>
                    <Tab>Carpark</Tab>
                    <Tab>Public Transport</Tab>
                  </TabList>
                  <TabPanel><ViewCarparkByTown/></TabPanel>
                  <TabPanel><ViewPublicTransportByTown/></TabPanel>
                </Tabs>
              </TabPanel>

              {/* Sub tab 3 - Lifecare & Healthcare Services */}
              <TabPanel>
                <Tabs>
                  <TabList>
                    <Tab>Lifecare Services</Tab>
                    <Tab>Healthcare Services</Tab>
                  </TabList>
                  <TabPanel><ViewPersonalCareByTown/></TabPanel>
                  <TabPanel><ViewMedicalCareByTown/></TabPanel>
                </Tabs>
              </TabPanel>

              {/* Sub tab 4 - Food & Retails Services */}
              <TabPanel>
                <Tabs>
                  <TabList>
                    <Tab>Food Services</Tab>
                    <Tab>Retail Services</Tab>
                  </TabList>
                  <TabPanel><ViewFoodServicesByTown/></TabPanel>
                  <TabPanel><ViewRetailServicesByTown/></TabPanel>
                </Tabs>
              </TabPanel>

            </Tabs>
          </TabPanel>

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