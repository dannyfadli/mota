import { useState } from "react";
import { sendChatMessage } from "../../api/chatApi";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string; time: string }[]
  >([
    {
      from: "bot",
      text: "Halo, selamat datang di MoTa! Ada yang bisa dibantu?",
      time: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  function getTime() {
    return new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function handleSend() {
    if (!input.trim()) return;

    // --- Pesan User ---
    const userMsg = {
      from: "user" as const,
      text: input,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Kirim ke API
    let reply = "Maaf, terjadi kesalahan.";

    try {
      reply = await sendChatMessage(input);
    } catch (err) {
      console.error(err);
    }

    // --- Pesan Bot ---
    const botMsg = {
      from: "bot" as const,
      text: reply,
      time: getTime(),
    };

    setMessages((prev) => [...prev, botMsg]);

    setInput("");
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl rounded-2xl border">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b">
            <div>
              <h2 className="font-semibold text-slate-800">MoTa Support</h2>
              <p className="text-xs text-emerald-600 -mt-1">Online</p>
            </div>
            <button onClick={() => setOpen(false)}>
              <X className="text-slate-500 hover:text-slate-700" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-3 h-80 overflow-y-auto space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : ""}`}>
                <div
                  className={`max-w-[70%] rounded-xl px-3 py-2 text-sm shadow 
                    ${m.from === "user" ? "bg-emerald-500 text-white" : "bg-white border"}
                  `}
                >
                  <div>{m.text}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2 p-3 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-xl px-3 py-2 text-sm"
              placeholder="Tulis pesan..."
            />
            <button
              onClick={handleSend}
              className="bg-emerald-500 text-white px-4 rounded-xl text-sm"
            >
              Kirim
            </button>
          </div>
        </div>
      )}
    </>
  );
}
