START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `Soins`
--

CREATE TABLE `soins` (
  `id` VARCHAR(20) NOT NULL PRIMARY KEY,
  `patient` VARCHAR(20) NOT NULL,
  `medecin` VARCHAR(20) NOT NULL,
  `infirmier` VARCHAR(20) NOT NULL,
  `hospitalisation` VARCHAR(20),
  `hopital` VARCHAR(255) NOT NULL,
  `acte` VARCHAR(255) NOT NULL,
  `date_soin` TIMESTAMP NOT NULL,
  `details` VARCHAR(255),
  `fait` tinyint(1) DEFAULT 0,
  `date_fait` TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `soin`
--

INSERT INTO `soins` (`id`, `patient`, `medecin`, `infirmier`, `hospitalisation`, `hopital`, `acte`, `date_soin`, `details`) VALUES
('soin-PZR37CU', '100010364027390000', '100010364027390000', '111111111111111111', 'hos-PZR37CU','CHU Beni Messous' ,'Injection', '2023-02-17', '100mg de Pénneciline' ),
('soin-QULJ7WZ', '111111111111111111', '100010364027390000', '111111111111111111', NULL,'CHU Mustapha Bacha' ,'Injection', '2023-02-17', '5ml de Morphine' );