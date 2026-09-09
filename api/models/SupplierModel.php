<?php

require_once __DIR__ . '/../config/Database.php';

class SupplierModel {

    /**
     * Returns all supplier names from local supplier_list that have NOT yet submitted.
     */
    public function getAvailableSuppliers(): array {
        $db = Database::getConnection();

        $stmt = $db->query("
            SELECT CONCAT(sl.name, ' (', sl.code, ')') AS display
            FROM supplier_list sl
            LEFT JOIN supplier_codes sc ON sc.supplier = CONCAT(sl.name, ' (', sl.code, ')') AND sc.is_submitted = TRUE
            WHERE sc.supplier IS NULL
            ORDER BY sl.name ASC
        ");

        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    /**
     * Saves (or updates) a supplier code entry and marks it submitted.
     */
    public function submit(string $supplier, array $codes): bool {
        $db = Database::getConnection();

        $sql = "
            INSERT INTO supplier_codes (supplier, is_submitted, bk, sbk, ri, sri, bt, sbu, submitted_at)
            VALUES (:supplier, TRUE, :bk, :sbk, :ri, :sri, :bt, :sbu, NOW())
            ON DUPLICATE KEY UPDATE
                is_submitted = TRUE,
                bk  = VALUES(bk),
                sbk = VALUES(sbk),
                ri  = VALUES(ri),
                sri = VALUES(sri),
                bt  = VALUES(bt),
                sbu = VALUES(sbu),
                submitted_at = NOW()
        ";

        $stmt = $db->prepare($sql);
        return $stmt->execute([
            ':supplier' => $supplier,
            ':bk'       => $codes['bk'],
            ':sbk'      => $codes['sbk'],
            ':ri'       => $codes['ri'],
            ':sri'      => $codes['sri'],
            ':bt'       => $codes['bt'],
            ':sbu'      => $codes['sbu'],
        ]);
    }

    /**
     * Returns existing codes for a supplier (for pre-filling on revisit).
     */
    public function getSupplierCodes(string $supplier): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare(
            "SELECT bk, sbk, ri, sri, bt, sbu FROM supplier_codes WHERE supplier = :supplier LIMIT 1"
        );
        $stmt->execute([':supplier' => $supplier]);
        return $stmt->fetch() ?: null;
    }
}
