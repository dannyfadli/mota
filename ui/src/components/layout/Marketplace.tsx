import { useState } from "react";
import { Search } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

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

export default function MarketplacePage() {
  const { addToCart } = useCart(); // <-- PENTING!
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Rekomendasi");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(query.toLowerCase());
    if (filter === "Promo") return p.promo && matchSearch;
    if (filter === "Terlaris") return p.best && matchSearch;
    if (filter === "Rating") return p.rating >= 4 && matchSearch;
    return matchSearch;
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-emerald-700">MoTa Market</h1>

      {/* MODAL DETAIL */}
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

      {/* SEARCH BOX */}
      <div className="bg-white shadow-md rounded-2xl p-3 border border-emerald-200">
        <div className="flex items-center gap-2 border-2 border-emerald-400 rounded-xl px-3 py-2">
          <Search className="text-emerald-600" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none bg-transparent text-slate-700"
          />
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap gap-2 mt-3">
          {["Rekomendasi", "Terlaris", "Promo", "Rating"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                filter === item
                  ? "bg-emerald-500 text-white border-emerald-700"
                  : "bg-emerald-100 text-emerald-700 border-emerald-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT LIST */}
      <div className="space-y-4">
        {filteredProducts.length === 0 && (
          <p className="text-center text-slate-500">Produk tidak ditemukan</p>
        )}

        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="flex gap-3 bg-white p-3 rounded-xl shadow border border-slate-200"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-24 h-24 object-cover rounded-lg border"
            />

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h2 className="font-bold text-slate-800">{p.name}</h2>
                <p className="text-sm text-slate-500">{p.seller}</p>
                <p className="text-emerald-600 font-semibold mt-1">
                  Rp {p.price}
                </p>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1 rounded-lg bg-emerald-500 text-white text-sm font-medium"
                  onClick={() => addToCart(p)}
                >
                  Beli
                </button>

                <button
                  className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-sm font-medium"
                  onClick={() => setSelectedProduct(p)}
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* DATA */
const products: Product[] = [
  {
    id: 1,
    name: "Pupuk kandang super A1",
    seller: "SUPER DUPER",
    price: 11500,
    image: "https://via.placeholder.com/150",
    best: true,
    promo: false,
    rating: 5,
  },
  {
    id: 2,
    name: "Pupuk kandang kambing",
    seller: "YA PUPUK",
    price: 50000,
    image: "https://via.placeholder.com/150",
    best: false,
    promo: true,
    rating: 4,
  },
  {
    id: 3,
    name: "Pupuk Organik F5",
    seller: "TOP TEN",
    price: 21500,
    image: "https://via.placeholder.com/150",
    best: false,
    promo: false,
    rating: 3,
  },
];
