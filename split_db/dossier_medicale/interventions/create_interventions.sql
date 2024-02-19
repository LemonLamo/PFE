-- --------------------------------------------------------
--
-- Structure de la table `interventions`
--

CREATE TABLE `interventions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Diagnostique` varchar(255) DEFAULT NULL,
  `Code` varchar(255) DEFAULT NULL,
  `CompteRendu` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `autre` varchar(255) DEFAULT NULL,
  `hospitalisation_id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `Durée` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `interventions`
--

INSERT INTO `interventions` (`id`, `Diagnostique`, `Code`, `CompteRendu`, `Type`, `Date`, `autre`, `hospitalisation_id`, `nom`, `Durée`, `created_at`, `updated_at`) VALUES
(25, 'RAS', 'Interv_1687675527', 'RAS', NULL, '2023-06-25 06:45:27', NULL, 136, 'Fracture au niveau de bras', '1h', '2023-06-25 05:46:44', '2023-06-25 05:46:44'),
(26, 'RAS', 'Interv_1687722164', 'RAS', 'chirurgie esthetitique', '2023-06-25 19:42:44', 'RAS', 145, 'Correction d\'une fracture', '1H', '2023-06-25 18:45:19', '2023-06-25 18:45:19'),
(27, 'test', 'Interv_1687762832', NULL, NULL, '2023-06-26 07:00:32', NULL, 146, 'interv', '1H', '2023-06-26 06:00:53', '2023-06-26 06:00:53');