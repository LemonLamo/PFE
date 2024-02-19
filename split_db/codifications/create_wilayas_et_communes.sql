
-- --------------------------------------------------------
--
-- Structure de la table `wilayas`
--

CREATE TABLE `wilayas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
--
-- Structure de la table `communes`
--

CREATE TABLE `communes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code_postal` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `wilaya_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `wilayas`
--

INSERT INTO `wilayas` (`id`, `code`, `nom`, `created_at`, `updated_at`) VALUES
(1, '1', 'Adrar', NULL, NULL),
(2, '2', 'Chlef', NULL, NULL),
(3, '3', 'Laghouat', NULL, NULL),
(4, '4', 'Oum El Bouaghi', NULL, NULL),
(5, '5', 'Batna', NULL, NULL),
(6, '6', 'Béjaïa', NULL, NULL),
(7, '7', 'Biskra', NULL, NULL),
(8, '8', 'Béchar', NULL, NULL),
(9, '9', 'Blida', NULL, NULL),
(10, '10', 'Bouira', NULL, NULL),
(11, '11', 'Tamanrasset', NULL, NULL),
(12, '12', 'Tébessa', NULL, NULL),
(13, '13', 'Tlemcen', NULL, NULL),
(14, '14', 'Tiaret', NULL, NULL),
(15, '15', 'Tizi Ouzou', NULL, NULL),
(16, '16', 'Alger', NULL, NULL),
(17, '17', 'Djelfa', NULL, NULL),
(18, '18', 'Jijel', NULL, NULL),
(19, '19', 'Sétif', NULL, NULL),
(20, '20', 'Saïda', NULL, NULL),
(21, '21', 'Skikda', NULL, NULL),
(22, '22', 'Sidi Bel Abbès', NULL, NULL),
(23, '23', 'Annaba', NULL, NULL),
(24, '24', 'Guelma', NULL, NULL),
(25, '25', 'Constantine', NULL, NULL),
(26, '26', 'Médéa', NULL, NULL),
(27, '27', 'Mostaganem', NULL, NULL),
(28, '28', 'M\'Sila', NULL, NULL),
(29, '29', 'Mascara', NULL, NULL),
(30, '30', 'Ouargla', NULL, NULL),
(31, '31', 'Oran', NULL, NULL),
(32, '32', 'El Bayadh', NULL, NULL),
(33, '33', 'Illizi', NULL, NULL),
(34, '34', 'Bordj Bou Arreridj', NULL, NULL),
(35, '35', 'Boumerdès', NULL, NULL),
(36, '36', 'El Tarf', NULL, NULL),
(37, '37', 'Tindouf', NULL, NULL),
(38, '38', 'Tissemsilt', NULL, NULL),
(39, '39', 'El Oued', NULL, NULL),
(40, '40', 'Khenchela', NULL, NULL),
(41, '41', 'Souk Ahras', NULL, NULL),
(42, '42', 'Tipaza', NULL, NULL),
(43, '43', 'Mila', NULL, NULL),
(44, '44', 'Aïn Defla', NULL, NULL),
(45, '45', 'Naâma', NULL, NULL),
(46, '46', 'Aïn Témouchent', NULL, NULL),
(47, '47', 'Ghardaïa', NULL, NULL),
(48, '48', 'Relizane', NULL, NULL);