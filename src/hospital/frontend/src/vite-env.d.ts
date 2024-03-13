/// <reference types="vite/client" />
type LoginFormProps = {
    formActions: LoginFormActions
    NIN?: string
    setNIN?: React.Dispatch<React.SetStateAction<string>>
}
type LoginFormActions = {
    swapToLogin: () => void,
    swapTo2FA: () => void,
    swapToResetPassword: () => void,
}
type Consultation = {
    code_consultation: string,
    nom_hopital: string,
    medecin: Partial<Medecin>,
    patient: Partial<Patient>,
    date_consultation: Date,
    type_consultation: string,
    motif_consultation: string,
    symptomes: string,
    resume_consultation: string,
    examens_cliniques: ExamenClinique[],
    diagnostique: string,
    diagnostique_details: string,
    prescriptions: Prescription[],
    radiologie: Radio[],
    analyses: Analyse[],
    interventions: Intervention[],
    prochaine_consultation: Date | null,
}
type Hospitalisation = {
    code_hospitalisation: string,
    nom_hopital: string,
    medecin: Partial<Medecin>,
    patient: Partial<Patient>,
    date_entree: Date,
    mode_entree: string,
    motif_hospitalisation: string,
    date_sortie_prevu: Date,
    date_sortie?: Date,
    mode_sortie?: string,
    resume_hospitalisation: string,
}
type Intervention = {
    code_intervention: string,
    nom: string,
    nom_hopital: string,
    medecin: Partial<Medecin>,
    patient: Partial<Patient>,
    date?: Date,
    protocole_operatoire?: string,
    remarques?: string
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
type Patient = {
    NIN: string,
    nom: string,
    prenom: string,
    date_naissance: Date,
    lieu_naissance: string,
    sexe: string,
    situation_familiale: string,
    email: string,
    telephone: string
    addresse: string,
}
type ExamenClinique = {
    code: string,
    nom: string,
    resultat: string,
    remarques?: string
}
type Prescription = {
    code: string,
    nom: string,
    posologie: number,
    frequence: number,
    duree: number,
    remarques?: string
}
type Medicament = {
    code: string,
    nom: string,
    quantite?: number
}
type Transaction = {
    id: string,
    date: Date,
    medicament: Partial<Medicament>,
    avant: number,
    difference: number,
    responsable?: string,
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
    etage: number,
    description: string,
    nombre_lits: number,
    nombre_lits_occupe?: number
}
type Role = { 
    id: string,
    nom: string,
    permissions: string[]
}

// placeholder
type Agent = {
    NIN: string,
    nom: string,
    prenom: string,
    date_naissance: Date | null,
    lieu_naissance: string,
    sexe: string,
    email: string,
    telephone: string
    addresse: string,
}