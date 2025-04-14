import React, { useEffect } from "react";
import useWeather from "./hooks/useWeather";
import WeatherCard from "./components/weatherCard";

const App = () => {
  const { weather, loading, error, getUserLocation } = useWeather();

  useEffect(() => {
    // Fetch weather data based on user's location
    getUserLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">🌦️ Weather App</h1>

      {loading && <p>Loading weather...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && <WeatherCard weather={weather} />}

      {!loading && !weather && !error && (
        <p className="text-gray-500">Unable to fetch weather data.</p>
      )}
    </div>
  );
};

export default App;
