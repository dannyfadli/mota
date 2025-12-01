import React, { useState } from "react";
import { TopBar } from "./components/layout/TopBar";
import { SideNav } from "./components/layout/SideNav";
import { HomePage } from "./components/home/HomePage";
// import { RightSidebar } from "./components/home/RightSidebar";
import { AuthPage } from "./components/auth/AuthPage";
import { ProfilePage } from "./components/profile/ProfilePage";
import Marketplace from "./components/layout/Marketplace";
import ChatWidget from "./components/layout/ChatWidget";
import { BrowserRouter } from "react-router-dom";
import CartPage from "./components/layout/CartPage";
import { CartProvider } from "./contexts/CartContext";

export type AuthMode = "login" | "register";
type Page =
  | "auth"
  | "home"
  | "profile"
  | "marketplace"
  | "demo"
  | "onboarding"
  | "chat"
  | "cart";

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

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  if (currentPage === "auth") {
    return <AuthPage onSuccess={handleLoginSuccess} defaultMode={authMode} />;
  }

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen bg-emerald-50 text-slate-900">
          {/* TOP BAR SELALU DI DALAM ROUTER */}
          <TopBar
            isLoggedIn={isLoggedIn}
            currentPage={currentPage}
            onHomeClick={() => setCurrentPage("home")}
            onProfileClick={() => setCurrentPage("profile")}
            onCartClick={() => setCurrentPage("cart")}
            onMarketplaceClick={() => setCurrentPage("marketplace")}
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
            <SideNav
              isLoggedIn={isLoggedIn}
              currentPage={currentPage}
              onLogout={handleLogout}
              onDemoClick={() => setCurrentPage("demo")}
              onOnboardingClick={() => setCurrentPage("onboarding")}
              onChatBotClick={() => setCurrentPage("chat")}
              onMarketplaceClick={() => setCurrentPage("marketplace")}
              
            />

            <main className="flex-1 overflow-y-auto px-6 py-6">
                {currentPage === "home" && <HomePage />}
                {currentPage === "profile" && <ProfilePage />}
                {currentPage === "marketplace" && <Marketplace />}
                {currentPage === "cart" && <CartPage />}
            </main>
          </div>

          <ChatWidget />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
