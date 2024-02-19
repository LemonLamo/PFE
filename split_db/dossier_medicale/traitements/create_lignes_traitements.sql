-- --------------------------------------------------------
--
-- Structure de la table `lignes_traitements`
--

CREATE TABLE `lignes_traitements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `posologie` varchar(255) DEFAULT NULL,
  `heure` text DEFAULT NULL,
  `Dispensation` varchar(255) DEFAULT NULL,
  `soin_id` bigint(20) UNSIGNED NOT NULL,
  `medicamenthopital_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `lignes_traitements`
--

INSERT INTO `lignes_traitements` (`id`, `posologie`, `heure`, `Dispensation`, `soin_id`, `medicamenthopital_id`, `created_at`, `updated_at`) VALUES
(10, '100MG', '12:30', NULL, 27, 14, '2023-06-25 05:59:15', '2023-06-25 05:59:15'),
(11, '10mg', '17H', 'À prendre par injection', 30, 5, '2023-06-25 21:16:43', '2023-06-25 21:16:43'),
(12, '100mg', '10H', 'À prendre par voie orale', 28, 2, '2023-06-25 21:18:40', '2023-06-25 21:18:40'),
(13, '10 mg toutes les 4 heures', ' 8h, 12h, 16h...', 'injection sous surveillance médicale', 29, 13, '2023-06-25 21:20:50', '2023-06-25 21:20:50'),
(14, '10MG', '12H', 'BUVABLE', 31, 8, '2023-06-26 06:05:39', '2023-06-26 06:05:39'),
(15, '10', '18H', 'buvable', 30, 5, '2023-06-26 09:36:06', '2023-06-26 09:36:06');