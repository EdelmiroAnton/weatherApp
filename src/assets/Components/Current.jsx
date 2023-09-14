import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import humedad from "../humedad.png";
import "../Styles/current.css";

const Current = () => {
  //WEATHER API
  const BASE_URL = "https://api.weatherapi.com/v1";
  const API_KEY = "db02fd76b8c04ca89a4231036231108";

  const [currentLocation, setCurrentLocation] = useState(); //To store the city, region and country
  const [currentWeather, setCurrentWeather] = useState(); //To render the current weather information
  const [city, setCity] = useState(""); // city variable to use in the fetch URL Weather API
  const [disable, setDisable] = useState(true); //Disable search btn

  //Coordinates from the current location
  const [lat, setLat] = useState(); //latitude
  const [lon, setLon] = useState(); //longitude

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

  //Effect to get information about of the user's current location
  useEffect(() => {
    const fetchCurrentCity = async () => {
      const data = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`
      );
      const resp = await data.json();
      setCurrentLocation(resp.location);
      setCurrentWeather(resp.current);
    };
    fetchCurrentCity();
  }, [city]);

  // Catch the value when the user write the city in the Input
  let inputValue = document.getElementById("input_currentCity");
  const searchCurrentCity = () => {
    setCity(inputValue.value);
  };

  const resetSearch = () => {
    inputValue.value = "";
  };

  const disableSearchBtn = () => {
    if (inputValue.value.length >= 3) {
      setDisable(false);
    }

    if (inputValue.value.length < 3) {
      setDisable(true);
    }
  };
  return (
    <>
      <input type="text" id="input_currentCity" onChange={disableSearchBtn} />
      <button onClick={searchCurrentCity} disabled={disable}>
        Search
      </button>
      <button onClick={resetSearch}>Reset</button>
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
    </>
  );
};

export default Current;
