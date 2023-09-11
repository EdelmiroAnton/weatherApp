import { useEffect, useState } from "react";

const Current = () => {
  //API
  const BASE_URL = "http://api.weatherapi.com/v1";
  const API_KEY = "db02fd76b8c04ca89a4231036231108";

  const [currentCity, setCurrentCity] = useState(); //To handle the API data
  const [city, setCity] = useState("Mercedes"); // Initial city to start de API
  const [disable, setDisable] = useState(true); //Disable search btn

  //Get coordinates from the current location
  const [lat, setLat] = useState(); //latitude
  const [lon, setLon] = useState(); //longitude

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const data = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`
      );
      const resp = await data.json();
      setCurrentCity(resp.location);
    };
    fetchCurrentWeather();
  }, [city]);

  //Get latitude and longitude for geolocation. Then try to get the city with reverse geolocation
  function success(pos) {
    const crd = pos.coords;
    const lat = crd.latitude;
    const lon = crd.longitude;
    setLat(lat);
    setLon(lon);
  }

  const error = (err) => {
    console.log(err);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

  // Catch the value when the user write the city in the Input
  const searchCurrentCity = () => {
    const inputValue = document.getElementById("input_currentCity").value;
    setCity(inputValue);
  };

  const resetSearch = () => {
    const inputValue = document.getElementById("input_currentCity");
    inputValue.value = "";
  };

  const disableSearchBtn = () => {
    const inputValue = document.getElementById("input_currentCity").value;
    if (inputValue.length >= 3) {
      setDisable(false);
    }

    if (inputValue.length < 3) {
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

      {currentCity ? (
        <h3>
          {currentCity.name}, {currentCity.region}, {currentCity.country}
        </h3>
      ) : (
        <h2>error</h2>
      )}
      <div>
        {lat} / {lon}
      </div>
    </>
  );
};

export default Current;
