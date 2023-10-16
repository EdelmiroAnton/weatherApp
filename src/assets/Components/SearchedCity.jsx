//React-Router Dom
import { useParams, useNavigate } from "react-router-dom";

//img
import backArrow from "../img/back-button.png";

//Helpers
import { api } from "../../helpers/weatherApi_info";
import { useFetchData } from "../../helpers/useFetchData";

//Components
import CurrentWeather from "./CurrentWeather";
import CityName from "./CityName";
import Forecast from "./Forecast";
import Loader from "./Loader";

//Styles
import "../Styles/searchedCity.css";

const SearchedCity = () => {
  const { city } = useParams();
  const URL = `${api.BASEURL}/forecast.json?key=${api.APIKEY}&q=${city}&days=3`;
  const { currentLocation, currentWeather, forecast } = useFetchData(URL);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="arrowBack-and-city">
        <img src={backArrow} alt="" onClick={goBack} className="arrowBack" />

        {currentLocation ? (
          <CityName currentLocation={currentLocation} />
        ) : (
          <Loader />
        )}
      </div>
      <CurrentWeather currentWeather={currentWeather} />
      <Forecast forecast={forecast} />
    </>
  );
};

export default SearchedCity;
