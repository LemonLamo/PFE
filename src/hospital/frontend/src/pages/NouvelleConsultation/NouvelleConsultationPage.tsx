import Card from "../../components/UI/Card"
import Tabs from "../../components/UI/Tabs/Tabs"
import TabInfoPersonelles from "../PatientPage/Tabs/TabInfoPersonelles"
import TabHistorique from "../PatientPage/Tabs/TabHistorique"
import TabMotif from "./Tabs/TabMotif"
import TabExamenClinique from "./Tabs/TabExamenClinique"
import TabDiagnostique from "./Tabs/TabDiagnostique"
import TabPriseEnCharge from "./Tabs/TabPriseEnCharge"
import { useState } from "react"
import moment from "moment"
import TabContent from "../../components/UI/Tabs/TabContent"
import PatientsSelect from "../../components/Selects/PatientsSelect"
import { baseURL } from "../../config"
import axios, { AxiosError } from "axios"

function NouvelleConsultationPage() {
  const [validPatient, setValidPatient] = useState(false)
  const [state, setState] = useState<Record<string, boolean>>({
    mediacments_active: false,
    radiologie_active: false,
    bilans_active: false,
    interventions_active: false,
    arret_de_travail_active: false,
    prochaine_consultation_active: true
  })
  const [consultationData, setConsultationData] = useState<Partial<Consultation>>({
    patient: { NIN: '', nom: '', prenom: '' },
    date_consultation: new Date(),
    type_consultation: '',
    motif_consultation: '',
    symptomes: '',
    resume_consultation: '',

    examens_cliniques: [],

    diagnostique: '',
    diagnostique_details: '',

    prescriptions: [],
    radiologie: [],
    bilans: [],
    interventions: [],
    prochaine_consultation: moment(new Date()).add(7).toDate()
  })
  
  function select_patient(patient: any){
    if(patient)
      setConsultationData(data => ({...data, patient:{NIN: patient.NIN, nom: patient.nom, prenom:patient.prenom} }))
  }

  function choosePatient(){
    if(consultationData.patient?.NIN !== "")
      setValidPatient(true);
    else
      setValidPatient(false);
  }

  async function submit (){
    try {
      const data = {...consultationData, patient:consultationData.patient?.NIN!}
      await axios.post(`${baseURL}/api/ehr/consultations`, data);
    } catch (err: AxiosError | any) {
      if (err.response)
        alert(err.response.data.errorCode + " - " + err.response.data.errorMessage);
      else alert("Network error!");
    }
  }

  return (
    <>
      {!validPatient &&
      <Card title="Choisir un patient?" subtitle="Pick a patient, any patient" className="w-full max-w-[500px]">
        <div className="flex w-inherit">
          <PatientsSelect placeholder="Rechercher un patient" onChange={select_patient} state={{ NIN: consultationData.patient!.NIN!, nom: consultationData.patient!.nom!, prenom: consultationData.patient!.prenom! }} />
          <button className="primary ms-3" onClick={choosePatient}> Choisir </button>
        </div>
      </Card>
      }

      {validPatient &&
      <Card title="New patient" subtitle="You wanna add a new patient huh?" className="w-full">
        <Tabs>
          <TabContent icon="fa fa-user" text="Informations Personnelles" >
            <TabInfoPersonelles NIN={consultationData.patient!.NIN!}/>
          </TabContent>

          <TabContent icon="fa fa-user" text="Historique Médicale" >
            <TabHistorique NIN={consultationData.patient!.NIN!}/>
          </TabContent>

          <TabContent icon="fa fa-user" text="Motif de la consultation" >
            <TabMotif consultationData={consultationData} setConsultationData={setConsultationData}/>
          </TabContent>

          <TabContent icon="fa fa-user" text="Examen clinique" >
            <TabExamenClinique consultationData={consultationData} setConsultationData={setConsultationData}/>
          </TabContent>

          <TabContent icon="fa fa-user" text="Diagnostique" >
            <TabDiagnostique consultationData={consultationData} setConsultationData={setConsultationData}/>
          </TabContent>

          <TabContent icon="fa fa-user" text="Prise en charge" >
            <TabPriseEnCharge consultationData={consultationData} setConsultationData={setConsultationData} state={state} setState={setState}/>
          </TabContent>
        </Tabs>

        <div className="w-full flex justify-end">
          <button className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" onClick={submit}>
            Submit
          </button>
        </div>
      </Card>
      }
    </>
  )
}

export default NouvelleConsultationPage