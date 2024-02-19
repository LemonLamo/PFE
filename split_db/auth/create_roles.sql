-- --------------------------------------------------------
--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'patient', 'web', '2023-05-16 11:45:44', '2023-06-16 16:02:41'),
(2, 'super-admin', 'web', '2023-05-16 11:46:01', '2023-05-16 11:46:01'),
(3, 'medecin', 'web', '2023-05-22 18:45:37', '2023-05-22 18:45:37'),
(5, 'infirmier', 'web', '2023-05-22 18:55:27', '2023-05-22 18:55:27'),
(6, 'agent', 'web', '2023-05-22 18:56:18', '2023-05-22 18:56:18'),
(7, 'admin', 'web', '2023-06-19 23:27:55', '2023-06-19 23:27:55');