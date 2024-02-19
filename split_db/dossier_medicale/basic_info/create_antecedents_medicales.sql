USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `antecedant_medicals`
--

CREATE TABLE `antecedant_medicals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `categorie_antecedant` varchar(255) NOT NULL,
  `type_antecedant` varchar(255) DEFAULT NULL,
  `designation_antecedant` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `antecedant_medicals`
--

INSERT INTO `antecedant_medicals` (`id`, `categorie_antecedant`, `type_antecedant`, `designation_antecedant`, `date`, `patient_id`, `created_at`, `updated_at`) VALUES
(10, 'fracture au niveau de bras', 'Fracture physique ', 'Par accidant  de voiture', '2023-06-25', 218, '2023-06-25 00:32:03', '2023-06-25 00:32:03'),
(11, 'Maladies cardiovasculaires', 'Infarctus du myocarde', 'Antécédent d\'infarctus du myocarde', '2023-06-25', 220, '2023-06-25 20:59:19', '2023-06-25 20:59:19');