-- --------------------------------------------------------
--
-- Structure de la table `archivages`
--

CREATE TABLE `archivages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date_archivage` date NOT NULL,
  `cause_archivage` varchar(255) DEFAULT NULL,
  `rapport` varchar(255) DEFAULT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;