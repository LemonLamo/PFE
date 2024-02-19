-- --------------------------------------------------------
--
-- Structure de la table `surveillances`
--

CREATE TABLE `surveillances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `heure` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `etat` varchar(255) DEFAULT NULL,
  `perimetreCran` varchar(255) DEFAULT NULL,
  `tensionArt` varchar(255) DEFAULT NULL,
  `frequence_respiration` varchar(255) DEFAULT NULL,
  `frequence_cardio` varchar(255) DEFAULT NULL,
  `Dextro` varchar(255) DEFAULT NULL,
  `Drain` varchar(255) DEFAULT NULL,
  `Diurèse` varchar(255) DEFAULT NULL,
  `temperature` varchar(255) DEFAULT NULL,
  `praticien` varchar(255) DEFAULT NULL,
  `hospitalisation_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `surveillances`
--

INSERT INTO `surveillances` (`id`, `heure`, `etat`, `perimetreCran`, `tensionArt`, `frequence_respiration`, `frequence_cardio`, `Dextro`, `Drain`, `Diurèse`, `temperature`, `praticien`, `hospitalisation_id`, `created_at`, `updated_at`) VALUES
(15, '2023-06-25 07:13:12', 'stable', '5', '120', '30 CPM', '100 bpm', '0,60 g/l ', '150 UI/', ' litres par 24 heures', '39', '444444444444444444', 136, '2023-06-25 06:19:26', '2023-06-25 06:19:26'),
(16, '2023-06-25 22:36:45', 'Stable', ' 52 cm', '120/80 mmHg', '16 respirations par minute', '80 battements par minute', '120 mg/dL', 'En place et fonctionnel', '500 mL sur les 4 dernières heures', '37.2°C', '777777777777777777', 145, '2023-06-25 21:38:27', '2023-06-25 21:38:27'),
(17, '2023-06-26 07:03:24', 'stable', '52', '11', '11', '11', '11', '11', '11', '11', '777777777777777777', 145, '2023-06-26 06:03:58', '2023-06-26 06:03:58');
