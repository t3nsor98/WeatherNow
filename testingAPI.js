const apiKey = "cf295158326503a1bff279f0289ba8c4";
const city = "Bhubaneswar";
const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(
  city
)}`;

fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Weather data for", city, ":", data);
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
  });
