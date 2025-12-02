<?php
require_once "config.php";

$data = json_decode(file_get_contents("php://input"), true);
$post_id = $data["post_id"];
$user_id = $data["user_id"];

$stmt = $pdo->prepare("SELECT id FROM post_likes WHERE post_id=? AND user_id=?");
$stmt->execute([$post_id, $user_id]);
$existing = $stmt->fetch();

if ($existing) {
    $pdo->prepare("DELETE FROM post_likes WHERE id=?")->execute([$existing['id']]);
    echo json_encode(["liked" => false]);
} else {
    $pdo->prepare("INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)")->execute([$post_id, $user_id]);
    echo json_encode(["liked" => true]);
}
