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
