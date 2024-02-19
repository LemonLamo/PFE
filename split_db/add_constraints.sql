--
-- Index pour les tables déchargées
--

--
-- Index pour la table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `agents_nin_per_unique` (`NIN_per`);

--
-- Index pour la table `allergies`
--
ALTER TABLE `allergies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `allergies_patient_id_foreign` (`patient_id`);

--
-- Index pour la table `analyses`
--
ALTER TABLE `analyses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `analyses_hospitalisation_id_foreign` (`hospitalisation_id`),
  ADD KEY `analyses_visite_id_foreign` (`visite_id`),
  ADD KEY `analyses_fait_par_foreign` (`fait_par`),
  ADD KEY `fait_par` (`fait_par`);

--
-- Index pour la table `ana_paths`
--
ALTER TABLE `ana_paths`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ana_paths_hospitalisation_id_foreign` (`hospitalisation_id`);

--
-- Index pour la table `antecedant_familiales`
--
ALTER TABLE `antecedant_familiales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `antecedant_familiales_patient_id_foreign` (`patient_id`);

--
-- Index pour la table `antecedant_medicals`
--
ALTER TABLE `antecedant_medicals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `antecedant_medicals_patient_id_foreign` (`patient_id`);

--
-- Index pour la table `archivages`
--
ALTER TABLE `archivages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `archivages_patient_id_foreign` (`patient_id`);

--
-- Index pour la table `assignations`
--
ALTER TABLE `assignations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignations_chambre_id_foreign` (`chambre_id`),
  ADD KEY `assignations_medecin_id_foreign` (`medecin_id`);

--
-- Index pour la table `assignation_infirmiers`
--
ALTER TABLE `assignation_infirmiers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignation_infirmiers_chambre_id_foreign` (`lit_id`),
  ADD KEY `assignation_infirmiers_infirmier_id_foreign` (`infirmier_id`);

--
-- Index pour la table `assignation_lit_patients`
--
ALTER TABLE `assignation_lit_patients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assignation_lit_patients_hospitalisation_id_foreign` (`hospitalisation_id`),
  ADD KEY `assignation_lit_patients_lit_id_foreign` (`lit_id`);

--
-- Index pour la table `chambres`
--
ALTER TABLE `chambres`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `chambres_id_unique` (`id`),
  ADD UNIQUE KEY `chambres_numero_unique` (`numero`);

--
-- Index pour la table `communes`
--
ALTER TABLE `communes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `communes_wilaya_id_foreign` (`wilaya_id`);

--
-- Index pour la table `diagnostique_pre_operatoires`
--
ALTER TABLE `diagnostique_pre_operatoires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `diagnostique_pre_operatoires_hospitalisation_id_foreign` (`hospitalisation_id`);

--
-- Index pour la table `etat_de_sante_mentales`
--
ALTER TABLE `etat_de_sante_mentales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etat_de_sante_mentales_patient_id_foreign` (`patient_id`);

--
-- Index pour la table `examen_imageries`
--
ALTER TABLE `examen_imageries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `examen_imageries_visite_id_foreign` (`visite_id`),
  ADD KEY `examen_imageries_hospitalisation_id_foreign` (`hospitalisation_id`),
  ADD KEY `examen_imageries_fait_par_foreign` (`fait_par`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `habitude_de_vies`
--
ALTER TABLE `habitude_de_vies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `habitude_de_vies_patient_id_foreign` (`patient_id`);

--
-- Index pour la table `hospitalisations`
--
ALTER TABLE `hospitalisations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_hospitalisation` (`code_hospitalisation`),
  ADD KEY `hospitalisations_patient_id_foreign` (`patient_id`),
  ADD KEY `hospitalisations_medecin_id_foreign` (`medecin_id`);

--
-- Index pour la table `infirmiers`
--
ALTER TABLE `infirmiers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `infirmiers_nin_du_personnel_unique` (`NIN_du_personnel`);

--
-- Index pour la table `interventions`
--
ALTER TABLE `interventions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `interventions_hospitalisation_id_foreign` (`hospitalisation_id`);

--
-- Index pour la table `intervention_personnels`
--
ALTER TABLE `intervention_personnels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `intervention_personnels_intervention_id_foreign` (`intervention_id`),
  ADD KEY `intervention_personnels_medecin_id_foreign` (`medecin_id`),
  ADD KEY `intervention_personnels_infirmier_id_foreign` (`infirmier_id`);

--
-- Index pour la table `jours`
--
ALTER TABLE `jours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jours_assignation_infirmier_id_foreign` (`assignation_infirmier_id`),
  ADD KEY `jours_assignation_id_foreign` (`assignation_id`);

--
-- Index pour la table `ligne_traitements`
--
ALTER TABLE `ligne_traitements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ligne_traitements_soin_id_foreign` (`soin_id`),
  ADD KEY `ligne_traitements_medicamenthopital_id_foreign` (`medicamenthopital_id`);

--
-- Index pour la table `lits`
--
ALTER TABLE `lits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lits_id_unique` (`id`),
  ADD UNIQUE KEY `lits_numero_unique` (`numero`),
  ADD KEY `lits_numero_index` (`numero`),
  ADD KEY `lits_chambre_id_foreign` (`chambre_id`);

--
-- Index pour la table `maladies`
--
ALTER TABLE `maladies`
  ADD UNIQUE KEY `maladies_code_complet_unique` (`code_complet`);

--
-- Index pour la table `maladie_chroniques`
--
ALTER TABLE `maladie_chroniques`
  ADD PRIMARY KEY (`id`),
  ADD KEY `maladie_chroniques_patient_id_foreign` (`patient_id`);

--
-- Index pour la table `medecins`
--
ALTER TABLE `medecins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `medecins_nin_per_unique` (`nin_per`);

--
-- Index pour la table `medicamenthopitals`
--
ALTER TABLE `medicamenthopitals`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `medicaments`
--
ALTER TABLE `medicaments`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `mesures`
--
ALTER TABLE `mesures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mesures_patient_id_foreign` (`patient_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Index pour la table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Index pour la table `nouveau_nees`
--
ALTER TABLE `nouveau_nees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nouveau_nees_intervention_id_foreign` (`intervention_id`);

--
-- Index pour la table `observation_medicals`
--
ALTER TABLE `observation_medicals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `observation_medicals_hospitalisation_id_foreign` (`hospitalisation_id`),
  ADD KEY `observation_medicals_medecin_id_foreign` (`medecin_id`);

--
-- Index pour la table `ordannaces`
--
ALTER TABLE `ordannaces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ordannaces_visite_id_foreign` (`visite_id`);

--
-- Index pour la table `param_tres_dh_mobiologies`
--
ALTER TABLE `param_tres_dh_mobiologies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `param_tres_dh_mobiologies_analyse_id_foreign` (`analyse_id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `patients_nin_patient_unique` (`NIN_Patient`),
  ADD UNIQUE KEY `patients_adresse_email_unique` (`adresse_email`);

--
-- Index pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `rapport_outputs`
--
ALTER TABLE `rapport_outputs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rapport_outputs_visite_id_foreign` (`visite_id`),
  ADD KEY `rapport_outputs_hospitalisation_id_foreign` (`hospitalisation_id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Index pour la table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `signaux_vitauxes`
--
ALTER TABLE `signaux_vitauxes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `signaux_vitauxes_patient_id_foreign` (`patient_id`);

--
-- Index pour la table `soins`
--
ALTER TABLE `soins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `soins_hospitalisation_id_foreign` (`hospitalisation_id`),
  ADD KEY `soins_infirmier_id_foreign` (`infirmier_id`);

--
-- Index pour la table `surveillances`
--
ALTER TABLE `surveillances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `surveillances_hospitalisation_id_foreign` (`hospitalisation_id`);

--
-- Index pour la table `traitements`
--
ALTER TABLE `traitements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `traitements_ordannace_id_foreign` (`ordannace_id`);

--
-- Index pour la table `transferts`
--
ALTER TABLE `transferts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transferts_nin_patient_foreign` (`nin_patient`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_agent_id_foreign` (`agent_id`),
  ADD KEY `users_medecin_id_foreign` (`medecin_id`),
  ADD KEY `users_infirmier_id_foreign` (`infirmier_id`),
  ADD KEY `users_nin_p_foreign` (`nin_p`);

--
-- Index pour la table `vaccinations`
--
ALTER TABLE `vaccinations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vaccinations_patient_id_foreign` (`patient_id`);

--
-- Index pour la table `visites`
--
ALTER TABLE `visites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `visites_patient_id_foreign` (`patient_id`),
  ADD KEY `visites_medecin_id_foreign` (`medecin_id`);

--
-- Index pour la table `wilayas`
--
ALTER TABLE `wilayas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `allergies`
--
ALTER TABLE `allergies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `analyses`
--
ALTER TABLE `analyses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT pour la table `ana_paths`
--
ALTER TABLE `ana_paths`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `antecedant_familiales`
--
ALTER TABLE `antecedant_familiales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `antecedant_medicals`
--
ALTER TABLE `antecedant_medicals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `archivages`
--
ALTER TABLE `archivages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `assignations`
--
ALTER TABLE `assignations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `assignation_infirmiers`
--
ALTER TABLE `assignation_infirmiers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `assignation_lit_patients`
--
ALTER TABLE `assignation_lit_patients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `chambres`
--
ALTER TABLE `chambres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT pour la table `communes`
--
ALTER TABLE `communes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `diagnostique_pre_operatoires`
--
ALTER TABLE `diagnostique_pre_operatoires`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `etat_de_sante_mentales`
--
ALTER TABLE `etat_de_sante_mentales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `examen_imageries`
--
ALTER TABLE `examen_imageries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `habitude_de_vies`
--
ALTER TABLE `habitude_de_vies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `hospitalisations`
--
ALTER TABLE `hospitalisations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=148;

--
-- AUTO_INCREMENT pour la table `infirmiers`
--
ALTER TABLE `infirmiers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `interventions`
--
ALTER TABLE `interventions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `intervention_personnels`
--
ALTER TABLE `intervention_personnels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `jours`
--
ALTER TABLE `jours`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `ligne_traitements`
--
ALTER TABLE `ligne_traitements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `lits`
--
ALTER TABLE `lits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `maladie_chroniques`
--
ALTER TABLE `maladie_chroniques`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `medecins`
--
ALTER TABLE `medecins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT pour la table `medicamenthopitals`
--
ALTER TABLE `medicamenthopitals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `medicaments`
--
ALTER TABLE `medicaments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `mesures`
--
ALTER TABLE `mesures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT pour la table `nouveau_nees`
--
ALTER TABLE `nouveau_nees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `observation_medicals`
--
ALTER TABLE `observation_medicals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `ordannaces`
--
ALTER TABLE `ordannaces`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `param_tres_dh_mobiologies`
--
ALTER TABLE `param_tres_dh_mobiologies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `rapport_outputs`
--
ALTER TABLE `rapport_outputs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `signaux_vitauxes`
--
ALTER TABLE `signaux_vitauxes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `soins`
--
ALTER TABLE `soins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `surveillances`
--
ALTER TABLE `surveillances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `traitements`
--
ALTER TABLE `traitements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `transferts`
--
ALTER TABLE `transferts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT pour la table `vaccinations`
--
ALTER TABLE `vaccinations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `visites`
--
ALTER TABLE `visites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `wilayas`
--
ALTER TABLE `wilayas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `agents`
--
ALTER TABLE `agents`
  ADD CONSTRAINT `agents_nin_per_foreign` FOREIGN KEY (`NIN_per`) REFERENCES `patients` (`NIN_Patient`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `allergies`
--
ALTER TABLE `allergies`
  ADD CONSTRAINT `allergies_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `analyses`
--
ALTER TABLE `analyses`
  ADD CONSTRAINT `analyses_fait_par_foreign` FOREIGN KEY (`fait_par`) REFERENCES `medecins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `analyses_hospitalisation_id_foreign` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `analyses_visite_id_foreign` FOREIGN KEY (`visite_id`) REFERENCES `visites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `ana_paths`
--
ALTER TABLE `ana_paths`
  ADD CONSTRAINT `ana_paths_hospitalisation_id_foreign` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `antecedant_familiales`
--
ALTER TABLE `antecedant_familiales`
  ADD CONSTRAINT `antecedant_familiales_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `antecedant_medicals`
--
ALTER TABLE `antecedant_medicals`
  ADD CONSTRAINT `antecedant_medicals_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `archivages`
--
ALTER TABLE `archivages`
  ADD CONSTRAINT `archivages_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `assignations`
--
ALTER TABLE `assignations`
  ADD CONSTRAINT `assignations_chambre_id_foreign` FOREIGN KEY (`chambre_id`) REFERENCES `lits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignations_medecin_id_foreign` FOREIGN KEY (`medecin_id`) REFERENCES `medecins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `assignation_infirmiers`
--
ALTER TABLE `assignation_infirmiers`
  ADD CONSTRAINT `assignation_infirmiers_chambre_id_foreign` FOREIGN KEY (`lit_id`) REFERENCES `lits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignation_infirmiers_infirmier_id_foreign` FOREIGN KEY (`infirmier_id`) REFERENCES `infirmiers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `assignation_lit_patients`
--
ALTER TABLE `assignation_lit_patients`
  ADD CONSTRAINT `assignation_lit_patients_hospitalisation_id_foreign` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `assignation_lit_patients_lit_id_foreign` FOREIGN KEY (`lit_id`) REFERENCES `lits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `communes`
--
ALTER TABLE `communes`
  ADD CONSTRAINT `communes_wilaya_id_foreign` FOREIGN KEY (`wilaya_id`) REFERENCES `wilayas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `diagnostique_pre_operatoires`
--
ALTER TABLE `diagnostique_pre_operatoires`
  ADD CONSTRAINT `diagnostique_pre_operatoires_hospitalisation_id_foreign` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `etat_de_sante_mentales`
--
ALTER TABLE `etat_de_sante_mentales`
  ADD CONSTRAINT `etat_de_sante_mentales_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `examen_imageries`
--
ALTER TABLE `examen_imageries`
  ADD CONSTRAINT `examen_imageries_fait_par_foreign` FOREIGN KEY (`fait_par`) REFERENCES `medecins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `examen_imageries_hospitalisation_id_foreign` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `examen_imageries_visite_id_foreign` FOREIGN KEY (`visite_id`) REFERENCES `visites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `habitude_de_vies`
--
ALTER TABLE `habitude_de_vies`
  ADD CONSTRAINT `habitude_de_vies_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `hospitalisations`
--
ALTER TABLE `hospitalisations`
  ADD CONSTRAINT `hospitalisations_medecin_id_foreign` FOREIGN KEY (`medecin_id`) REFERENCES `medecins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hospitalisations_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `infirmiers`
--
ALTER TABLE `infirmiers`
  ADD CONSTRAINT `infirmiers_nin_du_personnel_foreign` FOREIGN KEY (`NIN_du_personnel`) REFERENCES `patients` (`NIN_Patient`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `interventions`
--
ALTER TABLE `interventions`
  ADD CONSTRAINT `interventions_hospitalisation_id_foreign` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `intervention_personnels`
--
ALTER TABLE `intervention_personnels`
  ADD CONSTRAINT `intervention_personnels_infirmier_id_foreign` FOREIGN KEY (`infirmier_id`) REFERENCES `infirmiers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `intervention_personnels_intervention_id_foreign` FOREIGN KEY (`intervention_id`) REFERENCES `interventions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `intervention_personnels_medecin_id_foreign` FOREIGN KEY (`medecin_id`) REFERENCES `medecins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `jours`
--
ALTER TABLE `jours`
  ADD CONSTRAINT `jours_assignation_id_foreign` FOREIGN KEY (`assignation_id`) REFERENCES `assignations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jours_assignation_infirmier_id_foreign` FOREIGN KEY (`assignation_infirmier_id`) REFERENCES `assignation_infirmiers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `ligne_traitements`
--
ALTER TABLE `ligne_traitements`
  ADD CONSTRAINT `ligne_traitements_medicamenthopital_id_foreign` FOREIGN KEY (`medicamenthopital_id`) REFERENCES `medicamenthopitals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ligne_traitements_soin_id_foreign` FOREIGN KEY (`soin_id`) REFERENCES `soins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `lits`
--
ALTER TABLE `lits`
  ADD CONSTRAINT `lits_chambre_id_foreign` FOREIGN KEY (`chambre_id`) REFERENCES `chambres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `maladie_chroniques`
--
ALTER TABLE `maladie_chroniques`
  ADD CONSTRAINT `maladie_chroniques_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `medecins`
--
ALTER TABLE `medecins`
  ADD CONSTRAINT `medecins_nin_per_foreign` FOREIGN KEY (`nin_per`) REFERENCES `patients` (`NIN_Patient`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `mesures`
--
ALTER TABLE `mesures`
  ADD CONSTRAINT `mesures_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `nouveau_nees`
--
ALTER TABLE `nouveau_nees`
  ADD CONSTRAINT `nouveau_nees_intervention_id_foreign` FOREIGN KEY (`intervention_id`) REFERENCES `interventions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `observation_medicals`
--
ALTER TABLE `observation_medicals`
  ADD CONSTRAINT `observation_medicals_hospitalisation_id_foreign` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `observation_medicals_medecin_id_foreign` FOREIGN KEY (`medecin_id`) REFERENCES `medecins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `ordannaces`
--
ALTER TABLE `ordannaces`
  ADD CONSTRAINT `ordannaces_visite_id_foreign` FOREIGN KEY (`visite_id`) REFERENCES `visites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `param_tres_dh_mobiologies`
--
ALTER TABLE `param_tres_dh_mobiologies`
  ADD CONSTRAINT `param_tres_dh_mobiologies_analyse_id_foreign` FOREIGN KEY (`analyse_id`) REFERENCES `analyses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `rapport_outputs`
--
ALTER TABLE `rapport_outputs`
  ADD CONSTRAINT `rapport_outputs_hospitalisation_id_foreign` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rapport_outputs_visite_id_foreign` FOREIGN KEY (`visite_id`) REFERENCES `visites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `signaux_vitauxes`
--
ALTER TABLE `signaux_vitauxes`
  ADD CONSTRAINT `signaux_vitauxes_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `soins`
--
ALTER TABLE `soins`
  ADD CONSTRAINT `soins_hospitalisation_id_foreign` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `soins_infirmier_id_foreign` FOREIGN KEY (`infirmier_id`) REFERENCES `infirmiers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `surveillances`
--
ALTER TABLE `surveillances`
  ADD CONSTRAINT `surveillances_hospitalisation_id_foreign` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `traitements`
--
ALTER TABLE `traitements`
  ADD CONSTRAINT `traitements_ordannace_id_foreign` FOREIGN KEY (`ordannace_id`) REFERENCES `ordannaces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `transferts`
--
ALTER TABLE `transferts`
  ADD CONSTRAINT `transferts_nin_patient_foreign` FOREIGN KEY (`nin_patient`) REFERENCES `hospitalisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_agent_id_foreign` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_infirmier_id_foreign` FOREIGN KEY (`infirmier_id`) REFERENCES `infirmiers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_medecin_id_foreign` FOREIGN KEY (`medecin_id`) REFERENCES `medecins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_nin_p_foreign` FOREIGN KEY (`nin_p`) REFERENCES `patients` (`NIN_Patient`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `vaccinations`
--
ALTER TABLE `vaccinations`
  ADD CONSTRAINT `vaccinations_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `visites`
--
ALTER TABLE `visites`
  ADD CONSTRAINT `visites_medecin_id_foreign` FOREIGN KEY (`medecin_id`) REFERENCES `medecins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `visites_patient_id_foreign` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
