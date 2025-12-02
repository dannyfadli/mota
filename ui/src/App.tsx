import React, { useState } from "react";
import { TopBar } from "./components/layout/TopBar";
import { SideNav } from "./components/layout/SideNav";
import { HomePage } from "./components/home/HomePage";
import { AuthPage } from "./components/auth/AuthPage";
import { ProfilePage } from "./components/profile/ProfilePage";
import Marketplace from "./components/layout/Marketplace";
import ChatWidget from "./components/layout/ChatWidget";
import { BrowserRouter } from "react-router-dom";
import CartPage from "./components/layout/CartPage";
import { CartProvider } from "./contexts/CartContext";
import WeatherNotification from "./components/layout/WeatherNotification";
import { PostingPage } from "./components/posting/PostingPage";
import ChatBot from "./components/layout/ChatBot";

export type AuthMode = "login" | "register";
type Page =
  | "auth"
  | "home"
  | "profile"
  | "posting"
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

  const [sideNavExpanded, setSideNavExpanded] = useState<boolean>(true);

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
      <WeatherNotification />
      <CartProvider>
        <div className="min-h-screen bg-linear-to-t from-white to-emerald-100 text-slate-900">
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
              onHomeClick={() => setCurrentPage("home")}
              onDemoClick={() => setCurrentPage("demo")}
              onOnboardingClick={() => setCurrentPage("onboarding")}
              onChatBotClick={() => setCurrentPage("chat")}
              onMarketplaceClick={() => setCurrentPage("marketplace")}
              onPostingClick={() => setCurrentPage("posting")}
              onExpandChange={setSideNavExpanded}
            />

            <main
              className={[
                "flex-1 overflow-y-auto px-6 py-6 transition-all duration-300",
                sideNavExpanded ? "pl-44" : "pl-20",
              ].join(" ")}
            >
              {currentPage === "home" && <HomePage />}
              {currentPage === "profile" && <ProfilePage />}
              {currentPage === "posting" && <PostingPage />}
              {currentPage === "marketplace" && <Marketplace />}
              {currentPage === "cart" && <CartPage />}
              {currentPage === "chat" && <ChatBot />}
            </main>
          </div>

          <ChatWidget />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
