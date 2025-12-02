import React from "react";

interface Props {
  type: "followers" | "following";
  onClose: () => void;
}

export const FollowersModal: React.FC<Props> = ({ type, onClose }) => {
  const title = type === "followers" ? "Pengikut" : "Mengikuti";

  // Dummy data statis
  const users = [
    { id: 1, name: "Dany" },
    { id: 2, name: "Fadli" },
    { id: 3, name: "User Lain" }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-80 max-h-96 overflow-y-auto p-4 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-2 text-lg"
        >
          ✖
        </button>

        <h2 className="text-lg font-semibold mb-3 text-center">
          {title}
        </h2>

        <div className="space-y-3">
          {users.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-3 p-2 border-b"
            >
              <img
                src="https://via.placeholder.com/40"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">{u.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
