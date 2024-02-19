USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `allergies`
--

CREATE TABLE `allergies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `designation` varchar(255) NOT NULL,
  `medecin_diagnosticant` varchar(255) DEFAULT NULL,
  `allergène` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `remarques` varchar(255) DEFAULT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `allergies`
--

INSERT INTO `allergies` (`id`, `designation`, `medecin_diagnosticant`, `allergène`, `date`, `remarques`, `patient_id`, `created_at`, `updated_at`) VALUES
(13, 'Allergies cutanées', '444444444444444444', 'C1-IgE spécifiques - Pénicilline G', '2023-06-25', NULL, 218, '2023-06-24 23:56:30', '2023-06-24 23:56:30'),
(14, 'Allergies alimentaires', '444444444444444444', 'C208-IgE spécifiques - Tétanus toxoïd', '2023-06-25', NULL, 218, '2023-06-24 23:56:58', '2023-06-24 23:56:58'),
(15, 'Allergies cutanées', '444444444444444444', 'C1S-IgG4  spécifiques Pénicilline G', '2023-06-25', 'ras', 214, '2023-06-25 06:39:03', '2023-06-25 06:39:03'),
(16, 'Allergies alimentaires', '777777777777777777', 'C1S-IgG4  spécifiques Pénicilline G', '2023-06-25', NULL, 220, '2023-06-25 19:57:35', '2023-06-25 19:57:35'),
(17, 'Allergies cutanées', '777777777777777777', 'C202-IgE spécifiques  - Suxamethonium', '2023-06-25', NULL, 220, '2023-06-25 20:00:03', '2023-06-25 20:00:03'),
(18, 'Allergies cutanées', '777777777777777777', 'C1-IgE spécifiques - Pénicilline G', '2023-06-26', 'ras', 220, '2023-06-26 05:51:50', '2023-06-26 05:51:50');