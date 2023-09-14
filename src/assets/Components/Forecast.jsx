// import { useEffect } from "react";

// const Forecast = () => {
//   //WEATHER API
//   const BASE_URL = "https://api.weatherapi.com/v1";
//   const API_KEY = "db02fd76b8c04ca89a4231036231108";

//   //Effect to get information about the forecast
//   useEffect(() => {
//     const fetchForecast = async () => {
//       const data = await fetch(
//         `${BASE_URL}/forecast.json?key=${API_KEY}&q=mercedes&days=3`
//       );
//       const resp = await data.json();
//       console.log(resp);
//     };
//     fetchForecast();
//   }, []);

//   return (
//     <>
//       <div>lala</div>
//     </>
//   );
// };

// export default Forecast;
