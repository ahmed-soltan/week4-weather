import { useEffect, useState } from "react";
import { WeatherData } from "../../types";
import { kelvinToCelsius } from "@/lib/celsius-to-fahrenheit";
import { apiKey } from "../flags";

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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const weatherData = await weatherResponse.json();

        const forecastResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
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
