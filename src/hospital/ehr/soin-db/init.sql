START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `Soin`
--

CREATE TABLE `soin` (
  `code_soin` varchar(20) NOT NULL PRIMARY KEY,
  `patient` varchar(20) NOT NULL,
  `medecin` varchar(20) NOT NULL,
  `infirmier` varchar(20) NOT NULL,
  `hospitalisation` varchar(20) NOT NULL,
  `nom_hopital` varchar(255) NOT NULL,
  `acte` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `details` varchar(255) NOT NULL,
  `fait` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `soin`
--

INSERT INTO `soin` (`code_soin`, `patient`, `medecin`, `infirmier`, `hospitalisation`, `nom_hopital`, `acte`, `date`, `details`) 
VALUES
('soin-15831', '100010364027390000', '111111111111111111', '222222222222222222', '222222222222222222','CHU Mustapha Bacha' ,'operation', '2023-02-17', 'XXXXX-details-XXXXX' )

