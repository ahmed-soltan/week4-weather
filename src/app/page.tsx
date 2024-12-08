"use client";

import Image from "next/image";
import { kelvinToCelsius } from "@/lib/celsius-to-fahrenheit";
import SearchCities from "./search-cities";
import { useWeather } from "../hooks/use-weather";

const stateBgMap: Record<string, string> = {
  Clear: "/Clear.jpg",
  Clouds: "/cloudy.jpg",
  Rain: "/2_3.jpg",
  Thunderstorm: "/thunder.jpg",
  Snow: "/snowy.jpg",
  Drizzle: "/drizzle.jpg",
  Fog: "/foggy.jpg",
  Mist: "/misty.jpg",
  Haze: "/hazy.jpg",
  Extreme: "/download.jpg",
};

export default function Home() {
  const { weatherData, forecastData, temperatureInCelsius, city, setCity, isLoading } = useWeather();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!weatherData || !forecastData) {
    return <div className="flex justify-center items-center h-screen">Failed to load weather data</div>;
  }

  if(weatherData.cod==="404" || forecastData.cod==="404"){
    return <div className="flex justify-center items-center h-screen text-white">City not found</div>;
  }

  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `url(${stateBgMap[weatherData.weather[0].main] || "/default.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-start w-full max-w-[1500px] px-4 py-6 mx-auto gap-5">
        <div className="w-full flex items-center gap-2 justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold text-white">
              {weatherData.name}, {weatherData.sys.country}
            </h1>
            <span className="text-[100px] text-white font-medium">
              {temperatureInCelsius}°
            </span>
            <div className="flex items-center gap-2 bg-slate-100 to-blue-100 text-black rounded-sm px-5 py-1 w-full max-w-[150px]">
              <h1 className="text-xl text-black">
                {weatherData.weather[0].main}
              </h1>
              <span className="text-xl text-black font-medium">
                {Math.round(kelvinToCelsius(weatherData.main.temp_min))}°/
                {Math.round(kelvinToCelsius(weatherData.main.temp_max))}°
              </span>
            </div>
          </div>
          <SearchCities selectCity={setCity}/>
        </div>

        <div className="flex items-center justify-center w-full h-full">
          <div className="w-full max-w-[500px] p-5 bg-white rounded-md">
            <h2 className="text-xl font-bold text-center">5-Day Forecast</h2>
            <div className="flex flex-col gap-4">
              {forecastData.list
                ?.slice(0, 5)
                ?.map((forecast: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border-b"
                  >
                    <span className="text-lg font-medium">
                      {new Date(forecast.dt * 1000).toLocaleDateString()} -{" "}
                      {new Date(forecast.dt * 1000).toLocaleTimeString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <Image
                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                        alt={forecast.weather[0].description}
                        width={50}
                        height={50}
                      />
                      <span>
                        {Math.round(kelvinToCelsius(forecast.main.temp))}°C
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
