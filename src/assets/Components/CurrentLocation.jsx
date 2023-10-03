import { Puff } from "react-loader-spinner";

//Helpers
import { getForecastDate } from "../../helpers/getForecastDate";
import { api } from "../../helpers/weatherApi_info";
import { useFetchData } from "../../helpers/useFetchData";
import { useReverseGeocoding } from "../../helpers/useReverseGeocoding";

//Components
import Search from "./Search";
import CurrentWeather from "./CurrentWeather";

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

      <div className="container_forecast">
        {forecast.map((el) => (
          <>
            <div className="daily_forecast">
              <div className="date_forecast">{getForecastDate(el.date)}</div>
              <img
                src={el.day.condition.icon}
                alt="icon_forecast"
                className="icon_forecast"
              />
              <div className="min_temp_forecast">
                Min: {Math.round(el.day.mintemp_c)}°
              </div>
              <div className="max_temp_forecast">
                Max: {Math.round(el.day.maxtemp_c)}°
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default CurrentLocation;
