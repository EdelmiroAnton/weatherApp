import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import humedad from "../img/humedad.png";

//Helpers
import { getForecastDate } from "../../helpers//getForecastDate";
import { api } from "../../helpers/weatherApi_info";
import { useFetchData } from "../../helpers/useFetchData";

//Components
import Search from "./Search";

import "../Styles/current.css";

const Current = () => {
  //States
  const [city, setCity] = useState(""); // city variable to use in the fetch URL Weather API
  const [lat, setLat] = useState(); //latitude from the current location
  const [lon, setLon] = useState(); //longitude from the current location

  const URL = `${api.BASEURL}/forecast.json?key=${api.APIKEY}&q=${city}&days=3`;
  const { currentLocation, currentWeather, forecast } = useFetchData(URL);

  //Get latitude and longitude for geolocation
  useEffect(() => {
    const success = (pos) => {
      const crd = pos.coords;
      const lat = crd.latitude;
      const lon = crd.longitude;
      setLat(lat);
      setLon(lon);
    };

    const error = (err) => {
      alert(err.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    //Reverse Geocoding. Get the city, state and country with the latitude and longitude.
    //Geoapify API
    const reverseGeocoding = async () => {
      const REVERSE_API_KEY = "4cc4b204bae24c2ba3ac8a5810b5eabd";
      const resp = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${REVERSE_API_KEY}`
      );
      const data = await resp.json();
      setCity(
        `${data.features[0].properties.city},
        ${data.features[0].properties.state},
        ${data.features[0].properties.country}`
      );
    };
    reverseGeocoding();
  }, [lat, lon]);

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
