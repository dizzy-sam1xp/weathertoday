import { getWeatherInfo } from "../utils/weather";

type CityWeatherCardProps = {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: number;
  onClick: () => void;
};

const CityWeatherCard = ({
  city,
  temperature,
  humidity,
  windSpeed,
  weatherCode,
  isDay,
  onClick,
}: CityWeatherCardProps) => {
  const weatherInfo = getWeatherInfo(weatherCode, isDay);

  return (
    <button
      onClick={onClick}
      className="cursor-pointer w-full rounded-3xl border border-gray-300 bg-white p-6 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#8A4FFF]">{city}</h2>

        <p className="text-3xl font-bold">{temperature}°C</p>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <span className="text-5xl">{weatherInfo.icon}</span>

        <p className="text-lg font-semibold text-gray-700">
          {weatherInfo.condition}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-gray-100 p-3">
          <p className="text-gray-500">Humidity</p>
          <p className="font-semibold">{humidity}%</p>
        </div>

        <div className="rounded-xl bg-gray-100 p-3">
          <p className="text-gray-500">Wind</p>
          <p className="font-semibold">{windSpeed} km/h</p>
        </div>
      </div>
    </button>
  );
};

export const CityWeatherCardSkeleton = () => {
  return (
    <div className="w-full animate-pulse rounded-3xl border border-gray-300 bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="h-7 w-28 rounded-lg bg-gray-200" />

        <div className="h-9 w-20 rounded-lg bg-gray-200" />
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-gray-200" />

        <div className="h-6 w-32 rounded-lg bg-gray-200" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-100 p-3">
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="mt-2 h-5 w-12 rounded bg-gray-200" />
        </div>

        <div className="rounded-xl bg-gray-100 p-3">
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="mt-2 h-5 w-16 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default CityWeatherCard;
