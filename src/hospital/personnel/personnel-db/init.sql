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
  `nom_user` varchar(255) NOT NULL UNIQUE,
  `date_de_naissance` DATE NOT NULL,
  `lieu_de_naissance` varchar(255) NOT NULL,
  `sexe` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `telephone` varchar (25) NOT NULL UNIQUE,
  `fonction` varchar(255) NOT NULL,
  `specialite` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `code_postal` int(5) NOT NULL,
  `commune` varchar(255) NOT NULL,
  `wilaya` varchar(255) NOT NULL,
  `nom_hopital` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personnel`
--

INSERT INTO `personnel` (`NIN`, `nom`, `prenom`, `nom_user`, `date_de_naissance`, `lieu_de_naissance`, `sexe`, `email`, 
`telephone`, `fonction`, `specialite`, `grade`, `adresse`, `code_postal`, `commune`, `wilaya`, `nom_hopital`, `service`) VALUES
('100010364027390000', 'BRAHIM', 'Abderrazak', 'abderrazak1307', '2001-07-13', 'Tebessa', 'Homme', 'brahim.abderrazak1307@gmail.com', 
'+213549297666', 'Medécin	', 'Cardiologie', 'Chef de service', 'Cité 18 logements, de E.S.B', 16032, 'Bouzareah','Alger', 'CHU Mustapha', 'Radiologie');

