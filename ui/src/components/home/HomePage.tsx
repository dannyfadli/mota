import React, { useEffect, useState } from "react";
import { getWeatherByCoords } from "../../api/weatherApi";
import { useCart } from "../../contexts/CartContext";

/* ---------------------- WEATHER CARD ----------------------- */
interface WeatherCardProps {
  onWeatherLoaded: (data: any) => void;
}
type Product = {
  id: number;
  name: string;
  seller: string;
  price: number;
  image: string;
  best: boolean;
  promo: boolean;
  rating: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Pupuk Organik 10kg",
    seller: "PT Agro",
    price: 50000,
    image:
      "https://lzd-img-global.slatic.net/g/p/24a9bb0c807fea48b50c55a257754ba5.jpg_720x720q80.jpg",
    best: true,
    promo: false,
    rating: 4.7,
  },
  {
    id: 2,
    name: "Benih Bawang Merah",
    seller: "Tani Jaya",
    price: 25000,
    image:
      "https://down-id.img.susercontent.com/file/sg-11134201-22100-yder043sfriv71",
    best: true,
    promo: true,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Alat Penyiram Otomatis",
    seller: "SmartFarm",
    price: 150000,
    image:
      "https://down-id.img.susercontent.com/file/sg-11134201-7rfgo-m3h6magloizrbd",
    best: false,
    promo: false,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Traktor",
    seller: "SmartFarm",
    price: 60000000,
    image:
      "https://i.auto-bild.de/ir_img/1/2/3/7/6/7/2/Der-staerkste-Fendt-Traktor-hat-500-PS-1200x800-49789fb43d4fe6f3.jpg",
    best: true,
    promo: false,
    rating: 4.5,
  },
  {
    id: 5,
    name: "Drone Pertanian",
    seller: "SmartFarm",
    price: 130000000,
    image: "https://solusiklik.co.id/wp-content/uploads/2024/11/header.png",
    best: false,
    promo: true,
    rating: 4.5,
  },
];

const WeatherCard: React.FC<WeatherCardProps> = ({ onWeatherLoaded }) => {
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
          onWeatherLoaded(data); // KIRIM DATA CUACA
        } catch {
          setError("Gagal memuat data cuaca, coba lagi nanti.");
          onWeatherLoaded(null);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Izinkan akses GPS untuk menampilkan lokasi");
        onWeatherLoaded(null);
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
      <h2 className="text-sm font-semibold text-slate-900 mb-1">
        Cuaca Hari Ini
      </h2>
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
        <a href="https://www.youtube.com/watch?v=Q-t6Za31m9U" target="_blank">
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-full">
            Tonton
          </button>
        </a>
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
          src="https://www.google.com/maps/d/u/0/embed?mid=19ib_KAyhHuZrQoatL7QojQIAgZngDGw"
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
        <a
          href="https://www.google.com/maps/d/u/0/embed?mid=19ib_KAyhHuZrQoatL7QojQIAgZngDGw"
          target="_blank"
        >
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-full">
            Buka Maps
          </button>
        </a>
        <button className="px-4 py-2 border border-slate-300 rounded-full">
          Simpan
        </button>
      </div>
    </div>
  );
};

/* ---------------------- PRODUCT CARD ----------------------- */

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="flex w-64 flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      {/* POPUP DETAIL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-4 max-w-lg w-full">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-60 object-cover rounded-xl"
            />

            <h2 className="text-xl font-bold mt-4">{selectedProduct.name}</h2>
            <p className="text-sm text-slate-500">{selectedProduct.seller}</p>

            <p className="text-emerald-600 font-semibold text-lg mt-2">
              Rp {selectedProduct.price}
            </p>

            <p className="text-slate-600 mt-3">
              Deskripsi singkat produk. Cocok untuk kebutuhan pertanian Anda.
            </p>

            <div className="flex gap-2 mt-4">
              <button
                className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                Tambah ke Keranjang
              </button>

              <button
                className="bg-slate-200 px-4 py-2 rounded-lg"
                onClick={() => setSelectedProduct(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KONTEN CARD */}
      <div
        className="mb-3 h-28 rounded-xl bg-slate-200 cursor-pointer overflow-hidden"
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <button
        onClick={() => setSelectedProduct(product)}
        className="text-xs text-slate-700 font-medium hover:text-slate-900"
      >
        {product.name}
      </button>
    </div>
  );
};

/* ---------------------- HOME PAGE ----------------------- */

export const HomePage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-lg font-semibold text-slate-900">Beranda</h1>
        <p className="text-xs text-slate-500">
          Update pertanian, panduan, dan video edukasi.
        </p>
      </section>

      {weatherData && <hr></hr>}

      <section>
        <WeatherCard onWeatherLoaded={setWeatherData} />
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
          <span className="text-xs text-slate-400">
            {products.length} produk
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
