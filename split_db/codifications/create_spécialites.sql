-- --------------------------------------------------------
--
-- Structure de la table `specialites`
--

CREATE TABLE `specialites` (
  `specialité` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `specialites`
--

INSERT INTO `specialites` (`specialité`, `created_at`, `updated_at`) VALUES
('allergologie.', NULL, NULL),
('andrologie.', NULL, NULL),
('anesthesiologie.', NULL, NULL),
('La cardiologie.', NULL, NULL),
('La chirurgie.', NULL, NULL),
('La chirurgie cardiaque.', NULL, NULL),
('La chirurgie plastique, reconstructive et esthetique. ', NULL, NULL),
('La chirurgie generale.', NULL, NULL),
('La chirurgie gynecologique.', NULL, NULL),
('La chirurgie maxillo-faciale et stomatologie.', NULL, NULL),
('La chirurgie oculaire.', NULL, NULL),
('La chirurgie orale.', NULL, NULL),
('La chirurgie pediatrique.', NULL, NULL),
('La chirurgie thoracique.', NULL, NULL),
('La chirurgie vasculaire.', NULL, NULL),
('La chirurgie viscerale.', NULL, NULL),
('La neurochirurgie.', NULL, NULL),
('La dermatologie.', NULL, NULL),
('Lendocrinologie.', NULL, NULL),
('La gastro-enterologie.', NULL, NULL),
('La geriatrie.', NULL, NULL),
('La gynecologie.', NULL, NULL),
('hematologie.', NULL, NULL),
('hepatologie.', NULL, NULL),
('immunologie.', NULL, NULL),
('infectiologie.', NULL, NULL),
('La medecine aiguë.', NULL, NULL),
('La medecine du travail.', NULL, NULL),
('La medecine urgence.', NULL, NULL),
('La medecine generale.', NULL, NULL),
('La medecine interne.', NULL, NULL),
('La medecine nucleaire.', NULL, NULL),
('La medecine palliative.', NULL, NULL),
('La medecine physique et de readaptation.', NULL, NULL),
('La medecine preventive.', NULL, NULL),
('La neonatologie.', NULL, NULL),
('La nephrologie.', NULL, NULL),
('La neurologie.', NULL, NULL),
('obstetrique.', NULL, NULL),
('odontologie.', NULL, NULL),
('oncologie, cancerologie', NULL, NULL),
('ophtalmologie.', NULL, NULL),
('orthopedie.', NULL, NULL),
('otorhinolaryngologie.', NULL, NULL),
('La pediatrie.', NULL, NULL),
('La pneumologie.', NULL, NULL),
('La podologie.', NULL, NULL),
('La psychiatrie.', NULL, NULL),
('La radiologie.', NULL, NULL),
('La radiotherapie.', NULL, NULL),
('La rhumatologie.', NULL, NULL),
('Lrologie.', NULL, NULL),
('Medecine biologique', NULL, NULL);