export async function sendChatMessage(message: string): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: message }),
  });

  if (!res.ok) {
    throw new Error("Chat API error");
  }

  const data = await res.json();
  return data.answer; // pastikan backend mengirim { answer: "..." }
}
