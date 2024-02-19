-- --------------------------------------------------------
--
-- Structure de la table `examen_imageries`
--
CREATE TABLE `examen_imageries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `medecin_demandant` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `type_imagerie` varchar(255) NOT NULL,
  `explication` varchar(255) DEFAULT NULL,
  `transport` varchar(255) NOT NULL,
  `observation` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `fait_par` bigint(20) UNSIGNED DEFAULT NULL,
  `visite_id` bigint(20) UNSIGNED DEFAULT NULL,
  `hospitalisation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `examen_imageries`
--

INSERT INTO `examen_imageries` (`id`, `medecin_demandant`, `date`, `type_imagerie`, `explication`, `transport`, `observation`, `image_path`, `fait_par`, `visite_id`, `hospitalisation_id`, `created_at`, `updated_at`) VALUES
(30, '444444444444444444', '2023-06-25', 'imagerie-par-resonance-magnetique', NULL, 'Transport-à-pied', 'tout va bien', 'public/cAtSTS8V1QVUaoT12hNUokn9GaKs12UJAxCthSFt.jpg', 159, 49, NULL, '2023-06-25 00:05:02', '2023-06-25 00:05:48'),
(31, '444444444444444444', '2023-06-25', 'endoscopie', 'nous souhaitons obtenir des images diagnostiques pour évaluer l\'étendue de l\'obstruction des artères coronaires', 'Transport-à-pied', 'test', 'public/VYrKD9q8KvDfFIA23jGtjGD07Ot099DhamR03sS0.jpg', 160, NULL, 136, '2023-06-25 06:36:54', '2023-06-25 16:23:52'),
(32, '777777777777777777', '2023-06-25', 'imagerie-par-resonance-magnetique', 'COMPLET', 'Fauteuil-roulant', NULL, NULL, NULL, NULL, 142, '2023-06-25 07:49:13', '2023-06-25 07:49:13'),
(33, '777777777777777777', '2023-06-25', 'radiographie', NULL, 'Fauteuil-roulant', 'RAS', 'public/y86SEDCWHRoP5DxoVGmcYZBNVvmk9Hd5d4GMkuA6.webp', 160, NULL, 142, '2023-06-25 07:50:24', '2023-06-25 15:55:04'),
(34, '777777777777777777', '2023-06-25', 'imagerie-par-resonance-magnetique', NULL, 'Transport-à-pied', NULL, NULL, NULL, 51, NULL, '2023-06-25 20:06:15', '2023-06-25 20:06:15'),
(35, '777777777777777777', '2023-06-25', 'imagerie-par-resonance-magnetique', 'L\'IRM crânienne', 'Transport-à-pied', 'Indication : Le patient présente des symptômes neurologiques tels que maux de tête persistants et troubles de la vision.\nRésultats :\nLes structures cérébrales sont bien visualisées et présentent une morphologie normale.\nAucune anomalie significative n\'est détectée, notamment pas de signe de tumeur, d\'hémorragie ou d\'infarctus.\nLes ventricules cérébraux sont de taille normale et il n\'y a pas d\'hydrocéphalie.\nLes vaisseaux sanguins intracrâniens ne montrent pas d\'anomalies évidentes.\nConclusion : L\'IRM crânienne ne révèle aucune anomalie structurale ou lésion cérébrale significative. Cependant, d\'autres investigations peuvent être nécessaires pour déterminer la cause des symptômes neurologiques du patient.', 'public/z25bObxaiHJmExfde1H7NbAVUqWAXLshlNzPWhWf.jpg', 160, NULL, 145, '2023-06-25 22:14:08', '2023-06-25 22:20:36'),
(36, '777777777777777777', '2023-06-25', 'radiographie', ' radiographie thoracique (poumon)', 'Fauteuil-roulant', NULL, NULL, NULL, NULL, 145, '2023-06-25 22:15:59', '2023-06-25 22:15:59'),
(37, '777777777777777777', '2023-06-26', 'imagerie-par-resonance-magnetique', NULL, 'Transport-à-pied', NULL, 'public/cUmySUqYKrPSbASBU1MNKGCgC6ypAnYktyWRPc1b.jpg', 160, NULL, 145, '2023-06-26 06:10:12', '2023-06-26 06:12:35');