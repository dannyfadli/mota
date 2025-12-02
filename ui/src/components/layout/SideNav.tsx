import React, { useEffect, useState } from "react";
import { SettingsModal } from "./SettingsModal";

const SideNavButton: React.FC<{
  label: string;
  icon?: React.ReactNode;
  showLabel: boolean;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, icon, showLabel, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-3 w-full rounded-xl px-4 py-2 text-left text-sm font-medium transition-all duration-200",
        active
          ? "bg-emerald-500 text-white"
          : "bg-white text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      {icon}
      {showLabel && <span>{label}</span>}
    </button>
  );
};

export const SideNav: React.FC<{
  isLoggedIn?: boolean;
  currentPage?: string;
  onLogout?: () => void;
  onHomeClick: () => void;
  onPostingClick?: () => void;
  onDemoClick?: () => void;
  onOnboardingClick?: () => void;
  onChatBotClick?: () => void;
  onMarketplaceClick?: () => void;
  onExpandChange?: (expanded: boolean) => void;
}> = ({
  isLoggedIn = false,
  currentPage,
  onLogout,
  onDemoClick,
  onOnboardingClick,
  onChatBotClick,
  onMarketplaceClick,
  onExpandChange,
  onHomeClick,
  onPostingClick,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hoverOpen, setHoverOpen] = useState(false);
  const expanded = isOpen || hoverOpen;

  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    onExpandChange?.(expanded);
  }, [expanded]);

  return (
    <>
      {/* Modal Pengaturan */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onLogout={onLogout}
      />

      <nav
        className={[
          "min-h-screen border-r bg-emerald-50 py-6 fixed transition-all duration-300 overflow-hidden",
          expanded ? "w-40 px-3" : "w-14 px-2",
        ].join(" ")}
        onMouseEnter={() => !isOpen && setHoverOpen(true)}
        onMouseLeave={() => !isOpen && setHoverOpen(false)}
      >
        {/* Toggle Button */}
        <div className="pb-4 flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-white shadow text-slate-700 hover:bg-slate-100"
          >
            {isOpen ? "«" : "»"}
          </button>
        </div>

        <div className="flex flex-col gap-2 h-[calc(100vh-24vh)]">
          {expanded && (
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Menu
            </div>
          )}

          <SideNavButton
            label="Home"
            icon={<span>🏠</span>}
            showLabel={expanded}
            active={currentPage === "home"}
            onClick={onHomeClick}
          />

          <SideNavButton
            label="Posting"
            icon={<span>📝</span>}
            showLabel={expanded}
            active={currentPage === "posting"}
            onClick={onPostingClick}
          />

          <SideNavButton
            label="Demo MoTa"
            icon={<span>📘</span>}
            showLabel={expanded}
            active={currentPage === "demo"}
            onClick={onDemoClick}
          />

          <SideNavButton
            label="Onboarding"
            icon={<span>🚀</span>}
            showLabel={expanded}
            active={currentPage === "onboarding"}
            onClick={onOnboardingClick}
          />

          <SideNavButton
            label="Chat"
            icon={<span>💬</span>}
            showLabel={expanded}
            active={currentPage === "chat"}
            onClick={onChatBotClick}
          />

          <SideNavButton
            label="Marketplace"
            icon={<span>🛒</span>}
            showLabel={expanded}
            active={currentPage === "marketplace"}
            onClick={onMarketplaceClick}
          />

          {/* ========== PENGATURAN ========== */}
          {isLoggedIn && (
            <div className="mt-auto pt-4">
              <SideNavButton
                label="Pengaturan"
                icon={<span>⚙️</span>}
                showLabel={expanded}
                onClick={() => setSettingsOpen(true)}
              />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
