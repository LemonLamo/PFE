START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `personnel`
--

CREATE TABLE `personnel` (
  `NIN` varchar(20) NOT NULL PRIMARY KEY,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `date_de_naissance` DATE NOT NULL,
  `lieu_de_naissance` varchar(255) NOT NULL,
  `sexe` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `telephone` varchar (25) NOT NULL UNIQUE,
  `fonction` varchar(255) NOT NULL,
  `specialite` varchar(255) DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) NOT NULL,
  `code_postale` int(5) NOT NULL,
  `commune` varchar(255) NOT NULL,
  `wilaya` varchar(255) NOT NULL,
  `hopital` varchar(255),
  `service` varchar(255),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX personnel_nom_prenom_IND ON `personnel` (`nom`, `prenom`);
CREATE INDEX personnel_hopital_IND ON `personnel` (`hopital`);
CREATE INDEX personnel_service_IND ON `personnel` (`hopital`, `service`);

--
-- Déchargement des données de la table `personnel`
--

INSERT INTO `personnel` (`NIN`, `nom`, `prenom`, `date_de_naissance`, `lieu_de_naissance`, `sexe`, `email`, 
`telephone`, `fonction`, `specialite`, `grade`, `adresse`, `code_postale`, `commune`, `wilaya`, `hopital`, `service`) VALUES
('100010364027390000', 'BRAHIM', 'Abderrazak', '2001-07-13', 'Tebessa', 'Homme', 'brahim.abderrazak1307@gmail.com', '+213549297666', 'medecin', 'Cardiologie', 'Professeur', 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Mustapha', 'Chirurgie Générale'),
('000000000000000000', 'Admin', 'Admin', '2001-07-13', 'Tebessa', 'Homme', 'brahim.abderrazak1307@gmail.coa', '+213549297660', 'admin', 'Chirurgie Pédiatrique', 'Chef de service', 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Mustapha', 'Chirurgie Générale'),
('111111111111111111', 'NADIL', 'Marwa', '2002-05-12', 'Alger', 'Femme', 'marwa02@gmail.com', '+213549297661', 'infirmier', NULL, NULL, 'Cité 15 logements, Mouhouss', 16042, 'Bordj el kiffane','Alger', 'CHU Mustapha', 'Chirurgie Générale'),
('222222222222222222', 'Lab', 'Lab', '2001-07-13', 'Tebessa', 'Homme', 'brahim.abderrazak1307@gmail.cob', '+213549297662', 'lab', NULL, NULL, 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Mustapha', 'Biologie'),
('333333333333333333', 'Radio', 'Radio', '2001-07-13', 'Tebessa', 'Femme', 'brahim.abderrazak1307@gmail.coc', '+213549297663', 'radio', NULL, NULL, 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Mustapha', 'Radiologie'),
('444444444444444444', 'Pharmacien', 'Pharmacien', '1989-10-14', 'Blida', 'Femme', 'brahim.abderrazak1307@gmail.cod', '+213549297664', 'pharmacien', NULL, NULL, 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Mustapha', 'Chirurgie Générale'),
('100010364027390001', 'BRAHIM', 'Nadjette', '1989-10-14', 'Tebessa', 'Femme', 'brahim.nadjette1989@gmail.com', '+213549297670', 'medecin', 'Chirurgie Pédiatrique', 'Maître Assistant', 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Beni Messous', 'Chirurgie Pédiatrique'),
('555555555555555555', 'BRAHIMI', 'Rodaina', '2002-01-02', 'Blida', 'Femme', 'brahim.rodaina@gmail.com', '+213549297675', 'infirmier', 'Chirurgie Pédiatrique', 'Chef de service', 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Beni Messous', 'Chirurgie Pédiatrique'),
('666666666666666666', 'Admin', 'Admin', '1989-10-14', 'Tebessa', 'Femme', 'brahim.abderrazak1307@gmail.coe', '+213549297676', 'admin', 'Radiologie', 'Chef de service', 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Beni Messous', 'Chirurgie Pédiatrique'),
('777777777777777777', 'Lab', 'Lab', '1989-10-14', 'Tebessa', 'Femme', 'brahim.abderrazak1307@gmail.cof', '+213549297677', 'lab', NULL, NULL, 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Beni Messous', 'Chirurgie Pédiatrique'),
('888888888888888888', 'Radio', 'Radio', '1989-10-14', 'Tebessa', 'Homme', 'brahim.abderrazak1307@gmail.cog', '+213549297678', 'radio', NULL, NULL, 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Beni Messous', 'Chirurgie Pédiatrique'),
('999999999999999999', 'Pharmacien', 'Pharmacien', '1989-10-14', 'Tebessa', 'Homme', 'brahim.abderrazak1307@gmail.coh', '+213549297679', 'pharmacien', NULL, NULL, 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Beni Messous', 'Chirurgie Pédiatrique');