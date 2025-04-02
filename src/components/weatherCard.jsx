import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather || !weather.current || !weather.location) return null;

  const { location, current } = weather;
  const { astro, air_quality } = current;

  return (
    <div className="mt-4 bg-white p-6 rounded shadow-md max-w-md text-gray-800">
      {/* Location Info */}
      <h2 className="text-xl font-semibold">
        {location.name}, {location.country}
      </h2>
      <p className="text-gray-600">{location.region}</p>
      <p className="text-gray-600">Local Time: {location.localtime}</p>

      {/* Weather Summary */}
      <div className="flex items-center space-x-4 mt-2">
        <img
          src={current.weather_icons[0]}
          alt="weather icon"
          className="w-16"
        />
        <div>
          <p className="text-lg font-bold">{current.weather_descriptions[0]}</p>
          <p className="text-2xl font-semibold">{current.temperature}°C</p>
          <p>Feels like: {current.feelslike}°C</p>
        </div>
      </div>

      {/* Weather Conditions */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <p>
          🌬 Wind: {current.wind_speed} km/h ({current.wind_dir})
        </p>
        <p>🌡 Pressure: {current.pressure} hPa</p>
        <p>💧 Humidity: {current.humidity}%</p>
        <p>🌫 Visibility: {current.visibility} km</p>
        <p>☁ Cloud Cover: {current.cloudcover}%</p>
        <p>🌞 UV Index: {current.uv_index}</p>
      </div>

      {/* Astro Details */}
      <h3 className="text-lg font-semibold mt-4">🌙 Astro</h3>
      <div className="grid grid-cols-2 gap-4">
        <p>🌅 Sunrise: {astro.sunrise}</p>
        <p>🌄 Sunset: {astro.sunset}</p>
        <p>🌔 Moon Phase: {astro.moon_phase}</p>
        <p>🌒 Moon Illumination: {astro.moon_illumination}%</p>
      </div>

      {/* Air Quality */}
      <h3 className="text-lg font-semibold mt-4">🌍 Air Quality</h3>
      <div className="grid grid-cols-2 gap-4">
        <p>🫁 CO: {air_quality.co} μg/m³</p>
        <p>🌫 NO₂: {air_quality.no2} μg/m³</p>
        <p>🌳 O₃: {air_quality.o3} μg/m³</p>
        <p>☣ SO₂: {air_quality.so2} μg/m³</p>
        <p>💨 PM2.5: {air_quality.pm2_5} μg/m³</p>
        <p>🏭 PM10: {air_quality.pm10} μg/m³</p>
        <p>🇺🇸 US AQI: {air_quality["us-epa-index"]}</p>
        <p>🇬🇧 UK AQI: {air_quality["gb-defra-index"]}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
