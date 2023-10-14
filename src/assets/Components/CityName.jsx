/* eslint-disable react/prop-types */

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
