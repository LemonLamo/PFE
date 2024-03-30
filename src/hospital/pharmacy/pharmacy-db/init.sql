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
  `DCI` nvarchar(255) NOT NULL,
  `quantite` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `medicaments`
--

 
INSERT INTO `medicaments` (`DCI`, `code_medicament`, `quantite`) VALUES
('CETIRIZINE DICHLORHYDRATE', '01 A 003', 102),
('DOXYLAMINE SUCCINATE', '01 A 008', 211),
('MEQUITAZINE', '01 A 009', 0),
('DEXCHLORPHENIRAMINE MALEATE', '01 A 007', 8);


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
('01 A 003', 20, -5)
