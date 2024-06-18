START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;


-- --------------------------------------------------------
--
-- Structure de la table `rendezvous`
--

CREATE TABLE `rendezvous` (
  `id` VARCHAR(20) NOT NULL PRIMARY KEY,
  `patient` VARCHAR(20) NOT NULL,
  `medecin` VARCHAR(20) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `duree` INT(11) DEFAULT 60,
  `details` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Déchargement des données de la table `rendezvous`
--
