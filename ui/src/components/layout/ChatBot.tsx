export default function ChatBot() {
  const chats = [
    {
      name: "Lanz",
      avatar: "https://i.pravatar.cc/150?img=7",
      lastMessage: "You sent an attachment.",
      time: "2h"
    },
    {
      name: "Joko",
      avatar: "https://i.pravatar.cc/150?img=8",
      lastMessage: "You sent an attachment.",
      time: "10h"
    },
    {
      name: "Mulyono",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Lah pembelian...",
      time: "4d",
      verified: true
    }
  ];

  const dummyChat = [
    { from: "other", text: "Halo! Ada yang bisa saya bantu hari ini?" },
    { from: "me", text: "Ini hanya dummy chat untuk testing UI." },
    { from: "other", text: "Oke, tampilannya sudah muncul ya." },
    { from: "me", text: "Siap, lanjutkan." }
  ];

  return (
    <div className="flex h-[87.65vh]
     bg-emerald-100 text-black">

      {/* SIDEBAR LEFT */}
      <div className="w-80 border-r border-gray-800 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-5">sl6.rk</h1>

        <input
          type="text"
          placeholder="Search"
          className="w-full bg-emerald-300 px-3 py-2 rounded-lg mb-5"
        />

        <h2 className="text-gray-400 text-sm mb-2">Messages</h2>

        <div className="flex flex-col gap-4 overflow-y-auto">
          {chats.map((c, i) => (
            <div key={i} className="flex items-center gap-3 hover:bg-white p-2 rounded-lg cursor-pointer">
              <img src={c.avatar} className="w-12 h-12 rounded-full" />

              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <p className="font-semibold">{c.name}</p>
                  {c.verified && <span className="text-blue-400 text-sm">✓</span>}
                </div>
                <p className="text-sm text-gray-400">
                  {c.lastMessage} · {c.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MIDDLE CHAT AREA */}
      <div className="flex-1 flex flex-col bg-emerald-50">

        {/* CHAT MESSAGES */}
        <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
          {dummyChat.map((msg, i) => (
            <div
              key={i}
              className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                msg.from === "me"
                  ? "self-end bg-emerald-300 text-black"
                  : "self-start bg-white text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* INPUT BOX */}
        <div className="p-4 border-t border-gray-300 bg-emerald-200">
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none"
            />
            <button className="p-2 rounded-full bg-emerald-400 hover:bg-emerald-500">
              ✈️
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
