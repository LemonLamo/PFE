START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `prescriptions`
--
CREATE TABLE `prescriptions` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `reference` VARCHAR(255) NOT NULL,
  `code_medicament` VARCHAR(255) NOT NULL,
  `posologie` VARCHAR(255) NOT NULL,
  `frequence` VARCHAR(255) NOT NULL,
  `duree` VARCHAR(255) NOT NULL,
  `remarques` TEXT,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX prescriptions_reference_IND ON `prescriptions` (`reference`);

-- --------------------------------------------------------
--
-- Structure de la table `radios`
--
CREATE TABLE `radios` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `reference` VARCHAR(255) NOT NULL,
  `code_radio` VARCHAR(255) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `remarques` VARCHAR(255),
  `observations` VARCHAR(255),
  `medecin` VARCHAR(20) NOT NULL,
  `hopital` VARCHAR(255) NOT NULL,
  `service` VARCHAR(255) NOT NULL,
  `externe` TINYINT DEFAULT 0,
  `date_fait` TIMESTAMP,
  `fait_par` VARCHAR(20),
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX radios_reference_IND ON `radios` (`reference`);
CREATE INDEX radios_hopital_IND ON `radios` (`hopital`);

CREATE TABLE `radios_files` (
  `id` VARCHAR(255) NOT NULL,
  `file` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Structure de la table `bilans`
--
CREATE TABLE `bilans` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `reference` VARCHAR(255) NOT NULL,
  `code_bilan` VARCHAR(255) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `remarques` VARCHAR(255),
  `observations` VARCHAR(255),
  `medecin` VARCHAR(20) NOT NULL,
  `hopital` VARCHAR(255) NOT NULL,
  `service` VARCHAR(255) NOT NULL,
  `externe` TINYINT DEFAULT 0,
  `date_fait` TIMESTAMP,
  `fait_par` VARCHAR(20),
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX bilans_reference_IND ON `bilans` (`reference`);
CREATE INDEX bilans_hopital_IND ON `bilans` (`hopital`);

CREATE TABLE `bilans_files` (
  `id` VARCHAR(255) NOT NULL,
  `file` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;