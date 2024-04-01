import Card from "../../components/UI/Card"
import { useState } from "react"
import PatientsSelect from "../../components/Selects/PatientsSelect"
import Tabs from "../../components/UI/Tabs/Tabs"
import TabContent from "../../components/UI/Tabs/TabContent"
import TabInfoPersonelles from "../PatientPage/Tabs/TabInfoPersonelles"
import TabHistorique from "../PatientPage/Tabs/TabHistorique"
import TabHospitalisation from "../NouvelleConsultationPage/Tabs/TabHospitalisation"
import axios, { AxiosError } from "axios"
import { baseURL } from "../../config"

function NouvelleHospitalisationPage() {
  const [validPatient, setValidPatient] = useState(false)
  const [hospitalisationData, setHospitalisationData] = useState<Partial<Hospitalisation>>({
    patient: {NIN: '', nom:'', prenom:''},
    date_entree: new Date(),
    chambre: '',
    lit: -1,
    mode_entree: 'Hospitalisation complète',
    motif_hospitalisation: '',    
    resume_hospitalisation: '',
  })

  function select_patient(patient: any) {
    if (patient)
      setHospitalisationData(data => ({...data, patient: {NIN: patient.NIN, nom: patient.nom, prenom: patient.prenom}}))
  }

  function choosePatient() {
    if (hospitalisationData.patient!.NIN !== "")
      setValidPatient(true);
    else
      setValidPatient(false);
  }

  async function submit (){
    try {
      const data = {...hospitalisationData, patient:hospitalisationData.patient?.NIN!}
      await axios.post(`${baseURL}/api/ehr/hospitalisations`, data);
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
            <PatientsSelect placeholder="Rechercher un patient" onChange={select_patient} state={{ NIN: hospitalisationData.patient!.NIN!, nom: hospitalisationData.patient!.nom!, prenom: hospitalisationData.patient!.prenom! }} />
            <button className="primary ms-3" onClick={choosePatient}> Choisir </button>
          </div>
        </Card>
      }

      {validPatient &&
        <Card title="New patient" subtitle="You wanna add a new patient huh?" className="w-full">
          <Tabs>
            <TabContent icon="fa fa-user" text="Informations Personnelles" >
              <TabInfoPersonelles NIN={hospitalisationData.patient!.NIN!} />
            </TabContent>

            <TabContent icon="fa fa-user" text="Historique Médicale" >
              <TabHistorique NIN={hospitalisationData.patient!.NIN!} />
            </TabContent>

            <TabContent icon="fa fa-user" text="Hospitalisation" >
              <TabHospitalisation hospitalisationData={hospitalisationData} setHospitalisationData={setHospitalisationData} />
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

export default NouvelleHospitalisationPage