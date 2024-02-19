-- --------------------------------------------------------
--
-- Structure de la table `traitements`
--

CREATE TABLE `traitements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `mode_application` varchar(255) NOT NULL,
  `posologie` varchar(255) DEFAULT NULL,
  `nombre_de_fois` int(11) DEFAULT NULL,
  `ordannace_id` bigint(20) UNSIGNED NOT NULL,
  `medicament_id` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `traitements`
--

INSERT INTO `traitements` (`id`, `mode_application`, `posologie`, `nombre_de_fois`, `ordannace_id`, `medicament_id`, `created_at`, `updated_at`) VALUES
(9, 'Buvable', '1000mg', 3, 18, '03 B 081  -  DOLIPRANE -  CP  -  1000 MG', '2023-06-25 00:00:43', '2023-06-25 00:00:43'),
(10, 'Buvable', '500mg', 2, 18, '13 G 047  -  CLAMOXYL -  PDRE. P. SUSP.BUV.  -  250MG/5ML', '2023-06-25 00:01:40', '2023-06-25 00:01:40'),
(11, 'buvable', '1000mg', 2, 19, '03 B 046  -  DOLIPRANE -  PDRE. P. SOL. BUV. SACH.-DOSE  -  300MG', '2023-06-25 00:22:28', '2023-06-25 00:22:28'),
(12, 'buvable', '100MG', 3, 20, '03 B 046  -  DOLIPRANE -  PDRE. P. SOL. BUV. SACH.-DOSE  -  300MG', '2023-06-25 09:15:40', '2023-06-25 09:15:40'),
(13, 'buvable', '1G', 2, 22, '03 B 046  -  DOLIPRANE -  PDRE. P. SOL. BUV. SACH.-DOSE  -  300MG', '2023-06-26 05:55:00', '2023-06-26 05:55:00');
