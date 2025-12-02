<?php
require_once "config.php";

if (!isset($_FILES['file'])) {
    echo json_encode(['success' => false, 'message' => 'No file uploaded']);
    exit;
}

$file = $_FILES['file'];
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

$allowed = ['jpg', 'jpeg', 'png', 'gif'];

if (!in_array($ext, $allowed)) {
    echo json_encode(['success' => false, 'message' => 'Invalid file type']);
    exit;
}

$filename = uniqid() . "." . $ext;
$target = __DIR__ . "/uploads/" . $filename;

move_uploaded_file($file["tmp_name"], $target);

echo json_encode([
    "success" => true,
    "url" => "/api/uploads/" . $filename
]);
