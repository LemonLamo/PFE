-- --------------------------------------------------------
--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nin_p` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `current_team_id` bigint(20) UNSIGNED DEFAULT NULL,
  `profile_photo_path` text DEFAULT NULL,
  `hospital` varchar(255) NOT NULL,
  `agent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `medecin_id` bigint(20) UNSIGNED DEFAULT NULL,
  `infirmier_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nin_p`, `email`, `email_verified_at`, `password`, `remember_token`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `current_team_id`, `profile_photo_path`, `hospital`, `agent_id`, `medecin_id`, `infirmier_id`, `created_at`, `updated_at`) VALUES
(1, '111111111111111111', 'admin@admin.com', '2023-05-16 10:45:12', '$2y$10$nZrI04KqU0wqh6D.wA/DPeI7Ewm/mWRD6A/tpn0Ps08eD8AsGWJT2', 'sJhYQFrfF3h7L1nI2LrlcuLQ63ZlcNWVKFmK29ClNQzmGz6VqpK1F9P3zJNm', NULL, NULL, NULL, NULL, NULL, 'CHU MUSTAPHA BACHA', NULL, NULL, NULL, '2023-05-16 10:45:13', '2023-05-17 18:31:11'),
(32, '222222222222222222', 'admin@gmail.com', NULL, '$2y$10$MeCIvofAaJANY/PFvOTOYeOs8NzX4a6VFREWp6ACi3hZPr9hsrif.', NULL, NULL, NULL, NULL, NULL, NULL, 'CHU MUSTAPHA BACHA', NULL, NULL, NULL, '2023-06-24 21:31:30', '2023-06-24 21:31:30'),
(33, '333333333333333333', 'agent@gmail.com', NULL, '$2y$10$lfJ/CXzfD.Ucs8Pgx9u/6.o/363SNB5iyWYP.pTSxspzOdPMSH9fG', NULL, NULL, NULL, NULL, NULL, NULL, 'CHU MUSTAPHA BACHA', 15, NULL, NULL, '2023-06-24 22:02:03', '2023-06-24 22:02:03'),
(34, '444444444444444444', 'medecin1@gmail.com', NULL, '$2y$10$XbK.ANeRQNt.K.lifM3TLOuujSDPPUxnM20qOC8K3nZVB3Cs4M1Ou', NULL, NULL, NULL, NULL, NULL, NULL, 'CHU MUSTAPHA', NULL, 159, NULL, '2023-06-24 22:22:06', '2023-06-24 22:22:06'),
(35, '777777777777777777', 'medecin4@gmail.com', NULL, '$2y$10$fxa1xO5RVoW1NTTnQNaQwufr8lcdp4/mImxA9WhsIUokgVi9tmlUm', NULL, NULL, NULL, NULL, NULL, NULL, 'CHU MUSTAPHA BACHA', NULL, 161, NULL, '2023-06-24 22:49:09', '2023-06-24 22:49:09'),
(36, '666666666666666666', 'medecin3@gmail.com', NULL, '$2y$10$pE3YxwQCWL5XcMqhoJwPPOKDHD0wdxKNTk1jHQFBitL1bZldmtQMK', NULL, NULL, NULL, NULL, NULL, NULL, 'CHU MUSTAPHA BACHA', NULL, 162, NULL, '2023-06-24 22:49:16', '2023-06-24 22:49:16'),
(37, '555555555555555555', 'medecin2@gmail.com', NULL, '$2y$10$9J72lVl3LT9uXsAjXO3hWu77EJ.PKL/.3/YCafv2HCb9YtQ49x9X.', NULL, NULL, NULL, NULL, NULL, NULL, 'CHU MUSTAPHA BACHA', NULL, 160, NULL, '2023-06-24 22:49:29', '2023-06-24 22:49:29'),
(38, '888888888888888888', 'infirmier1@gmail.com', NULL, '$2y$10$Ds12meXfGWDGGZ5qv/tR7Odtg9I9mzMqChKeQ.4HyaGa2kc3SX9YG', NULL, NULL, NULL, NULL, NULL, NULL, 'CHU MUSTAPHA BACHA', NULL, NULL, 39, '2023-06-24 23:03:15', '2023-06-24 23:03:15'),
(39, '999999999999999999', 'infirmier2@gmail.com', NULL, '$2y$10$/MAdkpR2mRDgaimBYYTEu.BBAmYqQppBunbNOTd9Ghgk86kJlK.2u', NULL, NULL, NULL, NULL, NULL, NULL, 'CHU MUSTAPHA BACHA', NULL, NULL, 40, '2023-06-24 23:05:28', '2023-06-24 23:05:28');
