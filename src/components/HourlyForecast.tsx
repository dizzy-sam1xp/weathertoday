import { getWeatherInfo } from "../utils/weather";

type HourlyForcastProps = {
  temperatures: number[];
  weatherCodes: number[];
  times: string[];
  isDay: number[];
};

const HourlyForecast = ({
  temperatures,
  weatherCodes,
  times,
  isDay,
}: HourlyForcastProps) => {
  return (
    <div className="flex w-full gap-3 overflow-x-auto pb-3">
      {temperatures.slice(0, 12).map((temperature, index) => {
        const actualIndex = index + 1;
        const weatherInfo = getWeatherInfo(
          weatherCodes[actualIndex],
          isDay[actualIndex],
        );

        return (
          <div
            key={index}
            className="min-w-24 rounded-xl bg-gray-100 p-4 text-center"
          >
            <p className="text-sm text-gray-500">
              {new Date(times[index]).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>

            <div className="my-3 text-3xl">{weatherInfo.icon}</div>

            <p className="font-semibold">{temperature}°C</p>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyForecast;
