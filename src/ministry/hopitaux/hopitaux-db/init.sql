START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `Soins`
--

CREATE TABLE `hopitaux` (
  `nom_hopital` VARCHAR(255) PRIMARY KEY NOT NULL,
  `ville` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `telephone` VARCHAR(10) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `soin`
--

INSERT INTO `hopitaux` (`nom_hopital`, `ville`, `email`, `telephone`) VALUES
('CHU Mustapha', 'Alger', 'brahim@chu.beni_messous.dz', '023193700'),
('CHU Mustapha', 'Alger', 'nadil@chu.mustapha.dz', '024183601');


CREATE TABLE `services` (
  `nom_hopital` VARCHAR(255) NOT NULL,
  `service` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `soin`
--

INSERT INTO `services` (`nom_hopital`, `service`) VALUES
('CHU Mustapha', 'Radiologie'),
('CHU Mustapha', 'Chirugie Générale'),
('CHU Mustapha', 'Pneumologie'),
('CHU Mustapha', 'Pédiatrie'),
('CHU Beni Messous', 'Chirugie Générale'),
('CHU Beni Messous', 'Pneumologie'),
('CHU Beni Messous', 'Pédiatrie');