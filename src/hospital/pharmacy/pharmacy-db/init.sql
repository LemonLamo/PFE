START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `medicaments`
--

CREATE TABLE `medicaments` (
  `code_medicament` nvarchar(255) NOT NULL PRIMARY KEY,
  `quantite` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `medicaments`
--

 
INSERT INTO `medicaments` (`code_medicament`, `quantite`) VALUES
('N02BE01', 102),
('C07AB02', 211),
('A02BC01', 0),
('A01AB03', 8);


-- --------------------------------------------------------
--
-- Structure de la table `transactions`
--

CREATE TABLE `transactions` (
  `code_medicament` nvarchar(255),
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `avant` int(11),
  `difference` int(11)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `transactions` (`code_medicament`, `avant`, `difference`) VALUES
('N02BE01', 20, -5)
