START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `medicaments`
--

CREATE TABLE `medicaments` (
  `code` nvarchar(255) NOT NULL PRIMARY KEY,
  `nom` nvarchar(255) NOT NULL,
  `quantite` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `medicaments`
--

INSERT INTO `medicaments` (`nom`, `code`, `quantite`) VALUES
('Paracétamol', 'N02BE01', 102),
('Amoxicilline', 'J01CA04', 211),
('Ranitidine', 'A02BA02', 15),
('Omeprazole', 'A02BC01', 15),
('Diclofénac', 'M01AB05', 0),
('Furosémide', 'C03CA01', 9),
('Métronidazole', 'P01AB01', 19);


-- --------------------------------------------------------
--
-- Structure de la table `transactions`
--

CREATE TABLE `transactions` (
  `code` nvarchar(255),
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `avant` int(11),
  `difference` int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `transactions` (`code`, `avant`, `difference`) VALUES
('A02BA02', 20, -5)
