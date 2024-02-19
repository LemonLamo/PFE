-- --------------------------------------------------------
--
-- Structure de la table `ordannaces`
--

CREATE TABLE `ordannaces` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `contenu` varchar(255) NOT NULL,
  `visite_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ordannaces`
--

INSERT INTO `ordannaces` (`id`, `contenu`, `visite_id`, `created_at`, `updated_at`) VALUES
(18, 'Grippe', 48, '2023-06-24 23:59:42', '2023-06-24 23:59:42'),
(19, 'Douleur ', 49, '2023-06-25 00:21:44', '2023-06-25 00:21:44'),
(20, 'test', 49, '2023-06-25 09:15:03', '2023-06-25 09:15:03'),
(21, 'Traitement des angines', 51, '2023-06-25 20:06:54', '2023-06-25 20:06:54'),
(22, 'douleur', 51, '2023-06-26 05:54:23', '2023-06-26 05:54:23');