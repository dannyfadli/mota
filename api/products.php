<?php
// products.php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

$host = 'localhost';
$db   = 'mota_auth'; // atau nama DB lain
$user = 'root';
$pass = '';
$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success'=>false, 'message' => 'DB connection error']);
    exit;
}

$q = isset($_GET['q']) ? trim($_GET['q']) : '';
$page = max(1, (int)($_GET['page'] ?? 1));
$limit = min(100, max(1, (int)($_GET['limit'] ?? 12)));
$offset = ($page - 1) * $limit;

$params = [];
$sqlWhere = "";
if ($q !== "") {
    $sqlWhere = "WHERE title LIKE :q OR description LIKE :q";
    $params[':q'] = "%$q%";
}

// total count
$countStmt = $pdo->prepare("SELECT COUNT(*) FROM products $sqlWhere");
$countStmt->execute($params);
$total = (int)$countStmt->fetchColumn();

// fetch
$stmt = $pdo->prepare("SELECT id, title, slug, description, price, stock, cover_url FROM products $sqlWhere ORDER BY created_at DESC LIMIT :offset, :limit");
foreach ($params as $k=>$v) $stmt->bindValue($k, $v);
$stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
$stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    'success' => true,
    'data' => $rows,
    'meta' => [
        'page' => $page,
        'limit' => $limit,
        'total' => $total,
        'pages' => ceil($total / $limit)
    ]
]);
