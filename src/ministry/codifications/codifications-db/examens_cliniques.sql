START TRANSACTION;

CREATE DATABASE IF NOT EXISTS forza;
SET CHARACTER SET 'utf8';

USE forza;

CREATE TABLE `examens_cliniques` (
  `code_examen_clinique` varchar(255) NOT NULL PRIMARY KEY,
  `designation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `examens_cliniques` (`code_examen_clinique`, `designation`) VALUES 
('EC01', 'Fréquence cardiaque'),
('EC02', 'Température corporelle'),
('EC03', 'Pression artérielle'),
('EC04', 'Examen de la respiration'),
('EC05', 'Auscultation cardiaque'),
('EC06', 'Auscultation pulmonaire'),
('EC07', 'Palpation abdominale'),
('EC08', 'Évaluation des réflexes tendineux'),
('EC09', 'Inspection de la peau'),
('EC10', 'Examen neurologique'),
('EC11', 'Examen des yeux'),
('EC12', 'Examen des oreilles'),
('EC13', 'Examen de la gorge'),
('EC14', 'Examen buccal'),
('EC15', 'Palpation des ganglions lymphatiques'),
('EC16', 'Examen de la thyroïde'),
('EC17', 'Examen musculosquelettique'),
('EC18', 'Examen de l’équilibre et de la coordination'),
('EC19', 'Évaluation de la douleur'),
('EC20', 'Test de marche'),
('EC21', 'Examen de la sensibilité cutanée'),
('EC22', 'Évaluation de la force musculaire'),
('EC23', 'Examen de l’abdomen'),
('EC24', 'Palpation des pouls périphériques'),
('EC25', 'Évaluation de l''état de conscience'),
('EC26', 'Test de vision'),
('EC27', 'Test auditif'),
('EC28', 'Examen de la cavité buccale'),
('EC29', 'Examen des amygdales'),
('EC30', 'Examen de la nuque'),
('EC31', 'Examen des artères carotides'),
('EC32', 'Palpation des seins'),
('EC33', 'Examen pelvien'),
('EC34', 'Examen rectal'),
('EC35', 'Mesure de la saturation en oxygène'),
('EC36', 'Examen de la posture'),
('EC37', 'Examen de la démarche'),
('EC38', 'Test de Romberg'),
('EC39', 'Examen des articulations'),
('EC40', 'Examen des extrémités'),
('EC41', 'Test de sensibilité vibratoire'),
('EC42', 'Test de sensibilité à la pression'),
('EC43', 'Examen des cheveux et du cuir chevelu'),
('EC44', 'Examen des ongles'),
('EC45', 'Examen de l’abdomen pour les bruits intestinaux'),
('EC46', 'Examen du périnée'),
('EC47', 'Évaluation des capacités fonctionnelles'),
('EC48', 'Test de réaction pupillaire'),
('EC49', 'Test de réflexe cornéen'),
('EC50', 'Examen de la mobilité articulaire'),
('EC51', 'Examen du torse'),
('EC52', 'Palpation de l’aorte abdominale'),
('EC53', 'Examen du fond de l’œil'),
('EC54', 'Examen de la pression intra-oculaire'),
('EC55', 'Évaluation de la fonction pulmonaire avec spirométrie'),
('EC56', 'Test de l’équilibre statique et dynamique'),
('EC57', 'Examen de la langue et de la bouche'),
('EC58', 'Test de l’odorat'),
('EC59', 'Test de la coordination motrice'),
('EC60', 'Examen des organes génitaux');
COMMIT;