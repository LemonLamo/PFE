/// <reference types="vite/client" />
type LoginFormProps = {
  formActions: LoginFormActions;
  NIN?: string;
  setNIN?: React.Dispatch<React.SetStateAction<string>>;
};
type LoginFormActions = {
  swapToLogin: () => void;
  swapTo2FA: () => void;
};
type Consultation = {
  code_consultation: string;
  patient: Partial<Patient>;
  medecin: Partial<Medecin>;
  nom_hopital: string;
  date_consultation: Date;
  type_consultation: string;
  motif_consultation: string;
  symptomes: string;
  resume_consultation: string;
  examens_cliniques: ExamenClinique[];
  diagnostique: string;
  diagnostique_details: string;
  prescriptions: Prescription[];
  radiologie: Radio[];
  analyses: Analyse[];
  interventions: Intervention[];
  prochaine_consultation: Date | null;
};
type Hospitalisation = {
  code_hospitalisation: string;
  patient: Partial<Patient>;
  medecin: Partial<Medecin>;
  nom_hopital: string;
  date_entree: Date;
  mode_entree: string;
  motif_hospitalisation: string;
  chambre?: string;
  lit?: number;
  date_sortie?: Date;
  mode_sortie?: string;
  resume_hospitalisation?: string;
};
type Intervention = {
  code_intervention: string;
  nom: string;
  patient: Partial<Patient>;
  medecin: Partial<Medecin>;
  nom_hopital: string;
  date?: Date;
  protocole_operatoire?: string;
  remarques?: string;
};
type Medecin = {
  NIN: string;
  nom: string;
  prenom: string;
  date_naissance: Date;
  lieu_naissance: string;
  specialite: string;
  sexe: string;
  email: string;
  telephone: string;
  addresse: string;
};
type Patient = {
  NIN: string;
  nom: string;
  prenom: string;
  date_naissance: Date;
  lieu_naissance: string;
  sexe: string;
  situation_familiale: string;
  email: string;
  telephone: string;
  groupage: string;
  taille: number;
  poids: number;
  adresse: string;
  code_postale: number;
  commune: string;
  wilaya: string;
  donneur_organe: boolean;
};
type ExamenClinique = {
  code: string;
  nom: string;
  resultat: string;
  remarques?: string;
};
type Prescription = {
  code: string;
  nom: string;
  posologie: number;
  frequence: number;
  duree: number;
  remarques?: string;
};
type Medicament = {
  code: string;
  nom: string;
  quantite?: number;
};
type Transaction = {
  id: string;
  date: Date;
  medicament: Partial<Medicament>;
  avant: number;
  difference: number;
  responsable?: string;
};
type Radio = {
  code: string;
  nom: string;
  fichiers?: File[];
  remarques?: string;
};
type Analyse = {
  code: string;
  nom: string;
  fichiers?: File[];
  remarques?: string;
};
type Chambre = {
  num: string;
  etage: number;
  description: string;
  lits?: Lit[];
  nombre_lits: number | "";
  nombre_lits_occupe?: number | "";
};
type Lit = {
  numChambre: string;
  num: number;
  type: string;
  occupe: boolean;
  remarques: string;
};
type Role = {
  id: string;
  nom: string;
  permissions: string[];
};

type Vaccination = {
  code_vaccin: string;
  intitule_vaccin: string;
  date: Date;
  remarques?: string;
  nombre_de_doses: number;
  date_de_prochaine_dose: Date;
};
type Allergie = {
  code_allergene: string;
  date: Date;
  remarques?: string;
};
type AntecedentMedicale = {
  description: string;
  remarques: string;
};
type AntecedentFamilial = {
  description: string;
  remarques: string;
};
type MaladieChro = {
  id: number;
  code: string;
  intitule: string;
  date_diagnostic: string;
  remarque: string;
};
// placeholder
type Personnel = {
  NIN: string;
  nom: string;
  prenom: string;
  date_naissance: Date | null;
  lieu_naissance: string;
  sexe: string;
  email: string;
  telephone: string;
  fonction: string;
  specialite: string;
  grade: string;
  adresse: string;
  code_postale: number | "";
  commune: string;
  wilaya: string;
};
