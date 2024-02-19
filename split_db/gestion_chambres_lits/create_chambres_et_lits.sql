USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `chambres`
--

CREATE TABLE `chambres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `numero` varchar(6) NOT NULL,
  `etage` varchar(255) DEFAULT NULL,
  `nombreDeLits` int(11) NOT NULL,
  `disponibilite` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `chambres`
--

INSERT INTO `chambres` (`id`, `numero`, `etage`, `nombreDeLits`, `disponibilite`, `created_at`, `updated_at`) VALUES
(36, 'F01', '2', 2, 'complet', '2023-06-24 22:37:25', '2023-06-25 08:48:23'),
(37, 'F02', '2', 2, 'non complet', '2023-06-24 22:40:10', '2023-06-25 05:44:01'),
(38, 'F03', '2', 2, 'non Complet', '2023-06-24 22:43:25', '2023-06-24 22:43:25'),
(39, 'F04', '3', 2, 'Complet', '2023-06-24 22:45:58', '2023-06-24 22:45:58'),
(40, 'FO5', '3', 2, 'complet', '2023-06-24 22:54:41', '2023-06-25 05:33:56'),
(41, 'M01', '2', 3, 'non complet', '2023-06-24 22:57:46', '2023-06-26 10:01:34'),
(42, 'M02', '2', 3, 'non complet', '2023-06-24 23:00:58', '2023-06-26 09:28:38'),
(43, 'M03', '2', 4, 'non complet', '2023-06-24 23:08:25', '2023-06-25 07:06:35');

-- --------------------------------------------------------
--
-- Structure de la table `lits`
--

CREATE TABLE `lits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `numero` varchar(255) NOT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `chambre_id` bigint(20) UNSIGNED DEFAULT NULL,
  `unité` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `lits`
--

INSERT INTO `lits` (`id`, `numero`, `etat`, `occupation`, `chambre_id`, `unité`, `created_at`, `updated_at`) VALUES
(16, '1', 'Lit à trappe', 'occupe', 36, 'Femme', '2023-06-24 22:37:53', '2023-06-25 08:48:23'),
(17, '2', 'Lit à trappe', 'occupe', 36, 'Femme', '2023-06-24 22:38:20', '2023-06-25 05:41:55'),
(18, '3', 'Lit électrique', 'vide', 37, 'Femme', '2023-06-24 22:41:07', '2023-06-24 22:41:07'),
(19, '4', 'Lit électrique', 'vide', 37, 'Femme', '2023-06-24 22:41:49', '2023-06-25 13:55:51'),
(20, '5', 'Brancards', 'vide', 38, 'Femme', '2023-06-24 22:44:31', '2023-06-24 22:44:31'),
(21, '6', 'Brancards', 'occupe', 38, 'Femme', '2023-06-24 22:45:05', '2023-06-24 22:45:05'),
(22, '7', 'Lits bas', 'occupe', 39, 'Femme', '2023-06-24 22:46:50', '2023-06-24 22:47:13'),
(23, '8', 'Lits bas', 'occupe', 39, 'Femme', '2023-06-24 22:47:47', '2023-06-24 22:47:47'),
(24, '9', 'Lit à trappe', 'occupe', 40, 'Femme', '2023-06-24 22:55:20', '2023-06-25 05:33:56'),
(25, '11', 'Lit à trappe', 'occupe', 41, 'Homme', '2023-06-24 22:58:25', '2023-06-25 07:04:07'),
(26, '12', 'Lit à trappe', 'occupe', 41, 'Homme', '2023-06-24 22:59:11', '2023-06-25 07:10:07'),
(27, '13', 'Lit à trappe', 'vide', 41, 'Homme', '2023-06-24 22:59:48', '2023-06-26 10:01:34'),
(29, '14', 'Brancards', 'occupe', 42, 'Homme', '2023-06-24 23:06:27', '2023-06-26 09:28:38'),
(30, '15', 'Brancards', 'vide', 42, 'Homme', '2023-06-24 23:06:27', '2023-06-24 23:06:27'),
(31, '16\r\n', 'Brancards', 'vide', 42, 'Homme', '2023-06-24 23:06:27', '2023-06-24 23:06:27'),
(32, '17', 'Lit électrique', 'occupe', 43, 'Homme', '2023-06-24 23:09:10', '2023-06-25 07:47:49'),
(33, '18', 'Lit électrique', 'vide', 43, 'Homme', '2023-06-24 23:09:10', '2023-06-26 06:26:05'),
(34, '19', 'Lit électrique', 'vide', 43, 'Homme', '2023-06-24 23:09:10', '2023-06-24 23:09:10'),
(35, '20', 'Lit électrique', 'vide', 43, 'Homme', '2023-06-24 23:09:10', '2023-06-24 23:09:10');