START TRANSACTION;

CREATE DATABASE IF NOT EXISTS forza;
SET CHARACTER SET 'utf8';

USE forza;

CREATE TABLE `interventions` (
  `code_intervention` varchar(255) NOT NULL PRIMARY KEY,
  `designation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `interventions` (`code_intervention`, `designation`) VALUES
  ('03120Z0', 'Bypass Innominate Artery to Right Upper Arm Artery'),
  ('03120Z1', 'Bypass Innominate Artery to Left Upper Arm Artery'),
  ('08N23ZZ', 'Release Right Anterior Chamber');

COMMIT;