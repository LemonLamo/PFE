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
    examens_cliniques: [],
    diagnostique: string,
    diagnostique_details: string,
    medicaments: [],
    radiologie: [],
    analyses: [],
    interventions: [],
    prochaine_consultaiton: Date,
}
type Hospitalisation = {
    
}
type Medicament = {

}
type Chambre = {

}
type Medecin = {

}
type Infirmier = {

}
type Agent = {

}