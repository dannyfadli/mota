// src/contexts/CartContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  uid: string; // unique per cart entry
  id: number; // product id (boleh sama untuk produk yang sama)
  name: string;
  seller?: string;
  price: number;
  image?: string;
  qty?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "uid">) => void;
  removeItem: (uid: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

function genUid(): string {
  // fallback jika environment tidak support crypto.randomUUID()
  if (
    typeof crypto !== "undefined" &&
    typeof (crypto as any).randomUUID === "function"
  ) {
    try {
      return (crypto as any).randomUUID();
    } catch {
      // fallthrough
    }
  }
  // fallback portable
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (!saved) return [];
      const parsed: any[] = JSON.parse(saved);
      // migrate: pastikan setiap item punya uid
      const migrated = parsed.map((it) => {
        if (!it.uid) {
          return { ...it, uid: genUid() };
        }
        return it;
      });
      return migrated;
    } catch (e) {
      console.error("Failed to read cart from localStorage:", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to write cart to localStorage:", e);
    }
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "uid">) => {
    const newItem: CartItem = {
      ...item,
      uid: genUid(),
      qty: item.qty ?? 1,
    };
    console.log("addToCart -> newItem:", newItem);
    setCart((prev) => [...prev, newItem]);
  };

  const removeItem = (uid: string) => {
    console.log("removeItem called uid:", uid);

    const ok = window.confirm("Yakin ingin menghapus item ini?");
    if (!ok) return;

    setCart((prev) => {
      const updated = prev.filter((item) => item.uid !== uid);
      console.log("Updated Cart:", updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
