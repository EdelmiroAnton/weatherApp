//React-Router Dom
import { useParams } from "react-router-dom";

//React Icons
import { IoArrowBackCircleOutline } from "react-icons/io5";

//Helpers
import { api } from "../../helpers/weatherApi_info";
import { useFetchData } from "../../helpers/useFetchData";

//Components
import CurrentWeather from "./CurrentWeather";
import CityName from "./CityName";
import Forecast from "./Forecast";

//Styles
import "../Styles/searchedCity.css";

const SearchedCity = () => {
  const { city } = useParams();
  const URL = `${api.BASEURL}/forecast.json?key=${api.APIKEY}&q=${city}&days=3`;
  const { currentLocation, currentWeather, forecast } = useFetchData(URL);

  return (
    <>
      <IoArrowBackCircleOutline />
      {currentLocation && <CityName currentLocation={currentLocation} />}
      <CurrentWeather currentWeather={currentWeather} />
      <Forecast forecast={forecast} />
    </>
  );
};

export default SearchedCity;
