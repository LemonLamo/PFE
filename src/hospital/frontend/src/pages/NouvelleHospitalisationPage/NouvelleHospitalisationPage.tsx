import Card from "../../components/UI/Card"
import { useState } from "react"
import moment from "moment"
import PatientsSelect from "../../components/PatientsSelect"
import Tabs from "../../components/UI/Tabs/Tabs"
import TabContent from "../../components/UI/Tabs/TabContent"
import TabInfoPersonelles from "../../components/Tabs/TabInfoPersonelles"
import TabHistorique from "../../components/Tabs/TabHistorique"
import TabHospitalisation from "../../components/Tabs/TabHospitalisation"

function NouvelleHospitalisationPage() {
  const [selectedPatient, setSelectedPatient] = useState({ NIN: "", nom: "", prenom: "" })
  const [validPatient, setValidPatient] = useState(false)
  const [hospitalisationData, setHospitalisationData] = useState<Hospitalisation>({
    code_hospitalisation: '',
    nom_hopital: '',
    medecin: {NIN: '', nom:'', prenom:''},
    patient: {NIN: '', nom:'', prenom:''},
    date_entree: new Date(),
    mode_entree: '',
    motif_hospitalisation: '',

    date_sortie_prevu: moment(new Date()).add(7, 'd').toDate(),
    
    resume_hospitalisation: '',
  })

  const patients = [
    { NIN: "100010364027390000", nom: "BRAHIM", prenom: "Abderrazak" },
    { NIN: "111111111111111111", nom: "NADIL", prenom: "Marwa" },
    { NIN: "101111111111111111", nom: "Kanye", prenom: "West" }
  ]
  function select_patient(patient: any) {
    setSelectedPatient({ NIN: patient.NIN, nom: patient.nom, prenom: patient.prenom })
    console.log(patient)
  }

  function choosePatient() {
    if (selectedPatient.NIN !== "")
      setValidPatient(true);
    else
      setValidPatient(false);
  }


  return (
    <>
      {!validPatient &&
        <Card title="Choisir un patient?" subtitle="Pick a patient, any patient" className="w-full max-w-[500px]">
          <div className="flex w-inherit">
            <PatientsSelect options={patients} placeholder="Rechercher un patient" onChange={select_patient} state={{ NIN: selectedPatient.NIN, nom: selectedPatient.nom, prenom: selectedPatient.prenom }} />
            <button className="primary ms-3" onClick={choosePatient}> Choisir </button>
          </div>
        </Card>
      }

      {validPatient &&
        <Card title="New patient" subtitle="You wanna add a new patient huh?" className="w-full">
          <Tabs>
            <TabContent icon="fa fa-user" text="Informations Personnelles" >
              <TabInfoPersonelles NIN={'100010364027390000'} />
            </TabContent>

            <TabContent icon="fa fa-user" text="Historique Médicale" >
              <TabHistorique NIN={'100010364027390000'} />
            </TabContent>

            <TabContent icon="fa fa-user" text="Hospitalisation" >
              <TabHospitalisation hospitalisationData={hospitalisationData} setHospitalisationData={setHospitalisationData} />
            </TabContent>
          </Tabs>

          <div className="w-full flex justify-end">
            <button className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" onClick={() => console.log(hospitalisationData)}>
              Submit
            </button>
          </div>
        </Card>
      }
    </>
  )
}

export default NouvelleHospitalisationPage