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
    "model" => "google/gemma-3-27b-it:free",
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
