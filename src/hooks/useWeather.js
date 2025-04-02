import { useState, useEffect } from "react";

const APi_KEY = import.meta.env.VITE_API_KEY;

const useWeather = (defaultCity = "Fetching") => {
  const [city, setCity] = useState(defaultCity);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  //a function to fetch weather data of the city

  const fetchWeather = async (cityName) => {
    setLoading(true);
    SpeechSynthesisErrorEvent(null);

    try {
      const apiUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(
        cityName
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.info || "City not found ! 404");
      }

      setWeather(data);
      setCity(cityName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
};

export default useWeather;
