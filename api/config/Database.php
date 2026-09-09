<?php

class Database {
    private static ?PDO $connection = null;

    private const HOST     = '127.0.0.1';
    private const PORT     = '3306';
    private const DB_NAME  = 'emartsupplier';
    private const USERNAME = 'root';
    private const PASSWORD = '';

    private function __construct() {}

    public static function getConnection(): PDO {
        if (self::$connection === null) {
            $dsn = sprintf(
                'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
                self::HOST,
                self::PORT,
                self::DB_NAME
            );
            self::$connection = new PDO($dsn, self::USERNAME, self::PASSWORD, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        }
        return self::$connection;
    }
}
