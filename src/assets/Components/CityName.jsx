/* eslint-disable react/prop-types */
import "../Styles/cityName.css";

const CityName = ({ currentLocation }) => {
  return (
    <div className="container_main_city">
      <h2 className="main_city">
        {currentLocation.name}, {currentLocation.region},{" "}
        {currentLocation.country}
      </h2>
    </div>
  );
};

export default CityName;
