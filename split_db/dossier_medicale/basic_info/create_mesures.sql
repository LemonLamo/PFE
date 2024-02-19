-- --------------------------------------------------------

--
-- Structure de la table `mesures`
--

CREATE TABLE `mesures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `poids` smallint(6) DEFAULT NULL,
  `taille` smallint(6) DEFAULT NULL,
  `date_de_mise_a_jour` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `mesures`
--

INSERT INTO `mesures` (`id`, `patient_id`, `poids`, `taille`, `date_de_mise_a_jour`, `created_at`, `updated_at`) VALUES
(17, 218, 70, 160, '2023-06-25', '2023-06-25 00:25:29', '2023-06-25 00:25:29'),
(18, 218, 69, 160, '2023-06-25', '2023-06-25 00:25:49', '2023-06-25 00:25:49'),
(19, 220, 67, 180, '2023-06-25', '2023-06-25 20:41:38', '2023-06-25 20:41:38');