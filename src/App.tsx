import Navbar from "./components/Navbar";
import WeatherDashboard from "./components/WeatherDashboard";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-2">
      <div className="mx-auto max-w-6xl rounded-3xl bg-slate-50 p-4">
        <Navbar />

        <div className="mt-5">
          <WeatherDashboard />
        </div>
      </div>
    </main>
  );
}

export default App;
