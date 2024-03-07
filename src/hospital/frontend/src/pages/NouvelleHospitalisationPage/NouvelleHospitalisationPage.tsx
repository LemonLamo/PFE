import Card from "../../components/UI/Card"
import { useState } from "react"
import moment from "moment"

function NouvelleHospitalisationPage() {
  const [selectedPatient, setSelectedPatient] = useState<string>("")
  const [validPatient, setValidPatient] = useState(false)
  const [hospitalisationData, setHospitalisationData] = useState<Hospitalisation>({
    code_hospitalisation: '',
    nom_hopital: '',
    medecin: '',
    patient: '',
    date_entree: new Date(),
    mode_entree: '',
    motif_hospitalisation: '',

    date_sortie: moment(new Date()).add(7, 'd').toDate(),
    mode_sortie: '',

    resume_hospitalisation: '',
  })

  function choosePatient(){
    if(selectedPatient == '1738')
      setValidPatient(true);
    else
      setValidPatient(false);
  }


  return (
    <>
      {!validPatient &&
      <Card title="Choisir un patient?" subtitle="Pick a patient, any patient" className="w-full max-w-[500px]">
        <div className="w-inherit">
          <div className="relative flex transition-all rounded-sm ease-soft">
            <span className="text-sm ease-soft leading-5.6 absolute z-50 flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
              <i className="fas fa-user" aria-hidden="true"></i>
            </span>
              <input type="text" className="primary pl-9" placeholder="Rechercher un patient par NIN..." value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}/>
              <button className="primary ms-3" onClick={choosePatient}> Choisir </button>
          </div>
        </div>
      </Card>
      }

      {validPatient &&
      <Card title="New patient" subtitle="You wanna add a new patient huh?" className="w-full">
        <div>
          Work in progress
        </div>

        <div className="w-full flex justify-end">
          <button className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" onClick={()=> console.log("hi")}>
            Submit
          </button>
        </div>
      </Card>
      }
    </>
  )
}

export default NouvelleHospitalisationPage