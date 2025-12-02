<?php
require_once "config.php";

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data["user_id"];
$content = $data["content"];
$media_url = $data["media_url"]; // hasil dari upload_media.php

// INSERT POST
$stmt = $pdo->prepare("INSERT INTO posts (user_id, content) VALUES (?, ?)");
$stmt->execute([$user_id, $content]);

$post_id = $pdo->lastInsertId();

// INSERT MEDIA (jika ada)
if ($media_url) {
    $stmt2 = $pdo->prepare("INSERT INTO post_media (post_id, media_url) VALUES (?, ?)");
    $stmt2->execute([$post_id, $media_url]);
}

echo json_encode([
    "success" => true,
    "post_id" => $post_id
]);
