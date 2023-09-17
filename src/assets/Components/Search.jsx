import { useEffect, useState } from "react";

const Search = () => {
  //WEATHER API
  const BASE_URL = "https://api.weatherapi.com/v1";
  const API_KEY = "db02fd76b8c04ca89a4231036231108";

  const inputValue = document.getElementById("input_currentCity");

  const [disable, setDisable] = useState(true); //Disable search btn
  const [searchedCity, setSearchedCity] = useState(); //Get the input value and use the variable to get the data from de API URL
  const [cityFromFetchData, setCityFromFetchData] = useState([]); // Store the response from the API Data

  //Get and store the data from the "search.json" endpoint
  useEffect(() => {
    const fetchSearchData = async () => {
      const data = await fetch(
        `${BASE_URL}/search.json?key=${API_KEY}&q=${searchedCity}`
      );
      const resp = await data.json();
      setCityFromFetchData(resp);
    };
    fetchSearchData();
  }, [searchedCity]);

  //Function to reset the API Data to initial state
  const resetSearch = () => {
    setCityFromFetchData([]);
    setDisable(true);
    inputValue.value = "";
  };

  // Get the value when the user write the city in the Input
  const getUserSearch = () => {
    setSearchedCity(inputValue.value);
    if (inputValue.value === "") {
      setSearchedCity(undefined);
    }
    if (inputValue.value.length >= 3) {
      setDisable(false);
    }

    if (inputValue.value.length < 3) {
      setDisable(true);
    }
  };

  return (
    <>
      <input type="text" id="input_currentCity" onChange={getUserSearch} />
      <button
        id="resetBtn"
        onChange={getUserSearch}
        onClick={resetSearch}
        disabled={disable}
      >
        Reset
      </button>
      <ul>
        {cityFromFetchData.map((city) => (
          <li key={city.id}>
            {city.name}, {city.region}, {city.country}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Search;