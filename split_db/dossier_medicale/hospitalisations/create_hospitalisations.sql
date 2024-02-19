-- --------------------------------------------------------
--
-- Structure de la table `hospitalisations`
--
CREATE TABLE `hospitalisations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `code_hospitalisation` varchar(255) DEFAULT NULL,
  `Date_entree` date NOT NULL,
  `Date_accepté` date DEFAULT NULL,
  `nom_hopital` varchar(255) DEFAULT NULL,
  `mode_entree` varchar(255) NOT NULL,
  `motif_hospitalisation` varchar(255) DEFAULT NULL,
  `date_sortie` date DEFAULT NULL,
  `mode_sortie` varchar(255) DEFAULT NULL,
  `resume_hospitalisation` varchar(255) DEFAULT NULL,
  `medecin_id` bigint(20) UNSIGNED NOT NULL,
  `etat_medical_general` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `hospitalisations`
--

INSERT INTO `hospitalisations` (`id`, `patient_id`, `code_hospitalisation`, `Date_entree`, `Date_accepté`, `nom_hopital`, `mode_entree`, `motif_hospitalisation`, `date_sortie`, `mode_sortie`, `resume_hospitalisation`, `medecin_id`, `etat_medical_general`, `created_at`, `updated_at`) VALUES
(136, 218, 'hos_1687675365', '2023-04-30', '2023-06-25', 'CHU MUSTAPHA', 'Hospitalisation complète', 'Chirurgie', '2023-06-25', 'transfert', NULL, 159, 'Indeterminée', '2023-06-25 05:43:03', '2023-06-25 09:07:38'),
(137, 217, 'hos_1687679534', '2023-04-12', NULL, 'CHU MUSTAPHA', 'Hospitalisation à temps partiel ', 'urgence', NULL, NULL, NULL, 159, 'Serieux', '2023-06-25 06:52:32', '2023-06-25 06:52:32'),
(138, 215, 'hos_1687679607', '2023-06-25', NULL, 'CHU MUSTAPHA', 'Hospitalisation complète', 'procédures de diagnostic', NULL, NULL, NULL, 159, 'Indeterminée', '2023-06-25 06:53:37', '2023-06-25 06:53:37'),
(139, 209, 'hos_1687679655', '2023-06-25', '2023-06-25', 'CHU MUSTAPHA', 'Hospitalisation complète', 'observation', '2023-06-25', 'transfert', NULL, 159, 'Indeterminée', '2023-06-25 06:54:31', '2023-06-25 07:11:49'),
(140, 211, 'hos_1687679756', '2023-05-09', '2023-06-25', 'CHU MUSTAPHA', 'Hospitalisation à temps partiel ', 'Chirurgie', '2023-06-25', 'auto-sortie ', NULL, 159, 'Indeterminée', '2023-06-25 06:56:11', '2023-06-25 07:15:05'),
(141, 211, 'hos_1687680953', '2023-06-25', '2023-06-25', 'CHU MUSTAPHA', 'Hospitalisation complète', 'Chirurgie', '2023-06-25', 'auto-sortie ', NULL, 159, 'Stable', '2023-06-25 07:16:23', '2023-06-25 07:16:23'),
(142, 211, 'hos_1687682705', '2023-06-25', '2023-06-25', 'CHU MUSTAPHA BACHA', 'Hôpital de Jour (HDJ) ou chirurgie ambulatoire', 'observation', NULL, NULL, NULL, 161, 'Indeterminée', '2023-06-25 07:45:19', '2023-06-25 07:47:49'),
(143, 214, 'hos_1687686323', '2023-06-25', '2023-06-25', 'CHU MUSTAPHA', 'Hospitalisation complète', 'urgence', NULL, NULL, NULL, 159, 'Bien', '2023-06-25 08:46:28', '2023-06-25 08:48:23'),
(145, 220, 'hos_1687716713', '2023-06-25', '2023-06-25', 'CHU MUSTAPHA', 'Hospitalisation complète', 'urgence', '2023-06-26', 'transfert', NULL, 161, 'Indeterminée', '2023-06-25 17:12:43', '2023-06-26 09:55:19'),
(146, 221, 'hos_1687762604', '2023-06-26', '2023-06-26', 'CHU MUSTAPHA BACHA', 'Hospitalisation complète', 'urgence', '2023-06-26', 'transfert', NULL, 161, 'Indeterminée', '2023-06-26 05:57:39', '2023-06-26 06:22:37'),
(147, 221, 'hos_1687774671', '2023-06-26', '2023-06-26', 'CHU MUSTAPHA BACHA', 'Hospitalisation complète', 'Chirurgie', NULL, NULL, NULL, 161, 'Indeterminée', '2023-06-26 09:18:08', '2023-06-26 09:28:38');