import React, { useEffect, useState } from "react";
import { PostDetailModal } from "../post/PostDetailModal";
import type { PostDetail } from "../../types/post";
import { FollowersModal } from "../layout/FollowersModal";

const backend = import.meta.env.VITE_API_URL;

export const ProfilePage: React.FC = () => {
  const [posts, setPosts] = useState<PostDetail[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostDetail | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<"followers" | "following">(
    "followers"
  );

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user.name || "User";
  const email = user.email || "";

  useEffect(() => {
    fetch(`http://localhost:8080/api/get_posts.php?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPosts(data.posts);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <section className="flex gap-8 pb-6 border-b border-slate-200">
        <div className="w-[200px] h-[200px] rounded-full border border-b-black flex items-center justify-center">
          <img
            src="/Profil.png"
            alt="MoTa Logo"
            className="scale-[1.5] object-contain rounded-full"
          />
        </div>

        {/* Info */}
        <div className="flex-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-3">
            <span className="text-lg font-semibold text-slate-900">{name}</span>
            <div className="flex gap-2 text-xs">
              <button className="rounded-lg border border-slate-300 px-4 py-1.5 text-xs font-medium">
                Edit Profil
              </button>
              <button className="rounded-lg border border-slate-300 px-4 py-1.5 text-xs">
                Bagikan Profil
              </button>
            </div>
          </div>

          <div className="mb-3 flex gap-6 text-sm">
            <span>
              <span className="font-semibold">{posts.length}</span> postingan
            </span>

            <button
              className="hover:text-emerald-600"
              onClick={() => {
                setPopupType("followers");
                setShowPopup(true);
              }}
            >
              <span className="font-semibold">340</span> pengikut
            </button>

            <button
              className="hover:text-emerald-600"
              onClick={() => {
                setPopupType("following");
                setShowPopup(true);
              }}
            >
              <span className="font-semibold">210</span> mengikuti
            </button>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-slate-900">Petani MoTa</div>
            <div className="text-slate-600 text-xs sm:text-sm">{email}</div>
            <div className="mt-1 text-xs text-slate-600">
              Berbagi hasil panen, eksperimen irigasi, dan tips modern tani 🌱
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="flex justify-center gap-8 py-3 text-xs uppercase tracking-wide text-slate-500 border-b border-slate-200">
        <button className="flex items-center gap-1 font-semibold text-slate-900">
          <span className="h-3 w-3 rounded-sm border border-slate-600" />
          Postingan
        </button>
        <button className="hidden sm:flex items-center gap-1 hover:text-slate-800">
          <span className="h-3 w-3 rounded-full border border-slate-400" />
          Disimpan
        </button>
        <button className="hidden sm:flex items-center gap-1 hover:text-slate-800">
          <span className="h-3 w-3 border border-slate-400" />
          Ditandai
        </button>
      </section>

      {/* Grid posts */}
      <section className="grid grid-cols-3 gap-0.5 sm:gap-1 mt-1 bg-slate-100">
        {posts.map((p) => {
          const firstMedia = p.media?.[0];

          return (
            <div
              key={p.id}
              className="aspect-square bg-slate-200 flex items-center justify-center relative cursor-pointer"
              onClick={() => setSelectedPost(p)}
            >
              {firstMedia ? (
                <img
                  src={`${backend}/${firstMedia.media_url}`}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-[10px] text-slate-500 p-2 text-center">
                  {p.content}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
      {showPopup && (
        <FollowersModal type={popupType} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};
