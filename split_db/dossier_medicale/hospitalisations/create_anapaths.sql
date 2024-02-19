USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `anapaths`
--

CREATE TABLE `anapaths` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Date` date NOT NULL,
  `compte_rendu` varchar(255) NOT NULL,
  `hospitalisation_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ana_paths`
--

INSERT INTO `anapaths` (`id`, `Date`, `compte_rendu`, `hospitalisation_id`, `created_at`, `updated_at`) VALUES
(13, '2023-06-25', 'RAS', 136, '2023-06-25 06:00:24', '2023-06-25 06:00:24'),
(14, '2023-06-25', 'RAS\n', 145, '2023-06-25 21:21:42', '2023-06-25 21:21:42');