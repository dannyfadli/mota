<?php
require_once "config.php";

header("Content-Type: application/json");

// Ambil user_id dari GET
$user_id = $_GET["user_id"] ?? null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "Missing user_id"]);
    exit;
}

// Ambil posts
$stmt = $pdo->prepare("SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC");
$stmt->execute([$user_id]);
$postsRaw = $stmt->fetchAll(PDO::FETCH_ASSOC);

$posts = [];

foreach ($postsRaw as $post) {
    $post_id = $post["id"];

    // Ambil media untuk setiap post
    $mediaStmt = $pdo->prepare("SELECT media_url, media_type FROM post_media WHERE post_id = ?");
    $mediaStmt->execute([$post_id]);

    $media = [];

    while ($m = $mediaStmt->fetch(PDO::FETCH_ASSOC)) {
        // Pastikan path benar — TANPA 'api/'
        $m["media_url"] = "uploads/" . basename($m["media_url"]);
        $media[] = $m;
    }

    // Masukkan media ke dalam post
    $post["media"] = $media;

    $posts[] = $post;
}

// Kirim JSON final
echo json_encode([
    "success" => true,
    "posts" => $posts
]);
