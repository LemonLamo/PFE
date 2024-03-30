START TRANSACTION;

CREATE DATABASE IF NOT EXISTS forza;
SET CHARACTER SET 'utf8';

USE forza;

CREATE TABLE `examens_cliniques` (
  `code_examen_clinique` varchar(255) NOT NULL PRIMARY KEY,
  `designation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `examens_cliniques` (`code_examen_clinique`, `designation`) VALUES ('S10.9', "Fréquence cardiaque");
INSERT INTO `examens_cliniques` (`code_examen_clinique`, `designation`) VALUES ('Z06.0', 'Température');
INSERT INTO `examens_cliniques` (`code_examen_clinique`, `designation`) VALUES ('S54.16', 'Imagerie par résonance magnétique de la colonne lombaire');
INSERT INTO `examens_cliniques` (`code_examen_clinique`, `designation`) VALUES ('N83.29', 'Échographie du pelvis');
INSERT INTO `examens_cliniques` (`code_examen_clinique`, `designation`) VALUES ('Z12.31', 'Mammographie');
INSERT INTO `examens_cliniques` (`code_examen_clinique`, `designation`) VALUES ('C80.1', 'Tomographie par émission de positons (TEP)');
INSERT INTO `examens_cliniques` (`code_examen_clinique`, `designation`) VALUES ('M85.8', 'Densitométrie osseuse');
INSERT INTO `examens_cliniques` (`code_examen_clinique`, `designation`) VALUES ('C87.0', 'Fluoroscopie');
INSERT INTO `examens_cliniques` (`code_examen_clinique`, `designation`) VALUES ('C19.9', 'Scintigraphie thyroïdienne en médecine nucléaire');
INSERT INTO `examens_cliniques` (`code_examen_clinique`, `designation`) VALUES ('J98.4', 'Radiographie thoracique');

COMMIT;