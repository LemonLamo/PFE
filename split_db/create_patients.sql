-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

CREATE TABLE `patients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `NIN_Patient` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `date_de_naissance` date NOT NULL,
  `lieu_de_naissance` varchar(255) NOT NULL,
  `sexe` varchar(255) NOT NULL,
  `profession` varchar(255) NOT NULL,
  `nin_père` varchar(255) NOT NULL,
  `nin_mère` varchar(255) NOT NULL,
  `situation_familiale` varchar(255) NOT NULL,
  `nom_epoux` varchar(255) DEFAULT NULL,
  `groupage` varchar(255) NOT NULL,
  `personne_de_contact` varchar(255) NOT NULL,
  `wilaya` varchar(255) NOT NULL,
  `commune` varchar(255) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) NOT NULL,
  `adresse_email` varchar(255) NOT NULL,
  `profile_photo_path` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `archiver` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`id`, `NIN_Patient`, `nom`, `prenom`, `date_de_naissance`, `lieu_de_naissance`, `sexe`, `profession`, `nin_père`, `nin_mère`, `situation_familiale`, `nom_epoux`, `groupage`, `personne_de_contact`, `wilaya`, `commune`, `adresse`, `telephone`, `adresse_email`, `profile_photo_path`, `password`, `archiver`, `created_at`, `updated_at`) VALUES
(207, '111111111111111111', 'youcef', 'chadli', '2000-06-01', 'babezzouar alger', 'Homme', 'chef de service', '1098736937405683245', '1098736937405683246', 'Célibataire', NULL, 'A+', '077065619', 'ALGER', 'BabEzzouar', 'les bannaniers', '0770234519', 'admin@admin.com', NULL, '111111111111111111', NULL, NULL, NULL),
(208, '222222222222222222', 'KHAROBI', 'Souhaib', '1990-03-02', 'BABEZZOUR ALGER', 'Homme', 'Administrateur de service haspitalier', '090909090909090909', '090909090909090101', 'Célibataire', NULL, 'A+', '077006810', 'Béjaïa', 'AKBOU', 'RUE 18 BAT 34 06001', '0667518910', 'admin@gmail.com', 'public/0fBaW7Fd64OSWfDEIt0uRPfuqLyFTLTGIgEAjICX.jpg', '$2y$10$sC/6XOsT8dN4.MAPKwbIcOyn3/0LMAzzEthxW19mFIicc13VmfEby', NULL, '2023-06-24 21:25:40', '2023-06-24 21:25:40'),
(209, '333333333333333333', 'Merabti', 'Karim', '1988-06-07', 'BABEZZOUAR - ALGER', 'Homme', 'Agent de saisie', '090909090967090101', '090909090967090100', 'Marié(e)', NULL, 'O-', '0777643626', 'Blida', 'Afroune', 'Afroune', '0799876543', 'agent@gmail.com', 'public/Yt7bPNGXJQVVNRehDLTwHmbSBRpeoRJcmVbvLeND.jpg', '$2y$10$.fiuyd.LS3JS0ERDtezhveIW85BGd2WU3Jz1vQbxuiAEAsTIeeT3u', NULL, '2023-06-24 21:59:23', '2023-06-24 21:59:23'),
(210, '444444444444444444', 'Benaid', 'Soraya', '1989-12-22', 'Sétif', 'Femme', 'medecin', '123456789987654323', '090909090909090102', 'Célibataire', NULL, 'A+', '0770671314', 'Alger', 'blida', '16003', '0667510309', 'medecin1@gmail.com', 'public/OmsntIOUOKAiqdtWIYTVGtUoxihGI7ayEzifE26b', '$2y$10$AO6RNPZySEPZoz2gfWrJaeAVcITvheVwx8BykHBIVYm7D0bu.jD4e', NULL, '2023-06-24 22:18:45', '2023-06-24 23:24:32'),
(211, '555555555555555555', 'BENREHAL', 'Ziyad', '1985-02-12', 'Tlemcen', 'Homme', 'medecin', '090909090909090110', '090909090909090117', 'Célibataire', NULL, 'O+', '0552304371', 'Tlemcen', 'SABRA', '13035', '0552304372', 'medecin2@gmail.com', 'public/DC40PVhPOD7AyyqEOTEvjWticoY8dWMRE7qEDZQX.jpg', '$2y$10$WZQGIxvScayx0OyZ/DYIWOkHhmzIQfkBSOnMcWemiEh1SHk0zWYHG', NULL, '2023-06-24 22:39:45', '2023-06-24 22:39:45'),
(212, '666666666666666666', 'BENREHAL', 'Zineb', '1996-05-02', 'Tlemcen', 'Femme', 'medecin', '090909090909090110', '090909090909090117', 'Célibataire', NULL, 'AB+', '0662304377', 'Tlemcen', 'SABRA', '13035', '0552304372', 'medecin3@gmail.com', 'public/XtlXZKDafD0uFbA6jLtZCgDlybSZwps3Q55AftLu.jpg', '$2y$10$EwA8Rmwb8Rw5GS5onsyvhOVsfZKwQzpShv.AVajK5HNbmkuxiFTeC', NULL, '2023-06-24 22:40:11', '2023-06-24 22:40:11'),
(213, '777777777777777777', 'BENREHAL', 'Romaissa', '1995-02-02', 'Tlemcen', 'Femme', 'medecin', '090909090909090110', '090909090909090117', 'Marié(e)', 'Faradj', 'B+', '0572304377', 'Tlemcen', 'SABRA', '13035', '0552304373', 'medecin4@gmail.com', 'public/ggLFUoqRgJc5T7qLwWbKKlrNBruuBkQn1HRbGzE0.jpg', '$2y$10$hs.hsAwNOD8HwvQOAGNGpOaXABMZE701MJOrj0mAjfc6/7o5/vfMm', NULL, '2023-06-24 22:40:20', '2023-06-24 22:40:20'),
(214, '888888888888888888', 'HIDDOUCHE', 'Hassiba', '1989-12-14', 'ALGER', 'Femme', 'infirmier', '090909090909090112', '090909090909090113', 'Marié(e)', 'BENYOUCEF', 'A+', '0552304380', 'Alger', 'Dar EL BIDA', '16005', '0552304380', 'infirmier1@gmail.com', 'public/WOp7FiUzYP60rfkVmQq6jDl4pUIyJk3m1JHspZYZ.jpg', '$2y$10$mxiyUAqWUOo8eqjvX5mc7Oc4ww2P5p3oDDXTvq5RWcBaicMK6YprG', NULL, '2023-06-24 22:59:32', '2023-06-24 22:59:32'),
(215, '999999999999999999', 'BENYOUCEF', 'ABD ALLAH', '1987-01-12', 'TENDOUF', 'Homme', 'infirmier', '100909090909090102', '080909090909090102', 'Marié(e)', NULL, 'A+', '0552304379', 'Alger', 'Dar EL BIDA', '16005', '0552304379', 'infirmier2@gmail.com', 'public/afvmlAbawQKEiY6SApMpnC54agye0qJOtYNoPH56.webp', '$2y$10$T4ZSub4rMWCVc3YtBRps3uhNaV4uFT34HjsWg7ZPMEZs.lY1T4See', NULL, '2023-06-24 22:59:44', '2023-06-24 22:59:44'),
(216, '123456789987654321', 'Belabas', 'Belaid', '2000-12-05', 'TIZI OUZOU', 'Homme', 'Etudiant', '444444444444444441', '444444444444444444', 'Célibataire', NULL, 'A+', '0552304377', 'Tizi Ouzou', 'AZAZGA', '15001', '0552304377', 'BelabasBEL@gmail.com', 'public/aZaXJYv5mff8FsEiBhiyJ9hrEUzhC62gcDK1mIGQ.jpg', '$2y$10$CsN5.FY1IyLfEtiXHw4f3uNvy90RYJ/h3fTb5GHQcq3MSa7w6bPpi', NULL, '2023-06-24 23:18:39', '2023-06-24 23:18:39'),
(217, '123456789987654325', 'MAHYOUT', 'Fatima', '1979-01-12', 'ALGER', 'Femme', 'Enseignante', '666666666666666677', '666666666666666678', 'Marié(e)', 'MERABTI', 'A+', '0552304377', 'Béjaïa', 'LEQSSAR', '06007', '0552304377', 'MAHYOUTF@gmail.com', 'public/5PvNxX6dnLI1k8gCqzeokfEm8n2lT6tdhzwFUzIt.jpg', '$2y$10$gxhQ73SOabiLKC1zTVFrEeSUMDb2uX2YyxKRRnmUe1MKBGpMPoyi.', NULL, '2023-06-24 23:31:05', '2023-06-24 23:31:05'),
(218, '123456789987654324', 'ARKAM', 'SALIHA', '1951-03-03', 'TIZI OUZOU', 'Femme', 'artiste', '666666666666666611', '666666666666666612', 'Célibataire', NULL, 'A+', '0552304377', 'Tizi Ouzou', 'AZAZGA', '15001', '0552304377', 'ARKAMS@gmail.com', '9oSUhavtQF9L936aWDHnLU2zgzkYZh0dUSIgHJV3.jpg', '$2y$10$WvWcukrGRQ6TaBKHXUHBgOQf2D/dWIRD7oXsJf4kel/1Dcg4xIS92', NULL, '2023-06-24 23:33:57', '2023-06-25 14:41:56'),
(219, '123456789987654323', 'Benaid', 'Fayçal', '1977-05-05', 'ANNABA', 'Homme', 'Enseignant', '666666666666666662', '666666666666666663', 'Marié(e)', NULL, 'A+', '0552304377', 'Annaba', 'CHAPI', '23004', '0552304377', 'BenaidF@gmail.com', 'public/gSA5dpNVvXcZ3rqWGBo5PEQwKZYHyzZdVkmaCwZR.jpg', '$2y$10$UUjyLqGRF.duZk0zmkoXf.jLriAkRPN/rXiG05uV6cyNGWmjrjxfa', NULL, '2023-06-24 23:36:32', '2023-06-24 23:36:32'),
(220, '123456789987654322', 'Bendris', 'Mustapha', '1979-06-04', 'ANNABA', 'Homme', 'Manager', '666666666664466662', '666666666666666616', 'Célibataire', NULL, 'A+', '0552304377', 'Alger', 'ROUIBA', '16004', '0552304377', 'BendrisM@gmail.Com', 'public/LhBZ87p0n4gZsfQVYwp1ivq16c1Gf7QEZ5X9fi9e.jpg', '$2y$10$Q0DD3MFvPU5N0k4GJzE/JOgKynclHCASBsWfqjN24rC.O4WPYwnu2', NULL, '2023-06-24 23:39:04', '2023-06-24 23:39:04'),
(221, '123456789987654327', 'BENHADI', 'Slimane', '1998-12-11', 'ALGER', 'Homme', 'Professeur', '123456789987654322', '123456789987654321', 'Célibataire', NULL, 'O+', '0552304377', 'Alger', 'EL BIARE', '16005', '0552304377', 'PROFSlimane@gmail.com', 'public/mzOZLYOcyHI5ETFaRp28NtLQwq0fgILMl7Q2NCcj.jpg', '$2y$10$YgW5bbLjLQVqCsPCn3UlMO0sJvq63SL9tU1eVevsqv6Fchi/E8luG', NULL, '2023-06-26 05:49:15', '2023-06-26 05:49:15');
