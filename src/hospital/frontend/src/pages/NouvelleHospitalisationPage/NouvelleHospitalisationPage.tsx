import Card from "../../components/UI/Card";
import { useContext, useEffect, useState } from "react";
import PatientsSelect from "../../components/Selects/PatientsSelect";
import Tabs from "../../components/UI/Tabs/Tabs";
import TabContent from "../../components/UI/Tabs/TabContent";
import TabInfoPersonelles from "../PatientPage/Tabs/TabInfoPersonelles";
import TabHistorique from "../PatientPage/Tabs/TabHistorique";
import TabHospitalisation from "./TabHospitalisation";
import axios from "axios";
import { baseURL } from "../../config";
import AlertsContext from "../../hooks/AlertsContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

function NouvelleHospitalisationPage() {
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
  
  const [validPatient, setValidPatient] = useState(false);
  const [patient, setPatient] = useState({NIN:"", nom:"", prenom:""});

  const { register, handleSubmit, getValues, setValue, formState:{errors}, watch } = useForm<Partial<Hospitalisation>>();
  register('patient', {required: true});
  const onSubmit: SubmitHandler<Partial<Hospitalisation>> = async (data : Partial<Hospitalisation>) => {
    try{
        if(!confirm("Êtes-vous sûr de vouloir continuer? Cette action est irréversible et ces données ne pourront plus être modifiées par la suite."))
          return;
        
        await axios.post(`${baseURL}/api/hospitalisations`, data);
        await axios.post(`${baseURL}/api/chambres/${data.chambre}/lits/${data.lit}/occuper`)
        await axios.delete(`${baseURL}/reception/${data.patient}`);
        showAlert("success", "Hospitalisation ajouté correctement");
        navigate(`/hospitalisations`)
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

  return (
    <>
      {!validPatient && (
        <Card
          title="Choisir un patient?"
          subtitle="Veuillez sélectionner un patient"
          className="w-full max-w-[500px]"
        >
          <div className="flex w-inherit">
            <PatientsSelect
              placeholder="Rechercher un patient"
              onChange={select_patient}
              state={{
                NIN: patient.NIN!,
                nom: patient.nom!,
                prenom: patient.prenom!,
              }}
            />
            <button type="button" className="primary ms-3" onClick={choosePatient}>Choisir</button>
          </div>
        </Card>
      )}

      {validPatient && (
        <Card title="New patient" subtitle="You wanna add a new patient huh?" className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tabs keepVisible={true}>
              <TabContent icon="fa fa-user" text="Informations Personnelles">
                <TabInfoPersonelles NIN={patient.NIN!} />
              </TabContent>

              <TabContent icon="fa fa-timeline" text="Historique Médicale">
                <TabHistorique NIN={patient.NIN!} />
              </TabContent>

              <TabContent icon="fa fa-bed-pulse" text="Hospitalisation">
                <TabHospitalisation form={{register, getValues, setValue, errors, watch}}/>
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

export default NouvelleHospitalisationPage;
