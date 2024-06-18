START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;


-- --------------------------------------------------------
--
-- Structure de la table `consultations`
--
CREATE TABLE `consultations` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `medecin` VARCHAR(20) NOT NULL,
  `hopital` VARCHAR(255) NOT NULL,
  `service` VARCHAR(255) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `motif` VARCHAR(255) NOT NULL,
  `symptomes` VARCHAR(255) NOT NULL,
  `resume` TEXT DEFAULT NULL,
  `diagnostique` VARCHAR(255) NOT NULL,
  `diagnostique_details` VARCHAR(255) DEFAULT NULL,
  `duree_arret_de_travail` int(11) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `examens_cliniques` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `reference` VARCHAR(255) NOT NULL,
  `code_examen_clinique` VARCHAR(20) NOT NULL,
  `resultat` VARCHAR(255) NOT NULL,
  `remarques` VARCHAR(255),
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;