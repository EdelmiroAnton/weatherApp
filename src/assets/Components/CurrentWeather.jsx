/* eslint-disable react/prop-types */

import humedad from "../img/humedad.png";

//Styles
import "../Styles/currentWeather.css";

const CurrentWeather = ({ currentWeather }) => {
  return (
    <>
      {currentWeather && (
        <div>
          <div className="container_img_weather_condition">
            <img
              src={currentWeather.condition.icon}
              alt="img_weather_condition"
            />
          </div>
          <h3 className="temperature">{Math.round(currentWeather.temp_c)}°</h3>
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
    </>
  );
};

export default CurrentWeather;
