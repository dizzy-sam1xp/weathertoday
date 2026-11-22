import HourlyForecast from "./HourlyForecast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getWeatherInfo } from "../utils/weather";

const WeatherDashboard = () => {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();

  const [temperature, setTemperature] = useState<number | null>(null);
  const [feelsLike, setFeelsLike] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [pressure, setPressure] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [isDay, setIsDay] = useState<number>(1);

  const [hourlyTemperature, setHourlyTemperature] = useState<number[]>([]);
  const [hourlyWeatherCode, setHourlyWeatherCode] = useState<number[]>([]);
  const [hourlyTime, sethourlyTime] = useState<string[]>([]);
  const [hourlyIsDay, setHourlyIsDay] = useState<number[]>([]);

  const [currentTime, setCurrentTime] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const loading = temperature === null;

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const locationResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city,
          )}&count=1&language=en&format=json`,
        );

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
          setError("City not found");
          return;
        }

        setError(null);

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        setRegion(location.admin1 || "");
        setCountry(location.country || "");

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,pressure_msl,weather_code,is_day&hourly=temperature_2m,weather_code,is_day&timezone=auto&forecast_hours=24`,
        );

        const data = await weatherResponse.json();

        setTemperature(data.current.temperature_2m);
        setFeelsLike(data.current.apparent_temperature);
        setHumidity(data.current.relative_humidity_2m);
        setWindSpeed(data.current.wind_speed_10m);
        setPressure(data.current.pressure_msl);
        setWeatherCode(data.current.weather_code);
        setIsDay(data.current.is_day);

        setHourlyTemperature(data.hourly.temperature_2m);
        setHourlyWeatherCode(data.hourly.weather_code);
        sethourlyTime(data.hourly.time);
        setHourlyIsDay(data.hourly.is_day);

        setCurrentTime(data.current.time);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setError("Unable to fetch weather data");
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [city]);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [error, navigate]);

  useEffect(() => {
    if (!error) return;

    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [error, navigate]);

  const weatherInfo =
    weatherCode !== null ? getWeatherInfo(weatherCode, isDay) : null;

  const formattedTime = currentTime
    ? new Date(currentTime).toLocaleString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Loading...";

  return (
    <section className="w-full overflow-hidden rounded-b-4xl bg-[#C3BEF7] shadow-xl">
      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 overflow-hidden rounded-2xl bg-white text-center shadow-2xl">
            {/* Timeout bar */}
            <div className="h-1 w-full bg-gray-200">
              <div className="h-full w-full animate-[timeout_5s_linear_forwards] bg-[#8A4FFF]" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">
                {error === "City not found"
                  ? "City Not Found"
                  : "Something Went Wrong"}
              </h3>

              <p className="mt-2 text-gray-600">
                {error === "City not found"
                  ? "Please enter a valid city name."
                  : "Unable to fetch weather data. Please try again."}
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-5 rounded-lg bg-[#8A4FFF] px-6 py-2 text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {!error && loading && <DashboardSkeleton />}

      {!error && !loading && (
        <>
          <div className="flex justify-between font-bold">
            <span>
              {region && country ? `${region} · ${country}` : "Loading..."}
            </span>

            <span>Last updated on: {formattedTime}</span>
          </div>

          <h2 className="pt-8 text-center text-2xl font-bold text-black">
            Weather {city}{" "}
            <span className="border-2 border-[#817db0] bg-[#817db0] text-gray-200">
              now
            </span>
          </h2>

          <div className="mt-4 flex flex-col items-center">
            <div className="text-7xl">
              {weatherInfo !== null ? weatherInfo.icon : "🌡️"}
            </div>

            <p className="mt-2 text-6xl font-bold text-black">
              {temperature !== null ? `${temperature}°C` : "Loading..."}
            </p>

            <p className="mt-2 text-lg text-black">
              {weatherInfo !== null ? weatherInfo.condition : "Loading..."}
            </p>

            <div className="mx-auto mt-6 mb-6 grid max-w-md grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#E5ECF4] p-4">
                <p className="text-sm text-gray-500">Feels like</p>

                <p className="font-semibold">
                  {feelsLike !== null ? `${feelsLike}°C` : "Loading..."}
                </p>
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Humidity</p>

                <p className="font-semibold">
                  {humidity !== null ? `${humidity}%` : "Loading..."}
                </p>
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Wind</p>

                <p className="font-semibold">
                  {windSpeed !== null ? `${windSpeed} km/h` : "Loading..."}
                </p>
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Pressure</p>

                <p className="font-semibold">
                  {pressure !== null ? `${pressure} hPa` : "Loading..."}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full border-t px-6 pt-5 pb-4">
            <HourlyForecast
              temperatures={hourlyTemperature}
              weatherCodes={hourlyWeatherCode}
              times={hourlyTime}
              isDay={hourlyIsDay}
            />
          </div>
        </>
      )}
    </section>
  );
};

const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between">
        <div className="h-5 w-40 rounded bg-[#aaa6dc]" />

        <div className="h-5 w-52 rounded bg-[#aaa6dc]" />
      </div>

      <div className="mx-auto mt-8 h-8 w-64 rounded bg-[#aaa6dc]" />

      <div className="mx-auto mt-8 h-24 w-24 rounded-full bg-[#aaa6dc]" />

      <div className="mx-auto mt-4 h-16 w-40 rounded-xl bg-[#aaa6dc]" />

      <div className="mx-auto mt-4 h-6 w-32 rounded bg-[#aaa6dc]" />

      <div className="mx-auto mt-6 mb-6 grid max-w-md grid-cols-2 gap-3">
        <div className="h-24 rounded-xl bg-gray-200" />
        <div className="h-24 rounded-xl bg-gray-200" />
        <div className="h-24 rounded-xl bg-gray-200" />
        <div className="h-24 rounded-xl bg-gray-200" />
      </div>

      <div className="border-t px-6 pt-5 pb-4">
        <div className="h-5 w-32 rounded bg-[#aaa6dc]" />

        <div className="mt-4 flex gap-3 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-32 min-w-24 rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
