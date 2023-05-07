import axios from "axios";

const baseUrlCountry = "https://restcountries.com/v3.1/all",
  baseUrlOpenWeather = "https://api.openweathermap.org/data/2.5/weather",
  openWeatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const getAllCountries = () => {
  return axios.get(baseUrlCountry);
};

const getCapitalWeather = (latlng) => {
  const capitalWeatherUrl = baseUrlOpenWeather.concat(
    `?lat=${latlng[0]}`,
    `&lon=${latlng[1]}`,
    `&appid=${openWeatherApiKey}`,
    `&units=imperial`
  );

  return axios.get(capitalWeatherUrl);
};

const servCom = {
  getAllCountries,
  getCapitalWeather,
};

export default servCom;
