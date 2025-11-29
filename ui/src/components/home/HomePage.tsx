import React from "react";

const VideoCard: React.FC = () => {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 h-40 rounded-xl bg-slate-200" />
      <div className="mb-1 text-sm font-semibold text-slate-900">
        Teknik panen bawang merah yang efisien
      </div>
      <div className="mb-4 text-xs text-slate-500">
        Pelajari langkah demi langkah agar hasil tinggi dan kualitas terbaik.
      </div>
      <div className="mt-auto flex gap-2">
        <button className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white">
          Tonton
        </button>
        <button className="rounded-full border border-slate-300 px-4 py-1.5 text-xs">
          Simpan
        </button>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex w-64 flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-3 h-28 rounded-xl bg-slate-200" />
      <div className="text-xs text-slate-700">{title}</div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <section>
        <h1 className="text-lg font-semibold text-slate-900">Beranda</h1>
        <p className="text-xs text-slate-500">
          Update pertanian, panduan, dan video edukasi.
        </p>
      </section>

      {/* Video cards */}
      <section className="grid gap-6 md:grid-cols-2">
        <VideoCard />
        <VideoCard />
      </section>

      {/* Marketplace section */}
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
