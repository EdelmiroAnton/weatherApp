import { Puff } from "react-loader-spinner";

//Helpers
import { api } from "../../helpers/weatherApi_info";
import { useFetchData } from "../../helpers/useFetchData";
import { useReverseGeocoding } from "../../helpers/useReverseGeocoding";

//Components
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

//Styles
import "../Styles/current.css";

const CurrentLocation = () => {
  const { city } = useReverseGeocoding();
  const URL = `${api.BASEURL}/forecast.json?key=${api.APIKEY}&q=${city}&days=3`;
  const { currentLocation, currentWeather, forecast } = useFetchData(URL);

  return (
    <>
      <Search />
      {currentLocation ? (
        <div className="container_main_city">
          <h2 className="main_city">
            {currentLocation.name}, {currentLocation.region},{" "}
            {currentLocation.country}
          </h2>
        </div>
      ) : (
        <div className="loader">
          <div className="loader_text">Buscando tu ubicación</div>
          <div className="loader_spinner">
            <Puff />
          </div>
        </div>
      )}

      <CurrentWeather currentWeather={currentWeather} />
      <Forecast forecast={forecast} />
    </>
  );
};

export default CurrentLocation;
