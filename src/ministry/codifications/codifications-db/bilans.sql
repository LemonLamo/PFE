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
('QA00', 'Examen général ou exploration de personnes ne se plaignant de rien ou pour lesquelles aucun diagnostic nest rapporté'),
('QA00.0', 'Examen médical général de ladulte'),
('QA00.1', 'Examen de santé de routine chez lenfant'),
('QA00.2', 'Examen de routine du nouveau-né'),
('QA00.3', 'Examen mental général'),
('QA00.4', 'Examen dun donneur potentiel dorgane ou de tissu'),
('QA00.5', 'Examen de comparaison ou de contrôle dans le cadre dun programme de recherche clinique'),
('QA00.6', 'Examen des yeux ou de la vision'),
('QA00.8', 'Examen dentaire'),
('QA00.9', 'Examen gynécologique'),
('QA00.A', 'Tests cutanés ou autres tests de sensibilisation'),
('QA00.B', 'Examen radiologique'),
('QA00.C', 'Examen de laboratoire'),
('QA00.D', 'Recours au service de santé pour la détermination du groupe sanguin'),
('QA00.E', 'Recours au service de santé pour examen de la réponse anticorps'),
('QA01', 'Examen ou recours au service de santé à des fins administratives'),
('QA01.0', 'Examen dadmission dans un établissement denseignement'),
('QA01.1', 'Examen dembauche'),
('QA01.2', 'Examen dadmission dans une institution'),
('QA01.3', 'Examen de recrutement dans les forces armées'),
('QA01.4', 'Examen pour permis de conduire'),
('QA01.5', 'Examen pour la pratique dun sport'),
('QA01.6', 'Examen à des fins dassurance'),
('QA01.7', 'Délivrance dun certificat médical'),
('QA01.8', 'Recours au service de santé pour services dadoption'),
('QA01.Y', 'Autres examen ou recours au service de santé à des fins administratives'),
('QA01.Z', 'Examen ou recours au service de santé à des fins administratives, sans précision'),
('QA02', 'Observation de suspicion de tuberculose, sans diagnostic retenu'),
('QA02.0', 'Observation de suspicion de tuberculose, sans diagnostic retenu'),
('QA02.1', 'Mise en observation pour suspicion de dengue, sans diagnostic retenu'),
('QA02.2', 'Mise en observation pour suspicion de tumeur maligne, sans diagnostic retenu'),
('QA02.3', 'Mise en observation pour suspicion de troubles mentaux ou comportementaux, sans diagnostic retenu'),
('QA02.4', 'Mise en observation pour suspicion de trouble du système nerveux, sans diagnostic retenu'),
('QA02.5', 'Mise en observation pour suspicion deffet toxique dune substance ingérée, sans diagnostic retenu'),
('QA02.6', 'Observation et évaluation du nouveau-né pour suspicion de maladie, sans diagnostic retenu'),
('QA02.7', 'Mise en observation pour suspicion didées suicidaires ou de tentative de suicide, sans diagnostic retenu'),
('QA02.8', 'Mise en observation pour suspicion dallergie ou dhypersensibilité, sans diagnostic retenu'),
('QA02.Y', 'Autres mise en observation ou examen médical pour suspicion de maladies ou daffections, sans diagnostic retenu');

COMMIT;