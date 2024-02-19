-- --------------------------------------------------------
--
-- Structure de la table `transferts`
--

CREATE TABLE `transferts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nin_patient` bigint(20) UNSIGNED NOT NULL,
  `hopital_de_destination` varchar(255) NOT NULL,
  `date_de_transfert` date NOT NULL,
  `cause_de_transfert` varchar(255) NOT NULL,
  `commentaire` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `transferts`
--

INSERT INTO `transferts` (`id`, `nin_patient`, `hopital_de_destination`, `date_de_transfert`, `cause_de_transfert`, `commentaire`, `created_at`, `updated_at`) VALUES
(11, 139, 'CHU tizi ouzou', '2023-06-30', 'Manque de capacité', 'raq', '2023-06-25 07:12:57', '2023-06-25 07:12:57'),
(12, 136, 'ffff', '2023-06-25', 'Choix du patient', 'ddd', '2023-06-25 09:08:57', '2023-06-25 09:08:57'),
(13, 146, 'CHU TIZI', '2023-06-26', 'Choix du patient', 'ras', '2023-06-26 06:23:44', '2023-06-26 06:23:44'),
(14, 145, 'CHU TIZI', '2023-06-26', 'Manque de capacité', 'RAS', '2023-06-26 09:56:39', '2023-06-26 09:56:39');
