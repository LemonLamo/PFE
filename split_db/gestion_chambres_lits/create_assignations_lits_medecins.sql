USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `create_assignations_lits_medecins`
--

CREATE TABLE `create_assignations_lits_medecins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `chambre_id` bigint(20) UNSIGNED NOT NULL,
  `medecin_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `create_assignations_lits_medecins`
--

INSERT INTO `create_assignations_lits_medecins` (`id`, `date_debut`, `date_fin`, `chambre_id`, `medecin_id`, `created_at`, `updated_at`) VALUES
(15, '2023-06-25', '2024-06-25', 16, 159, '2023-06-25 01:06:45', '2023-06-25 01:06:45'),
(16, '2023-06-25', '2024-06-25', 17, 159, '2023-06-25 01:06:45', '2023-06-25 01:06:45'),
(17, '2023-06-25', '2024-06-25', 17, 159, '2023-06-25 01:06:45', '2023-06-25 01:06:45'),
(18, '2023-06-25', '2024-06-25', 18, 159, '2023-06-25 01:06:45', '2023-06-25 01:06:45'),
(19, '2023-06-25', '2024-06-25', 19, 159, '2023-06-25 01:06:45', '2023-06-25 01:06:45'),
(20, '2023-06-25', '2024-06-25', 20, 159, '2023-06-25 01:06:45', '2023-06-25 01:06:45'),
(21, '2023-06-25', '2024-06-25', 21, 159, '2023-06-25 01:06:45', '2023-06-25 01:06:45'),
(22, '2023-06-25', '2024-06-25', 22, 159, '2023-06-25 01:06:45', '2023-06-25 01:06:45'),
(23, '2023-06-25', '2024-06-25', 23, 159, '2023-06-25 01:06:45', '2023-06-25 01:06:45'),
(24, '2023-06-25', '2024-06-25', 24, 159, '2023-06-25 01:06:45', '2023-06-25 01:06:45'),
(25, '2023-06-25', '2025-06-25', 25, 161, '2023-06-25 01:10:49', '2023-06-25 01:10:49'),
(26, '2023-06-25', '2025-06-25', 26, 161, '2023-06-25 01:10:49', '2023-06-25 01:10:49'),
(35, '2023-06-25', '2025-06-25', 27, 161, '2023-06-25 01:10:49', '2023-06-25 01:10:49'),
(36, '2023-06-25', '2025-06-25', 29, 161, '2023-06-25 01:10:49', '2023-06-25 01:10:49'),
(37, '2023-06-25', '2025-06-25', 30, 161, '2023-06-25 01:10:49', '2023-06-25 01:10:49'),
(38, '2023-06-25', '2025-06-25', 31, 161, '2023-06-25 01:10:49', '2023-06-25 01:10:49'),
(39, '2023-06-25', '2025-06-25', 32, 161, '2023-06-25 01:10:49', '2023-06-25 01:10:49'),
(40, '2023-06-25', '2025-06-25', 33, 161, '2023-06-25 01:10:49', '2023-06-25 01:10:49'),
(41, '2023-06-25', '2025-06-25', 34, 161, '2023-06-25 01:10:49', '2023-06-25 01:10:49'),
(42, '2023-06-25', '2025-06-25', 35, 161, '2023-06-25 01:10:49', '2023-06-25 01:10:49');