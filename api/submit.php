<?php

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/models/SupplierModel.php';

setCorsHeaders();
handlePreflight();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('Method not allowed', 405);
}

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    jsonError('Invalid JSON body');
}

$supplier = trim($body['supplier'] ?? '');
$required = ['bk', 'sbk', 'ri', 'sri', 'bt', 'sbu'];

if ($supplier === '') {
    jsonError('Supplier name is required');
}

$codes = [];
foreach ($required as $field) {
    $codes[$field] = trim($body[$field] ?? '');
}

try {
    $model = new SupplierModel();
    $model->submit($supplier, $codes);
    jsonResponse(['success' => true, 'message' => 'Submitted successfully']);
} catch (Exception $e) {
    jsonError('Submission failed: ' . $e->getMessage(), 500);
}
