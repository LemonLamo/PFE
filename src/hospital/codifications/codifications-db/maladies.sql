START TRANSACTION;

CREATE DATABASE IF NOT EXISTS forza;
SET CHARACTER SET 'utf8';

USE forza;

CREATE TABLE `maladies` (
  `code` varchar(255) NOT NULL PRIMARY KEY,
  `nom` varchar(255) NOT NULL,
  `chronique` tinyint(1) DEFAULT 0,
  `hereditaire` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;