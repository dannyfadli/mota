// src/api/products.ts
export const API_BASE = "http://localhost:8080/api";

export type Product = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  cover_url?: string | null;
};

export async function fetchProducts(q = "", page = 1, limit = 12): Promise<{
  data: Product[];
  meta: { page: number; limit: number; total: number; pages: number };
}> {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  params.set("page", String(page));
  params.set("limit", String(limit));

  const res = await fetch(`${API_BASE}/products.php?${params.toString()}`);
  if (!res.ok) throw new Error("Gagal mengambil produk");
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "API error");
  return { data: json.data, meta: json.meta };
}
