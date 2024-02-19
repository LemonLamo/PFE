-- --------------------------------------------------------

--
-- Structure de la table `paramètres_d'hémobiologie`
--

CREATE TABLE `parametres_d_hemobiologie` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Numération_formule_Sanguine_(NFS)` varchar(255) NOT NULL,
  `Frottis_sanguin` varchar(255) NOT NULL,
  `Test_de_coombs_direct` varchar(255) NOT NULL,
  `Recherche d’agglutinines_irrégulières_(RAI)` varchar(255) NOT NULL,
  `Groupage_sanguin` varchar(255) NOT NULL,
  `Groupage_sanguin_phénotypé` varchar(255) NOT NULL,
  `Taux_de_prothrombine_(TP)` varchar(255) NOT NULL,
  `Fibrinogène` varchar(255) NOT NULL,
  `resultat` varchar(255) NOT NULL,
  `analyse_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;