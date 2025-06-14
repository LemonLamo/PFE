-- --------------------------------------------------------

--
-- Structure de la table `tests`
--

CREATE TABLE `tests` (
  `code` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL
  `nom_complet` varchar(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `tests`
--

INSERT INTO `tests` (`nom_complet`, `Codes_Biowin`, `nom`) VALUES
('ACE - ACE', 'ACE', 'ACE'),
('Acetone urinaire - CET', 'CET', 'Acetone urinaire'),
('Acide urique Acide urique femme en- ceinte - AU', 'AU', 'Acide urique Acide urique femme en- ceinte'),
('Acide urique urinaire - AUU', 'AUU', 'Acide urique urinaire'),
('Acide valproique - DEPA', 'DEPA', 'Acide valproique'),
('Actinomyces - ACTI', 'ACTI', 'Actinomyces'),
('Adenovirus - ADENO', 'ADENO', 'Adenovirus'),
('Agglutinines irregulieres - RAI', 'RAI', 'Agglutinines irregulieres'),
('Albumine - ALB A+ A24+', 'ALB A+ A24+', 'Albumine'),
('Alpha foetoproteine - AFP', 'AFP', 'Alpha foetoproteine'),
('Amylase - AMY', 'AMY', 'Amylase'),
('Anguillule - ANG', 'ANG', 'Anguillule'),
('Anticorps anti Ag nu- cleaires solubles - ANS', 'ANS', 'Anticorps anti Ag nu- cleaires solubles'),
('Anticorps anti-Beta2GP1 IgG IgM - AB2 AB2G AB2M', 'AB2 AB2G AB2M', 'Anticorps anti-Beta2GP1 IgG IgM'),
('Anticorps anti- Cardiolipine IgG IgM - ACL ACLG ACLM', 'ACL ACLG ACLM', 'Anticorps anti- Cardiolipine IgG IgM'),
('Anticoprs anti-DNA natifs - DNA', 'DNA', 'Anticoprs anti-DNA natifs'),
('Anticorps anti-nucleaires - AANU', 'AANU', 'Anticorps anti-nucleaires'),
('Anticorps anti-peptide citrullines - ACCP', 'ACCP', 'Anticorps anti-peptide citrullines'),
('Anticoprs anti-recepteur de la TSH - TRAK', 'TRAK', 'Anticoprs anti-recepteur de la TSH'),
('Anticorps anti-strepto- coque Anticorps anti-streptodor- nase Anticorps anti-streptoly- sine O - ASLO+ASD ASD ASLO', 'ASLO+ASD ASD ASLO', 'Anticorps anti-strepto- coque Anticorps anti-streptodor- nase Anticorps anti-streptoly- sine O'),
('Anticorps anti- thyroïdiens Anticorps anti-peroxydase Anticorps anti thyroglobuline - AAT ATPO ATG', 'AAT ATPO ATG', 'Anticorps anti- thyroïdiens Anticorps anti-peroxydase Anticorps anti thyroglobuline'),
('Anticorps anti- transglutaminase (tTG) - ATR ATRA', 'ATR ATRA', 'Anticorps anti- transglutaminase (tTG)'),
('IgA anti-tTG IgG anti-tTG - ATRG', 'ATRG', 'IgA anti-tTG IgG anti-tTG'),
('APO A1 - BL1', 'BL1', 'APO A1'),
('APO B - APOB', 'APOB', 'APO B'),
('Aspergillus (culture) - GER', 'GER', 'Aspergillus (culture)'),
('Bandelette urinaire - A + S + NIT + LEUEST + SGU', 'A + S + NIT + LEUEST + SGU', 'Bandelette urinaire'),
('Beta 2 microglobuline - B2M', 'B2M', 'Beta 2 microglobuline'),
('Bilan hepatique - PHB PHEP', 'PHB PHEP', 'Bilan hepatique'),
('Bilan lipidique - BL1', 'BL1', 'Bilan lipidique'),
('Bilharziose urinaire - BILH', 'BILH', 'Bilharziose urinaire'),
('Bilirubine totale - BT', 'BT', 'Bilirubine totale'),
('Bilirubine urinaire - SPB', 'SPB', 'Bilirubine urinaire'),
('BMR (dans les selles et anus) - BLSE', 'BLSE', 'BMR (dans les selles et anus)'),
('BMR (enterocoque resi- tant vancomycine) - ERV', 'ERV', 'BMR (enterocoque resi- tant vancomycine)'),
('SARM', 'gorge et cutane)', 'BMR (dans le nez'),
('BNP - BNP', 'BNP', 'BNP'),
('C3 - C3', 'C3', 'C3'),
('C4 - C4', 'C4', 'C4'),
('CA 125 - C125', 'C125', 'CA 125'),
('CA 15.3 - C153', 'C153', 'CA 15.3'),
('CA 19.9 - C199', 'C199', 'CA 19.9'),
('Calcium corrige Calcium Calcium urinaire - CACO CA CAU', 'CACO CA CAU', 'Calcium corrige Calcium Calcium urinaire'),
('Cannabis urinaire - CANNA', 'CANNA', 'Cannabis urinaire'),
('CDT - CDTEC', 'CDTEC', 'CDT'),
('Chlamydiae - CHLAM', 'CHLAM', 'Chlamydiae'),
('Chlamydiae trachomatis IGG - SCHL', 'SCHL', 'Chlamydiae trachomatis IGG'),
('Chlore - CL', 'CL', 'Chlore'),
('Chlore urinaire - CLU', 'CLU', 'Chlore urinaire'),
('Cholesterol total - CT', 'CT', 'Cholesterol total'),
('Clostridium difficile - CLOS', 'CLOS', 'Clostridium difficile'),
('CMV - CMV', 'CMV', 'CMV'),
('Coproculture - COPR', 'COPR', 'Coproculture'),
('Cortisol Cortisol apres-midi Cortisol apres dexametha- sone - COR COR2 COR5', 'COR COR2 COR5', 'Cortisol Cortisol apres-midi Cortisol apres dexametha- sone'),
('Cotinine - COTIN', 'COTIN', 'Cotinine'),
('CPK - CPK', 'CPK', 'CPK'),
('Creatine - MDRD CR COCK', 'MDRD CR COCK', 'Creatine'),
('Creatine clairance - CLCR', 'CLCR', 'Creatine clairance'),
('Creatine urinaire - CRUE CRU', 'CRUE CRU', 'Creatine urinaire'),
('Cristaux - CRIS', 'CRIS', 'Cristaux'),
('CRP - CRP', 'CRP', 'CRP'),
('Culot urinaire - CUL', 'CUL', 'Culot urinaire'),
('D-Dimeres - DDIM', 'DDIM', 'D-Dimeres'),
('Demodex - DEM', 'DEM', 'Demodex'),
('Densite urinaire - DENS', 'DENS', 'Densite urinaire'),
('Depakine - DEPA', 'DEPA', 'Depakine'),
('Digoxine - DIGO', 'DIGO', 'Digoxine'),
('DUKE - DUKE', 'DUKE', 'DUKE'),
('ECBU - ECBU', 'ECBU', 'ECBU'),
('Electrophorese de l\'hemoglobine - ELHB', 'ELHB', 'Electrophorese de l\'hemoglobine'),
('Electrophorese des proteines - ELPP', 'ELPP', 'Electrophorese des proteines'),
('Epstein Barr Virus - EBV', 'EBV', 'Epstein Barr Virus'),
('Estradiol - E2', 'E2', 'Estradiol'),
('Examen mycologique - MYCO', 'MYCO', 'Examen mycologique'),
('Examen cytobacteriolo- gique d\'un pus - PUS', 'PUS', 'Examen cytobacteriolo- gique d\'un pus'),
('Expectoration - EXP', 'EXP', 'Expectoration'),
('Exploration d\'une anoma- lie lipidique - BL1', 'BL1', 'Exploration d\'une anoma- lie lipidique'),
('Facteur rhumatoïde / Waaler Rose - FR', 'FR', 'Facteur rhumatoïde / Waaler Rose'),
('Fer serique - FE', 'FE', 'Fer serique'),
('Ferritine - FERI', 'FERI', 'Ferritine'),
('Fibrinogene - FIB', 'FIB', 'Fibrinogene'),
('FSH - FSH', 'FSH', 'FSH'),
('Gale - DEM', 'DEM', 'Gale'),
('Gamma GT - GGT', 'GGT', 'Gamma GT'),
('Glycemie - GL (tube gris = exterieur) ou G (tube sec =seulement si au labo)', 'GL (tube gris = exterieur) ou G (tube sec =seulement si au labo)', 'Glycemie'),
('Glycemie : Cycle glyce- mique - G1/G2/G3/G4/G5', 'G1/G2/G3/G4/G5', 'Glycemie : Cycle glyce- mique'),
('Glycemie : Hyperglycemie provoquee - GL7524 pour femmes en- ceintes HGP pour hommes et femmes non enceintes', 'GL7524 pour femmes en- ceintes HGP pour hommes et femmes non enceintes', 'Glycemie : Hyperglycemie provoquee'),
('Glycemie post-prandiale - GPP', 'GPP', 'Glycemie post-prandiale'),
('Glycosurie - S+ S24+', 'S+ S24+', 'Glycosurie'),
('Gonocoque - GONO', 'GONO', 'Gonocoque'),
('Groupe sanguin - GS GS2', 'GS GS2', 'Groupe sanguin'),
('Haptoglobine - HAPTO', 'HAPTO', 'Haptoglobine'),
('HCG - BHCG', 'BHCG', 'HCG'),
('HDL - Cholesterol - BL1', 'BL1', 'HDL - Cholesterol'),
('Hemoculture - HMB HM', 'HMB HM', 'Hemoculture'),
('Hemoglobine glyquee - HBG', 'HBG', 'Hemoglobine glyquee'),
('Hepatite A - HAV + MHAV + VA', 'HAV + MHAV + VA', 'Hepatite A'),
('Hepatite B Antigene HBS Anticorps anti HBS Anticorps anti HBC - SHB3 HBS + VB CHBS + VB CHBC + VB', 'SHB3 HBS + VB CHBS + VB CHBC + VB', 'Hepatite B Antigene HBS Anticorps anti HBS Anticorps anti HBC'),
('Hepatite C - HCV', 'HCV', 'Hepatite C'),
('HIV - HIV', 'HIV', 'HIV'),
('HLM - HLM', 'HLM', 'HLM'),
('Immunoglobulines IGA IGG IGM - IG IGA IGG IGM', 'IG IGA IGG IGM', 'Immunoglobulines IGA IGG IGM'),
('Immuno-electrophorese des proteines - IEP + ELPP', 'IEP + ELPP', 'Immuno-electrophorese des proteines'),
('Ionogramme - IO', 'IO', 'Ionogramme'),
('LDL - Cholesterol - BL1', 'BL1', 'LDL - Cholesterol'),
('Lactate deshydrogenase - LDH', 'LDH', 'Lactate deshydrogenase'),
('Legionnelle - LEGIO', 'LEGIO', 'Legionnelle'),
('Leishmaniose cutanee - LEIS', 'LEIS', 'Leishmaniose cutanee'),
('Leucocytes - LEUEST', 'LEUEST', 'Leucocytes'),
('Levures - LEV', 'LEV', 'Levures'),
('LH - LH', 'LH', 'LH'),
('Lipase - LIPA', 'LIPA', 'Lipase'),
('Liquide de ponction - LIQ', 'LIQ', 'Liquide de ponction'),
('Lithium - LI', 'LI', 'Lithium'),
('Lyme - LYME', 'LYME', 'Lyme'),
('Magnesium Magnesium urinaire - MG MGU', 'MG MGU', 'Magnesium Magnesium urinaire'),
('Malassezia spp - MAL', 'MAL', 'Malassezia spp'),
('Micro-albuminurie - MIC24 MICE', 'MIC24 MICE', 'Micro-albuminurie'),
('Microfilaires - FIL', 'FIL', 'Microfilaires'),
('MNI tests - MNI', 'MNI', 'MNI tests'),
('Mycoplasmes Mycoplasmes urogenitaux serologie - MPF MPH MPS', 'MPF MPH MPS', 'Mycoplasmes Mycoplasmes urogenitaux serologie'),
('Nitrites - NIT', 'NIT', 'Nitrites'),
('Numeration formule san- guine - NF', 'NF', 'Numeration formule san- guine'),
('Orosomucoide - OROSO', 'OROSO', 'Orosomucoide'),
('Osmolarite Osmolarite urinaire - OSMS OSM', 'OSMS OSM', 'Osmolarite Osmolarite urinaire'),
('Oxyures (scotch tests) - SCO', 'SCO', 'Oxyures (scotch tests)'),
('PALU', ' goutte epaisse', 'Paludisme'),
('Parasitologie des selles - PARA', 'PARA', 'Parasitologie des selles'),
('Parathormone - PTH', 'PTH', 'Parathormone'),
('PH urinaire - PH', 'PH', 'PH urinaire'),
('Phosphatases alcalines - PAL', 'PAL', 'Phosphatases alcalines'),
('Phosphore Phosphore urinaire - P PU', 'P PU', 'Phosphore Phosphore urinaire'),
('Pigments biliaires - SPB', 'SPB', 'Pigments biliaires'),
('PINI - PINI', 'PINI', 'PINI'),
('Plaquettes - PL PLC', 'PL PLC', 'Plaquettes'),
('Potassium Potassium urinaire - K KU', 'K KU', 'Potassium Potassium urinaire'),
('Prealbumine - PREAL', 'PREAL', 'Prealbumine'),
('Prelevement auriculaire - OREIL', 'OREIL', 'Prelevement auriculaire'),
('Prelevement cutaneo- muqueux - PEAU', 'PEAU', 'Prelevement cutaneo- muqueux'),
('Prelevement de gorge - PG', 'PG', 'Prelevement de gorge'),
('Prelevement de pus - PUS', 'PUS', 'Prelevement de pus'),
('Prelevement mycologique - MYCO + RMYC', 'MYCO + RMYC', 'Prelevement mycologique'),
('Prelevement nasal - NEZ', 'NEZ', 'Prelevement nasal'),
('Prelevement oculaire - ŒIL', 'ŒIL', 'Prelevement oculaire'),
('Prelevement uretral - PUR', 'PUR', 'Prelevement uretral'),
('Prelevement vaginal - PV', 'PV', 'Prelevement vaginal'),
('Progesterone - PROG', 'PROG', 'Progesterone'),
('Prolactine - PROL', 'PROL', 'Prolactine'),
('Proteines totales seriques Proteinurie - PROT A / A24', 'PROT A / A24', 'Proteines totales seriques Proteinurie'),
('PSA total PSA libre et total - PSA PSALI', 'PSA PSALI', 'PSA total PSA libre et total'),
('Recherche d\'agglutinines irregulieres - RAI', 'RAI', 'Recherche d\'agglutinines irregulieres'),
('RAI SI hemoglobine inferieure a ? - RAISI', 'RAISI', 'RAI SI hemoglobine inferieure a ?'),
('Reserve alcaline - RA', 'RA', 'Reserve alcaline'),
('Reticulocytes - RETI', 'RETI', 'Reticulocytes'),
('Rotavirus - ROTA', 'ROTA', 'Rotavirus'),
('Rubeole serologie - RUB', 'RUB', 'Rubeole serologie'),
('Sang dans les selles - RSS RSS2 RSS3', 'RSS RSS2 RSS3', 'Sang dans les selles'),
('Sang dans les urines - SGU', 'SGU', 'Sang dans les urines'),
('Saturation de la transfe- rine - SATU', 'SATU', 'Saturation de la transfe- rine'),
('Sediments urinaires - CUL', 'CUL', 'Sediments urinaires'),
('Sodium Sodium urinaire - NA NAU', 'NA NAU', 'Sodium Sodium urinaire'),
('Spermoculture - SPC', 'SPC', 'Spermoculture'),
('Staphylocoque aureus - SA / SARM', 'SA / SARM', 'Staphylocoque aureus'),
('Sterilet - STER', 'STER', 'Sterilet'),
('Streptocoque B - SGB', 'SGB', 'Streptocoque B'),
('Synacthene - SYN SYNIM', 'SYN SYNIM', 'Synacthene'),
('Syphilis - BW', 'BW', 'Syphilis'),
('Transaminases SGOT SGPT - OP OT PT', 'OP OT PT', 'Transaminases SGOT SGPT'),
('T3 libre - T3', 'T3', 'T3 libre'),
('T4 libre - T4', 'T4', 'T4 libre'),
('Taux de reabsorption du phosphore - TRP', 'TRP', 'Taux de reabsorption du phosphore'),
('Taux de prothrombine - TPN TPK / TP', 'TPN TPK / TP', 'Taux de prothrombine'),
('Temps de cephaline acti- vee - TCA', 'TCA', 'Temps de cephaline acti- vee'),
('Temps de saignement - DUKE / IVY', 'DUKE / IVY', 'Temps de saignement'),
('Test de Huhner - THU', 'THU', 'Test de Huhner'),
('Testosterone - TEST', 'TEST', 'Testosterone'),
('Toxoplasmose serologie - TOXO', 'TOXO', 'Toxoplasmose serologie'),
('Triglycerides - TRI', 'TRI', 'Triglycerides'),
('Trophatop Adulte Trophatop Enfant (<15 ans) - TROA TROE', 'TROA TROE', 'Trophatop Adulte Trophatop Enfant (<15 ans)'),
('Troponine HS - TROT', 'TROT', 'Troponine HS'),
('TSH ultra sensible - TSH', 'TSH', 'TSH ultra sensible'),
('Uree Uree urinaire - U UU', 'U UU', 'Uree Uree urinaire'),
('Urobilinogene urinaire - SPB', 'SPB', 'Urobilinogene urinaire'),
('Vitamine B12 - B12', 'B12', 'Vitamine B12'),
('Vitamine B9 - B9', 'B9', 'Vitamine B9'),
('Vitamine D - VD', 'VD', 'Vitamine D'),
('Vitamines D HN - VDHN', 'VDHN', 'Vitamines D HN'),
('Vitesse de sedimentation - VS', 'VS', 'Vitesse de sedimentation');