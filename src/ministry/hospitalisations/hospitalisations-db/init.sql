START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `hospitalisations`
--
CREATE TABLE `hospitalisations` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `medecin` VARCHAR(20) NOT NULL,
  `hopital` VARCHAR(255) NOT NULL,
  `date_entree` TIMESTAMP NOT NULL,
  `mode_entree` VARCHAR(255) NOT NULL,
  `chambre` VARCHAR(255) NOT NULL,
  `lit` int(11) NOT NULL,
  `motif_hospitalisation` VARCHAR(255) NOT NULL,
  `date_sortie` TIMESTAMP DEFAULT NULL,
  `mode_sortie` VARCHAR(255) DEFAULT NULL,
  `resume_hospitalisation` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `hospitalisations` (`id`, `patient`, `medecin`, `hopital`, `date_entree`, `mode_entree`, `motif_hospitalisation`, `chambre`, `lit`, `date_sortie`, `mode_sortie`, `resume_hospitalisation`) VALUES
('hos-PZR37CU', '100010364027390000', '100010364027390000', 'CHU Beni Messous', '2023-02-18', 'Hospitalisation complète', 'Soupçon de COVID-19', "F1", 1, NULL, NULL, "Le patient s'est présenté avec une fièvre extra-ordinaire, un mal de gorge, un nez qui coule.");