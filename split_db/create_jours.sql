-- --------------------------------------------------------
--
-- Structure de la table `jours`
--

CREATE TABLE `jours` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `jour` varchar(255) NOT NULL,
  `quart` varchar(255) NOT NULL,
  `assignation_infirmier_id` bigint(20) UNSIGNED DEFAULT NULL,
  `assignation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;