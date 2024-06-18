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
  `service` VARCHAR(255) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `motif` VARCHAR(255) NOT NULL,
  `symptomes` VARCHAR(255) NOT NULL,
  `resume` TEXT DEFAULT NULL,
  `diagnostique` VARCHAR(255) NOT NULL,
  `diagnostique_details` VARCHAR(255) DEFAULT NULL,
  `duree_arret_de_travail` int(11) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---INSERT INTO `consultations` (`id`, `patient`, `medecin`, `hopital`, `service`, `date`, `type`, `motif`, `symptomes`, `resume`, `diagnostique`, `diagnostique_details`, `duree_arret_de_travail`) VALUES
---('cons-XNDHDBZ', '100010364027390000', '100010364027390000', 'CHU Mustapha', 'Chirurgie Générale', '2023-02-17', 'Evaluation de nouveau patient', 'Symptôme', 'Fièvre, Frissons, Toux sèche, Mal de gorge', "Le patient s'est présenté avec des symptômes typiques de la grippe, notamment de la fièvre, des frissons, une toux sèche, un mal de gorge, un nez qui coule ou congestionné, des courbatures, de la fatigue et des maux de tête. Il n'y a pas d'antécédents de voyage récent ou de contact avec des personnes malades. Le patient rapporte que les symptômes ont commencé il ya 5 semaines", 'H1N1 - Influenza A', '-', 15),
---('cons-QULJ7WZ', '100010364027390000', '100010364027390000', 'CHU Mustapha', 'Radiologie', '2024-03-17', 'Evaluation de nouveau patient', 'Symptôme', 'Fatigue, Maux de tête occasionnels, Légère fièvre', "Le patient s'est présenté avec des symptômes typiques de l'allergie saisonnière", 'A2N1 - Allergie saisonnière', '-', NULL);

CREATE TABLE `examens_cliniques` (
  `id` VARCHAR(255) NOT NULL,
  `patient` VARCHAR(20) NOT NULL,
  `reference` VARCHAR(255) NOT NULL,
  `code_examen_clinique` VARCHAR(20) NOT NULL,
  `resultat` VARCHAR(255) NOT NULL,
  `remarques` VARCHAR(255),
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;