/// <reference types="vite/client" />
type LoginFormProps = {
    formActions: LoginFormActions
}
type LoginFormActions = {
    swapToLogin: () => void,
    swapTo2FA: () => void,
    swapToResetPassword: () => void,
}
type Visite = {
    date_visite: Date,
    type_visite: string,
    motif_visite: string,
    symptomes: string,
    resume_visite: string,
    examens_cliniques: ExamenClinique[],
    diagnostique: string,
    diagnostique_details: string,
    medicaments: Medicament[],
    radiologie: Radio[],
    analyses: Analyse[],
    interventions: Intervention[],
    prochaine_consultation: Date,
}
type ExamenClinique = {
    code: string,
    nom: string,
    result: string,
    remarques?: string
}
type Hospitalisation = {
    
}
type Medicament = {
    code: string,
    nom: string,
    quantity: number,
    dosage: number,
    duree: number,
    frequency: number,
    remarques?: string
}
type Radio = {
    code: string,
    nom: string,
    remarques?: string
}
type Analyse = {
    code: string,
    nom: string,
    remarques?: string
}
type Intervention = {
    code: string,
    nom: string,
    date: Date,
    remarques?: string
}
type Chambre = {
    num: string,
    etage: string,
    nombre_lits: string,
    taux_occupation: number,
}
type Medecin = {
    NIN: string,
    nom: string,
    prenom: string,
    birthday: Date,
    sexe: "Male" | "Female",
    addresse: string,
    telephone: string
}
type Infirmier = {
    NIN: string,
    nom: string,
    prenom: string,
    birthday: Date,
    sexe: "Male" | "Female",
    addresse: string,
    telephone: string
}
type Agent = {
    NIN: string,
    nom: string,
    prenom: string,
    birthday: Date,
    sexe: string,
    addresse: string,
    telephone: string
}