<?php
// login.php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$email    = trim($data['email'] ?? '');
$password = $data['password']   ?? '';

if ($email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email dan password wajib diisi.']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Email atau password salah.']);
        exit;
    }

    // untuk sekarang kita kirim data user sederhana (tanpa JWT dulu)
    echo json_encode([
        'success' => true,
        'message' => 'Login berhasil.',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Terjadi kesalahan server.']);
}
