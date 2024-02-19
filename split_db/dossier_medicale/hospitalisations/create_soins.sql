-- --------------------------------------------------------
--
-- Structure de la table `soins`
--

CREATE TABLE `soins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `acte` varchar(255) NOT NULL,
  `coefficient` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `compte_rendu` varchar(255) DEFAULT NULL,
  `hospitalisation_id` bigint(20) UNSIGNED NOT NULL,
  `infirmier_id` bigint(20) UNSIGNED DEFAULT NULL,
  `service_prestataire` varchar(255) DEFAULT NULL,
  `etat_dexecution` varchar(255) DEFAULT NULL,
  `date_dexecution` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `soins`
--

INSERT INTO `soins` (`id`, `acte`, `coefficient`, `date`, `compte_rendu`, `hospitalisation_id`, `infirmier_id`, `service_prestataire`, `etat_dexecution`, `date_dexecution`, `created_at`, `updated_at`) VALUES
(25, 'injection', '100mg', '2023-06-25 06:47:55', NULL, 136, NULL, 'La chirurgie.', 'executé', NULL, '2023-06-25 05:48:34', '2023-06-25 06:08:58'),
(27, 'injection', '100MG', '2023-06-25 06:57:55', NULL, 136, NULL, 'local', 'executé', NULL, '2023-06-25 05:58:24', '2023-06-25 08:55:02'),
(28, 'Attribution d\'un traitement', '2', '2023-06-25 22:04:09', 'RAS', 145, NULL, 'local', 'executé', NULL, '2023-06-25 21:06:41', '2023-06-25 22:03:23'),
(29, 'INJECTION', '100mg', '2023-06-25 22:06:49', NULL, 145, NULL, 'anesthesiologie.', 'demandé', NULL, '2023-06-25 21:07:14', '2023-06-25 21:07:14'),
(30, 'injection traitement', '1', '2023-06-25 22:14:22', NULL, 145, NULL, 'La chirurgie orale.', 'demandé', NULL, '2023-06-25 21:15:00', '2023-06-25 21:15:00'),
(31, 'Test', '1', '2023-06-26 07:04:30', '', 145, NULL, 'local', 'executé', NULL, '2023-06-26 06:05:09', '2023-06-26 06:08:30');
