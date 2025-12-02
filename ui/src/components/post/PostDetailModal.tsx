import React, { useEffect, useState } from "react";
import type { PostDetail } from "../../types/post";

interface CommentItem {
  id: number;
  name: string;
  comment: string;
}

interface Props {
  post: PostDetail | null;
  onClose: () => void;
}

export const PostDetailModal: React.FC<Props> = ({ post, onClose }) => {
  if (!post) return null;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentText, setCommentText] = useState("");

  // ---------------------------------
  // FETCH COMMENTS
  // ---------------------------------
  const fetchComments = async () => {
    const res = await fetch(
      "http://localhost:8080/api/get_comments.php?post_id=" + post.id
    );
    const data = await res.json();
    setComments(data.comments || []);
  };

  useEffect(() => {
    fetchComments();
  }, [post]);

  // ---------------------------------
  // TOGGLE LIKE
  // ---------------------------------
  const toggleLike = async () => {
    const res = await fetch("http://localhost:8080/api/toggle_like.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: post.id, user_id: user.id }),
    });

    const data = await res.json();
    setLiked(data.liked);
  };

  // ---------------------------------
  // SUBMIT COMMENT
  // ---------------------------------
  const submitComment = async () => {
    if (!commentText.trim()) return;

    await fetch("http://localhost:8080/api/add_comment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        post_id: post.id,
        user_id: user.id,
        comment: commentText,
      }),
    });

    setCommentText("");
    fetchComments();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-4 relative">
        <button className="absolute right-3 top-3 text-xl" onClick={onClose}>
          ✖
        </button>

        {/* MEDIA */}
        {post.media?.length > 0 && (
          <img
            src={`http://localhost:8080/api/${post.media[0].media_url}`}
            className="w-full h-80 object-cover rounded-lg mb-4"
          />
        )}

        <p className="text-sm text-slate-700 mb-3">{post.content}</p>

        {/* Likes */}
        <div className="flex items-center gap-2 mb-3">
          <button onClick={toggleLike}>{liked ? "❤️" : "🤍"}</button>
          <span>{post.like_count} suka</span>
        </div>

        {/* Comments */}
        <div className="max-h-64 overflow-y-auto mb-3 border p-2 rounded-lg">
          {comments.map((c) => (
            <div key={c.id} className="p-2 border-b text-sm">
              <b>{c.name}</b> {c.comment}
            </div>
          ))}
        </div>

        {/* Input Comment */}
        <div className="flex gap-2">
          <input
            className="border p-2 flex-1 rounded-lg"
            placeholder="Tambah komentar..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
            onClick={submitComment}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};
