-- Run this on your local/cPanel MySQL
-- Creates the emartsupplier database and all required tables

CREATE DATABASE IF NOT EXISTS emartsupplier;

USE emartsupplier;

-- Stores migrated supplier names+codes (copied from backend.supcus on 172.16.40.22)
-- code = AccountCode, unique per supplier account
CREATE TABLE IF NOT EXISTS supplier_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) NOT NULL,
    UNIQUE KEY uq_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS supplier_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier VARCHAR(255) NOT NULL,
    is_submitted BOOLEAN NOT NULL DEFAULT FALSE,
    bk VARCHAR(50) NOT NULL DEFAULT '',
    sbk VARCHAR(50) NOT NULL DEFAULT '',
    ri VARCHAR(50) NOT NULL DEFAULT '',
    sri VARCHAR(50) NOT NULL DEFAULT '',
    bt VARCHAR(50) NOT NULL DEFAULT '',
    sbu VARCHAR(50) NOT NULL DEFAULT '',
    submitted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_supplier (supplier)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
