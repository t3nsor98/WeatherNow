import React, { useEffect } from "react";
import useWeather from "./hooks/useWeather";
import WeatherCard from "./components/weatherCard";

const App = () => {
  const { weather, loading, error, fetchWeather, getUserLocation } =
    useWeather();

  // Fetch weather for the default city on initial render
  useEffect(() => {
    fetchWeather("Bhubaneswar");
  }, []);

  // Get user's location on initial render
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">🌦️ Weather App</h1>
      {loading && <p>Loading weather...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default App;
