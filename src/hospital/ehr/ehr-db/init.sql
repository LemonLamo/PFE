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
  `motif_hospitalisation` varchar(255) NOT NULL,
  `date_sortie` date DEFAULT NULL,
  `mode_sortie` varchar(255) DEFAULT NULL,
  `resume_hospitalisation` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `hospitalisations` (`code_hospitalisation`, `patient`, `medecin`, `nom_hopital`, `date_entree`, `mode_entree`, `motif_hospitalisation`, `date_sortie`, `mode_sortie`, `resume_hospitalisation`) VALUES
('hos-25831', '100010364027390000', '100010364027390000', 'CHU Beni Messous', '2023-02-18', 'Hospitalisation complète', 'Soupçon de COVID-19', NULL, NULL, "Le patient s'est présenté avec une fièvre extra-ordinaire, un mal de gorge, un nez qui coule.");


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