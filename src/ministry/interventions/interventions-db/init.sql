START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `interventions`
--
CREATE TABLE `interventions` (
  `id` VARCHAR(255) NOT NULL,
  `code_intervention` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `medecin` VARCHAR(20) NOT NULL,
  `hopital` VARCHAR(255) NOT NULL,
  `service` VARCHAR(255) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `protocole_operatoire` TEXT,
  `remarques` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `interventions` (`id`, `code_intervention`, `patient`, `medecin`, `hopital`, `service`, `date`, `remarques`, `protocole_operatoire`) VALUES
('interv-XNDHDBZ', '03120Z0', '100010364027390000', '100010364027390000', 'CHU Beni Messous', 'Cardiologie', '2024-02-18', '-', 'Idk');
