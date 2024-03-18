START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `NIN` varchar(255) NOT NULL PRIMARY KEY,
  `email` varchar(255) NOT NULL UNIQUE,
  `phoneNumber` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `email_verify_token` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `two_factor_enabled` TINYINT(1) DEFAULT 0,
  `two_factor_secret` text DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users`
(`NIN`, `email`, `phoneNumber`, `password`, `two_factor_secret`) VALUES
('100010364027390000', 'brahim.abderrazak1307@gmail.com', '+213549297666', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 'XFNHBGWMP6GATXOI4WZ7JMCX3QUDDIHN'),
('111111111111111111', 'nadilmarwa02@gmail.com', '+213799771062', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK');
