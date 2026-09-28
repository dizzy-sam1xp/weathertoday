import HourlyForecast from "./HourlyForecast";

const WeatherDashboard = () => {
  return (
    <section className="w-full overflow-hidden rounded-4xl bg-[#C3BEF7] shadow-xl">
      <h2 className="pt-8 text-center text-black text-2xl font-bold">Ranchi</h2>

      <div className="mt-4 flex flex-col items-center">
        <div className="text-7xl">☀️</div>

        <p className="mt-2 text-6xl text-black font-bold">28°C</p>

        <p className="mt-2 text-lg text-black">Sunny</p>

        <div className="mx-auto mt-6 mb-6 grid max-w-md grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#E5ECF4] p-4">
            <p className="text-sm text-gray-500">Feels like</p>
            <p className="font-semibold">30°C</p>
          </div>

          <div className="rounded-xl bg-gray-100 p-4">
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="font-semibold">65%</p>
          </div>

          <div className="rounded-xl bg-gray-100 p-4">
            <p className="text-sm text-gray-500">Wind</p>
            <p className="font-semibold">12 km/h</p>
          </div>

          <div className="rounded-xl bg-gray-100 p-4">
            <p className="text-sm text-gray-500">Pressure</p>
            <p className="font-semibold">1012 hPa</p>
          </div>
        </div>
      </div>

      <div className="w-full border-t px-6 pt-5 pb-4">
        <HourlyForecast />
      </div>
    </section>
  );
};

export default WeatherDashboard;
