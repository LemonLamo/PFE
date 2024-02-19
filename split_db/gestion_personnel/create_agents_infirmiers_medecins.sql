USE forza;

CREATE TABLE `agents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `NIN_per` varchar(255) NOT NULL,
  `code_de_profession` varchar(255) DEFAULT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `date_de_naissance` date NOT NULL,
  `sexe` varchar(255) NOT NULL,
  `situation_familiale` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `agents` (`id`, `NIN_per`, `code_de_profession`, `nom`, `prenom`, `date_de_naissance`, `sexe`, `situation_familiale`, `adresse`, `telephone`, `created_at`, `updated_at`) VALUES
(15, '333333333333333333', NULL, 'Merabti', 'Karim', '1988-06-07', 'Homme', 'Marié(e)', 'ALGER', '0777563489', '2023-06-24 22:00:46', '2023-06-24 22:00:46');

-- --------------------------------------------------------
--
-- Structure de la table `infirmiers`
--

CREATE TABLE `infirmiers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `NIN_du_personnel` varchar(255) NOT NULL,
  `code_professionnel` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `date_de_naissance` date NOT NULL,
  `sexe` varchar(255) NOT NULL,
  `situation_familiale` varchar(255) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `infirmiers`
--

INSERT INTO `infirmiers` (`id`, `NIN_du_personnel`, `code_professionnel`, `nom`, `prenom`, `date_de_naissance`, `sexe`, `situation_familiale`, `adresse`, `telephone`, `created_at`, `updated_at`, `deleted_at`) VALUES
(39, '888888888888888888', 'inf_888888888888888888', 'HIDDOUCHE', 'Hassiba', '1989-12-14', 'Femme', 'Marié(e)', NULL, '0552304379', '2023-06-24 23:01:57', '2023-06-24 23:02:10', NULL),
(40, '999999999999999999', 'inf_999999999999999999', 'BENYOUCEF', 'ABD ALLAH', '1987-01-12', 'Homme', 'Marié(e)', NULL, '0562304377', '2023-06-24 23:02:54', '2023-06-24 23:02:54', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `medecins`
--

CREATE TABLE `medecins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nin_per` varchar(255) NOT NULL,
  `code_de_profession` varchar(255) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `date_de_naissance` date DEFAULT NULL,
  `sexe` varchar(255) DEFAULT NULL,
  `situation_familiale` varchar(255) DEFAULT NULL,
  `specialité` varchar(255) DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `medecins`
--

INSERT INTO `medecins` (`id`, `nin_per`, `code_de_profession`, `nom`, `prenom`, `date_de_naissance`, `sexe`, `situation_familiale`, `specialité`, `grade`, `adresse`, `telephone`, `created_at`, `updated_at`, `deleted_at`) VALUES
(159, '444444444444444444', 'medecin', 'Benaid', 'Soraya', '1989-12-22', 'Femme', 'Célibataire', 'La medecine interne.', 'Interne', 'Blida 16001', '0552304377', '2023-06-24 22:21:05', '2023-06-24 22:21:05', NULL),
(160, '555555555555555555', 'med_555555555555555555', 'BENREHAL', 'Ziyad', '1985-02-12', 'Homme', 'Célibataire', 'La radiologie.', 'Interne', 'tlemcen sabra', '0552304370', '2023-06-24 22:45:04', '2023-06-24 22:45:04', NULL),
(161, '777777777777777777', 'med_777777777777777777', 'BENREHAL', 'Romaissa', '1995-02-02', 'Femme', 'Marié(e)', 'La medecine interne.', 'Interne', 'tlemcan sabra', '0552304376', '2023-06-24 22:46:54', '2023-06-24 22:46:54', NULL),
(162, '666666666666666666', 'med_666666666666666666', 'BENREHAL', 'Zineb', '1996-05-02', 'Femme', 'Célibataire', 'Medecine biologique', 'Interne', 'tlemcen sabra', '0552304373', '2023-06-24 22:47:00', '2023-06-24 22:47:00', NULL);