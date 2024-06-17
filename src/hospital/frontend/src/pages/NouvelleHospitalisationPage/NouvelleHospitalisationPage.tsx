import Card from "../../components/UI/Card";
import { useContext, useState } from "react";
import Tabs from "../../components/UI/Tabs/Tabs";
import TabContent from "../../components/UI/Tabs/TabContent";
import TabInfoPersonelles from "../PatientPage/Tabs/TabInfoPersonelles";
import TabHistorique from "../PatientPage/Tabs/TabHistorique";
import TabHospitalisation from "./TabHospitalisation";
import axios from "axios";
import { baseURL } from "../../config";
import AlertsContext from "../../hooks/AlertsContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PatientsSelector from "../../components/PatientSelector";
import Button from "../../components/UI/Buttons/Button";

function NouvelleHospitalisationPage() {
  const { showAlert } = useContext(AlertsContext);
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(0);
  const [patient, setPatient] = useState<Partial<Patient>>({ NIN: "", nom: "", prenom: "" });
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const { register, handleSubmit, getValues, setValue, formState:{errors}, watch } = useForm<Partial<Hospitalisation>>();
  register('patient', {required: true});

  function select_patient(patient: any) {
    if (patient){
      setPatient({NIN: patient.NIN!, nom: patient.nom!, prenom:patient.prenom!})
      setValue('patient', patient.NIN);
    }
  }

  const onSubmit: SubmitHandler<Partial<Hospitalisation>> = async (data : Partial<Hospitalisation>) => {
    try{
      if(!confirm("Êtes-vous sûr de vouloir continuer? Cette action est irréversible et ces données ne pourront plus être modifiées par la suite."))
        return;
      
      await axios.post(`${baseURL}/api/hospitalisations`, data);
      await axios.post(`${baseURL}/api/chambres/${data.chambre}/lits/${data.lit}/occuper`)
      showAlert("success", "Hospitalisation ajouté correctement");
      navigate(`/hospitalisations`)
    } catch (error: any) {
      if (error.response)
        if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
        else
        showAlert("error", error.code + ": " + error.message);
      return;
    }
    await axios.delete(`${baseURL}/reception/${data.patient}`);
  }

  return (
    step < 2 ?
      <PatientsSelector step={step} setStep={setStep} patient={patient} select_patient={select_patient} motif="Hospitalisation"/>:
      <Card title="New patient" subtitle="You wanna add a new patient huh?" className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs keepVisible={true} selected={selectedTab} setSelected={setSelectedTab}>
            <TabContent icon="fa fa-user" text="Informations Personnelles">
              <TabInfoPersonelles NIN={patient.NIN!} link={true} />
            </TabContent>

            <TabContent icon="fa fa-timeline" text="Historique Médicale">
              <TabHistorique NIN={patient.NIN!} />
            </TabContent>

            <TabContent icon="fa fa-bed-pulse" text="Hospitalisation">
              <TabHospitalisation form={{register, getValues, setValue, errors, watch}}/>
            </TabContent>
          </Tabs>

          <div className="w-full flex justify-end">
            <Button type="submit" theme="primary" onClick={()=>null} disabled={selectedTab < 2}>
              Enregistrer
            </Button>
          </div>
        </form>
      </Card>
  );
}

export default NouvelleHospitalisationPage;
