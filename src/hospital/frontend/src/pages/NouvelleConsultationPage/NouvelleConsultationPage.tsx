import Card from "../../components/UI/Card";
import Tabs from "../../components/UI/Tabs/Tabs";
import TabInfoPersonelles from "../PatientPage/Tabs/TabInfoPersonelles";
import TabHistorique from "../PatientPage/Tabs/TabHistorique";
import TabMotif from "./Tabs/TabMotif";
import TabExamenClinique from "./Tabs/TabExamenClinique";
import TabDiagnostique from "./Tabs/TabDiagnostique";
import { useContext, useEffect, useState } from "react";
import TabContent from "../../components/UI/Tabs/TabContent";
import PatientsSelect from "../../components/Selects/PatientsSelect";
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
import { useLocation, useNavigate } from "react-router-dom";

function NouvelleConsultationPage() {
  const { showAlert } = useContext(AlertsContext);
  const navigate = useNavigate();
  const [ NIN ] = useState(useLocation().state);
  useEffect(()=>{
    if(!NIN)
      return;

    setPatient({NIN: NIN, nom:"", prenom:""})
    setValidPatient(true);
    setValue('patient', NIN)
  }, [NIN])

  const [state, setState] = useState<Record<string, boolean>>({
    prescriptions_active: false,
    radios_active: false,
    bilans_active: false,
    interventions_active: false,
    arret_de_travail_active: false,
    prochaine_consultation_active: true,
  });

  const [validPatient, setValidPatient] = useState(false);
  const [patient, setPatient] = useState({NIN:"", nom:"", prenom:""});

  const { register, handleSubmit, getValues, setValue, formState:{errors} } = useForm<Partial<Consultation>>();
  register('patient', {required: true});

  const [examens_cliniques, setExamensCliniques] = useState<ExamenClinique[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [radios, setRadios] = useState<Partial<Radio>[]>([]);
  const [bilans, setBilans] = useState<Partial<Bilan>[]>([]);
  const [interventions, setInterventions] = useState<Partial<Intervention>[]>([]);

  const onSubmit: SubmitHandler<Partial<Consultation>> = async (data : Partial<Consultation>) => {
    try{
      data.examens_cliniques = examens_cliniques;
      data.prescriptions = state.prescriptions_active? prescriptions : [];
      data.radios = state.radios_active? radios : [];
      data.bilans = state.bilans_active? bilans : [];
      data.interventions = interventions;

      if (!state.arret_de_travail_active)
        data.duree_arret_de_travail = undefined;
      
      if (!state.prochaine_consultation_active)
        data.prochaine_consultation = undefined;
	
      console.log(data);
      await axios.post(`${baseURL}/api/consultations`, data);
      showAlert("success", "Consultation ajouté correctement");
      navigate(`/patients/${data.patient}`)
    } catch (error: any) {
        if (error.response)
          if(error.response?.data?.errorCode != "form-validation")
            showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
        else
            showAlert("error", error.code + ": " + error.message);
    }
  }

  function select_patient(patient: any) {
    if (patient){
      setPatient({NIN: patient.NIN!, nom: patient.nom!, prenom:patient.prenom!})
      setValue('patient', patient.NIN);
    }
  }

  function choosePatient() {
    if (patient.NIN !== "") setValidPatient(true);
    else setValidPatient(false);
  }

  function updateState(id: string, value: boolean) {
    setState((state) => ({ ...state, [id]: value }))
  }

  return (
    <>
      {!validPatient && (
        <Card title="Choisir un patient?" subtitle="Veuillez sélectionner un patient" className="w-full max-w-[500px]">
          <div className="flex w-inherit">
            <PatientsSelect placeholder="Rechercher un patient" onChange={select_patient} state={{ NIN: patient.NIN!, nom: patient.nom!, prenom: patient.prenom!, }} />
            <button className="primary ms-3" onClick={choosePatient}>Choisir</button>
          </div>
        </Card>
      )}

      {validPatient && (
        <Card title="New patient" subtitle="You wanna add a new patient huh?" className="w-full" >
          <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs keepVisible={true}>
            <TabContent icon="fa fa-user" text="Informations Personnelles">
              <TabInfoPersonelles NIN={patient!.NIN!} />
            </TabContent>

            <TabContent icon="fa fa-timeline" text="Historique Médicale">
              <TabHistorique NIN={patient!.NIN!} />
            </TabContent>

            <TabContent icon="fa fa-clipboard-question" text="Motif de la consultation">
              <TabMotif form={{register, getValues, setValue, errors}} />
            </TabContent>

            <TabContent icon="fa fa-stethoscope" text="Examen clinique">
              <TabExamenClinique examens_cliniques={examens_cliniques} setExamensCliniques={setExamensCliniques} />
            </TabContent>

            <TabContent icon="fa fa-user-doctor" text="Diagnostique">
              <TabDiagnostique form={{register, getValues, setValue, errors}} />
            </TabContent>

            <TabContent icon="fa fa-hand-holding-medical" text="Prise en charge">
              <h3 className="text-lg mb-0">Prise en charge</h3>
              <p className="mb-2">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
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
            <button className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0">
              Submit
            </button>
          </div>
          </form>
        </Card>
      )}
    </>
  );
}

export default NouvelleConsultationPage;
