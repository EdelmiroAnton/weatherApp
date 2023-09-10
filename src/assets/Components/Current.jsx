import { useEffect, useState } from "react";

const Current = () => {
  //API
  const BASE_URL = "http://api.weatherapi.com/v1";
  const API_KEY = "db02fd76b8c04ca89a4231036231108";

  const [currentCity, setCurrentCity] = useState(); //To handle the API data
  const [city, setCity] = useState("Mercedes"); // Initial city to start de API

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const data = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`
      );
      const resp = await data.json();
      //   console.log(resp);
      setCurrentCity(resp);
    };
    fetchCurrentWeather();
  }, [city]);

  // Catch the value when the user write the city in the Input
  const handleCurrentCity = () => {
    const inputValue = document.getElementById("input_currentCity").value;
    setCity(inputValue);
  };

  return (
    <>
      <input type="text" id="input_currentCity" />
      <button onClick={handleCurrentCity}>Search</button>

      {currentCity && (
          <h3>
          {currentCity.location.name}, {currentCity.location.region},{" "}
          {currentCity.location.country}
        </h3>
      )}
    </>
  );
};

export default Current;
