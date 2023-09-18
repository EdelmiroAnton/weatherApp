import { useParams } from "react-router-dom";

const SearchedCity = () => {
  const { city } = useParams();

  return <>{city}</>;
};

export default SearchedCity;
