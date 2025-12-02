import React, { useEffect, useState } from "react";
import { loginUser, registerUser } from "../../api/auth";
import type { AuthMode } from "../../App";

type AuthPageProps = {
  onSuccess: () => void;
  defaultMode?: AuthMode;
};

export const AuthPage: React.FC<AuthPageProps> = ({
  onSuccess,
  defaultMode = "login",
}) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // kalau defaultMode dari App berubah (klik Daftar/Login di TopBar)
  useEffect(() => {
    setMode(defaultMode);
    setMessage(null);
    setError(null);
  }, [defaultMode]);

  const resetMessages = () => {
    setMessage(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    try {
      setLoading(true);

      if (mode === "register") {
        const res = await registerUser({ name, email, password });
        setMessage(res.message || "Registrasi berhasil.");
        setPassword("");
      } else {
        const res = await loginUser({ email, password });
        setMessage(res.message || `Selamat datang, ${res.user?.name ?? ""}`);

        // Simpan user (optional)
        localStorage.setItem("user", JSON.stringify(res.user));

        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-lg border border-emerald-100 p-6">
        {/* Logo mini */}
        <div className="flex items-center gap-3 mb-4">
          <img src="/Profil.png" alt="MoTa Logo" className="h-10" />
          <div>
            <div className="font-semibold text-emerald-800">
              MoTa — Modern Tani
            </div>
            <div className="text-xs text-slate-500">
              Masuk ke akun petani kamu
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 rounded-full bg-emerald-50 p-1 text-sm">
          <button
            className={`flex-1 rounded-full py-2 ${
              mode === "login"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-emerald-700/70"
            }`}
            onClick={() => {
              setMode("login");
              resetMessages();
            }}
          >
            Login
          </button>
          <button
            className={`flex-1 rounded-full py-2 ${
              mode === "register"
                ? "bg-white text-emerald-700 shadow-sm"
                : "text-emerald-700/70"
            }`}
            onClick={() => {
              setMode("register");
              resetMessages();
            }}
          >
            Daftar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {mode === "register" && (
            <div>
              <label className="mb-1 block text-slate-700">Nama lengkap</label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={mode === "register"}
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-slate-700">Email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-slate-700">Password</label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Minimal 6 karakter. Jangan pakai password akun utama-mu ya.
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}
          {message && !error && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-700">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60"
          >
            {loading ? "Memproses..." : mode === "login" ? "Login" : "Daftar"}
          </button>
        </form>
      </div>
    </div>
  );
};
