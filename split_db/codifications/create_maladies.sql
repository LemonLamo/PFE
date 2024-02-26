-- --------------------------------------------------------

--
-- Structure de la table `maladies`
--

CREATE TABLE `maladies` (
  `code` varchar(255) NOT NULL PRIMARY KEY,
  `maladie` varchar(255) NOT NULL,
  `code_complet` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `maladies`
--

INSERT INTO `maladies` (`version`, `code`, `maladie`, `code_complet`) VALUES
('A000', 'Choléra à Vibrio cholerae 01', ' biovar cholerae'),
('A001', 'Choléra à Vibrio cholerae 01', ' biovar El Tor'),
('A05', 'Autres intoxications bactériennes d\'origine alimentaire', 'non classées ailleurs'),
('A009', 'Choléra', ' sans précision'),
('A00', 'Choléra', 'CIM10 - A00 - Choléra'),
('A01', 'Fièvres typhoïde et paratyphoïde', 'CIM10 - A01 - Fièvres typhoïde et paratyphoïde'),
('A010', 'Fièvre typhoïde', 'CIM10 - A010 - Fièvre typhoïde'),
('A011', 'Paratyphoïde A', 'CIM10 - A011 - Paratyphoïde A'),
('A012', 'Paratyphoïde B', 'CIM10 - A012 - Paratyphoïde B'),
('A013', 'Paratyphoïde C', 'CIM10 - A013 - Paratyphoïde C'),
('A02', 'Autres salmonelloses', 'CIM10 - A02 - Autres salmonelloses'),
('A020', 'Entérite à Salmonella', 'CIM10 - A020 - Entérite à Salmonella'),
('A021', 'Sepsis à Salmonella', 'CIM10 - A021 - Sepsis à Salmonella'),
('A022', 'Infection localisée à Salmonella', 'CIM10 - A022 - Infection localisée à Salmonella'),
('A028', 'Autres infections précisées à Salmonella', 'CIM10 - A028 - Autres infections précisées à Salmonella'),
('A03', 'Shigellose', 'CIM10 - A03 - Shigellose'),
('A030', 'Shigellose à Shigella dysenteriae', 'CIM10 - A030 - Shigellose à Shigella dysenteriae'),
('A031', 'Shigellose à Shigella flexneri', 'CIM10 - A031 - Shigellose à Shigella flexneri'),
('A032', 'Shigellose à Shigella boydii', 'CIM10 - A032 - Shigellose à Shigella boydii'),
('A033', 'Shigellose à Shigella sonnei', 'CIM10 - A033 - Shigellose à Shigella sonnei'),
('A038', 'Autres shigelloses', 'CIM10 - A038 - Autres shigelloses'),
('A04', 'Autres infections intestinales bactériennes', 'CIM10 - A04 - Autres infections intestinales bactériennes'),
('A040', 'Infection entéropathogène à Escherichia coli', 'CIM10 - A040 - Infection entéropathogène à Escherichia coli'),
('A041', 'Infection entérotoxigène à Escherichia coli', 'CIM10 - A041 - Infection entérotoxigène à Escherichia coli'),
('A042', 'Infection entéro-invasive à Escherichia coli', 'CIM10 - A042 - Infection entéro-invasive à Escherichia coli'),
('A043', 'Infection entéro-hémorragique à Escherichia coli', 'CIM10 - A043 - Infection entéro-hémorragique à Escherichia coli'),
('A044', 'Autres infections intestinales à Escherichia coli', 'CIM10 - A044 - Autres infections intestinales à Escherichia coli'),
('A045', 'Entérite à Campylobacter', 'CIM10 - A045 - Entérite à Campylobacter'),
('A046', 'Entérite à Yersinia enterocolitica', 'CIM10 - A046 - Entérite à Yersinia enterocolitica'),
('A047', 'Entérocolite à Clostridium difficile', 'CIM10 - A047 - Entérocolite à Clostridium difficile'),
('A048', 'Autres infections intestinales bactériennes précisées', 'CIM10 - A048 - Autres infections intestinales bactériennes précisées'),
('A050', 'Intoxication alimentaire à staphylocoques', 'CIM10 - A050 - Intoxication alimentaire à staphylocoques'),
('A051', 'Botulisme', 'CIM10 - A051 - Botulisme'),
('A052', 'Intoxication alimentaire à Clostridium perfringens [Clostridium welchii]', 'CIM10 - A052 - Intoxication alimentaire à Clostridium perfringens [Clostridium welchii]'),
('A053', 'Intoxication alimentaire à Vibrio parahaemolyticus', 'CIM10 - A053 - Intoxication alimentaire à Vibrio parahaemolyticus'),
('A054', 'Intoxication alimentaire à Bacillus cereus', 'CIM10 - A054 - Intoxication alimentaire à Bacillus cereus'),
('A058', 'Autres intoxications bactériennes d\'origine alimentaire précisées', 'CIM10 - A058 - Autres intoxications bactériennes d\'origine alimentaire précisées'),
('A06', 'Amibiase', 'CIM10 - A06 - Amibiase'),
('A060', 'Dysenterie amibienne (aiguë)', 'CIM10 - A060 - Dysenterie amibienne (aiguë)'),
('A061', 'Amibiase intestinale chronique', 'CIM10 - A061 - Amibiase intestinale chronique'),
('A062', 'Colite amibienne non dysentérique', 'CIM10 - A062 - Colite amibienne non dysentérique'),
('A063', 'Amoebome (de l\'intestin)', 'CIM10 - A063 - Amoebome (de l\'intestin)'),
('A064', 'Abcès amibien du foie', 'CIM10 - A064 - Abcès amibien du foie'),
('A065', 'Abcès amibien du poumon (J99.8*)', 'CIM10 - A065 - Abcès amibien du poumon (J99.8*)'),
('A066', 'Abcès amibien du cerveau (G07*)', 'CIM10 - A066 - Abcès amibien du cerveau (G07*)');