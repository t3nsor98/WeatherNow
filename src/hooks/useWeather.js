import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const OpenCageAPI_KEY = import.meta.env.VITE_OPEN_CAGE_API_KEY;

const useWeather = (defaultCity = "Fetching") => {
  const [city, setCity] = useState(defaultCity);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch weather data for a city
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(
        cityName
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.info || "City not found! 404");
      }

      setWeather(data);
      setCity(cityName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to get the user's location from the browser
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const apiUrl = `https://api.opencagedata.com/geocode/v1/json`;
            const requestUrl = `${apiUrl}?key=${OpenCageAPI_KEY}&q=${encodeURIComponent(
              `${latitude},${longitude}`
            )}&pretty=1&no_annotations=1`;

            const geoRes = await fetch(requestUrl);
            if (!geoRes.ok) {
              const errorData = await geoRes.json();
              setError(
                `Error fetching location data: ${geoRes.status} - ${errorData.status.message}`
              );
              return;
            }

            const geoData = await geoRes.json();
            console.log("Geocoding response:", geoData);

            if (!geoData.results || geoData.results.length === 0) {
              setError("Could not fetch location data.");
              return;
            }

            const detectedCity =
              geoData.results[0].components.city ||
              geoData.results[0].components.town ||
              geoData.results[0].components.village;

            if (detectedCity) {
              fetchWeather(detectedCity);
            } else {
              setError("Could not detect city.");
            }
          } catch (err) {
            setError(`Error fetching city name: ${err.message}`);
          }
        },
        (error) => {
          setError(`Location access denied: ${error.message}`);
        }
      );
    } else {
      setError("Geolocation not supported");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { city, weather, loading, error, fetchWeather, getUserLocation };
};

export default useWeather;
