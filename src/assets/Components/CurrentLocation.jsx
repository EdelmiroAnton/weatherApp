//Helpers
import { api } from "../../helpers/weatherApi_info";
import { useFetchData } from "../../helpers/useFetchData";
import { useReverseGeocoding } from "../../helpers/useReverseGeocoding";

//Components
import SearchInput from "./SearchInput";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

//Styles
import "../Styles/currentLocation.css";
import Loader from "./Loader";
import CityName from "./CityName";

const CurrentLocation = () => {
  const { city } = useReverseGeocoding();
  const URL = `${api.BASEURL}/forecast.json?key=${api.APIKEY}&q=${city}&days=3`;
  const { currentLocation, currentWeather, forecast } = useFetchData(URL);

  return (
    <>
      <SearchInput />
      {currentLocation ? (
        <CityName currentLocation={currentLocation} />
      ) : (
        <Loader />
      )}

      <CurrentWeather currentWeather={currentWeather} />
      <Forecast forecast={forecast} />
    </>
  );
};

export default CurrentLocation;
