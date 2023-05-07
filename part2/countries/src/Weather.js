import { useState, useEffect } from "react";
import servCom from "./services/serverCom";

const Weather = ({ country }) => {
  const [capitalWeather, setCapitalWeather] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCapitalWeather = () => {
      servCom.getCapitalWeather(country.latlng).then((response) => {
        setCapitalWeather(response.data);
        setIsLoading(false);
      });
    };

    getCapitalWeather();
  }, [country]);

  if (isLoading) {
    return null;
  }

  const weatherIconUrl = `https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`;

  return (
    <div>
      <h2>Current Weather in {country.capital}</h2>
      <img alt={capitalWeather.weather[0].description} src={weatherIconUrl} />
      <p>Temperature: {capitalWeather.main.temp}&#176; Fahrenheit </p>
      <p>Feels like: {capitalWeather.main.feels_like}&#176; Fahrenheit</p>
      <p>Humidity: {capitalWeather.main.humidity}%</p>
      <p>Wind Speed: {capitalWeather.wind.speed} m.p.h</p>
      <p>Clouds: {capitalWeather.clouds.all}%</p>
    </div>
  );
};

export default Weather;
