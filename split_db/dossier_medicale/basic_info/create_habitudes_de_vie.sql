-- --------------------------------------------------------
--
-- Structure de la table `habitude_de_vies`
--

CREATE TABLE `habitude_de_vies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `habitude` varchar(255) NOT NULL,
  `etat_habitude` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `date_de_debut` date DEFAULT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `habitude_de_vies`
--

INSERT INTO `habitude_de_vies` (`id`, `habitude`, `etat_habitude`, `description`, `date_de_debut`, `patient_id`, `created_at`, `updated_at`) VALUES
(13, 'alimentation', 'En cours', 'grignoter', '2023-06-25', 218, '2023-06-25 00:28:09', '2023-06-25 00:28:09'),
(14, 'stress', 'En cours', NULL, '2023-06-25', 220, '2023-06-25 20:55:18', '2023-06-25 20:55:18');