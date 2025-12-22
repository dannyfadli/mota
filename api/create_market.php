<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");

// Jika method OPTIONS untuk preflight CORS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$response = ["success" => false];

// Semua data FormData akan masuk lewat $_POST dan $_FILES
$judul = $_POST["judul"] ?? null;
$kategori = $_POST["kategori"] ?? null;
$harga = $_POST["harga"] ?? null;

// Validasi
if (!$judul || !$kategori || !$harga) {
    echo json_encode([
        "success" => false,
        "message" => "Data tidak lengkap",
        "post" => $_POST,
        "files" => $_FILES
    ]);
    exit();
}

$uploadName = null;

// Jika ada file yg dikirim
if (isset($_FILES["foto"])) {
    $targetDir = "uploads/";
    if (!file_exists($targetDir)) mkdir($targetDir, 0777, true);

    $filename = time() . "_" . basename($_FILES["foto"]["name"]);
    $targetFile = $targetDir . $filename;

    if (move_uploaded_file($_FILES["foto"]["tmp_name"], $targetFile)) {
        $uploadName = $filename;
    }
}

echo json_encode([
    "success" => true,
    "message" => "Marketplace berhasil dibuat",
    "data" => [
        "judul" => $judul,
        "kategori" => $kategori,
        "harga" => $harga,
        "foto" => $uploadName
    ]
]);
