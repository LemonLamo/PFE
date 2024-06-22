import Card from "../../components/UI/Card";
import Tabs from "../../components/UI/Tabs/Tabs";
import TabInfoPersonelles from "../PatientPage/Tabs/TabInfoPersonelles";
import TabHistorique from "../PatientPage/Tabs/TabHistorique";
import TabMotif from "./Tabs/TabMotif";
import TabExamenClinique from "./Tabs/TabExamenClinique";
import TabDiagnostique from "./Tabs/TabDiagnostique";
import { useContext, useState } from "react";
import TabContent from "../../components/UI/Tabs/TabContent";
import { baseURL } from "../../config";
import axios from "axios";
import AlertsContext from "../../hooks/AlertsContext";
import { SubmitHandler, useForm } from "react-hook-form";
import PerscriptionsSection from "./Tabs/Sections_TabPriseEnCharge/PerscriptionsSection";
import RadiologieSection from "./Tabs/Sections_TabPriseEnCharge/RadiologieSection";
import BilansSection from "./Tabs/Sections_TabPriseEnCharge/BilansSection";
import InterventionsSection from "./Tabs/Sections_TabPriseEnCharge/InterventionsSection";
import ArretDeTravailSection from "./Tabs/Sections_TabPriseEnCharge/ArretDeTravailSection";
import ProchaineConsultationSection from "./Tabs/Sections_TabPriseEnCharge/ProchaineConsultationSection";
import { useNavigate } from "react-router-dom";
import PatientsSelector from "../../components/PatientSelector";
import Button from "../../components/UI/Buttons/Button";

function NouvelleConsultationPage() {
  const { showAlert } = useContext(AlertsContext);
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [patient, setPatient] = useState<Partial<Patient>>({NIN:"", nom:"", prenom:""});

  function select_patient(patient: any) {
    if (patient){
      setPatient({NIN: patient.NIN!, nom: patient.nom!, prenom:patient.prenom!})
      setValue('patient', patient.NIN);
    }
  }

  const [state, setState] = useState<Record<string, boolean>>({
    prescriptions_active: false,
    radios_active: false,
    bilans_active: false,
    interventions_active: false,
    arret_de_travail_active: false,
    prochaine_consultation_active: true,
  });

  const { register, handleSubmit, getValues, setValue, formState:{errors} } = useForm<Partial<Consultation>>();
  register('patient', {required: true});
  
  const [examens_cliniques, setExamensCliniques] = useState<ExamenClinique[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [radios, setRadios] = useState<Partial<Radio>[]>([]);
  const [bilans, setBilans] = useState<Partial<Bilan>[]>([]);
  const [interventions, setInterventions] = useState<Partial<Intervention>[]>([]);

  function updateState(id: string, value: boolean) {
    setState((state) => ({ ...state, [id]: value }))
  }

  const onSubmit: SubmitHandler<Partial<Consultation>> = async (data : Partial<Consultation>) => {
    try{
      if(!confirm("Êtes-vous sûr de vouloir continuer? Cette action est irréversible et ces données ne pourront plus être modifiées par la suite."))
        return;
      
      data.examens_cliniques = examens_cliniques;
      data.prescriptions = state.prescriptions_active? prescriptions : [];
      data.radios = state.radios_active? radios : [];
      data.bilans = state.bilans_active? bilans : [];
      data.interventions = interventions;

      if (!state.arret_de_travail_active)
        data.duree_arret_de_travail = undefined;
      
      if (!state.prochaine_consultation_active)
        data.prochaine_consultation = undefined;
	
      await axios.post(`${baseURL}/api/consultations`, data);
      showAlert("success", "Consultation ajouté correctement");
      navigate(`/`)
    } catch (error: any) {
      if (error.response)
        if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
        else
        showAlert("error", error.code + ": " + error.message);
      return;
    }
    await axios.delete(`${baseURL}/api/reception/${data.patient}`);
  }

  return (
      step < 2 ?
        <PatientsSelector step={step} setStep={setStep} patient={patient} select_patient={select_patient} motif="Consultation"/>:
        <Card title="Nouvelle consultation" subtitle="Remplissez ce formulaire pour enregistrer une nouvelle consultation" className="w-full" >
          <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs keepVisible={true} selected={selectedTab} setSelected={setSelectedTab}>
            <TabContent icon="fa fa-user" text="Informations personnelles">
              <TabInfoPersonelles NIN={patient!.NIN!} link={true}  />
            </TabContent> 

            <TabContent icon="fa fa-timeline" text="Historique Médical">
              <TabHistorique NIN={patient!.NIN!} link={true}  />
            </TabContent>

            <TabContent icon="fa fa-clipboard-question" text="Motif de la consultation">
              <TabMotif form={{register, getValues, setValue, errors}} />
            </TabContent>

            <TabContent icon="fa fa-stethoscope" text="Examen clinique">
              <TabExamenClinique examens_cliniques={examens_cliniques} setExamensCliniques={setExamensCliniques} />
            </TabContent>

            <TabContent icon="fa fa-user-doctor" text="Diagnostic">
              <TabDiagnostique form={{register, getValues, setValue, errors}} />
            </TabContent>

            <TabContent icon="fa fa-hand-holding-medical" text="Prise en charge">
              <h3 className="text-lg mb-0">Prise en charge</h3>
              <p className="mb-2">Cette section concerne la prise en charge du patient suite à la consultation.</p>
              <div className="">
                <PerscriptionsSection state={state} updateState={updateState} prescriptions={prescriptions} setPrescriptions={setPrescriptions} />
                <RadiologieSection state={state} updateState={updateState} radios={radios} setRadios={setRadios} />
                <BilansSection state={state} updateState={updateState} bilans={bilans} setBilans={setBilans} />
                <InterventionsSection state={state} updateState={updateState} interventions={interventions} setInterventions={setInterventions} />
                <ArretDeTravailSection state={state} updateState={updateState} form={{register, getValues, setValue, errors}} />
                <ProchaineConsultationSection state={state} updateState={updateState} form={{register, getValues, setValue, errors}} />
              </div>
            </TabContent>
          </Tabs>

          <div className="w-full flex justify-end">
            <Button type="submit" theme="primary" onClick={() => null} disabled={selectedTab < 5}>
              Enregistrer
            </Button>
          </div>
          </form>
        </Card>
  );
}

export default NouvelleConsultationPage;
