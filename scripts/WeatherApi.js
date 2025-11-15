import axios from 'axios';

const baseUrl = "https://api-open.data.gov.sg/v2/real-time/api"

export const getAirTemperature = async (year, setData) => {
    axios.get(`${baseUrl}/air-temperature`)
         .then(response => setData(response.data))
         .catch(error => console.error('Error retrieving data:', error))
}

export const getRainfall = async (year, setData) => {
    axios.get(`${baseUrl}/rainfall`)
         .then(response => setData(response.data))
         .catch(error => console.error('Error retrieving data:', error))
}

export const getRelativeHumidity = async (year, setData) => {
    axios.get(`${baseUrl}/relative-humidity`)
         .then(response => setData(response.data))
         .catch(error => console.error('Error retrieving data:', error))
}

export const getWindDirection = async (year, setData) => {
    axios.get(`${baseUrl}/wind-direction`)
         .then(response => setData(response.data))
         .catch(error => console.error('Error retrieving data:', error))
}

export const getWindSpeed = async (year, setData) => {
    axios.get(`${baseUrl}/wind-speed`)
         .then(response => setData(response.data))
         .catch(error => console.error('Error retrieving data:', error))
}

export const get2HourForecast = async (setData) => {
    axios.get(`${baseUrl}/two-hr-forecast`)
         .then(response => setData(response.data))
         .catch(error => console.error('Error retrieving data:', error))
}

export const get24HourForecast = async (setData) => {
    axios.get(`${baseUrl}/twenty-four-hr-forecast`)
         .then(response => setData(response.data))
         .catch(error => console.error('Error retrieving data:', error))
}

export const get4DayForecast = async (setData) => {
    axios.get(`${baseUrl}/four-day-outlook`)
         .then(response => setData(response.data))
         .catch(error => console.error('Error retrieving data:', error))
}

export const getFloodAlerts = async (setData) => {
    axios.get(`${baseUrl}/weather/flood-alerts`)
         .then(response => setData(response.data))
         .catch(error => console.error('Error retrieving data:', error))
}