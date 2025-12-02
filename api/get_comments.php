<?php
require_once "config.php";

$post_id = $_GET["post_id"] ?? null;

if (!$post_id) {
    echo json_encode([
        "success" => false,
        "comments" => []
    ]);
    exit;
}

$sql = "
    SELECT pc.id, u.name, pc.comment
    FROM post_comments pc
    JOIN users u ON u.id = pc.user_id
    WHERE pc.post_id = ?
    ORDER BY pc.created_at ASC
";

$stmt = $pdo->prepare($sql);
$stmt->execute([$post_id]);
$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "comments" => $comments
]);
