-- --------------------------------------------------------
--
-- Structure de la table `rapport_outputs`
--

CREATE TABLE `rapport_outputs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type_rapport` varchar(255) NOT NULL,
  `motif_rapport` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `cause_rapport` varchar(255) DEFAULT NULL,
  `visite_id` bigint(20) UNSIGNED DEFAULT NULL,
  `hospitalisation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `fichier` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `rapport_outputs`
--

INSERT INTO `rapport_outputs` (`id`, `type_rapport`, `motif_rapport`, `date`, `cause_rapport`, `visite_id`, `hospitalisation_id`, `fichier`, `created_at`, `updated_at`) VALUES
(11, 'rapport medico-legal', 'fins dassurance', '2023-06-25', NULL, 49, NULL, 'public/t7UFawYhXmKfkU6BGFCip7ZrYYMpOdqoHtZDKxft.pdf', '2023-06-25 00:21:18', '2023-06-25 00:21:18'),
(12, 'rapport dincident medical', 'evaluation', '2023-06-25', 'Avis medical', NULL, 136, 'public/GysxlZVnfnEcne1hL8tPolQJmYD13UruCRZw7lNz.pdf', '2023-06-25 06:31:13', '2023-06-25 06:31:13'),
(13, 'rapport sur letat medical', 'fins dassurance', '2023-06-25', 'maladie ', NULL, 136, 'public/1xjHnocBWyTZMQyzQ4lxB47XgtQZoKTbPcHYpmoi.pdf', '2023-06-25 06:33:01', '2023-06-25 06:33:01'),
(14, 'rapport sur letat medical', 'evaluation', '2023-06-25', 'Fracture au niveau de pied', NULL, 145, 'public/jKXB1l9KjtiZGFt80v0Hoq9SRDNYInKLol6tsxRp.pdf', '2023-06-25 21:52:53', '2023-06-25 21:52:53'),
(15, 'rapport medico-legal', 'preuve pour enquete', '2023-06-25', NULL, 51, NULL, 'public/WlmNjJDADCYcjVLhjx4KwXdoWetSwUNyvQZ8wMkR.pdf', '2023-06-25 22:28:12', '2023-06-25 22:28:12');
