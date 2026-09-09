<?php

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/models/SupplierModel.php';

setCorsHeaders();
handlePreflight();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonError('Method not allowed', 405);
}

try {
    $model = new SupplierModel();
    $suppliers = $model->getAvailableSuppliers();
    jsonResponse(['success' => true, 'data' => $suppliers]);
} catch (Exception $e) {
    jsonError('Failed to fetch suppliers: ' . $e->getMessage(), 500);
}
