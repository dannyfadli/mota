import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react"; // ikon lonceng

export default function WeatherNotification() {
  const [status, setStatus] = useState<{
    type: "safe" | "warning" | "danger";
    message: string;
  } | null>(null);

  const [show, setShow] = useState(false); // kontrol tampil / hilang

  const DEBUG = false;

  async function fetchWeather() {
    try {
      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Jakarta&units=metric&lang=id&appid=f3223dc7977641f043f44d1e5f1b8cfe"
      );

      const data = await res.json();
      const main = data.weather[0].main.toLowerCase();

      if (main.includes("clear")) {
        setStatus({
          type: "safe",
          message: "☀ Cuaca cerah hari ini. Ladang aman!",
        });
      } else if (main.includes("rain")) {
        setStatus({
          type: "warning",
          message: "🌧 Terjadi hujan. Harap berhati-hati saat ke ladang.",
        });
      } else if (
        main.includes("storm") ||
        main.includes("thunder") ||
        main.includes("extreme")
      ) {
        setStatus({
          type: "danger",
          message: "⛈ Peringatan badai! Potensi ladang rusak atau banjir.",
        });
      } else {
        setStatus({
          type: "safe",
          message: `ℹ Cuaca hari ini: ${data.weather[0].description}`,
        });
      }

      setShow(true);
    } catch {
      console.log("Gagal mengambil data cuaca");
    }
  }

  useEffect(() => {
    if (DEBUG) {
      setStatus({
        type: "danger",
        message: "Test",
      });
      setShow(true);
      return;
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, []);


  if (!status || !show) return null;

  return (
    <div
      className={`fixed top-17 right-4 z-50 border rounded-lg animate-slideIn 
        ${status.type === "safe" ? "bg-emerald-600 border-emerald-400" : ""}
        ${status.type === "warning" ? "bg-yellow-500 border-yellow-300" : ""}
        ${status.type === "danger" ? "bg-red-600 border-red-400" : ""}`}
    >
      {/* Tombol Lonceng */}
      <div className="flex items-center gap-2 mb-1 pt-4 pl-4 pr-4 text-white">
        <div className="flex-1">
          <span className="font-medium">🔔 Notifikasi Cuaca</span>
        </div>
        {/* Tombol close */}
        <button
          className="text-white hover:text-gray-200"
          onClick={() => setShow(false)}
        >
          <X size={16} />
        </button>
      </div>

      {/* Box notifikasi */}
      <div
        className={`
          flex items-start gap-3 pl-4 pr-4 pb-4 pt-2 shadow-lg w-80 text-white relative
        `}
      >
        <div className="flex-1 text-sm">{status.message}</div>
      </div>
    </div>
  );
}
