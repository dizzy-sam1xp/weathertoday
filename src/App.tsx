import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WeatherDashboard from "./components/WeatherDashboard";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-slate-50 p-2">
        <div className="mx-auto max-w-6xl rounded-3xl bg-slate-50 p-4">
          <Navbar />

          <div className="mt-5">
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/weather/:city" element={<WeatherDashboard />} />
            </Routes>
          </div>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
