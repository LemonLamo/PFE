USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `antecedant_familiales`
--

CREATE TABLE `antecedant_familiales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `categorie` varchar(255) NOT NULL,
  `type_antecedant` varchar(255) DEFAULT NULL,
  `designation` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `remarques` varchar(255) DEFAULT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `antecedant_familiales`
--

INSERT INTO `antecedant_familiales` (`id`, `categorie`, `type_antecedant`, `designation`, `date`, `remarques`, `patient_id`, `created_at`, `updated_at`) VALUES
(11, 'Asthme', 'Paternel', 'Résperatoire', '2023-06-25', 'RAS', 218, '2023-06-25 00:27:06', '2023-06-25 00:27:06'),
(12, 'Asthme', 'Respiratoire', 'Membre de la famille ayant un diagnostic d\'asthme', '2023-06-25', 'Aucune remarque spécifique', 220, '2023-06-25 20:43:29', '2023-06-25 20:43:29'),
(13, 'Diabète', 'Métabolique', 'Membre de la famille atteint de diabète', '2023-06-25', 'Aucune remarque spécifique', 220, '2023-06-25 20:45:59', '2023-06-25 20:45:59');