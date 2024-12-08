import { useEffect, useState } from "react";
import { WeatherData } from "../../types";
import { kelvinToCelsius } from "@/lib/celsius-to-fahrenheit";
import { apiKey } from "../../flags";

export const useWeather = () => {
  const [city, setCity] = useState("cairo");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );
        const forecastData = await forecastResponse.json();

        setWeatherData(weatherData);
        setForecastData(forecastData);
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  const temperatureInKelvin = weatherData?.main?.temp || null;
  const temperatureInCelsius = temperatureInKelvin
    ? kelvinToCelsius(temperatureInKelvin).toFixed(2)
    : null;

  return {
    weatherData,
    forecastData,
    temperatureInCelsius,
    city,
    setCity,
    isLoading,
  };
};
