import React, { useEffect, useState } from "react";
import { getWeatherByCoords } from "../../api/weatherApi";

/* ---------------------- WEATHER CARD ----------------------- */

const WeatherCard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await getWeatherByCoords(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setWeather(data);
        } catch {
          setError(
            "Gagal memuat data cuaca,Silakan Menunggu beberapa saat lagi"
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Izinkan akses GPS untuk menampilkan lokasi");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Mengambil data cuaca...</p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm w-full">
      <h2 className="text-sm font-semibold text-slate-900 mb-1">Cuaca Hari Ini</h2>
      <p className="text-xs text-slate-500 mb-3">
        Berdasarkan lokasi Anda:{" "}
        <span className="font-semibold">{weather.name}</span>
      </p>

      <div className="flex items-center gap-6">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="icon cuaca"
          className="w-16 h-16"
        />

        <div>
          <div className="text-3xl font-bold text-emerald-600">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="text-sm text-slate-600 capitalize">
            {weather.weather[0].description}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------- VIDEO CARD ----------------------- */

const VideoCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
      {/* Video Player */}
      <div className="w-full h-56 rounded-xl overflow-hidden bg-black">
       <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/Q-t6Za31m9U?si=ZSOr-tdJ3RAqocfI"
          title="Video dari YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div>
        <h2 className="font-semibold text-lg">Teknik panen bawang merah</h2>
        <p className="text-sm text-slate-500">
          Pelajari langkah demi langkah agar hasil tinggi dan kualitas terbaik.
        </p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-full">
          Tonton
        </button>
        <button className="px-4 py-2 border border-slate-300 rounded-full">
          Simpan
        </button>
      </div>
    </div>
  );
};

/* ---------------------- MAPS CARD ----------------------- */

const MapsCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
      <div className="w-full h-56 bg-slate-200 rounded-xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9178339115996!2d110.40908467417733!3d-7.031751769177969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708cfdad38959d%3A0x7d0972e2c2ab37e1!2sContoh%20Lokasi!5e0!3m2!1sid!2sid!4v1700000000000"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </div>

      <div>
        <h2 className="font-semibold text-lg">Lokasi kebun bawang merah</h2>
        <p className="text-sm text-slate-500">
          Lihat lokasi kebun bawang merah terdekat dari tempatmu.
        </p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-full">
          Buka Maps
        </button>
        <button className="px-4 py-2 border border-slate-300 rounded-full">
          Simpan
        </button>
      </div>
    </div>
  );
};

/* ---------------------- PRODUCT CARD ----------------------- */

const ProductCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex w-64 flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-3 h-28 rounded-xl bg-slate-200" />
      <div className="text-xs text-slate-700">{title}</div>
    </div>
  );
};

/* ---------------------- HOME PAGE ----------------------- */

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-lg font-semibold text-slate-900">Beranda</h1>
        <p className="text-xs text-slate-500">
          Update pertanian, panduan, dan video edukasi.
        </p>
      </section>

      <section>
        <WeatherCard />
      </section>

      {/* KIRI = Video, KANAN = Maps */}
      <section className="grid gap-6 md:grid-cols-2">
        <VideoCard />
        <MapsCard />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Marketplace
            </h2>
            <p className="text-xs text-slate-500">Rekomendasi untuk kamu</p>
          </div>
          <span className="text-xs text-slate-400">5 produk</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1">
          <ProductCard title="Pupuk Organik 10kg" />
          <ProductCard title="Benih Bawang Merah" />
          <ProductCard title="Alat Penyiram Otomatis" />
          <ProductCard title="Mulsa Plastik Hitam Perak" />
        </div>
      </section>
    </div>
  );
};
