import React from "react";

export interface TopBarProps {
  isLoggedIn: boolean;
  currentPage: "home" | "profile" | "auth";
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onProfileClick: () => void;
  onHomeClick: () => void;        // ➕ tombol kembali ke home
}

export const TopBar: React.FC<TopBarProps> = ({
  isLoggedIn,
  currentPage,
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onHomeClick,
}) => {
  return (
    <header className="flex items-center justify-between gap-6 border-b bg-white px-8 py-3">
      {/* Logo + title */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-emerald-500" />
        <div className="leading-tight">
          <div className="font-semibold text-emerald-800">
            MoTa — Modern Tani
          </div>
          <div className="text-xs text-slate-500">
            Platform terpadu: E-commerce, Chat, News &amp; Community
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
          <input
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
            placeholder="Cari produk, berita, atau topik"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm">
          Keranjang (0)
        </button>

        {!isLoggedIn ? (
          <>
            <button
              className="rounded-full border border-slate-200 px-4 py-2 text-sm"
              onClick={onLoginClick}
            >
              Login
            </button>

            <button
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white"
              onClick={onRegisterClick}
            >
              Daftar
            </button>
          </>
        ) : (
          <>
            {currentPage === "profile" ? (
              <button
                className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm hover:bg-emerald-50"
                onClick={onHomeClick}
              >
                <span className="font-medium text-slate-800">Home</span>
              </button>
            ) : (
              <button
                className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm hover:bg-emerald-50"
                onClick={onProfileClick}
              >
                <div className="h-7 w-7 rounded-full bg-emerald-500" />
                <span className="font-medium text-slate-800">Profil</span>
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};
