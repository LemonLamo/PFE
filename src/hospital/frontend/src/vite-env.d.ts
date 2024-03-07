/// <reference types="vite/client" />
type LoginFormProps = {
    formActions: LoginFormActions
}
type LoginFormActions = {
    swapToLogin: () => void,
    swapTo2FA: () => void,
    swapToResetPassword: () => void,
}
type Consultation = {
    code_consultation: string,
    nom_hopital: string,
    medecin: string,
    patient: string,
    date_consultation: Date,
    type_consultation: 'Evaluation de nouveau patient' | 'Suivi periodique (non urgent)' | 'Viste de soins (urgent)' | '',
    motif_consultation: 'Symptôme' | 'Plainte' | '',
    symptomes: string,
    resume_consultation: string,
    examens_cliniques: ExamenClinique[],
    diagnostique: string,
    diagnostique_details: string,
    prescriptions: Medicament[],
    radiologie: Radio[],
    analyses: Analyse[],
    interventions: Intervention[],
    prochaine_consultation: Date,
}
type Hospitalisation = {
    code_hospitalisation: string,
    nom_hopital: string,
    medecin: string,
    patient: string,
    date_entree: Date,
    mode_entree: string,
    motif_hospitalisation: string,
    date_sortie: Date,
    mode_sortie: string,
    resume_hospitalisation: string,
}
type Intervention = {
    code_intervention: string,
    nom_hopital: string,
    medecin: string,
    patient: string,
    nom: string,
    date?: Date | null,
    protocole_operatoire?: string,
    remarques?: string
}
type ExamenClinique = {
    code: string,
    nom: string,
    resultat: string,
    remarques?: string
}
type Medicament = {
    code: string,
    nom: string,
    posologie: number,
    frequence: number,
    duree: number,
    remarques?: string
}
type StockMedicament = {
    code: string,
    nom: string,
    quantite: number,
}
type Radio = {
    code: string,
    nom: string,
    fichiers?: File[],
    remarques?: string
}
type Analyse = {
    code: string,
    nom: string,
    fichiers?: File[],
    remarques?: string
}
type Chambre = {
    num: string,
    etage: string,
    nombre_lits: number,
    nombre_lits_occupe: number
}
type Medecin = {
    NIN: string,
    nom: string,
    prenom: string,
    date_naissance: Date,
    lieu_naissance: string,
    specialite: string,
    sexe: string,
    email: string,
    telephone: string
    addresse: string,
}
type Infirmier = {
    NIN: string,
    nom: string,
    prenom: string,
    date_naissance: Date,
    lieu_naissance: string,
    sexe: string,
    email: string,
    telephone: string
    addresse: string,
}
type Agent = {
    NIN: string,
    nom: string,
    prenom: string,
    date_naissance: Date,
    lieu_naissance: string,
    sexe: string,
    email: string,
    telephone: string
    addresse: string,
}

type Role = { 
    id: string,
    nom: string,
    permissions: string[]
}