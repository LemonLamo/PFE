START TRANSACTION;

CREATE DATABASE IF NOT EXISTS forza;
SET CHARACTER SET 'utf8';

USE forza;
-- --------------------------------------------------------
--
-- Structure de table `specialites`
--

CREATE TABLE `specialites` (
  `specialite` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- DéchargeMent des données de table `specialites`
--

INSERT INTO `specialites` (`specialite`) VALUES
('Allergologie'),
('Andrologie'),
('Anesthesiologie'),
('Cardiologie'),
('Chirurgie'),
('Chirurgie cardiaque'),
('Chirurgie plastique, reconstructive et esthetique. '),
('Chirurgie generale'),
('Chirurgie gynecologique'),
('Chirurgie maxillo-faciale et stomatologie'),
('Chirurgie oculaire'),
('Chirurgie orale'),
('Chirurgie pediatrique'),
('Chirurgie thoracique'),
('Chirurgie vasculaire'),
('Chirurgie viscerale'),
('Neurochirurgie'),
('Dermatologie'),
('Endocrinologie'),
('Gastro-enterologie'),
('Geriatrie'),
('Gynecologie'),
('Hematologie'),
('Hepatologie'),
('Immunologie'),
('Infectiologie'),
('Medecine aiguë'),
('Medecine biologique'),
('Medecine du travail'),
('Medecine urgence'),
('Medecine generale'),
('Medecine interne'),
('Medecine nucleaire'),
('Medecine palliative'),
('Medecine physique et de readaptation'),
('Medecine preventive'),
('Neonatologie'),
('Nephrologie'),
('Neurologie'),
('Obstetrique'),
('Odontologie'),
('Oncologie, Cancerologie'),
('Ophtalmologie'),
('Orthopedie'),
('Otorhinolaryngologie'),
('Pediatrie'),
('Pneumologie'),
('Podologie'),
('Psychiatrie'),
('Radiologie'),
('Radiotherapie'),
('Rhumatologie'),
('Urologie');