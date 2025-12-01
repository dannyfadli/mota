const API_KEY = import.meta.env.VITE_WEATHER_API;

export async function getWeatherByCoords(lat: number, lon: number) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${API_KEY}`;
    const response = await fetch(url);

    const data = await response.json();

    if (data.cod === 401) {
      console.error("INVALID API KEY:", data);
    }

    return data;
  } catch (err) {
    console.error("ERROR WEATHER:", err);
    return null;
  }
}
