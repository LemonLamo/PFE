START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;


-- --------------------------------------------------------
--
-- Structure de la table `consultations`
--
CREATE TABLE `consultations` (
  `code_consultation` varchar(255) NOT NULL,
  `patient` varchar(20) NOT NULL,
  `medecin` varchar(20) NOT NULL,
  `nom_hopital` varchar(255) NOT NULL,
  `date_consultation` date NOT NULL,
  `type_consultation` varchar(255) NOT NULL,
  `motif_consultation` varchar(255) NOT NULL,
  `symptomes` varchar(255) NOT NULL,
  `resume_consultation` TEXT DEFAULT NULL,
  `diagnostique` varchar(255) NOT NULL,
  `diagnostique_details` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `consultations` (`code_consultation`, `patient`, `medecin`, `nom_hopital`, `date_consultation`, `type_consultation`, `motif_consultation`, `symptomes`, `resume_consultation`, `diagnostique`, `diagnostique_details`) VALUES
('cons-15831', '100010364027390000', '111111111111111111', 'CHU Beni Messous', '2023-02-17', 'Evaluation de nouveau patient', 'Symptôme', 'Fièvre, Frissons, Toux sèche, Mal de gorge', "Le patient s'est présenté avec des symptômes typiques de la grippe, notamment de la fièvre, des frissons, une toux sèche, un mal de gorge, un nez qui coule ou congestionné, des courbatures, de la fatigue et des maux de tête. Il n'y a pas d'antécédents de voyage récent ou de contact avec des personnes malades. Le patient rapporte que les symptômes ont commencé il ya 5 semaines", 'H1N1 - Influenza A', '-'),
('cons-15831', '100010364027390000', '222222222222222222', 'CHU Beni Messous', '2024-03-17', 'Evaluation de nouveau patient', 'Symptôme', 'Fatigue, Maux de tête occasionnels, Légère fièvre', "Le patient s'est présenté avec des symptômes typiques de l'allergie saisonnière", 'A2N1 - Allergie saisonnière', '-');

-- --------------------------------------------------------
--
-- Structure de la table `hospitalisations`
--
CREATE TABLE `hospitalisations` (
  `code_hospitalisation` varchar(255) NOT NULL,
  `patient` varchar(20) NOT NULL,
  `medecin` varchar(20) NOT NULL,
  `nom_hopital` varchar(255) NOT NULL,
  `date_entree` date NOT NULL,
  `mode_entree` varchar(255) NOT NULL,
  `chambre` varchar(255) NOT NULL,
  `lit` int(11) NOT NULL,
  `motif_hospitalisation` varchar(255) NOT NULL,
  `date_sortie` date DEFAULT NULL,
  `mode_sortie` varchar(255) DEFAULT NULL,
  `resume_hospitalisation` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `hospitalisations` (`code_hospitalisation`, `patient`, `medecin`, `nom_hopital`, `date_entree`, `mode_entree`, `motif_hospitalisation`, `chambre`, `lit`, `date_sortie`, `mode_sortie`, `resume_hospitalisation`) VALUES
('hos-25831', '100010364027390000', '100010364027390000', 'CHU Beni Messous', '2023-02-18', 'Hospitalisation complète', 'Soupçon de COVID-19', "F1", 1, NULL, NULL, "Le patient s'est présenté avec une fièvre extra-ordinaire, un mal de gorge, un nez qui coule.");


-- --------------------------------------------------------
--
-- Structure de la table `interventions`
--
CREATE TABLE `interventions` (
  `code_intervention` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `patient` varchar(20) NOT NULL,
  `medecin` varchar(20) NOT NULL,
  `nom_hopital` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `protocole_operatoire` varchar(1024) NOT NULL,
  `remarques` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `interventions` (`code_intervention`, `nom`, `patient`, `medecin`, `nom_hopital`, `date`, `remarques`, `protocole_operatoire`) VALUES
('interv-25831', 'Appendicectomie', '100010364027390000', '111111111111111111', 'CHU Beni Messous', '2023-02-18', '-', 'Idk');

-- --------------------------------------------------------
--
-- Structure de la table `examens_cliniques`
--
CREATE TABLE `examens_cliniques` (
  `code` varchar(255) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `resultat` varchar(255) NOT NULL,
  `remarques` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `examens_cliniques` (`code`, `nom`, `resultat`, `remarques`) VALUES
('interv-25831', 'Appendicectomie', 'resultat', 'Idk');

-- --------------------------------------------------------
--
-- Structure de la table `prescriptions`
--
CREATE TABLE `prescriptions` (
  `code` varchar(255) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `posologie` INT(20) NOT NULL,
  `frequence` float(20) NOT NULL,
  `duree` INT(20) NOT NULL,
  `remarques` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `prescriptions` (`code`, `nom`, `posologie`, `frequence`, `duree`, `remarques`) VALUES
('ordd-25831', 'Appendicectomie', 23 , 1.5, 7, 'Idk');

-- --------------------------------------------------------
--
-- Structure de la table `radios`
--
CREATE TABLE `radios` (
  `code` varchar(255) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `remarques` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `radios` (`code`, `nom`, `remarques`) VALUES
('radio-25831', 'Appendicectomie', 'Idk');
-- --------------------------------------------------------
--
-- Structure de la table `analyses`
--
CREATE TABLE `analyses` (
  `code` varchar(255) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `remarques` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `analyses` (`code`, `nom`, `remarques`) VALUES
('bilan-25831', 'Appendicectomie', 'Idk');

-- --------------------------------------------------------
--
-- Structure de la table `Soins`
--

CREATE TABLE `soins` (
  `code_soin` varchar(20) NOT NULL PRIMARY KEY,
  `patient` varchar(20) NOT NULL,
  `medecin` varchar(20) NOT NULL,
  `infirmier` varchar(20) NOT NULL,
  `hospitalisation` varchar(20),
  `nom_hopital` varchar(255) NOT NULL,
  `acte` varchar(255) NOT NULL,
  `date_soin` date NOT NULL,
  `details` varchar(255) NOT NULL,
  `fait` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `soin`
--

INSERT INTO `soins` (`code_soin`, `patient`, `medecin`, `infirmier`, `hospitalisation`, `nom_hopital`, `acte`, `date_soin`, `details`) VALUES
('soin-15831', '100010364027390000', '111111111111111111', '222222222222222222', '222222222222222222','CHU Mustapha Bacha' ,'operation', '2023-02-17', 'XXXXX-details-XXXXX' );