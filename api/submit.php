<?php

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/models/SupplierModel.php';
require_once __DIR__ . '/config/NotificationConfig.php';

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
$required = ['bk', 'sbk', 'ri', 'bl', 'sri', 'sbl', 'bt', 'sbu'];

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
    sendSubmissionEmail($supplier, $codes);
    jsonResponse(['success' => true, 'message' => 'Submitted successfully']);
} catch (Exception $e) {
    jsonError('Submission failed: ' . $e->getMessage(), 500);
}

function sendSubmissionEmail(string $supplier, array $codes): void {
    $to      = implode(',', NOTIFICATION_EMAILS);
    $subject = '[Supplier Portal] New Submission — ' . $supplier;

    $ip       = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
    $datetime = date('d M Y, h:i A') . ' (MYT)';

    function fmt(string $val): string {
        return $val !== '' ? $val : '— (not provided)';
    }

    $body = "New supplier code submission received via supplier.emart.my\r\n";
    $body .= str_repeat('-', 55) . "\r\n";
    $body .= "Supplier     : {$supplier}\r\n";
    $body .= "Submitted At : {$datetime}\r\n";
    $body .= "IP Address   : {$ip}\r\n";
    $body .= str_repeat('-', 55) . "\r\n\r\n";

    $body .= "BATU KAWA\r\n";
    $body .= str_repeat('-', 55) . "\r\n";
    $body .= "Emart (Batu Kawa) Sdn Bhd          : " . fmt($codes['bk'])  . "\r\n";
    $body .= "Emart Property (Batu Kawa) Sdn Bhd : " . fmt($codes['sbk']) . "\r\n\r\n";

    $body .= "RIAM\r\n";
    $body .= str_repeat('-', 55) . "\r\n";
    $body .= "Emart (Riam) Sdn Bhd               : " . fmt($codes['ri'])  . "\r\n";
    $body .= "Emart Realty (Riam) Sdn Bhd        : " . fmt($codes['sri']) . "\r\n";
    $body .= "Emart (Riam) Sdn Bhd - Bulatan     : " . fmt($codes['bl'])  . "\r\n";
    $body .= "Emart Realty (Riam) Sdn Bhd - Bulatan : " . fmt($codes['sbl']) . "\r\n\r\n";

    $body .= "BINTULU\r\n";
    $body .= str_repeat('-', 55) . "\r\n";
    $body .= "Emart (Bintulu) Sdn Bhd            : " . fmt($codes['bt'])  . "\r\n";
    $body .= "Emart Realty (Bintulu) Sdn Bhd     : " . fmt($codes['sbu']) . "\r\n\r\n";

    $body .= str_repeat('-', 55) . "\r\n";
    $body .= "This is an automated message from the Emart Supplier Portal.\r\n";
    $body .= "supplier.emart.my — IT & MIS Department\r\n";

    $headers  = "From: Supplier Portal <" . NOTIFICATION_FROM . ">\r\n";
    $headers .= "Reply-To: " . NOTIFICATION_FROM . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    @mail($to, $subject, $body, $headers);
}
