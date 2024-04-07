START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `Soins`
--

CREATE TABLE `hopitaux` (
  `hopital` VARCHAR(255) PRIMARY KEY NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `soin`
--

INSERT INTO `hopitaux` (`hopital`) VALUES
('CHU Beni Messous'),
('CHU Mustapha');


CREATE TABLE `services` (
  `hopital` VARCHAR(255) NOT NULL,
  `service` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `soin`
--

INSERT INTO `services` (`hopital`, `service`) VALUES
('CHU Beni Messous', 'Radiologie'),
('CHU Beni Messous', 'Cardiologie'),
('CHU Beni Messous', 'Pneumologie'),
('CHU Beni Messous', 'Pédiatrie'),
('CHU Mustapha', 'Chirugie Générale'),
('CHU Mustapha', 'Pneumologie'),
('CHU Mustapha', 'Pédiatrie');