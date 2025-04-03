import React, { useEffect } from "react";
import useWeather from "./hooks/useWeather";
import WeatherCard from "./components/weatherCard";

const DEFAULT_CITY = "New Delhi"; 

const App = () => {
  const { weather, loading, error, fetchWeather, getUserLocation } = useWeather();

  useEffect(() => {
    // Attempt to get user's location; 
    // fallback to default city if it fails
    getUserLocation();
    fetchWeather(DEFAULT_CITY);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">🌦️ Weather App</h1>

      {loading && <p>Loading weather...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && <WeatherCard weather={weather} />}

      {!loading && !weather && !error && (
        <p className="text-gray-500">No weather data available.</p>
      )}
    </div>
  );
};

export default App;
