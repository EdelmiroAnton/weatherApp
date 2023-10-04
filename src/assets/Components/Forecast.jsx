/* eslint-disable react/prop-types */

//Helper
import { getForecastDate } from "../../helpers/getForecastDate";

const Forecast = ({ forecast }) => {
  return (
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
  );
};

export default Forecast;
