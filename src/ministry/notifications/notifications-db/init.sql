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
  `NIN` varchar(255) NOT NULL,
  `email` varchar(255) NULL,
  `telephone` varchar(255) NULL,
  `type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
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
(`id`, `type`, `NIN`, `email`, `telephone`, `title`, `summary`, `data`, `created_at`) VALUES
('01b6ad80-e7cb-4a89-9513-f3e6dc4b700d', 'EHR_ACCESS', '100010364027390000', 'brahim.abderrazak1307@gmail.com', '+213549297666', 'Accès granted', 'You got given access to dossier of **BRAHIM Abderrazak**!', '{}', '2024/03/26 18:50'),
('01b6ad80-e7cb-4a89-9513-f3e6dc4b700x', 'EHR_ACCESS', '100010364027390000', NULL, '+213549297666', 'Accès refusé', 'No you havent!', '{}', '2024/03/26 19:53'),
('da501d5e-51d3-4d79-bccb-419189ac922c', 'EHR_ACCESS', '111111111111111111', 'nadilmarwa02@gmail.com', NULL, 'Sample notification', 'Idk, example 3', '{}', '2024/03/26 18:50');
