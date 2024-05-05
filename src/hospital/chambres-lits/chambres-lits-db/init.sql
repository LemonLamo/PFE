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
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(`service`, `num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `chambres`
--

INSERT INTO `chambres` (`service`, `num`, `etage`, `description`) VALUES
('Chirugie Générale', 'F1', 0, 'Chambre pour les nouveau-nées'),
('Chirugie Générale', 'F2', 1, 'Chambre pour les 1-3ans');


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
('Chirugie Générale', 'F1', 1, 'Type A', 1, 'Chambre pour les nouveau-nées'),
('Chirugie Générale', 'F1', 2, 'Type A', 0, 'Chambre pour les 1-3ans'),
('Chirugie Générale', 'F1', 3, 'Type B', 0, 'Chambre pour les 1-3ans'),
('Chirugie Générale', 'F1', 4, 'Type A', 0, 'Chambre pour les 1-3ans'),
('Chirugie Générale', 'F2', 1, 'Type A', 1, 'Chambre pour les 1-3ans'),
('Chirugie Générale', 'F2', 2, 'Type A', 1, 'Chambre pour les 1-3ans');