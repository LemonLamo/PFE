START TRANSACTION;

CREATE DATABASE IF NOT EXISTS forza;
SET CHARACTER SET 'utf8';

USE forza;

CREATE TABLE `handicaps` (
  `code_handicap` varchar(255) NOT NULL PRIMARY KEY,
  `designation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `handicaps` (`code_handicap`, `designation`) VALUES
('F70', 'Retard mental léger'),
('F71', 'Retard mental modéré'),
('F72', 'Retard mental sévère'),
('F73', 'Retard mental profond'),
('F78', 'Autres formes de retard mental'),
('F79', 'Retard mental, sans précision'),
('G00', 'Méningite bactérienne'),
('G01', 'Méningite en maladies bactériennes classées ailleurs'),
('G02', 'Méningite due à d’autres causes et non classée ailleurs'),
('G03', 'Méningite d’étiologie non précisée'),
('G04', 'Encéphalite, myélite et encéphalomyélite'),
('G05', 'Encéphalite, myélite et encéphalomyélite dans des maladies classées ailleurs'),
('G06', 'Abcès intracrânien et intraspinal et granulome'),
('G07', 'Affections inflammatoires du système nerveux central dans des maladies classées ailleurs'),
('G08', 'Phlébite et thrombophlébite intracrâniennes et intraspinales'),
('G09', 'Séquelles de maladies inflammatoires du système nerveux central'),
('G80', 'Infirmité motrice cérébrale'),
('G81', 'Hémiplégie'),
('G82', 'Paraplégie et tétraplégie'),
('F20', 'Schizophrénie paranoïde'),
('F21', 'Schizophrénie hébéphrénique'),
('F22', 'Troubles schizotypiques'),
('F23', 'Troubles psychotiques aigus et transitoires'),
('F24', 'Trouble délirant induit'),
('F25', 'Trouble schizo-affectif'),
('F28', 'Autres troubles psychotiques non organiques'),
('F29', 'Trouble psychotique non organique, sans précision');

COMMIT;