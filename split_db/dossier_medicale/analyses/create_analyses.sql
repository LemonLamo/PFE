USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `analyses`
--

CREATE TABLE `analyses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `medecin_demandant` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `test` varchar(255) DEFAULT NULL,
  `bilan` varchar(255) DEFAULT NULL,
  `hospitalisation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `visite_id` bigint(20) UNSIGNED DEFAULT NULL,
  `fichier` varchar(255) DEFAULT NULL,
  `fait_par` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `analyses`
--

INSERT INTO `analyses` (`id`, `medecin_demandant`, `date`, `test`, `bilan`, `hospitalisation_id`, `visite_id`, `fichier`, `fait_par`, `created_at`, `updated_at`) VALUES
(54, NULL, '2023-06-25', '[\"\\\"Anticorps anti- thyro\\u00efdiens Anticorps anti-peroxydase Anticorps anti thyroglobuline - AAT ATPO ATG\\\"\"]', '[\"Autres param\\u00e8tres biochimiques -Ionogramme sanguin Na K Cl - Amylase - Lipase - Beta HCG -ASLO - D-dim\\u00e8res\\r\\n\"]', NULL, 49, 'public/ickFo8wctCAbbirT5uWG4EOCa7KyCULPxNgjTBzO.pdf', 159, '2023-06-25 00:07:42', '2023-06-25 00:18:21'),
(55, '444444444444444444', '2023-05-17', '[\"Anticorps anti-nucleaires - AANU\"]', '[\"Bilan r\\u00e9nale\"]', 136, NULL, NULL, NULL, '2023-06-25 06:33:36', '2023-06-25 06:33:36'),
(56, '444444444444444444', '2023-06-25', '[]', '[\"Bilan prot\\u00e9ique\"]', 136, NULL, 'public/hdA90ZzCwwnoYm86pmsuf9E3C15eoszm5oHHfDqO.pdf', 162, '2023-06-25 06:33:56', '2023-06-25 17:37:17'),
(57, '444444444444444444', '2023-06-25', '[\"Acetone urinaire - CET\",\"\\\"Acide urique Acide urique femme en- ceinte - AU\\\"\"]', '[\"Bilan lipidique\",\"Bilan r\\u00e9nale\"]', 145, NULL, NULL, NULL, '2023-06-25 17:27:10', '2023-06-25 17:27:10'),
(58, '777777777777777777', '2023-06-25', '[\"Actinomyces - ACTI\",\"Adenovirus - ADENO\"]', '[\"Bilan r\\u00e9nale\",\"Bilan lipidique\"]', 145, NULL, 'public/zIT8YHsuExruKetbbZdBeabBgSnLe8iilhf3FvXQ.pdf', 162, '2023-06-25 22:09:31', '2023-06-25 22:24:06'),
(59, '777777777777777777', '2023-06-26', '[\"Acetone urinaire - CET\"]', '[\"Bilan lipidique\"]', 145, NULL, NULL, NULL, '2023-06-26 06:09:48', '2023-06-26 06:09:48');