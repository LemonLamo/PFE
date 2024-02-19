-- --------------------------------------------------------
--
-- Structure de la table `signaux_vitauxes`
--

CREATE TABLE `signaux_vitauxes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `pression_artérielle` varchar(255) DEFAULT NULL,
  `frequence_cardiaque` varchar(255) DEFAULT NULL,
  `temperature` varchar(255) DEFAULT NULL,
  `frequence_respiratoire` varchar(255) DEFAULT NULL,
  `saturation_en_oxygene` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `signaux_vitauxes`
--

INSERT INTO `signaux_vitauxes` (`id`, `patient_id`, `pression_artérielle`, `frequence_cardiaque`, `temperature`, `frequence_respiratoire`, `saturation_en_oxygene`, `date`, `created_at`, `updated_at`) VALUES
(13, 218, '100MMHG/7mmHg', '80BM', '37', '60CPM', '95%', '2023-06-25 01:23:07', '2023-06-25 00:25:06', '2023-06-25 00:25:06'),
(14, 220, ' 120/80 mmHg', '70 bpm', '36.5 °C', '16 respirations par minute', '98%', '2023-06-25 21:38:40', '2023-06-25 20:40:59', '2023-06-25 20:40:59');