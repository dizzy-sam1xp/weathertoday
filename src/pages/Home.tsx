import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CityWeatherCard, {
  CityWeatherCardSkeleton,
} from "../components/CityWeatherCard";

type WeatherData = {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: number;
};

const cities = ["Delhi", "Chennai", "Mumbai", "Kolkata"];

const Home = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);

      const results: WeatherData[] = [];

      for (const city of cities) {
        try {
          const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
              city,
            )}&count=1&language=en&format=json`,
          );

          const locationData = await locationResponse.json();

          if (!locationData.results?.length) continue;

          const { latitude, longitude } = locationData.results[0];

          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day&timezone=auto`,
          );

          const data = await weatherResponse.json();

          results.push({
            city,
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            windSpeed: data.current.wind_speed_10m,
            weatherCode: data.current.weather_code,
            isDay: data.current.is_day,
          });
        } catch (error) {
          console.error(`Failed to fetch ${city}:`, error);
        }
      }

      setWeatherData(results);
      setLoading(false);
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full rounded-b-4xl bg-[#C3BEF7] p-8 shadow-xl">
      <div className="mx-auto max-w-6xl">
        {loading ? (
          <>
            <div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-[#aaa6dc]" />

            <div className="mx-auto mt-3 h-5 w-80 max-w-full animate-pulse rounded-lg bg-[#aaa6dc]" />
          </>
        ) : (
          <>
            <h1 className="text-center text-4xl font-bold text-black">
              Weather Today
            </h1>

            <p className="mt-2 text-center text-gray-700">
              Current weather across major Indian cities
            </p>
          </>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {loading
            ? cities.map((city) => <CityWeatherCardSkeleton key={city} />)
            : weatherData.map((weather) => (
                <CityWeatherCard
                  key={weather.city}
                  city={weather.city}
                  temperature={weather.temperature}
                  humidity={weather.humidity}
                  windSpeed={weather.windSpeed}
                  weatherCode={weather.weatherCode}
                  isDay={weather.isDay}
                  onClick={() =>
                    navigate(`/weather/${encodeURIComponent(weather.city)}`)
                  }
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
