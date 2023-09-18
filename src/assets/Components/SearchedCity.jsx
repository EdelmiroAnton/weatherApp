import { useParams } from "react-router-dom";

const SearchedCity = () => {
  const { city } = useParams();

  return (
    <>
      <h3>{city}</h3>
    </>
  );
};

export default SearchedCity;
