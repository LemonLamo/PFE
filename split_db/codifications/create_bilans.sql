-- --------------------------------------------------------
--
-- Structure de la table `bilans`
--

CREATE TABLE `bilans` (
  `nom` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `bilans`
--

INSERT INTO `bilans` (`nom`, `created_at`, `updated_at`) VALUES
('Bilan glucidique', NULL, NULL),
('Bilan lipidique', NULL, NULL),
('Bilan rénale', NULL, NULL),
('Bilan hépatique', NULL, NULL),
('Bilan phospho-calcique', NULL, NULL),
('Bilan martiale', NULL, NULL),
('Dosage de vitamines', NULL, NULL),
('Bilan thyroïdien', NULL, NULL),
('Bilan protéique', NULL, NULL),
('Bilan cardiaque', NULL, NULL),
('Marqueurs tumoraux', NULL, NULL),
('Autres paramètres biochimiques -Ionogramme sanguin Na K Cl - Amylase - Lipase - Beta HCG -ASLO - D-dimères\r\n', NULL, NULL),
('Paramètres urinaires', NULL, NULL),
('auto-immunite', NULL, NULL),
('Bilan hormonal', NULL, NULL),
('Bilan immunochimie', NULL, NULL),
('Bilan glucidique', NULL, NULL),
('Bilan lipidique', NULL, NULL),
('Bilan rénale', NULL, NULL),
('Bilan hépatique', NULL, NULL),
('Bilan phospho-calcique', NULL, NULL),
('Bilan martiale', NULL, NULL),
('Dosage de vitamines', NULL, NULL),
('Bilan thyroïdien', NULL, NULL),
('Bilan protéique', NULL, NULL),
('Bilan cardiaque', NULL, NULL),
('Marqueurs tumoraux', NULL, NULL),
('Autres paramètres biochimiques -Ionogramme sanguin Na K Cl - Amylase - Lipase - Beta HCG -ASLO - D-dimères\r\n', NULL, NULL),
('Paramètres urinaires', NULL, NULL),
('auto-immunite', NULL, NULL),
('Bilan hormonal', NULL, NULL),
('Bilan immunochimie', NULL, NULL);