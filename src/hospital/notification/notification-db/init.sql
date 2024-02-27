START TRANSACTION;

CREATE DATABASE forza;

USE forza;

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `notifiable_id` varchar(255) NOT NULL,
  `notifiable_type` varchar(10) NOT NULL,
  `notifiable_destination` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications`
(`id`, `type`, `notifiable_id`, `notifiable_type`, `notifiable_destination`, `data`) VALUES
('01b6ad80-e7cb-4a89-9513-f3e6dc4b700d', 'TWO_FACTOR_TOKEN', '100010364027390000', 'sms', '+213549297666', 'This is a sample notification'),
('da501d5e-51d3-4d79-bccb-419189ac922c', 'TWO_FACTOR_TOKEN', '111111111111111111', 'sms', '+213549297666', 'This too');