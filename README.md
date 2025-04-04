# 🌦️ WeatherNow

WeatherNow is a modern weather application built with React and Vite. It provides real-time weather updates, geolocation-based weather data, and detailed weather conditions, including air quality and astronomical details.

---

## 🚀 Features

- 🌍 **Real-Time Weather**: Get current weather updates for any city.
- 📍 **Geolocation Support**: Automatically fetch weather data based on the user's location.
- 🌤 **Detailed Weather Conditions**: Includes temperature, wind speed, humidity, visibility, and more.
- 🌙 **Astronomical Details**: Displays sunrise, sunset, moon phase, and moon illumination.
- 🌱 **Air Quality Index**: Provides detailed air quality metrics like CO, NO₂, PM2.5, and more.
- 📱 **Responsive Design**: Fully responsive and works seamlessly on mobile and desktop devices.

---

## 🛠️ Technologies Used

### Frontend:

- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **Tailwind CSS**: For styling and responsive design.

### APIs:

- **WeatherStack API**: For fetching real-time weather data.
- **OpenCage Geocoding API**: For reverse geocoding and location-based weather data.

### State Management:

- **React Hooks**: For managing state and side effects (`useState`, `useEffect`).

---

## 📂 Project Structure

WeatherApp/
├── public/ # Static assets
├── src/ │
├── components/ # Reusable React components (e.g., WeatherCard) │
├── hooks/ # Custom hooks (e.g., useWeather) │
├── App.jsx # Main application component │
├── index.css # Global styles │
├── main.jsx # Entry point
├── .env # Environment variables for API keys
├── package.json # Project dependencies and scripts
├── README.md # Project documentation

---

## ⚙️ Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/t3nsor98/WeatherNow.git
   ```
2. **Install Dependencies**:

   ```bash
   npm install
   ```

   3.Set Up Environment Variables:
   create a `.env` file in the root directory of the project and add the following lines:

```
VITE_API_KEY=your_weatherstack_api_key
VITE_OPENCAGE_API_KEY=your_opencage_api_key
```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

### APIs Used

## WeatherStack API:

- Provides real-time weather data.
- Used for fetching temperature, weather descriptions, and more.

##OpenCage Geocoding API:

- Used for reverse geocoding (latitude/longitude to city name).
