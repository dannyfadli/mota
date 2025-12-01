import { useCart } from "../../contexts/CartContext";

export default function CartPage() {
  const { cart, removeItem } = useCart();

  const totalHarga = cart.reduce(
    (sum, item) => sum + item.price * (item.qty ?? 1),
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-emerald-700 text-center">
        Keranjang Belanja
      </h1>

      {cart.length === 0 ? (
        <p className="text-slate-500 text-center py-10">
          Keranjang masih kosong
        </p>
      ) : (
        <div className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.uid} // pakai uid!
              className="flex gap-3 bg-white p-3 rounded-xl shadow border border-slate-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg border"
              />

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="font-bold text-slate-800">{item.name}</h2>
                  <p className="text-sm text-slate-500">{item.seller}</p>
                  <p className="text-emerald-600 font-semibold mt-1">
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>

                <button
                  className="mt-2 px-3 py-1 rounded-lg bg-red-500 text-white text-sm"
                  onClick={() => removeItem(item.uid)} // FIX
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

          <div className="p-4 bg-white rounded-xl shadow border border-slate-200">
            <div className="flex justify-between text-lg font-semibold text-slate-700">
              <span>Total</span>
              <span>Rp {totalHarga.toLocaleString()}</span>
            </div>
            <button className="mt-3 w-full bg-emerald-500 text-white py-2 rounded-lg font-medium">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
