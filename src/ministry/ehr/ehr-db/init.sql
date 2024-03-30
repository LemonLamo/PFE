START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;


-- --------------------------------------------------------
--
-- Structure de la table `consultations`
--
CREATE TABLE `consultations` (
  `id` varchar(255) NOT NULL,
  `patient` varchar(20) NOT NULL,
  `medecin` varchar(20) NOT NULL,
  `hopital` varchar(255) NOT NULL,
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

INSERT INTO `consultations` (`id`, `patient`, `medecin`, `hopital`, `date_consultation`, `type_consultation`, `motif_consultation`, `symptomes`, `resume_consultation`, `diagnostique`, `diagnostique_details`) VALUES
('cons-15831', '100010364027390000', '111111111111111111', 'CHU Beni Messous', '2023-02-17', 'Evaluation de nouveau patient', 'Symptôme', 'Fièvre, Frissons, Toux sèche, Mal de gorge', "Le patient s'est présenté avec des symptômes typiques de la grippe, notamment de la fièvre, des frissons, une toux sèche, un mal de gorge, un nez qui coule ou congestionné, des courbatures, de la fatigue et des maux de tête. Il n'y a pas d'antécédents de voyage récent ou de contact avec des personnes malades. Le patient rapporte que les symptômes ont commencé il ya 5 semaines", 'H1N1 - Influenza A', '-'),
('cons-15831', '100010364027390000', '222222222222222222', 'CHU Beni Messous', '2024-03-17', 'Evaluation de nouveau patient', 'Symptôme', 'Fatigue, Maux de tête occasionnels, Légère fièvre', "Le patient s'est présenté avec des symptômes typiques de l'allergie saisonnière", 'A2N1 - Allergie saisonnière', '-');

-- --------------------------------------------------------
--
-- Structure de la table `hospitalisations`
--
CREATE TABLE `hospitalisations` (
  `id` varchar(255) NOT NULL,
  `patient` varchar(20) NOT NULL,
  `medecin` varchar(20) NOT NULL,
  `hopital` varchar(255) NOT NULL,
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

INSERT INTO `hospitalisations` (`id`, `patient`, `medecin`, `hopital`, `date_entree`, `mode_entree`, `motif_hospitalisation`, `chambre`, `lit`, `date_sortie`, `mode_sortie`, `resume_hospitalisation`) VALUES
('hos-25831', '100010364027390000', '100010364027390000', 'CHU Beni Messous', '2023-02-18', 'Hospitalisation complète', 'Soupçon de COVID-19', "F1", 1, NULL, NULL, "Le patient s'est présenté avec une fièvre extra-ordinaire, un mal de gorge, un nez qui coule.");


-- --------------------------------------------------------
--
-- Structure de la table `interventions`
--
CREATE TABLE `interventions` (
  `id` varchar(255) NOT NULL,
  `code_intervention` varchar(255) NOT NULL,
  `patient` varchar(20) NOT NULL,
  `medecin` varchar(20) NOT NULL,
  `hopital` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `protocole_operatoire` TEXT,
  `remarques` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `interventions` (`id`, `code_intervention`, `patient`, `medecin`, `hopital`, `date`, `remarques`, `protocole_operatoire`) VALUES
('interv-25831', '03120Z0', '100010364027390000', '111111111111111111', 'CHU Beni Messous', '2023-02-18', '-', 'Idk');

-- --------------------------------------------------------
--
-- Structure de la table `examens_cliniques`
--
CREATE TABLE `examens_cliniques` (
  `id` varchar(255) NOT NULL,
  `code_examen_clinique` varchar(255) NOT NULL,
  `resultat` varchar(255) NOT NULL,
  `remarques` varchar(255),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `examens_cliniques` (`id`, `code_examen_clinique`, `resultat`) VALUES
('exam-23541', 'S10.9', 'resultat');

-- --------------------------------------------------------
--
-- Structure de la table `prescriptions`
--
CREATE TABLE `prescriptions` (
  `id` varchar(255) NOT NULL,
  `code_medicament` varchar(255) NOT NULL,
  `posologie` INT(20) NOT NULL,
  `frequence` float(20) NOT NULL,
  `duree` INT(20) NOT NULL,
  `remarques` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `prescriptions` (`id`, `code_medicament`, `posologie`, `frequence`, `duree`, `remarques`) VALUES
('ordd-25831', '01 A 003', 23 , 2, 7, 'Idk');

-- --------------------------------------------------------
--
-- Structure de la table `radios`
--
CREATE TABLE `radios` (
  `id` varchar(255) NOT NULL,
  `patient` varchar(20) NOT NULL,
  `code_radio` varchar(255) NOT NULL,
  `remarques` varchar(255),
  `date` date NOT NULL,
  `date_fait` date,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `radios` (`id`, `patient`, `code_radio`, `remarques`, `date`) VALUES
('radio-25831', '100010364027390000', 'S10.9', 'Idk', '2024-02-27');
-- --------------------------------------------------------
--
-- Structure de la table `bilans`
--
CREATE TABLE `bilans` (
  `id` varchar(255) NOT NULL,
  `patient` varchar(20) NOT NULL,
  `code_bilan` varchar(255) NOT NULL,
  `remarques` varchar(255),
  `date` date NOT NULL,
  `date_fait` date,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `bilans` (`id`, `patient`, `code_bilan`, `remarques`, `date`) VALUES
('bilan-25831', '100010364027390000', 'S10.9', 'Idk', '2024-03-30');

-- --------------------------------------------------------
--
-- Structure de la table `Soins`
--

CREATE TABLE `soins` (
  `id` varchar(20) NOT NULL PRIMARY KEY,
  `patient` varchar(20) NOT NULL,
  `medecin` varchar(20) NOT NULL,
  `infirmier` varchar(20) NOT NULL,
  `hospitalisation` varchar(20),
  `hopital` varchar(255) NOT NULL,
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

INSERT INTO `soins` (`id`, `patient`, `medecin`, `infirmier`, `hospitalisation`, `hopital`, `acte`, `date_soin`, `details`) VALUES
('soin-15830', '100010364027390000', '100010364027390000', '111111111111111111', 'hos-25831','CHU Beni Messous' ,'Injection', '2023-02-17', 'XXXXX-details-XXXXX' ),
('soin-15831', '111111111111111111', '100010364027390000', '111111111111111111', NULL,'CHU Mustapha Bacha' ,'Injection', '2023-02-17', 'XXXXX-details-XXXXX' );