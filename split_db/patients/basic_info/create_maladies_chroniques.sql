-- --------------------------------------------------------
--
-- Structure de la table `maladies_chroniques`
--
CREATE TABLE `maladies_chroniques` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `designation` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `medecin_diagnosticant` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `maladie_chroniques`
--

INSERT INTO `maladie_chroniques` (`id`, `nom`, `designation`, `date`, `patient_id`, `medecin_diagnosticant`, `created_at`, `updated_at`) VALUES
(16, ' asthme', 'Maladies respiratoires', '2023-06-25', 218, '444444444444444444', '2023-06-24 23:57:34', '2023-06-24 23:57:34'),
(17, ' diabète', 'Maladies hématologiques', '2023-06-25', 218, '444444444444444444', '2023-06-24 23:58:30', '2023-06-24 23:58:30'),
(18, 'angine de poitrine', 'Maladies respiratoires', '2023-06-25', 214, '444444444444444444', '2023-06-25 06:39:27', '2023-06-25 06:39:27'),
(19, ' phlébite', 'Les maladies rares', '2023-06-25', 220, '777777777777777777', '2023-06-25 20:01:16', '2023-06-25 20:01:16'),
(20, ' infarctus du myocarde', 'Maladies endocriniennes', '2023-06-26', 220, '777777777777777777', '2023-06-26 05:52:09', '2023-06-26 05:52:09');
