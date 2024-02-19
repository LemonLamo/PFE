-- --------------------------------------------------------
--
-- Structure de la table `medicamenthopitals`
--

CREATE TABLE `medicamenthopitals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `quantité` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `medicamenthopitals`
--

INSERT INTO `medicamenthopitals` (`id`, `nom`, `code`, `created_at`, `updated_at`, `quantité`) VALUES
(1, 'Paracétamol', 'N02BE01', NULL, NULL, 102),
(2, 'Amoxicilline', 'J01CA04', NULL, NULL, 211),
(3, 'Omeprazole', 'A02BC01', NULL, NULL, 15),
(4, 'Diclofénac', 'M01AB05', NULL, NULL, 0),
(5, 'Furosémide', 'C03CA01', NULL, NULL, 9),
(6, 'Métronidazole', 'P01AB01', NULL, NULL, 19),
(7, 'Céfotaxime', 'J01DD01', NULL, NULL, 345),
(8, 'Diazépam', 'N05BA01', NULL, NULL, 567),
(9, 'Ranitidine', 'A02BA02', NULL, NULL, 189),
(10, 'Insuline humaine', 'A10AB01', NULL, NULL, 0),
(11, 'Héparine', 'B01AB01', NULL, NULL, 56),
(12, 'Ciprofloxacine', 'J01MA02', NULL, NULL, 1863),
(13, 'Morphine', 'N02AA01', NULL, NULL, 345),
(14, 'Lévofloxacine', 'J01MA12', NULL, NULL, 457),
(15, 'Méthylprednisolone', 'H02AB04', NULL, NULL, 78),
(16, 'Rabeprazole', 'A02BC04', NULL, NULL, 745),
(17, 'Propofol', 'N01AX10', NULL, NULL, 123),
(18, 'Tramadol', 'N02AX02', NULL, NULL, 167),
(19, 'Adrénaline', 'C01CA24', NULL, NULL, 169),
(20, 'Midazolam', 'N05CD08', NULL, NULL, 170);