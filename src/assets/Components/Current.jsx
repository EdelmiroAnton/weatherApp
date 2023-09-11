import { useEffect, useState } from "react";

const Current = () => {
  //WEATHER API
  const BASE_URL = "http://api.weatherapi.com/v1";
  const API_KEY = "db02fd76b8c04ca89a4231036231108";

  const [currentCity, setCurrentCity] = useState(); //To handle the API data
  const [city, setCity] = useState(""); // city variable to use in the fetch URL Weather API
  const [disable, setDisable] = useState(true); //Disable search btn

  //Coordinates from the current location
  const [lat, setLat] = useState(); //latitude
  const [lon, setLon] = useState(); //longitude

  //Effect to get information about of the user's current location
  useEffect(() => {
    const fetchCurrentCity = async () => {
      const data = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`
      );
      const resp = await data.json();
      setCurrentCity(resp.location);
    };
    fetchCurrentCity();
  }, [city]);

  //Get latitude and longitude for geolocation
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
        <h2>Buscando tu ubicación...</h2>
      )}
      <div>
        {lat} / {lon}
      </div>
    </>
  );
};

export default Current;
