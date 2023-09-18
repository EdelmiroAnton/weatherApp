import { useEffect, useState } from "react";

export const useFetchData = (url) => {
  const [currentLocation, setCurrentLocation] = useState(); //To store the city, region and country
  const [currentWeather, setCurrentWeather] = useState(); //To render the current weather information
  const [forecast, setForecast] = useState([]); //To store the forecast of the city

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(url);
      const resp = await data.json();

      setCurrentLocation(resp.location), setCurrentWeather(resp.current);
      setForecast(resp.forecast.forecastday);
    };
    fetchData();
  }, [url]);
  
  return {
    currentLocation,
    currentWeather,
    forecast,
  };
};
