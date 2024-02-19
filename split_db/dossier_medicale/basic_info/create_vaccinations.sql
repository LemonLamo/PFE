-- --------------------------------------------------------
--
-- Structure de la table `vaccinations`
--

CREATE TABLE `vaccinations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code_vaccination` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `remarques` varchar(255) DEFAULT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `nombre_de_doses` int(11) NOT NULL,
  `date_de_prochaine_dose` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `vaccinations`
--

INSERT INTO `vaccinations` (`id`, `code_vaccination`, `designation`, `date`, `remarques`, `patient_id`, `nombre_de_doses`, `date_de_prochaine_dose`, `created_at`, `updated_at`) VALUES
(8, 'VAC0867 - Antitoxine Diphtérique ,\nsans précision', 'Antitoxine ', '2023-06-25', NULL, 218, 1, '2023-06-30', '2023-06-25 00:28:55', '2023-06-25 00:28:55'),
(9, 'VAC0162 - Vaccin Brucellose , sans\nprécision', 'une infection bactérienne causée par les espèces de Brucella', '2023-06-25', 'RAS', 220, 2, '2023-07-09', '2023-06-25 20:57:39', '2023-06-25 20:57:39'),
(10, 'VAC0497 - Immunoglobuline anti\nTétanique , sans\nprécision', 'TEST', '2023-06-26', NULL, 220, 1, '2023-06-29', '2023-06-26 05:52:55', '2023-06-26 05:52:55');
