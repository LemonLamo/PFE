START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `chambres`
--

CREATE TABLE `chambres` (
  `num` nvarchar(255) NOT NULL PRIMARY KEY,
  `etage` nvarchar(255) NOT NULL,
  `description` nvarchar(255),
  `nombre_lits` int(11) NOT NULL,
  `nombre_lits_occupe` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `chambres`
--

INSERT INTO `chambres` (`num`, `etage`, `description`, `nombre_lits`, `nombre_lits_occupe`) VALUES
('F1', 0, 'Chambre pour les nouveau-nées', 4, 1),
('F2', 1, 'Chambre pour les 1-3ans', 2, 2);


-- --------------------------------------------------------
--
-- Structure de la table `lits`
--
CREATE TABLE `lits` (
  `num` nvarchar(255) NOT NULL,
  `numChambre` nvarchar(255) NOT NULL REFERENCES `chambres`.`num`,
  `type` nvarchar(255) NOT NULL,
  `remarques` nvarchar(255),
  `occupe` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `lits`
--
INSERT INTO `lits` (`numChambre`, `num`, `type`, `occupe`, `remarques`) VALUES
('F1', 1, 'Type A', 1, 'Chambre pour les nouveau-nées'),
('F1', 2, 'Type A', 0, 'Chambre pour les 1-3ans'),
('F1', 3, 'Type B', 0, 'Chambre pour les 1-3ans'),
('F1', 4, 'Type A', 0, 'Chambre pour les 1-3ans'),
('F2', 1, 'Type A', 1, 'Chambre pour les 1-3ans'),
('F2', 2, 'Type A', 1, 'Chambre pour les 1-3ans');