-- --------------------------------------------------------
--
-- Structure de la table `nouveau_nees`
--

CREATE TABLE `nouveau_nees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nin_bebe` varchar(255) NOT NULL,
  `bebe_premature` varchar(255) DEFAULT NULL,
  `niveau_de_livrance` varchar(255) DEFAULT NULL,
  `durée_gestation` varchar(255) DEFAULT NULL,
  `anomalie` varchar(255) DEFAULT NULL,
  `poids` varchar(255) NOT NULL,
  `taille` varchar(255) NOT NULL,
  `etat_bebe` varchar(255) DEFAULT NULL,
  `circonferance_tete` varchar(255) DEFAULT NULL,
  `remarque` varchar(255) DEFAULT NULL,
  `intervention_id` bigint(20) UNSIGNED DEFAULT NULL,
  `Couleur` varchar(255) DEFAULT NULL,
  `Frequence_cardiaque` varchar(255) DEFAULT NULL,
  `Réponse` varchar(255) DEFAULT NULL,
  `Tonus_musculaire` varchar(255) DEFAULT NULL,
  `Respiration` varchar(255) DEFAULT NULL,
  `nin_pere` bigint(20) UNSIGNED NOT NULL,
  `nin_mere` bigint(20) UNSIGNED NOT NULL,
  `nom_attribué_à_la_naissance` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
