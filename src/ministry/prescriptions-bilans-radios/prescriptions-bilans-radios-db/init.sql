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
  `posologie` INT(20) NOT NULL,
  `frequence` float(20) NOT NULL,
  `duree` INT(20) NOT NULL,
  `remarques` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `prescriptions` (`id`, `patient`, `reference`, `code_medicament`, `posologie`, `frequence`, `duree`, `remarques`) VALUES
('ordd-25831', '100010364027390000', 'cons-XNDHDBZ', '01 A 003', 23 , 2, 7, 'Idk');

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
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `radios` (`id`, `patient`, `reference`, `code_radio`, `remarques`, `date`, `date_fait`) VALUES
('radio-PZR37CU', '100010364027390000', 'cons-XNDHDBZ', 'R10.9', NULL, '2024-03-30', '2024-04-03 08:00'),
('radio-QULJ7WZ', '100010364027390000', 'cons-QULJ7WZ', 'R10.9', 'Idk', '2024-02-27', NULL);

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
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `bilans` (`id`, `patient`, `reference`, `code_bilan`, `remarques`, `date`, `date_fait`) VALUES
('bilan-VZR37CX', '100010364027390000', 'cons-XNDHDBZ', 'B2', 'Idk', '2024-03-30', '2024-04-03 10:00'),
('bilan-PZR37CU', '100010364027390000', 'cons-XNDHDBZ', 'B1', 'Idk', '2024-03-30', NULL);
