START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;


-- --------------------------------------------------------
--
-- Structure de la table `patients`
--

CREATE TABLE `patients` (
  `NIN` varchar(20) NOT NULL PRIMARY KEY,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `date_naissance` DATE NOT NULL,
  `lieu_naissance` varchar(255) NOT NULL,
  `sexe` varchar(255) NOT NULL,
  `situation_familiale` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `groupage` varchar(255) NOT NULL,
  `taille` int(11),
  `poids` int(11),
  `donneur_organe` tinyint(1) DEFAULT 0,
  `adresse` varchar(255),
  `commune` varchar(255),
  `code_postale` int(5),
  `wilaya` varchar(255),
  `NIN_pere` varchar(20),
  `NIN_mere` varchar(20),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients`
(`NIN`, `nom`, `prenom`, `date_naissance`, `lieu_naissance`, `sexe`, `situation_familiale`, `email`, `telephone`, `groupage`, `taille`, `poids`, `adresse`, `commune`, `code_postale`, `wilaya`) VALUES
('100010364027390000', 'BRAHIM', 'Abderrazak', '2001-07-13', 'Tebessa', 'Mâle', 'Célébataire', 'brahim.abderrazak1307@gmail.com', '+213549297666', 'B+', 181, 86.8, 'Cité 18 logements, de E.S.B', 'Bouzareah', 16032, 'Alger');

-- --------------------------------------------------------
--
-- Structure de la table `allergies`
--
CREATE TABLE `allergies` (
  `patient` varchar(20) NOT NULL,
  `code_allergene` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `remarques` varchar(255) DEFAULT NULL,
  `medecin` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `allergies`
(`patient`, `code_allergene`, `date`, `remarques`, `medecin`) VALUES
('100010364027390000', 'AS561', '2022-07-13', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales est lectus. Vestibulum ante ipsum primis', '111111111111111111');


-- --------------------------------------------------------
--
-- Structure de la table `vaccinations`
--

CREATE TABLE `vaccinations` (
  `patient` varchar(20) NOT NULL,
  `code_vaccin` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `remarques` varchar(255) DEFAULT NULL,
  `nombre_de_doses` int(11) NOT NULL,
  `date_de_prochaine_dose` date DEFAULT NULL,
  `medecin` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `vaccinations`
--

INSERT INTO `vaccinations` (`patient`, `code_vaccin`, `date`, `remarques`, `nombre_de_doses`, `date_de_prochaine_dose`, `medecin` ) VALUES
('100010364027390000', 'VAC0867', '2023-06-25', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sodales est lectus. Vestibulum ante ipsum primis', 2, '2023-06-30', '111111111111111111');

-- --------------------------------------------------------
--
-- Structure de la table `maladies_chroniques`
--
CREATE TABLE `maladies_chroniques` (
  `patient` varchar(20) NOT NULL,
  `code_maladie` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `medecin` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `maladie_chroniques`
--

INSERT INTO `maladies_chroniques` (`patient`, `code_maladie`, `date`, `medecin`) VALUES
('100010364027390000', 'AS531', '2023-06-25', '111111111111111111');