const hourlyWeather = [
  {
    time: "Now",
    temperature: 28,
    icon: "☀️",
  },
  {
    time: "2 PM",
    temperature: 29,
    icon: "☀️",
  },
  {
    time: "3 PM",
    temperature: 30,
    icon: "🌤️",
  },
  {
    time: "4 PM",
    temperature: 29,
    icon: "🌤️",
  },
  {
    time: "5 PM",
    temperature: 27,
    icon: "☁️",
  },
  {
    time: "6 PM",
    temperature: 26,
    icon: "🌧️",
  },
  {
    time: "7 PM",
    temperature: 25,
    icon: "🌧️",
  },
];

const HourlyForecast = () => {
  return (
    <div className="flex w-full justify-between gap-3 overflow-x-auto">
      {hourlyWeather.map((hour) => (
        <div
          key={hour.time}
          className="min-w-24 rounded-xl bg-gray-100 p-4 text-center"
        >
          <p className="text-sm text-gray-500">{hour.time}</p>

          <div className="my-3 text-3xl">{hour.icon}</div>

          <p className="font-semibold">{hour.temperature}°C</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
