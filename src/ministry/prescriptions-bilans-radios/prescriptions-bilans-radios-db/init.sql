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

INSERT INTO `prescriptions` (`id`, `patient`, `reference`, `code_medicament`, `posologie`, `frequence`, `duree`, `remarques`) VALUES
('ordd-25831', '100010364027390000', 'cons-XNDHDBZ', '01 A 003', "1000mg", "3 fois / jr", "7 jrs", 'R.A.S');

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
  `date_fait` TIMESTAMP,
  `observations` VARCHAR(255),
  `medecin` VARCHAR(20) NOT NULL,
  `hopital` VARCHAR(255) NOT NULL,
  `service` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX radios_reference_IND ON `radios` (`reference`);
CREATE INDEX radios_hopital_IND ON `radios` (`hopital`);

INSERT INTO `radios` (`id`, `patient`, `reference`, `code_radio`, `remarques`, `date`, `date_fait`, `medecin`, `hopital`, `service`) VALUES
('radio-PZR37CU', '100010364027390000', 'cons-XNDHDBZ', 'R10.9', NULL, '2024-03-30', NULL, '100010364027390000', 'CHU Mustapha', 'Chirugie Générale'),
('radio-QULJ7WZ', '100010364027390000', 'cons-QULJ7WZ', 'R10.9', 'Idk', '2024-02-27', NULL, '100010364027390000', 'CHU Beni Messous', 'Cardiologie');

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
  `date_fait` TIMESTAMP,
  `observations` VARCHAR(255),
  `medecin` VARCHAR(20) NOT NULL,
  `hopital` VARCHAR(255) NOT NULL,
  `service` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX bilans_reference_IND ON `bilans` (`reference`);
CREATE INDEX bilans_hopital_IND ON `bilans` (`hopital`);

INSERT INTO `bilans` (`id`, `patient`, `reference`, `code_bilan`, `remarques`, `date`, `date_fait`, `medecin`, `hopital`, `service`) VALUES
('bilan-VZR37CX', '100010364027390000', 'cons-XNDHDBZ', 'B2', 'Idk', '2024-03-30', NULL, '100010364027390000', 'CHU Mustapha', 'Chirugie Générale'),
('bilan-PZR37CU', '100010364027390000', 'cons-XNDHDBZ', 'B1', 'Idk', '2024-03-30', NULL, '100010364027390000', 'CHU Beni Messous', 'Cardiologie');


CREATE TABLE `bilans_files` (
  `id` VARCHAR(255) NOT NULL,
  `file` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;