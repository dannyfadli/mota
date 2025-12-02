import React from "react";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  onLogout
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-80 rounded-xl shadow-lg p-5 space-y-4 animate-fadeIn">
        <h2 className="text-lg font-semibold text-slate-700">Pengaturan</h2>

        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100">
          Bahasa
        </button>

        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100">
          Bantuan
        </button>

        <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100">
          Saran & Masukan
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
        >
          Logout
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full py-2 rounded-lg bg-slate-200 hover:bg-slate-300"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
