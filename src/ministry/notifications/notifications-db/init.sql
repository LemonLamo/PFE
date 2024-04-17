START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` varchar(36) DEFAULT (uuid()),
  `notification_type` varchar(255) NOT NULL,
  `NIN` varchar(255) NOT NULL,
  `notified_type` varchar(255) NOT NULL,
  `delivery_method` varchar(255) NOT NULL,
  `email` varchar(255) NULL,
  `telephone` varchar(255) NULL,
  `summary` text NOT NULL,
  `data` text,
  `read_at` timestamp DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications`
(`id`, `notification_type`, `notified_type`, `NIN`, `delivery_method`, `email`, `telephone`, `summary`, `data`, `created_at`) VALUES
('01b6ad80-e7cb-4a89-9513-f3e6dc4b700d', 'EHR_ACCESS',  'medecin', '100010364027390000', 7, 'brahim.abderrazak1307@gmail.com', '+213549297666', 'You got given access to dossier of **BRAHIM Abderrazak**!', '{}', '2024/03/26 18:50'),
('01b6ad80-e7cb-4a89-9513-f3e6dc4b700x', 'BILAN_READY', 'patient', '100010364027390000', 5, 'brahim.abderrazak1307@gmail.com', '+213549297666', 'Votre bilan **bilan-PZR37CU** est maintenant prêt', '{}', '2024/03/26 19:53'),
('da501d5e-51d3-4d79-bccb-419189ac922c', 'RADIO_READY', 'patient', '111111111111111111', 3, 'nadilmarwa02@gmail.com', '+213794351581', 'Votre radio **radio-QULJ7WZ** est maintenant prêt', '{}', '2024/03/26 18:50');
