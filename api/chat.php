<?php
require_once __DIR__ . "/config.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$userMessage = $data["message"] ?? "";

if (!$userMessage) {
    echo json_encode(["reply" => "Pesan kosong"]);
    exit;
}

$apiKey = "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";

$payload = [
    "model" => "openai/gpt-oss-20b:free",
    "messages" => [
        ["role" => "system", "content" => "Kamu adalah MoTa, asisten ramah."],
        ["role" => "user", "content" => $userMessage]
    ]
];

$ch = curl_init("https://openrouter.ai/api/v1/chat/completions");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Bearer $apiKey",
        "HTTP-Referer: http://localhost:5173",
        "X-Title: MoTa Chat",
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
]);

$response = curl_exec($ch);

if (!$response) {
    echo json_encode(["reply" => "Gagal terhubung ke AI"]);
    exit;
}

$json = json_decode($response, true);

if (isset($json["error"])) {
    echo json_encode(["reply" => "AI Error: " . $json["error"]["message"]]);
    exit;
}

$reply = $json["choices"][0]["message"]["content"] ?? "Maaf, AI tidak memberi balasan.";

echo json_encode(["reply" => $reply]);
