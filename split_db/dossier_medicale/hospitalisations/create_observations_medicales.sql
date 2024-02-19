-- --------------------------------------------------------
--
-- Structure de la table `observation_medicals`
--

CREATE TABLE `observation_medicals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `DateConsulation` datetime NOT NULL,
  `type_consultation` varchar(255) NOT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `diagnostique` varchar(255) DEFAULT NULL,
  `remarque` varchar(255) DEFAULT NULL,
  `hospitalisation_id` bigint(20) UNSIGNED NOT NULL,
  `symptome` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `medecin_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `observation_medicals`
--

INSERT INTO `observation_medicals` (`id`, `DateConsulation`, `type_consultation`, `observation`, `diagnostique`, `remarque`, `hospitalisation_id`, `symptome`, `created_at`, `updated_at`, `medecin_id`) VALUES
(17, '2023-06-25 07:24:30', 'evaluation de nouveau patient', 'Le patient est actuellement sous traitement et surveillé attentivement. Son état est stable, avec une amélioration progressive des symptômes respiratoires', '[\"CIM10 - A054 - Intoxication alimentaire \\u00e0 Bacillus cereus\",\"CIM10 - A051 - Botulisme\"]', ' Des consultations spécialisées supplémentaires seront prévues pour évaluer la fonction cardiaque à long terme et gérer les facteurs de risque cardiovasculaire.', 136, 'douleurs musculaires,\narticulaires,\nmaux de tête,', '2023-06-25 06:25:24', '2023-06-25 06:25:24', 159),
(18, '2023-06-25 22:33:04', 'evaluation de nouveau patient', 'Le patient présente des douleurs dans la région abdominale depuis plusieurs jours, aggravées après les repas.', '[\"CIM10 - A052 - Intoxication alimentaire \\u00e0 Clostridium perfringens [Clostridium welchii]\"]', 'Le patient sera soumis à des tests supplémentaires', 145, 'Douleur abdominale', '2023-06-25 21:36:15', '2023-06-25 21:36:15', 161);
