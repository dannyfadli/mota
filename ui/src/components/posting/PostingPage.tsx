import React, { useState } from "react";

export const PostingPage: React.FC = () => {
  const [content, setContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // -------------------------------
  // UPLOAD FILE
  // -------------------------------
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
      alert("Gagal upload gambar!");
    }
  };

  // -------------------------------
  // SUBMIT POST
  // -------------------------------
  const submitPost = async () => {
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
      alert("Posting berhasil!");
      setContent("");
      setUploadedImage(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-5 rounded-xl shadow mt-5">
      <h2 className="text-lg font-semibold mb-4">Buat Posting</h2>

      <textarea
        placeholder="Tulis sesuatu..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded-lg p-3 mb-3"
        rows={4}
      />

      {/* Image Preview */}
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
        className="mb-3 border border-gray-400 rounded-lg p-2 hover:bg-blue-300 mr-4"
      />

      <button
        onClick={submitPost}
        className="px-5 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700"
      >
        Posting
      </button>
    </div>
  );
};
