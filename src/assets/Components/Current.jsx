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
          <h3 className="temperature">{Math.round(currentWeather.temp_c)}°</h3>
          <div className="container_img_weather_condition">
            <img
              src={currentWeather.condition.icon}
              alt="img_weather_condition"
              width={100}
            />
          </div>
          <h3 className="weatherCondition">{currentWeather.condition.text}</h3>
          <div className="container_extraInfo">
            <div className="iconHumidity">
              <img src={humedad} alt="icon_humidity" width={22} height={22} />
              {currentWeather.humidity}%
            </div>
            <div>🌧️ {currentWeather.precip_in} %</div>
            <div>🌬️ {currentWeather.wind_kph} km/h</div>
          </div>
        </div>
      )}
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

export default Current;
