import React, { useState } from "react";

export const PostingPage: React.FC = () => {
  const [content, setContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Jenis posting: "feed" | "market"
  const [postType, setPostType] = useState<"feed" | "market">("feed");

  // Data marketplace
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("http://localhost:8080/api/upload_media.php", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (data.success) {
      setUploadedImage(data.url);
    } else {
      alert("Gagal upload file!");
    }
  };

  const submitPost = async () => {
    if (postType === "feed") {
      // ------------------------
      // POSTING BIASA
      // ------------------------
      if (!content.trim() && !uploadedImage) {
        alert("Isi posting atau upload gambar!");
        return;
      }

      const res = await fetch("http://localhost:8080/api/create_post.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          content,
          media_url: uploadedImage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Posting feed berhasil!");
        setContent("");
        setUploadedImage(null);
      }
    } else {
      // ------------------------
      // POSTING MARKETPLACE
      // ------------------------
      if (!title.trim() || !price.trim() || !uploadedImage) {
        alert("Isi semua data marketplace dan upload gambar!");
        return;
      }

      const formData = new FormData();
formData.append("user_id", user.id);
formData.append("title", title);
formData.append("price", price);
formData.append("stock", stock);
formData.append("image_url", uploadedImage);

const res = await fetch("http://localhost:8080/api/create_market.php", {
  method: "POST",
  body: formData,
});

// hanya sekali!
const marketData = await res.json();

console.log("API response:", marketData);

if (marketData.success) {
  alert("Posting marketplace berhasil!");
  setTitle("");
  setPrice("");
  setStock("");
  setUploadedImage(null);
}

      const data = await res.json();

      if (data.success) {
        alert("Posting marketplace berhasil!");
        setTitle("");
        setPrice("");
        setStock("");
        setUploadedImage(null);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-5 rounded-xl shadow mt-5">
      <h2 className="text-lg font-semibold mb-3">Buat Posting</h2>

      {/* ---------------------------- */}
      {/* PILIH JENIS POSTING          */}
      {/* ---------------------------- */}
      <select
        value={postType}
        onChange={(e) => setPostType(e.target.value as any)}
        className="w-full border p-2 rounded-lg mb-4"
      >
        <option value="feed">Posting Biasa</option>
        <option value="market">Posting Marketplace</option>
      </select>

      {/* ---------------------------- */}
      {/* FORM POSTING SOCIAL FEED     */}
      {/* ---------------------------- */}
      {postType === "feed" && (
        <>
          <textarea
            placeholder="Tulis sesuatu..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg p-3 mb-3"
            rows={4}
          />
        </>
      )}

      {/* ---------------------------- */}
      {/* FORM POSTING MARKETPLACE     */}
      {/* ---------------------------- */}
      {postType === "market" && (
        <div className="space-y-3 mb-3">
          <input
            type="text"
            placeholder="Nama Barang"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
          <input
            type="number"
            placeholder="Stok"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
        </div>
      )}

      {/* Preview media */}
      {uploadedImage && (
        <img
          src={`http://localhost:8080/${uploadedImage}`}
          className="w-full h-60 object-cover rounded-lg mb-3"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="mb-3 border border-gray-400 rounded-lg p-2"
      />

      <button
        onClick={submitPost}
        className="px-5 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 w-full"
      >
        Posting
      </button>
    </div>
  );
};
