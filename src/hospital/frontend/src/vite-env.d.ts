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
  id: string;
  patient: Partial<Patient>;
  medecin: Partial<Personnel>;
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
  bilans: Bilan[];
  interventions: Partial<Intervention>[];
  prochaine_consultation: Date | null;
  duree_arret_de_travail: number;
};
type Hospitalisation = {
  id: string;
  patient: Partial<Patient>;
  medecin: Partial<Personnel>;
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
  id: string;
  code_intervention: string;
  designation?: string;
  patient: Partial<Patient>;
  medecin: Partial<Personnel>;
  nom_hopital: string;
  date?: Date;
  protocole_operatoire?: string;
  remarques?: string;
};
type InterventionCode = {
  code_intervention: string;
  designation: string;
}
type ExamenClinique = {
  code_examen_clinique: string;
  designation?: string;
  resultat: string;
  remarques?: string;
};
type ExamenCliniqueCode = {
  code_examen_clinique: string;
  designation: string;
}
type Vaccination = {
  code_vaccin: string;
  designation?: string;
  date: Date;
  remarques?: string;
  nombre_de_doses: number;
  date_de_prochaine_dose: string;
};
type VaccinationCode = {
  code_vaccin: string;
  designation: string;
}
type Allergie = {
  code_allergene: string;
  designation?: string;
  date?: Date;
  remarques?: string;
};
type AllergieCode = {
  code_allergene: string;
  designation: string;
}
type Antecedent = {
  patient?: string;
  designation?: string;
  date?: Date;
  remarques?: string;
};
type Maladie = {
  patient?: string;
  code_maladie: string;
  designation?: string;
  date: Date;
  chronique?: boolean;
  remarques?: string;
};
type MaladieCode = {
  code_maladie: string;
  designation: string;
}
type Radio = {
  id: string;
  patient: Partial<Patient>
  code_radio: string;
  designation?: string;
  date: Date;
  date_fait?: Date;
  remarques?: string;
  fichiers?: File[];
};
type RadioCode = {
  code_radio: string;
  designation: string;
}
type Bilan = {
  id: string;
  patient: Partial<Patient>
  code_bilan: string;
  designation?: string;
  date: Date;
  date_fait?: Date;
  remarques?: string;
  fichiers?: File[];
};
type BilanCode = {
  code_bilan: string;
  designation: string;
}
type Prescription = {
  code_medicament: string;
  DCI?: string;
  date_debut: Date;
  posologie: number;
  frequence: number;
  duree: number;
  remarques?: string;
};
type MedicamentCode = {
  code_medicament: string;
  DCI: string;
};
type Medicament = {
  code_medicament: string;
  DCI: string;
  quantite: number;
};
type Transaction = {
  id: string;
  date: Date;
  avant: number;
  difference: number;
};
type Patient = {
  NIN: string;
  nom: string;
  prenom: string;
  date_de_naissance: Date;
  lieu_de_naissance: string;
  sexe: string;
  situation_familiale: string;
  email: string;
  telephone: string;
  adresse: string;
  code_postale: number;
  commune: string;
  wilaya: string;
  groupage: string;
  taille: number;
  poids: number;
  donneur_organe: boolean;
};
type Chambre = {
  num: string;
  etage: number;
  description?: string;
  nombre_lits?: number;
  nombre_lits_occupe?: number;
  lits?: Lit[];
};
type Lit = {
  num: number;
  type: string;
  numChambre?: string;
  description?: string;
  occupe?: boolean;
};
type Role = {
  id: string;
  nom: string;
  permissions: string[];
};
type Personnel = {
  NIN: string;
  nom: string;
  prenom: string;
  date_de_naissance: Date;
  lieu_de_naissance: string;
  sexe: string;
  email: string;
  telephone: string;
  fonction: string;
  specialite: string;
  grade: string;
  adresse: string;
  code_postale: number;
  commune: string;
  wilaya: string;
  hopital: string;
  service: string;
};
type Soin = {
  code_soin: string;
  patient: Partial<Patient>;
  medecin: Partial<Personnel>;
  infirmier: Partial<Personnel>;
  hospitalisation?: Partial<Hospitalisation>;
  nom_hopital: string;
  acte: string;
  date_soin: Date;
  details: string;
  fait: boolean;
};

type Notif = {
  id: string,
  NIN: string,
  email: string,
  telephone: string,
  type: string,
  title: string,
  summary: string,
  data: string,
  read_at: Date,
  created_at: Date,
}