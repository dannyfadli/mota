import React from "react";

const CardSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      {children}
    </section>
  );
};

export const RightSidebar: React.FC = () => {
  return (
    <aside className="hidden w-72 flex-shrink-0 flex-col gap-4 border-l bg-emerald-50 px-4 py-6 lg:flex">
      {/* Chat & Support */}
      <CardSection title="Chat & Bantuan">
        <p className="mb-3 text-xs text-slate-500">
          Tanya pakar, bantu petani lain atau dukungan teknis.
        </p>
        <div className="flex gap-2">
          <button className="flex-1 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white">
            Buka Chat
          </button>
          <button className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs">
            Komunitas
          </button>
        </div>
      </CardSection>

      {/* Notification */}
      <CardSection title="Notifikasi">
        <ul className="space-y-1 text-xs text-slate-600">
          <li>Pesanan #342 diproses</li>
          <li>Promo pupuk organik – diskon 10%</li>
          <li>Workshop: Teknik Irigasi 28 Nov</li>
        </ul>
      </CardSection>

      {/* Quick access */}
      <CardSection title="Akses cepat">
        <div className="flex flex-wrap gap-2">
          {["Marketplace", "Pesanan", "Data Lahan", "Support"].map((item) => (
            <button
              key={item}
              className="rounded-full border border-slate-300 px-3 py-1 text-xs"
            >
              {item}
            </button>
          ))}
        </div>
      </CardSection>
    </aside>
  );
};
