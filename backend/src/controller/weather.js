import axios from "axios";

async function getCoordinates(place) {
  try {
    const geoAPI = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      place
    )}&count=1&language=en&format=json`;

    const { data } = await axios.get(geoAPI);
    if (!data.results || data.results.length === 0) {
      throw new Error("Location not found!");
    }

    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
      locationName: data.results[0].name,
    };
  } catch (error) {
    console.error("Error fetching location:", error.message);
    return null;
  }
}

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Dense fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Light snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  80: "Light rain showers",
  81: "Moderate rain showers",
  82: "Heavy rain showers",
};

async function fetchWeatherForecast(place) {
  const location = await getCoordinates(place);
  if (!location) return null;

  const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=Asia/Kolkata`;

  try {
    const { data } = await axios.get(weatherAPI);
    const dailyForecasts = data.daily;

    return {
      location: location.locationName,
      forecast: dailyForecasts.time.map((date, i) => ({
        date,
        max_temp: dailyForecasts.temperature_2m_max[i],
        min_temp: dailyForecasts.temperature_2m_min[i],
        rain: dailyForecasts.precipitation_sum[i],
        description: weatherDescriptions[dailyForecasts.weathercode[i]] || "Unknown conditions",
      })),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null;
  }
}

export default fetchWeatherForecast;
