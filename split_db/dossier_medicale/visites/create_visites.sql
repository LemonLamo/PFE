-- --------------------------------------------------------
--
-- Structure de la table `visites`
--

CREATE TABLE `visites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date_visite` datetime NOT NULL,
  `type_visite` varchar(255) NOT NULL,
  `motif_visite` varchar(255) NOT NULL,
  `Symptomes` varchar(255) DEFAULT NULL,
  `resume_visite` varchar(255) DEFAULT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `medecin_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `visites`
--

INSERT INTO `visites` (`id`, `date_visite`, `type_visite`, `motif_visite`, `Symptomes`, `resume_visite`, `patient_id`, `medecin_id`, `created_at`, `updated_at`) VALUES
(48, '2023-06-25 00:58:38', 'evaluation de nouveau patient', 'symptôme', 'Grippe', 'pas de signe grave', 218, 159, '2023-06-24 23:59:20', '2023-06-24 23:59:20'),
(49, '2023-06-25 01:02:32', 'suivi periodique non urgent', 'plainte', NULL, 'suivi général de diabéte et demande scanner et analyse', 218, 159, '2023-06-25 00:04:00', '2023-06-25 00:04:00'),
(50, '2023-06-25 07:39:33', 'viste de soins urgent', 'plainte', 'articulaires,\nmaux de tête', 'La patiente a consulté pour des symptômes de toux persistante et de fièvre depuis une semaine, accompagnés de maux de tête légers et de courbatures.', 214, 159, '2023-06-25 06:41:16', '2023-06-25 06:41:16'),
(51, '2023-06-25 21:01:33', 'evaluation de nouveau patient', 'plainte', 'les angines , fievre, vomissement', NULL, 220, 161, '2023-06-25 20:05:23', '2023-06-25 20:05:23'),
(52, '2023-06-26 06:53:16', 'suivi periodique non urgent', 'symptôme', 'fievre ', NULL, 220, 161, '2023-06-26 05:53:42', '2023-06-26 05:53:42');
