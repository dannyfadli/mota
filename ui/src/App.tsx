import React, { useState } from "react";
import { TopBar } from "./components/layout/TopBar";
import { SideNav } from "./components/layout/SideNav";
import { HomePage } from "./components/home/HomePage";
import { RightSidebar } from "./components/home/RightSidebar";
import { AuthPage } from "./components/auth/AuthPage";
import { ProfilePage } from "./components/profile/ProfilePage";

export type AuthMode = "login" | "register";
type Page = "auth" | "home" | "profile";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem("user");
    } catch {
      return false;
    }
  });

  const [currentPage, setCurrentPage] = useState<Page>(() =>
    localStorage.getItem("user") ? "home" : "auth"
  );

  const [authMode, setAuthMode] = useState<AuthMode>("login");

  // Saat login sukses
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  // Logout tapi tetap stay di HomePage
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  // Jika belum login, tampilkan halaman Auth
  if (currentPage === "auth") {
    return <AuthPage onSuccess={handleLoginSuccess} defaultMode={authMode} />;
  }

  // Jika sudah login, tampilkan layout utama
  return (
    <div className="min-h-screen bg-emerald-50 text-slate-900">
      <div className="flex flex-col h-screen">
        <TopBar
          isLoggedIn={isLoggedIn}
          currentPage={currentPage}
          onHomeClick={() => setCurrentPage("home")}
          onProfileClick={() => setCurrentPage("profile")}
          onLoginClick={() => {
            setAuthMode("login");
            setCurrentPage("auth");
          }}
          onRegisterClick={() => {
            setAuthMode("register");
            setCurrentPage("auth");
          }}
        />

        <div className="flex flex-1 overflow-hidden">
          <SideNav isLoggedIn={isLoggedIn} onLogout={handleLogout} />

          <main className="flex-1 overflow-y-auto px-6 py-6">
            {currentPage === "home" && <HomePage />}
            {currentPage === "profile" && <ProfilePage />}
          </main>

          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default App;
