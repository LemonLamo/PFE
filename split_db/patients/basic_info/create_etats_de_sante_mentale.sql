-- --------------------------------------------------------
--
-- Structure de la table `etats_de_sante_mentale`
--

CREATE TABLE `etats_de_sante_mentale` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `compte_rendu` varchar(255) NOT NULL,
  `patient_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `etat_de_sante_mentales`
--

INSERT INTO `etats_de_sante_mentale` (`id`, `date`, `compte_rendu`, `patient_id`, `created_at`, `updated_at`) VALUES
(8, '2023-06-25', 'sans probleme', 218, '2023-06-25 00:26:07', '2023-06-25 00:26:07'),
(9, '2023-06-25', 'STABLE\n', 220, '2023-06-25 20:42:02', '2023-06-25 20:42:02');