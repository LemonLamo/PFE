USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `assignation_lit_patients`
--

CREATE TABLE `assignations_lits_patients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `de` date NOT NULL,
  `A` date DEFAULT NULL,
  `hospitalisation_id` bigint(20) UNSIGNED NOT NULL,
  `lit_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `assignation_lit_patients`
--

INSERT INTO `assignations_lits_patients` (`id`, `de`, `A`, `hospitalisation_id`, `lit_id`, `created_at`, `updated_at`) VALUES
(27, '2023-06-25', '2023-06-25', 136, 19, '2023-06-25 05:44:01', '2023-06-25 13:55:51'),
(28, '2023-06-25', NULL, 140, 25, '2023-06-25 07:04:07', '2023-06-25 07:04:07'),
(29, '2023-06-25', NULL, 139, 26, '2023-06-25 07:06:35', '2023-06-25 07:10:07'),
(30, '2023-06-25', NULL, 142, 32, '2023-06-25 07:47:49', '2023-06-25 07:47:49'),
(31, '2023-06-25', NULL, 143, 16, '2023-06-25 08:48:23', '2023-06-25 08:48:23'),
(32, '2023-06-25', '2023-06-26', 145, 27, '2023-06-25 17:15:28', '2023-06-26 10:01:34'),
(33, '2023-06-26', '2023-06-26', 146, 33, '2023-06-26 05:59:15', '2023-06-26 06:26:05'),
(34, '2023-06-26', NULL, 147, 29, '2023-06-26 09:28:38', '2023-06-26 09:28:38');