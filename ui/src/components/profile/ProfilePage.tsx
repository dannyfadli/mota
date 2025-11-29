import React from "react";

export const ProfilePage: React.FC = () => {
  // buat dummy user dari localStorage kalau ada
  let name = "Petani Modern";
  let email = "petani@example.com";

  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.name) name = parsed.name;
      if (parsed.email) email = parsed.email;
    }
  } catch {
    // hmph, biarin aja
  }

  const posts = new Array(12).fill(null);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <section className="flex gap-8 pb-6 border-b border-slate-200">
        {/* Avatar */}
        <div className="flex flex-1 justify-center sm:justify-start">
          <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-tr from-emerald-400 to-lime-400 p-[3px]">
            <div className="h-full w-full rounded-full bg-emerald-50 flex items-center justify-center">
              <span className="text-3xl font-semibold text-emerald-700">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-[2]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-3">
            <span className="text-lg font-semibold text-slate-900">
              {name}
            </span>
            <div className="flex gap-2 text-xs">
              <button className="rounded-lg border border-slate-300 px-4 py-1.5 text-xs font-medium">
                Edit Profil
              </button>
              <button className="rounded-lg border border-slate-300 px-4 py-1.5 text-xs">
                Bagikan Profil
              </button>
            </div>
          </div>

          <div className="mb-3 flex gap-6 text-sm">
            <span>
              <span className="font-semibold">12</span> postingan
            </span>
            <span>
              <span className="font-semibold">340</span> pengikut
            </span>
            <span>
              <span className="font-semibold">210</span> mengikuti
            </span>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-slate-900">Petani MoTa</div>
            <div className="text-slate-600 text-xs sm:text-sm">
              {email}
            </div>
            <div className="mt-1 text-xs text-slate-600">
              Berbagi hasil panen, eksperimen irigasi, dan tips modern tani 🌱
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="flex justify-center gap-8 py-3 text-xs uppercase tracking-wide text-slate-500 border-b border-slate-200">
        <button className="flex items-center gap-1 font-semibold text-slate-900">
          <span className="h-3 w-3 rounded-sm border border-slate-600" />
          Postingan
        </button>
        <button className="hidden sm:flex items-center gap-1 hover:text-slate-800">
          <span className="h-3 w-3 rounded-full border border-slate-400" />
          Disimpan
        </button>
        <button className="hidden sm:flex items-center gap-1 hover:text-slate-800">
          <span className="h-3 w-3 border border-slate-400" />
          Ditandai
        </button>
      </section>

      {/* Grid posts */}
      <section className="grid grid-cols-3 gap-[2px] sm:gap-1 mt-1 bg-slate-100">
        {posts.map((_, idx) => (
          <div
            key={idx}
            className="aspect-square bg-slate-200 flex items-center justify-center text-[10px] text-slate-500"
          >
            Post {idx + 1}
          </div>
        ))}
      </section>
    </div>
  );
};
