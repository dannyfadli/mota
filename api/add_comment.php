<?php
require_once "config.php";

$data = json_decode(file_get_contents("php://input"), true);
$post_id = $data["post_id"];
$user_id = $data["user_id"];
$comment = $data["comment"];

$stmt = $pdo->prepare("INSERT INTO post_comments (post_id, user_id, comment) VALUES (?, ?, ?)");
$stmt->execute([$post_id, $user_id, $comment]);

echo json_encode(["success" => true]);
