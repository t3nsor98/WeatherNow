import { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const OpenCageAPI_KEY = import.meta.env.VITE_OPEN_CAGE_API_KEY;

const useWeather = () => {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to construct WeatherStack API URL
  const constructWeatherUrl = (cityName) =>
    `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(cityName)}`;

  // Helper function to construct OpenCage API URL
  const constructGeocodeUrl = (latitude, longitude) =>
    `https://api.opencagedata.com/geocode/v1/json?key=${OpenCageAPI_KEY}&q=${encodeURIComponent(
      `${latitude},${longitude}`
    )}&pretty=1&no_annotations=1`;

  // Function to fetch weather data for a city
  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(constructWeatherUrl(cityName));

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
  const getUserLocation = async () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      return false;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(constructGeocodeUrl(latitude, longitude));

            if (!response.ok) {
              const errorData = await response.json();
              setError(
                `Error fetching location data: ${response.status} - ${errorData.status.message}`
              );
              resolve(false);
              return;
            }

            const geoData = await response.json();
            if (!geoData.results || geoData.results.length === 0) {
              setError("Could not fetch location data.");
              resolve(false);
              return;
            }

            const detectedCity =
              geoData.results[0].components.city ||
              geoData.results[0].components.town ||
              geoData.results[0].components.village;

            if (detectedCity) {
              await fetchWeather(detectedCity);
              resolve(true);
            } else {
              setError("Could not detect city.");
              resolve(false);
            }
          } catch (err) {
            setError(`Error fetching city name: ${err.message}`);
            resolve(false);
          }
        },
        (error) => {
          setError(`Location access denied: ${error.message}`);
          resolve(false);
        }
      );
    });
  };

  return { city, weather, loading, error, fetchWeather, getUserLocation };
};

export default useWeather;
