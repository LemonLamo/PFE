START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;


-- --------------------------------------------------------
--
-- Structure de la table `rendezvous`
--

CREATE TABLE `rendezvous` (
  `id` VARCHAR(20) NOT NULL PRIMARY KEY,
  `patient` VARCHAR(20) NOT NULL,
  `medecin` VARCHAR(20) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `duree` INT(11) DEFAULT 60,
  `details` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Déchargement des données de la table `rendezvous`
--

--- INSERT INTO `rendezvous` (`id`, `patient`, `medecin`, `type`, `title`, `date`, `duree`, `details`) VALUES
--- ('rdv-PZR37CU', '100010364027390000', '100010364027390000', 'Consultation', 'Consultation', '2024-04-17', 60, NULL ),
--- ('rdv-ZEZRRZS', '111111111111111111', '100010364027390000', 'Intervention', 'Bypass Innominate Artery', '2024-04-12', 30, "On va opérer, sous anésthesie globale sur ce patient" );