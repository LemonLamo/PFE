import Card from "../../components/UI/Card"
import Tabs from "../../components/UI/Tabs/Tabs"
import TabInfoPersonelles from "../../components/Tabs/TabInfoPersonelles"
import TabHistorique from "../../components/Tabs/TabHistorique"
import TabMotif from "../../components/Tabs/TabMotif"
import TabExamenClinique from "../../components/Tabs/TabExamenClinique"
import TabDiagnostique from "../../components/Tabs/TabDiagnostique"
import TabPriseEnCharge from "../../components/Tabs/TabPriseEnCharge"
import { useState } from "react"
import moment from "moment"
import TabContent from "../../components/UI/Tabs/TabContent"
import PatientsSelect from "../../components/PatientsSelect"

function NouvelleConsultationPage() {
  const [selectedPatient, setSelectedPatient] = useState({NIN: "", nom: "", prenom: ""})
  const [validPatient, setValidPatient] = useState(false)
  const [state, setState] = useState<Record<string, boolean>>({mediacments_active: false, radiologie_active: false, analyses_active: false, interventions_active: false, prochaine_consultation_active: true })
  const [consultationData, setConsultationData] = useState<Consultation>({
    code_consultation: '',
    nom_hopital: '',
    medecin: { NIN: '', nom: '', prenom: '' },
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
    analyses: [],
    interventions: [],
    prochaine_consultation: moment(new Date()).add(7).toDate()
  })
  
  function select_patient(patient: any){
    if(patient)
      setSelectedPatient({ NIN: patient.NIN, nom: patient.nom, prenom:patient.prenom })
  }

  function choosePatient(){
    if(selectedPatient.NIN !== "")
      setValidPatient(true);
    else
      setValidPatient(false);
  }


  return (
    <>
      {!validPatient &&
      <Card title="Choisir un patient?" subtitle="Pick a patient, any patient" className="w-full max-w-[500px]">
        <div className="flex w-inherit">
          <PatientsSelect placeholder="Rechercher un patient" onChange={select_patient} state={{ NIN: selectedPatient.NIN, nom: selectedPatient.nom, prenom: selectedPatient.prenom }} />
          <button className="primary ms-3" onClick={choosePatient}> Choisir </button>
        </div>
      </Card>
      }

      {validPatient &&
      <Card title="New patient" subtitle="You wanna add a new patient huh?" className="w-full">
        <Tabs>
          <TabContent icon="fa fa-user" text="Informations Personnelles" >
            <TabInfoPersonelles NIN={'100010364027390000'}/>
          </TabContent>

          <TabContent icon="fa fa-user" text="Historique Médicale" >
            <TabHistorique NIN={'100010364027390000'}/>
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
          <button className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" onClick={()=> console.log(consultationData)}>
            Submit
          </button>
        </div>
      </Card>
      }
    </>
  )
}

export default NouvelleConsultationPage