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
        return $val;
    }

    function row(string $label, string $val): string {
        $empty = $val === '';
        $display = $empty ? '— not provided' : htmlspecialchars($val);
        $valStyle = $empty
            ? 'color:#9ca3af;font-style:italic;'
            : 'color:#111827;font-weight:600;font-family:monospace;font-size:14px;';
        return "<tr>
          <td style='padding:9px 16px;color:#6b7280;font-size:13px;width:55%;border-bottom:1px solid #f3f4f6;'>" . htmlspecialchars($label) . "</td>
          <td style='padding:9px 16px;font-size:13px;border-bottom:1px solid #f3f4f6;{$valStyle}'>{$display}</td>
        </tr>";
    }

    function section(string $title, string $color, array $rows): string {
        $rowsHtml = implode('', $rows);
        return "<tr><td colspan='2' style='padding:0;'>
          <div style='background:{$color};padding:7px 16px;'>
            <span style='color:#fff;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;'>{$title}</span>
          </div>
          <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse:collapse;'>{$rowsHtml}</table>
        </td></tr>";
    }

    $esc = fn(string $s) => htmlspecialchars($s);

    $html = "<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body style='margin:0;padding:0;background:#f0f2f5;font-family:Arial,sans-serif;'>
    <table width='100%' cellpadding='0' cellspacing='0' style='background:#f0f2f5;padding:40px 24px;'>
      <tr><td align='center'>
        <table width='600' cellpadding='0' cellspacing='0' style='max-width:600px;width:100%;'>

          <!-- Logo strip -->
          <tr><td style='background:#fff;border-radius:12px 12px 0 0;padding:24px 40px 20px;text-align:center;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;border-top:1px solid #e5e7eb;'>
            <img src='https://supplier.emart.my/logos/GROUPHOLDING_TRADEMARK_BLACK.png' alt='Emart Group' width='180' style='max-width:180px;height:auto;display:block;margin:0 auto;'>
          </td></tr>

          <!-- Blue header bar -->
          <tr><td style='background:linear-gradient(135deg,#1e3a5f,#2563eb);padding:20px 40px;text-align:center;'>
            <h1 style='margin:0 0 4px;color:#fff;font-size:20px;font-weight:700;letter-spacing:-0.3px;'>New Supplier Submission</h1>
            <p style='margin:0;color:rgba(255,255,255,0.7);font-size:12px;'>supplier.emart.my &mdash; IT &amp; MIS Department</p>
          </td></tr>

          <!-- Meta info -->
          <tr><td style='background:#fff;padding:24px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <table width='100%' cellpadding='0' cellspacing='0'>
              <tr>
                <td style='padding:6px 0;'>
                  <span style='display:inline-block;background:#eff6ff;color:#1d4ed8;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:3px 10px;border-radius:20px;'>Supplier</span>
                </td>
                <td style='padding:6px 0;font-size:15px;font-weight:700;color:#111827;text-align:right;'>" . $esc($supplier) . "</td>
              </tr>
              <tr>
                <td style='padding:6px 0;color:#6b7280;font-size:12px;'>Submitted At</td>
                <td style='padding:6px 0;color:#374151;font-size:12px;text-align:right;'>{$datetime}</td>
              </tr>
              <tr>
                <td style='padding:6px 0;color:#6b7280;font-size:12px;'>IP Address</td>
                <td style='padding:6px 0;color:#374151;font-size:12px;font-family:monospace;text-align:right;'>{$ip}</td>
              </tr>
            </table>
          </td></tr>

          <!-- Divider -->
          <tr><td style='background:#fff;padding:0 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <hr style='border:none;border-top:1px solid #e5e7eb;margin:0;'>
          </td></tr>

          <!-- Codes table -->
          <tr><td style='background:#fff;padding:20px 40px 32px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;border-radius:0 0 12px 12px;'>
            <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;'>
              " . section('Batu Kawa', '#3b82f6', [
                  row('Emart (Batu Kawa) Sdn Bhd', fmt($codes['bk'])),
                  row('Emart Property (Batu Kawa) Sdn Bhd', fmt($codes['sbk'])),
              ]) . "
              " . section('Riam', '#7c3aed', [
                  row('Emart (Riam) Sdn Bhd', fmt($codes['ri'])),
                  row('Emart Realty (Riam) Sdn Bhd', fmt($codes['sri'])),
                  row('Emart (Riam) Sdn Bhd - Bulatan', fmt($codes['bl'])),
                  row('Emart Realty (Riam) Sdn Bhd - Bulatan', fmt($codes['sbl'])),
              ]) . "
              " . section('Bintulu', '#059669', [
                  row('Emart (Bintulu) Sdn Bhd', fmt($codes['bt'])),
                  row('Emart Realty (Bintulu) Sdn Bhd', fmt($codes['sbu'])),
              ]) . "
            </table>
          </td></tr>

          <!-- Footer -->
          <tr><td style='padding:20px 0 0;text-align:center;color:#9ca3af;font-size:11px;'>
            This is an automated message. Do not reply to this email.<br>
            &copy; " . date('Y') . " Emart &mdash; IT &amp; MIS Department
          </td></tr>

        </table>
      </td></tr>
    </table>
    </body></html>";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Supplier Portal <" . NOTIFICATION_FROM . ">\r\n";
    $headers .= "Reply-To: " . NOTIFICATION_FROM . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    @mail($to, $subject, $html, $headers);
}
