export async function sendChatMessage(msg: string) {
  const res = await fetch("http://localhost:8080/api/chat.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  return data.reply;
}
