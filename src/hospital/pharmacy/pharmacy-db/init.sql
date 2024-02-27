START TRANSACTION;

CREATE DATABASE forza;

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `medicamenthopitals`
--

CREATE TABLE `medicaments` (
  `code` nvarchar(255) NOT NULL PRIMARY KEY,
  `nom` nvarchar(255) NOT NULL,
  `quantity` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `medicaments`
--

INSERT INTO `medicaments` (`nom`, `code`, `quantity`) VALUES
('Paracétamol', 'N02BE01', 102),
('Amoxicilline', 'J01CA04', 211),
('Omeprazole', 'A02BC01', 15),
('Diclofénac', 'M01AB05', 0),
('Furosémide', 'C03CA01', 9),
('Métronidazole', 'P01AB01', 19),
('Céfotaxime', 'J01DD01', 345),
('Diazépam', 'N05BA01', 567),
('Ranitidine', 'A02BA02', 189),
('Insuline humaine', 'A10AB01', 0),
('Héparine', 'B01AB01', 56),
('Ciprofloxacine', 'J01MA02', 1863),
('Morphine', 'N02AA01', 345),
('Lévofloxacine', 'J01MA12', 457),
('Méthylprednisolone', 'H02AB04', 78),
('Rabeprazole', 'A02BC04', 745),
('Propofol', 'N01AX10', 123),
('Tramadol', 'N02AX02', 167),
('Adrénaline', 'C01CA24', 169),
('Midazolam', 'N05CD08', 170);