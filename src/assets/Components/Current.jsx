import { Puff } from "react-loader-spinner";
import humedad from "../img/humedad.png";

//Helpers
import { getForecastDate } from "../../helpers//getForecastDate";
import { api } from "../../helpers/weatherApi_info";
import { useFetchData } from "../../helpers/useFetchData";
import { useReverseGeocoding } from "../../helpers/useReverseGeocoding";

//Components
import Search from "./Search";

//Styles
import "../Styles/current.css";

const Current = () => {
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

      {currentWeather && (
        <div className="container_weather">
          <h3 className="temperature">{currentWeather.temp_c}°</h3>
          <img
            src={currentWeather.condition.icon}
            alt="icon_weather_condition"
          />
          <h3 className="weatherCondition">{currentWeather.condition.text}</h3>
          <h3>
            <img src={humedad} alt="icon_humidity" className="iconHumidity" />
            {currentWeather.humidity}%
          </h3>
          <h3>🌧️ {currentWeather.precip_in} %</h3>
          <h3>🌬️ {currentWeather.wind_kph} km/h</h3>
        </div>
      )}
      {forecast.map((el) => (
        <>
          <div>{getForecastDate(el.date)}</div>
          <img src={el.day.condition.icon} alt="" />
          <div>{el.day.mintemp_c} °C</div>
          <div>{el.day.maxtemp_c} °C</div>
        </>
      ))}
    </>
  );
};

export default Current;
