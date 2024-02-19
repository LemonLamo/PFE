-- --------------------------------------------------------
--
-- Structure de la table `intervention_personnels`
--

CREATE TABLE `intervention_personnels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `intervention_id` bigint(20) UNSIGNED NOT NULL,
  `medecin_id` bigint(20) UNSIGNED NOT NULL,
  `infirmier_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `intervention_personnels`
--

INSERT INTO `intervention_personnels` (`id`, `intervention_id`, `medecin_id`, `infirmier_id`, `created_at`, `updated_at`) VALUES
(11, 25, 160, 39, '2023-06-25 05:47:20', '2023-06-25 05:47:20'),
(12, 25, 159, 39, '2023-06-25 05:47:38', '2023-06-25 05:47:38'),
(13, 26, 159, 39, '2023-06-25 21:03:59', '2023-06-25 21:03:59'),
(14, 27, 159, 40, '2023-06-26 06:01:08', '2023-06-26 06:01:08');