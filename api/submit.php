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
} catch (Exception $e) {
    jsonError('Submission failed: ' . $e->getMessage(), 500);
}

// Email is best-effort — never let it break the submission response
try {
    sendSubmissionEmail($supplier, $codes);
} catch (Throwable $e) {
    // silent
}

jsonResponse(['success' => true, 'message' => 'Submitted successfully']);

// ─── Email helpers (file-scope so they are never redeclared) ─────────────────

function emailFmt(string $val): string {
    return $val;
}

function emailRow(string $label, string $val): string {
    $empty   = $val === '';
    $display = $empty ? '&mdash; not provided' : htmlspecialchars($val);
    $valStyle = $empty
        ? 'color:#9ca3af;font-style:italic;'
        : 'color:#111827;font-weight:600;font-family:monospace;font-size:14px;';
    return "<tr>
      <td style='padding:9px 16px;color:#6b7280;font-size:13px;width:55%;border-bottom:1px solid #f3f4f6;'>" . htmlspecialchars($label) . "</td>
      <td style='padding:9px 16px;font-size:13px;border-bottom:1px solid #f3f4f6;{$valStyle}'>{$display}</td>
    </tr>";
}

function emailSection(string $title, string $color, array $rows): string {
    $rowsHtml = implode('', $rows);
    return "<tr><td colspan='2' style='padding:0;'>
      <div style='background:{$color};padding:7px 16px;'>
        <span style='color:#fff;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;'>{$title}</span>
      </div>
      <table width='100%' cellpadding='0' cellspacing='0' style='border-collapse:collapse;'>{$rowsHtml}</table>
    </td></tr>";
}

function sendSubmissionEmail(string $supplier, array $codes): void {
    $to      = implode(',', NOTIFICATION_EMAILS);
    $subject = '[Supplier Portal] New Submission — ' . $supplier;

    $ip       = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
    $datetime = date('d M Y, h:i A') . ' (MYT)';
    $esc      = fn(string $s) => htmlspecialchars($s);

    $logoPath = __DIR__ . '/../logos/GROUPHOLDING_TRADEMARK_BLACK.png';
    $logoImg  = is_readable($logoPath)
        ? "<img src='data:image/png;base64," . base64_encode(file_get_contents($logoPath)) . "' alt='Emart Group' width='180' style='max-width:180px;height:auto;display:block;margin:0 auto;'>"
        : "<span style='font-size:18px;font-weight:700;color:#1e3a5f;'>Emart Group</span>";

    $html = str_replace('{LOGO_IMG}', $logoImg,
"<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body style='margin:0;padding:0;background:#f0f2f5;font-family:Arial,sans-serif;'>
<table width='100%' cellpadding='0' cellspacing='0' style='background:#f0f2f5;padding:40px 24px;'>
  <tr><td align='center'>
    <table width='600' cellpadding='0' cellspacing='0' style='max-width:600px;width:100%;'>

      <!-- Logo strip -->
      <tr><td style='background:#fff;border-radius:12px 12px 0 0;padding:24px 40px 20px;text-align:center;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;border-top:1px solid #e5e7eb;'>
        {LOGO_IMG}
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
          " . emailSection('Batu Kawa', '#3b82f6', [
              emailRow('Emart (Batu Kawa) Sdn Bhd',          emailFmt($codes['bk'])),
              emailRow('Emart Property (Batu Kawa) Sdn Bhd', emailFmt($codes['sbk'])),
          ]) . "
          " . emailSection('Riam', '#7c3aed', [
              emailRow('Emart (Riam) Sdn Bhd',                    emailFmt($codes['ri'])),
              emailRow('Emart Realty (Riam) Sdn Bhd',             emailFmt($codes['sri'])),
              emailRow('Emart (Riam) Sdn Bhd - Bulatan',          emailFmt($codes['bl'])),
              emailRow('Emart Realty (Riam) Sdn Bhd - Bulatan',   emailFmt($codes['sbl'])),
          ]) . "
          " . emailSection('Bintulu', '#059669', [
              emailRow('Emart (Bintulu) Sdn Bhd',         emailFmt($codes['bt'])),
              emailRow('Emart Realty (Bintulu) Sdn Bhd',  emailFmt($codes['sbu'])),
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
</body></html>");

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Supplier Portal <" . NOTIFICATION_FROM . ">\r\n";
    $headers .= "Reply-To: " . NOTIFICATION_FROM . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send individually so recipients cannot see each other's addresses
    foreach (NOTIFICATION_EMAILS as $recipient) {
        @mail($recipient, $subject, $html, $headers);
    }
}
