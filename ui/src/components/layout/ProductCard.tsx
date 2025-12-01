// src/components/marketplace/ProductCard.tsx
import React from "react";
import type { Product } from "../../api/products";

type Props = {
  product: Product;
  onClick?: (p: Product) => void;
};

export const ProductCard: React.FC<Props> = ({ product, onClick }) => {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div
        className="h-44 w-full bg-slate-100 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${product.cover_url ?? '/placeholder.png'})` }}
      />
      <div className="p-3 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900 truncate">{product.title}</h3>
          <div className="text-sm font-medium text-emerald-700">
            Rp {Number(product.price).toLocaleString("id-ID")}
          </div>
        </div>
        <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-400">Stok: {product.stock}</div>
          <button
            onClick={() => onClick?.(product)}
            className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-600"
          >
            Lihat
          </button>
        </div>
      </div>
    </div>
  );
};
