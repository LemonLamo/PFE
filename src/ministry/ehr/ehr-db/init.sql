START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;


-- --------------------------------------------------------
--
-- Structure de la table `consultations`
--
CREATE TABLE `consultations` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `medecin` VARCHAR(20) NOT NULL,
  `hopital` VARCHAR(255) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `motif` VARCHAR(255) NOT NULL,
  `symptomes` VARCHAR(255) NOT NULL,
  `resume` TEXT DEFAULT NULL,
  `diagnostique` VARCHAR(255) NOT NULL,
  `diagnostique_details` VARCHAR(255) DEFAULT NULL,
  `prochaine_consultation` TIMESTAMP NULL,
  `duree_arret_de_travail` int(11) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `consultations` (`id`, `patient`, `medecin`, `hopital`, `date`, `type`, `motif`, `symptomes`, `resume`, `diagnostique`, `diagnostique_details`) VALUES
('cons-XNDHDBZ', '100010364027390000', '100010364027390000', 'CHU Beni Messous', '2023-02-17', 'Evaluation de nouveau patient', 'Symptôme', 'Fièvre, Frissons, Toux sèche, Mal de gorge', "Le patient s'est présenté avec des symptômes typiques de la grippe, notamment de la fièvre, des frissons, une toux sèche, un mal de gorge, un nez qui coule ou congestionné, des courbatures, de la fatigue et des maux de tête. Il n'y a pas d'antécédents de voyage récent ou de contact avec des personnes malades. Le patient rapporte que les symptômes ont commencé il ya 5 semaines", 'H1N1 - Influenza A', '-'),
('cons-QULJ7WZ', '100010364027390000', '100010364027390000', 'CHU Beni Messous', '2024-03-17', 'Evaluation de nouveau patient', 'Symptôme', 'Fatigue, Maux de tête occasionnels, Légère fièvre', "Le patient s'est présenté avec des symptômes typiques de l'allergie saisonnière", 'A2N1 - Allergie saisonnière', '-');

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
  `date` TIMESTAMP NOT NULL,
  `protocole_operatoire` TEXT,
  `remarques` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `interventions` (`id`, `code_intervention`, `patient`, `medecin`, `hopital`, `date`, `remarques`, `protocole_operatoire`) VALUES
('interv-XNDHDBZ', '03120Z0', '100010364027390000', '100010364027390000', 'CHU Beni Messous', '2024-02-18', '-', 'Idk');

-- --------------------------------------------------------
--
-- Structure de la table `examens_cliniques`
--
CREATE TABLE `examens_cliniques` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `code_examen_clinique` VARCHAR(255) NOT NULL,
  `resultat` VARCHAR(255) NOT NULL,
  `remarques` VARCHAR(255),
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `examens_cliniques` (`id`, `patient`, `code_examen_clinique`, `resultat`) VALUES
('cons-15831', '100010364027390000', 'S10.9', 'resultat');

-- --------------------------------------------------------
--
-- Structure de la table `prescriptions`
--
CREATE TABLE `prescriptions` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `code_medicament` VARCHAR(255) NOT NULL,
  `posologie` INT(20) NOT NULL,
  `frequence` float(20) NOT NULL,
  `duree` INT(20) NOT NULL,
  `remarques` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `prescriptions` (`id`, `patient`, `code_medicament`, `posologie`, `frequence`, `duree`, `remarques`) VALUES
('ordd-25831', '100010364027390000', '01 A 003', 23 , 2, 7, 'Idk');

-- --------------------------------------------------------
--
-- Structure de la table `radios`
--
CREATE TABLE `radios` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `code_radio` VARCHAR(255) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `remarques` VARCHAR(255),
  `date_fait` TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `radios` (`id`, `patient`, `code_radio`, `remarques`, `date`) VALUES
('radio-QULJ7WZ', '100010364027390000', 'R10.9', 'Idk', '2024-02-27');
-- --------------------------------------------------------
--
-- Structure de la table `bilans`
--
CREATE TABLE `bilans` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `code_bilan` VARCHAR(255) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `remarques` VARCHAR(255),
  `date_fait` TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `bilans` (`id`, `patient`, `code_bilan`, `remarques`, `date`) VALUES
('bilan-PZR37CU', '100010364027390000', 'B1', 'Idk', '2024-03-30');

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
  `details` VARCHAR(255) NOT NULL,
  `fait` tinyint(1) DEFAULT 0,
  `date_fait` TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `soin`
--

INSERT INTO `soins` (`id`, `patient`, `medecin`, `infirmier`, `hospitalisation`, `hopital`, `acte`, `date_soin`, `details`) VALUES
('soin-PZR37CU', '100010364027390000', '100010364027390000', '111111111111111111', 'hos-25831','CHU Beni Messous' ,'Injection', '2023-02-17', 'XXXXX-details-XXXXX' ),
('soin-QULJ7WZ', '111111111111111111', '100010364027390000', '111111111111111111', NULL,'CHU Mustapha Bacha' ,'Injection', '2023-02-17', 'XXXXX-details-XXXXX' );