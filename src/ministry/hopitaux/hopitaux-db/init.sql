START TRANSACTION;

CREATE DATABASE forza;
SET CHARACTER SET 'utf8';

USE forza;

-- --------------------------------------------------------
--
-- Structure de la table `hopitaux`
--

CREATE TABLE `hopitaux` (
  `nom_hopital` VARCHAR(255) PRIMARY KEY NOT NULL,
  `ville` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `telephone` VARCHAR(10) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `hopitaux`
--

INSERT INTO `hopitaux` (`nom_hopital`, `ville`, `email`, `telephone`) VALUES
('CHU Beni Messous', 'Alger', 'brahim@chu.beni_messous.dz', '023193700'),
('CHU Mustapha', 'Alger', 'nadil@chu.mustapha.dz', '024183601'),
('CHU Bab El Oued', 'Alger', 'contact@chu.bab_el_oued.dz', '021982500'),
('CHU Annaba', 'Annaba', 'info@chu.annaba.dz', '038864200'),
('CHU Constantine', 'Constantine', 'contact@chu.constantine.dz', '031925000'),
('CHU Oran', 'Oran', 'info@chu.oran.dz', '041389100'),
('CHU Tizi Ouzou', 'Tizi Ouzou', 'contact@chu.tizi_ouzou.dz', '026202000'),
('CHU El Kettar', 'Alger', 'info@chu.el_kettar.dz', '021982700');

CREATE TABLE `services` (
  `nom_hopital` VARCHAR(255) NOT NULL,
  `service` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`nom_hopital`, `service`) VALUES
('CHU Mustapha', 'Radiologie'),
('CHU Mustapha', 'Chirurgie Générale'),
('CHU Mustapha', 'Biologie'),
('CHU Mustapha', 'Néonatalogie'),
('CHU Mustapha', 'Parodontologie'),
('CHU Mustapha', 'Ophtalmologie'),
('CHU Mustapha', 'Hépatologie'),
('CHU Mustapha', 'Diabétologie'),
('CHU Mustapha', 'Gastroentérologie'),
('CHU Mustapha', 'Immunologie'),
('CHU Mustapha', 'Neurologie'),
('CHU Mustapha', 'Médecine Légale'),
('CHU Mustapha', 'Chirurgie thoracique'),
('CHU Mustapha', 'Rééducation Fonctionnelle'),
('CHU Mustapha', 'Dermatologie & Vénéréologie'),
('CHU Mustapha', 'Parasitologie & Mycologie'),
('CHU Mustapha', 'Pathologie et Chirurgie Buccale'),
('CHU Mustapha', 'Clinique Chirurgicale « A »'),
('CHU Mustapha', 'Clinique Chirurgicale « B »'),
('CHU Mustapha', 'Pédiatrie'),
('CHU Mustapha', 'Pneumologie'),
('CHU Mustapha', 'Cardiologie'),
('CHU Mustapha', 'Orthopédie'),
('CHU Mustapha', 'Oncologie'),
('CHU Beni Messous', 'Chirurgie Générale'),
('CHU Beni Messous', 'Pneumologie'),
('CHU Beni Messous', 'Pédiatrie'),
('CHU Beni Messous', 'Neurochirurgie'),
('CHU Beni Messous', 'Urologie'),
('CHU Beni Messous', 'Gynécologie-Obstétrique'),
('CHU Beni Messous', 'Anesthésie-Réanimation'),
('CHU Beni Messous', 'ORL'),
('CHU Bab El Oued', 'Radiologie'),
('CHU Bab El Oued', 'Chirurgie Générale'),
('CHU Bab El Oued', 'Cardiologie'),
('CHU Bab El Oued', 'Dermatologie'),
('CHU Bab El Oued', 'Gastroentérologie'),
('CHU Bab El Oued', 'Neurologie'),
('CHU Bab El Oued', 'Pédiatrie'),
('CHU Bab El Oued', 'Oncologie'),
('CHU Bab El Oued', 'Orthopédie'),
('CHU Bab El Oued', 'Ophtalmologie'),
('CHU Bab El Oued', 'Psychiatrie'),
('CHU El Kettar', 'Radiologie'),
('CHU El Kettar', 'Chirurgie Générale'),
('CHU El Kettar', 'Cardiologie'),
('CHU El Kettar', 'Neurologie'),
('CHU El Kettar', 'Pédiatrie'),
('CHU El Kettar', 'Gastroentérologie'),
('CHU El Kettar', 'Gynécologie-Obstétrique'),
('CHU El Kettar', 'Oncologie'),
('CHU El Kettar', 'Orthopédie'),
('CHU El Kettar', 'Dermatologie'),
('CHU El Kettar', 'Ophtalmologie'),
('CHU El Kettar', 'Psychiatrie'),
('CHU Annaba', 'Chirurgie Générale'),
('CHU Annaba', 'Neurologie'),
('CHU Annaba', 'Radiologie'),
('CHU Annaba', 'Cardiologie'),
('CHU Annaba', 'Pédiatrie'),
('CHU Annaba', 'Gastroentérologie'),
('CHU Annaba', 'Gynécologie-Obstétrique'),
('CHU Annaba', 'Dermatologie'),
('CHU Annaba', 'Oncologie'),
('CHU Annaba', 'Orthopédie'),
('CHU Constantine', 'Chirurgie Générale'),
('CHU Constantine', 'Cardiologie'),
('CHU Constantine', 'Radiologie'),
('CHU Constantine', 'Gastroentérologie'),
('CHU Constantine', 'Neurologie'),
('CHU Constantine', 'Pédiatrie'),
('CHU Constantine', 'Oncologie'),
('CHU Constantine', 'Orthopédie'),
('CHU Constantine', 'Ophtalmologie'),
('CHU Constantine', 'Psychiatrie'),
('CHU Constantine', 'Neurochirurgie'),
('CHU Oran', 'Chirurgie Générale'),
('CHU Oran', 'Radiologie'),
('CHU Oran', 'Cardiologie'),
('CHU Oran', 'Neurologie'),
('CHU Oran', 'Pédiatrie'),
('CHU Oran', 'Gastroentérologie'),
('CHU Oran', 'Gynécologie-Obstétrique'),
('CHU Oran', 'Oncologie'),
('CHU Oran', 'Orthopédie'),
('CHU Oran', 'Dermatologie'),
('CHU Oran', 'Ophtalmologie'),
('CHU Oran', 'Psychiatrie'),
('CHU Tizi Ouzou', 'Chirurgie Générale'),
('CHU Tizi Ouzou', 'Radiologie'),
('CHU Tizi Ouzou', 'Cardiologie'),
('CHU Tizi Ouzou', 'Neurologie'),
('CHU Tizi Ouzou', 'Pédiatrie'),
('CHU Tizi Ouzou', 'Gastroentérologie'),
('CHU Tizi Ouzou', 'Gynécologie-Obstétrique'),
('CHU Tizi Ouzou', 'Oncologie'),
('CHU Tizi Ouzou', 'Orthopédie'),
('CHU Tizi Ouzou', 'Dermatologie'),
('CHU Tizi Ouzou', 'Ophtalmologie'),
('CHU Tizi Ouzou', 'Psychiatrie');
