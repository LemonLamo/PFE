START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `NIN` varchar(20) NOT NULL PRIMARY KEY,
  `password` varchar(255) DEFAULT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `role` varchar(255),
  `two_factor_enabled` TINYINT(1) DEFAULT 0,
  `two_factor_secret` text,
  `verify_token` varchar(255),
  `reset_token` varchar(255),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`NIN`, `password`, `is_active`, `role`, `two_factor_secret`) VALUES
('100010364027390000', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'medecin', 'XFNHBGWMP6GATXOI4WZ7JMCX3QUDDIHN'),
('000000000000000000', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'admin', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK'),
('111111111111111111', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'infirmier', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK'),
('222222222222222222', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'lab', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK'),
('333333333333333333', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'radio', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK'),
('444444444444444444', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'pharmacien', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK'),
('100010364027390001', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'medecin', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK'),
('555555555555555555', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'admin', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK'),
('666666666666666666', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'infirmier', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK'),
('777777777777777777', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'lab', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK'),
('888888888888888888', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'radio', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK'),
('999999999999999999', '$2a$12$nENMKlqxSSq58RwfRTHUyuYbVYDOMQLrXBKjm.JNp/PJT59u80iHW', 1, 'pharmacien', 'IHNWHUQXBCWTEYMN2ET4EC7Q7V22CAUK');

-- --------------------------------------------------------
--
-- Structure de la table `roles_permissions`
--
CREATE TABLE `roles_permissions` (
  `hopital` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `permission` varchar(255) NOT NULL,
  PRIMARY KEY (`hopital`, `role`, `permission`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

--- INSERT INTO `roles_permissions` (`hopital`, `role`, `permission`) VALUES
--- ('CHU Mustapha', 'admin', 'gestion_personnel'),
--- ('CHU Mustapha', 'admin', 'gestion_consultation'),
--- ('CHU Mustapha', 'admin', 'gestion_pharmacy'),
--- ('CHU Mustapha', 'infirmier', 'gestion_soins');

-- --------------------------------------------------------
-- Structure de la table `ehr_autorisations`
--

CREATE TABLE `ehr_autorisations` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `medecin` varchar(20) NOT NULL,
  `patient` varchar(20) NOT NULL,
  `hopital` varchar(20) NOT NULL,
  `motif` varchar(255) NOT NULL,
  `duree` INT(11) DEFAULT 60,
  `legit` INT(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expired_at` timestamp NULL DEFAULT NULL,
  `validated_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ehr_autorisations`
--
--- INSERT INTO `ehr_autorisations` (`hopital`, `medecin`, `patient`, `motif`) VALUES
--- ('CHU Mustapha', '100010364027390000', '100010364027390000', 'Hospitalisation');
