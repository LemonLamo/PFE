START TRANSACTION;

CREATE DATABASE IF NOT EXISTS forza;
SET CHARACTER SET 'utf8';

USE forza;

CREATE TABLE `bilans` (
  `code_bilan` varchar(255) NOT NULL PRIMARY KEY,
  `designation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `bilans` (`code_bilan`, `designation`) VALUES
  ('B1', 'Bilan glucidique'),
  ('B2', 'Bilan lipidique'),
  ('B3', 'Bilan rénale'),
  ('B4', 'Bilan hépatique'),
  ('B5', 'Bilan phospho-calcique'),
  ('B6', 'Bilan martiale'),
  ('B7', 'Dosage de vitamines'),
  ('B8', 'Bilan thyroïdien'),
  ('B9', 'Bilan protéique'),
  ('B10', 'Bilan cardiaque'),
  ('B11', 'Marqueurs tumoraux'),
  ('B12', 'Autres paramètres biochimiques -Ionogramme sanguin Na K Cl - Amylase - Lipase - Beta HCG -ASLO - D-dimères\r\n'),
  ('B13', 'Paramètres urinaires'),
  ('B14', 'Auto-immunite'),
  ('B15', 'Bilan hormonal'),
  ('B16', 'Bilan immunochimie'),
  ('B17', 'Bilan glucidique'),
  ('B18', 'Bilan lipidique'),
  ('B19', 'Bilan rénale'),
  ('B20', 'Bilan hépatique'),
  ('B21', 'Bilan phospho-calcique'),
  ('B22', 'Bilan martiale'),
  ('B23', 'Dosage de vitamines'),
  ('B24', 'Bilan thyroïdien'),
  ('B25', 'Bilan protéique'),
  ('B26', 'Bilan cardiaque'),
  ('B27', 'Marqueurs tumoraux'),
  ('B28', 'Autres paramètres biochimiques -Ionogramme sanguin Na K Cl - Amylase - Lipase - Beta HCG -ASLO - D-dimères\r\n'),
  ('B29', 'Paramètres urinaires'),
  ('B30', 'Auto-immunite'),
  ('B31', 'Bilan hormonal'),
  ('B32', 'Bilan immunochimie');

COMMIT;