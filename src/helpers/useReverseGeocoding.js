import { useState, useEffect } from "react";

export const useReverseGeocoding = () => {
  //States
  const [city, setCity] = useState(""); // city variable to use in the fetch URL Weather API
  const [lat, setLat] = useState(); //latitude from the current location
  const [lon, setLon] = useState(); //longitude from the current location

  //Get latitude and longitude for geolocation
  useEffect(() => {
    const success = (pos) => {
      const crd = pos.coords;
      const lat = crd.latitude;
      const lon = crd.longitude;
      setLat(lat);
      setLon(lon);
    };

    const error = (err) => {
      alert(err.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    //Reverse Geocoding. Get the city, state and country with the latitude and longitude.
    //Geoapify API
    const reverseGeocoding = async () => {
      const reverseGeoApiKey = "4cc4b204bae24c2ba3ac8a5810b5eabd";
      const resp = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${reverseGeoApiKey}`
      );
      const data = await resp.json();
      setCity(
        `${data.features[0].properties.city},
        ${data.features[0].properties.state},
        ${data.features[0].properties.country}`
      );
    };
    reverseGeocoding();
  }, [lat, lon]);
  return { city };
};
