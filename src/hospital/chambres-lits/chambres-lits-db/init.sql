START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `chambres`
--

CREATE TABLE `chambres` (
  `service` nvarchar(255) NOT NULL,
  `num` nvarchar(255) NOT NULL,
  `etage` nvarchar(255) NOT NULL,
  `description` nvarchar(255),
  `nombre_lits` int(11) NOT NULL,
  `nombre_lits_occupe` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`service`, `num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `chambres`
--

INSERT INTO `chambres` (`service`, `num`, `etage`, `description`, `nombre_lits`, `nombre_lits_occupe`) VALUES
('Cardiologie', 'F1', 0, 'Chambre pour les nouveau-nées', 4, 1),
('Radiologie', 'F2', 1, 'Chambre pour les 1-3ans', 2, 2);


-- --------------------------------------------------------
--
-- Structure de la table `lits`
--
CREATE TABLE `lits` (
  `service` nvarchar(255) NOT NULL,
  `num` nvarchar(255) NOT NULL,
  `numChambre` nvarchar(255) NOT NULL REFERENCES `chambres`.`num`,
  `type` nvarchar(255) NOT NULL,
  `remarques` nvarchar(255),
  `occupe` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`service`, `num`, `numChambre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `lits`
--
INSERT INTO `lits` (`service`, `numChambre`, `num`, `type`, `occupe`, `remarques`) VALUES
('Cardiologie', 'F1', 1, 'Type A', 1, 'Chambre pour les nouveau-nées'),
('Cardiologie', 'F1', 2, 'Type A', 0, 'Chambre pour les 1-3ans'),
('Cardiologie', 'F1', 3, 'Type B', 0, 'Chambre pour les 1-3ans'),
('Cardiologie', 'F1', 4, 'Type A', 0, 'Chambre pour les 1-3ans'),
('Radiologie', 'F2', 1, 'Type A', 1, 'Chambre pour les 1-3ans'),
('Radiologie', 'F2', 2, 'Type A', 1, 'Chambre pour les 1-3ans');