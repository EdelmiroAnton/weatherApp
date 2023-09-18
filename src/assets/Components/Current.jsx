// import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import humedad from "../img/humedad.png";

//Helpers
import { getForecastDate } from "../../helpers//getForecastDate";
import { api } from "../../helpers/weatherApi_info";
import { useFetchData } from "../../helpers/useFetchData";

//Components
import Search from "./Search";

import "../Styles/current.css";
import { useReverseGeocoding } from "../../helpers/useReverseGeocoding";

const Current = () => {
  const { city } = useReverseGeocoding();
  const URL = `${api.BASEURL}/forecast.json?key=${api.APIKEY}&q=${city}&days=3`;
  const { currentLocation, currentWeather, forecast } = useFetchData(URL);

  return (
    <>
      <Search />
      {currentLocation ? (
        <h3>
          {currentLocation.name}, {currentLocation.region},{" "}
          {currentLocation.country}
        </h3>
      ) : (
        <div>
          <div>Buscando tu ubicación</div>
          <Puff />
        </div>
      )}
      {currentWeather && (
        <div>
          <h3>🌡️ {currentWeather.temp_c} °C</h3>
          <img
            src={currentWeather.condition.icon}
            alt="icon_weather_condition"
          />
          <h3>{currentWeather.condition.text}</h3>
          <h3>
            <img src={humedad} alt="icon_humidity" className="iconHumidity" />
            {currentWeather.humidity}%
          </h3>
          <h3>🌧️ {currentWeather.precip_in} %</h3>
          <h3>🌬️ {currentWeather.wind_kph} km/h</h3>
        </div>
      )}
      {forecast.map((el) => (
        <>
          <div>{getForecastDate(el.date)}</div>
          <img src={el.day.condition.icon} alt="" />
          <div>{el.day.mintemp_c} °C</div>
          <div>{el.day.maxtemp_c} °C</div>
        </>
      ))}
    </>
  );
};

export default Current;
