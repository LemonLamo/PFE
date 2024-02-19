-- --------------------------------------------------------
--
-- Structure de la table `diagnostiques_pre_operatoire`
--
CREATE TABLE `diagnostiques_pre_operatoire` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `diagnostique` varchar(255) DEFAULT NULL,
  `diabete` varchar(255) DEFAULT NULL,
  `HTA` varchar(255) DEFAULT NULL,
  `autres` varchar(255) DEFAULT NULL,
  `compte_rendu` varchar(255) DEFAULT NULL,
  `hospitalisation_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `diagnostiques_pre_operatoire`
--

INSERT INTO `diagnostiques_pre_operatoire` (`id`, `date`, `diagnostique`, `diabete`, `HTA`, `autres`, `compte_rendu`, `hospitalisation_id`, `created_at`, `updated_at`) VALUES
(9, '2023-06-25', 'Anamnèse détaillée : La patiente a signalé une douleur articulaire sévère, une raideur et une diminution de la mobilité du genou droit', '1,26 g/l', '150/95 mmHg', 'rien', 'Après l\'intervention, le patient sera surveillé en unité de soins intensifs (USI) pour évaluer la récupération postopératoire, la fonction cardiaque et la stabilité de la tension artérielle.', 136, '2023-06-25 06:29:31', '2023-06-25 06:29:31'),
(10, '2023-06-25', 'En cours de traitement', ' Le patient présente un diabète de type 2 bien contrôlé avec une glycémie à jeun de 120 mg/dL', 'Le patient est hypertendu avec une pression artérielle systolique de 150 mmHg et une pression artérielle diastolique de 90 mmHg', 'Aucun autre diagnostic significatif n\'a été identifié.', 'Le patient est actuellement sous traitement pour le diabète et l\'hypertension artérielle. Les médicaments actuels incluent la metformine pour le diabète et un inhibiteur de l\'enzyme de conversion de l\'angiotensine (IEC) pour l\'HTA. Les niveaux de glucose ', 145, '2023-06-25 21:41:30', '2023-06-25 21:41:30');