START TRANSACTION;

CREATE DATABASE IF NOT EXISTS forza;
SET CHARACTER SET 'utf8';

USE forza;

CREATE TABLE `radios` (
  `code_radio` varchar(255) NOT NULL PRIMARY KEY,
  `designation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `radios` (`code_radio`, `designation`) VALUES ('R10.9', 'Radiographie de l''abdomen');
INSERT INTO `radios` (`code_radio`, `designation`) VALUES ('S06.0', 'Tomodensitométrie de la tête');
INSERT INTO `radios` (`code_radio`, `designation`) VALUES ('M54.16', 'Imagerie par résonance magnétique de la colonne lombaire');
INSERT INTO `radios` (`code_radio`, `designation`) VALUES ('N83.29', 'Échographie du pelvis');
INSERT INTO `radios` (`code_radio`, `designation`) VALUES ('Z12.31', 'Mammographie');
INSERT INTO `radios` (`code_radio`, `designation`) VALUES ('C80.1', 'Tomographie par émission de positons (TEP)');
INSERT INTO `radios` (`code_radio`, `designation`) VALUES ('M85.8', 'Densitométrie osseuse');
INSERT INTO `radios` (`code_radio`, `designation`) VALUES ('C87.0', 'Fluoroscopie');
INSERT INTO `radios` (`code_radio`, `designation`) VALUES ('C19.9', 'Scintigraphie thyroïdienne en médecine nucléaire');
INSERT INTO `radios` (`code_radio`, `designation`) VALUES ('J98.4', 'Radiographie thoracique');
INSERT INTO `radios` (`code_radio`, `designation`) VALUES 
('K57.3', 'Radiographie de l''intestin grêle'),
('N25.1', 'Échographie rénale'),
('M89.9', 'Arthrographie'),
('Q81.0', 'Radiographie de la main'),
('E11.4', 'Échographie de la thyroïde'),
('H52.7', 'IRM cérébrale'),
('I25.8', 'Coronarographie'),
('G20.1', 'IRM de la moelle épinière'),
('P00.1', 'Radiographie néonatale'),
('L85.3', 'Tomographie rétinienne par cohérence optique'),
('Q20.5', 'Échocardiographie fœtale'),
('D63.0', 'Tomodensitométrie abdominale'),
('S06.1', 'Angiographie cérébrale'),
('C43.9', 'Radiographie des os longs'),
('N39.0', 'Cystographie'),
('J44.0', 'Tomographie par émission de photons uniques (SPECT)');

COMMIT;