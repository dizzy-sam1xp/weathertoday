import weatherLogo from "../assets/weather-today.svg";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between rounded-4xl border border-gray-300 bg-[#8A4FFF] px-6 py-3 shadow-sm">
      <img src={weatherLogo} alt="Weather Today" className="h-10 w-auto" />

      <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3 py-2">
        <input
          type="text"
          placeholder="Weather in..."
          className="w-64 bg-transparent px-2 outline-none"
        />

        <button type="button">
          <img src="/search.png" alt="Search" className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
