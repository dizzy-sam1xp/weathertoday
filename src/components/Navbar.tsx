import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import weatherLogo from "../assets/weather-today.svg";

const Navbar = () => {
  const [searchCity, setSearchCity] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchCity("");
  }, [location.pathname]);

  const handleSearch = () => {
    const city = searchCity.trim();

    if (city === "") return;

    navigate(`/weather/${encodeURIComponent(city)}`);
  };

  return (
    <nav className="flex items-center justify-between rounded-t-4xl border border-gray-300 bg-[#8A4FFF] px-6 py-3 shadow-sm">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="cursor-pointer"
      >
        <img src={weatherLogo} alt="Weather Today" className="h-10 w-auto" />
      </button>

      <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3 py-2">
        <input
          type="text"
          placeholder="Weather in..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="w-64 bg-transparent px-2 outline-none"
        />

        <button className="cursor-pointer" type="button" onClick={handleSearch}>
          <img src="/search.png" alt="Search" className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
