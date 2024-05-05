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
  `hopital` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personnel`
--

INSERT INTO `personnel` (`NIN`, `nom`, `prenom`, `date_de_naissance`, `lieu_de_naissance`, `sexe`, `email`, 
`telephone`, `fonction`, `specialite`, `grade`, `adresse`, `code_postale`, `commune`, `wilaya`, `hopital`, `service`) VALUES
('100010364027390000', 'BRAHIM', 'Abderrazak', '2001-07-13', 'Tebessa', 'Homme', 'brahim.abderrazak1307@gmail.com', '+213549297666', 'Admin', 'Chirugie Générale', 'Chef de service', 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Mustapha', 'Chirugie Générale'),
('111111111111111111', 'NADIL', 'Marwa', '2002-05-12', 'Alger', 'Femme', 'marwa02@gmail.com', '+213549297669', 'Infirmier', NULL, NULL, 'Cité 15 logements, Mouhouss', 16042, 'Bordj el kiffane','Alger', 'CHU Mustapha', 'Chirugie Générale'),
('222222222222222222', 'Admin', 'Admin', '2001-07-13', 'Tebessa', 'Homme', 'brahim.abderrazak1307@gmail.coa', '+213549297661', 'Infirmier', 'Chirugie Générale', 'Chef de service', 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Mustapha', 'Chirugie Générale'),
('333333333333333333', 'Lab', 'Lab', '2001-07-13', 'Tebessa', 'Homme', 'brahim.abderrazak1307@gmail.cob', '+213549297662', 'Medécin', 'Chirugie Générale', 'Chef de service', 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Mustapha', 'Biologie'),
('444444444444444444', 'Radio', 'Radio', '2001-07-13', 'Tebessa', 'Homme', 'brahim.abderrazak1307@gmail.coc', '+213549297663', 'Infirmier', 'Radiologie', 'Chef de service', 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Mustapha', 'Radiologie');