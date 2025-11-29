import React from "react";

const SideNavButton: React.FC<{
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full rounded-xl px-4 py-2 text-left text-sm font-medium",
        active
          ? "bg-emerald-500 text-white"
          : "bg-white text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
};

export const SideNav: React.FC<{
  isLoggedIn?: boolean;
  onLogout?: () => void;
}> = ({ isLoggedIn = false, onLogout }) => {
  return (
    <nav className="w-40 border-r bg-emerald-50 px-3 py-6">
      <div className="flex flex-col gap-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Menu
        </div>

        <SideNavButton label="Demo MoTa" active />
        <SideNavButton label="Onboarding" />
        <SideNavButton label="Chat" />
        <SideNavButton label="Marketplace" />

        {isLoggedIn && (
          <div className="pt-4">
            <SideNavButton
              label="Logout"
              onClick={onLogout}
              active={false}
            />
          </div>
        )}
      </div>
    </nav>
  );
};
