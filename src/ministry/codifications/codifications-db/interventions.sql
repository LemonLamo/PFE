START TRANSACTION;

CREATE DATABASE IF NOT EXISTS forza;
SET CHARACTER SET 'utf8';

USE forza;

CREATE TABLE `interventions` (
  `code_intervention` varchar(255) NOT NULL PRIMARY KEY,
  `designation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `interventions` (`code_intervention`, `designation`) VALUES
('03120Z0', 'Pontage de l''artère innominée à l''artère du bras droit'),
('03120Z1', 'Pontage de l''artère innominée à l''artère du bras gauche'),
('08N23ZZ', 'Libération de la chambre antérieure droite'),
('EAA.AD.AA', 'Biopsie de la glande pituitaire'),
('0U5B0ZZ', 'Réparation du rein droit, approche percutanée'),
('0UT90ZZ', 'Résection de la vessie, approche endoscopique'),
('0DTJ0ZZ', 'Excision de l''appendice, approche percutanée'),
('3E0F3GC', 'Introduction d''autre substance thérapeutique dans la veine périphérique, approche percutanée'),
('30233G0', 'Transfusion de globules rouges non autologues dans la veine périphérique'),
('0B110F4', 'Drainage du lobe inférieur gauche du bronchus avec dispositif de drainage, approche endoscopique percutanée'),
('0FT44ZZ', 'Résection du lobe droit du foie, approche endoscopique percutanée'),
('0HB63ZZ', 'Insertion d''un dispositif de perfusion dans le tissu sous-cutané et le fascia de la poitrine, approche percutanée'),
('0JH60WZ', 'Insertion d''un stimulateur cardiaque, chambre double dans le tissu sous-cutané et le fascia de la poitrine, approche percutanée'),
('30260N1', 'Transfusion de plaquettes autologues dans la veine périphérique'),
('0Y6J0ZZ', 'Résection de l''acétabulum droit, approche percutanée'),
('0V5H0ZZ', 'Destruction de la rate, approche percutanée'),
('0C5L0ZZ', 'Réparation de l''oreille moyenne gauche, approche percutanée'),
('0T5K0ZZ', 'Destruction du follicule ovarien gauche, approche percutanée'),
('3E1C7GC', 'Introduction d''autre antinéoplasique dans l''artère centrale, approche percutanée'),
('0C7H3ZZ', 'Dilatation de l''artère pulmonaire gauche, approche percutanée'),
('0W9J0ZZ', 'Drainage du bras supérieur droit, approche percutanée'),
('3E1M3GC', 'Introduction d''autre substance thérapeutique dans le canal rachidien, approche percutanée');
COMMIT;