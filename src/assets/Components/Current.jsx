import { useEffect } from "react";

const Current = () => {
  const BASE_URL = "http://api.weatherapi.com/v1";
  const API_KEY = "db02fd76b8c04ca89a4231036231108";
  const CITY = "mercedes, buenos aires";

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const data = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${CITY}`
      );
      const resp = await data.json();
      console.log(resp);
    };
    fetchCurrentWeather();
  }, [CITY]);

  return <div></div>;
};

export default Current;
