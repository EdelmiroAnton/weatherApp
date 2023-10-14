import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Helpers
import { api } from "../../helpers/weatherApi_info";

//Images
import cancel_icon from "../img/cancel_icon.png";
import magnifyingGlass from "../img/magnifying_glass.png";
import "../Styles/search.css";

const Search = () => {
  const [disable, setDisable] = useState(true); //Disable search btn
  const [searchedCity, setSearchedCity] = useState(); //Get the input value and use the variable to get the data from de API URL
  const [cityFromFetchData, setCityFromFetchData] = useState([]); // Store the response from the API Data

  //Get and store the data from the "search.json" endpoint
  useEffect(() => {
    const fetchSearchData = async () => {
      const data = await fetch(
        `${api.BASEURL}/search.json?key=${api.APIKEY}&q=${searchedCity}`
      );
      const resp = await data.json();
      setCityFromFetchData(resp);
    };
    fetchSearchData();
  }, [searchedCity]);

  const inputValue = document.getElementById("input_currentCity");

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

  // Effect when the user tap the input to search
  const toggleInput = () => {
    inputValue.classList.toggle("lightEffect");
  };

  // Hide/show search Input
  const toggleSearchInput = () => {
    const searchInputContainer = document.getElementsByClassName(
      "container_searchInput"
    )[0];
    if (searchInputContainer.style.display === "none") {
      return (searchInputContainer.style.display = "block");
    }
    return (searchInputContainer.style.display = "none");
  };

  return (
    <>
      <img
        src={magnifyingGlass}
        alt="icon_magnifyingGlass"
        className="icon_magnifyingGlass margin_icon_magnifyingGlass"
        onClick={toggleSearchInput}
      />
      <div className="container_searchInput">
        <input
          type="text"
          id="input_currentCity"
          className="search_input"
          onChange={getUserSearch}
          onClick={toggleInput}
          placeholder="Search for a city, state or country"
        />
        <div className="container_cancel_icon">
          <img
            src={cancel_icon}
            alt="icon_cancel"
            className="icon_cancel"
            onClick={resetSearch}
            disabled={disable}
          />
        </div>
        {searchedCity && (
          <ul>
            {cityFromFetchData.map((city) => (
              <li key={city.id}>
                <Link
                  to={`/city/${city.name}, ${city.region}, ${city.country}`}
                >
                  {city.name}, {city.region}, {city.country}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Search;
