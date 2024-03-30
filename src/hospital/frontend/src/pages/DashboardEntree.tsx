import { Link } from "react-router-dom";
import Card from "../components/UI/Card";
import PatientsSelect from "../components/Selects/PatientsSelect";
import { useState } from "react";
import MedecinsSelect from "../components/Selects/MedecinsSelect";

function DashboardEntree(){
    const create_patient = (<Link className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" to="/nouveau_patient">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouveau</span>
    </Link>)
    const [patient, setPatient] = useState<Partial<Patient>>({NIN:"", nom:"", prenom:""});

    function select_patient(patient: any){
        if(patient)
            setPatient({NIN: patient.NIN, nom: patient.nom, prenom:patient.prenom})
    }
    
    return <>
        <Card title="Rechercher un patient" subtitle="Vous pouvez l'ajouter s'il n'existe pas encore" className="w-full max-w-[800px]" action={create_patient}>
            <div className="grid grid-cols-4 gap-2 mb-3 mt-3">
                <label className="text-sm font-semibold">Patient</label>
                <PatientsSelect className="col-span-3" placeholder="Rechercher un patient" onChange={select_patient} state={{ NIN: patient!.NIN!, nom: patient!.nom!, prenom: patient!.prenom! }} />

                <label className="text-sm font-semibold">Service</label>
                <select className="col-span-3">
                    <option>Pédiatrie</option>
                    <option>Radiologie</option>
                    <option>Cardiologie</option>
                    <option>Idk</option>
                </select>

                <label className="text-sm font-semibold">Medecin</label>
                <MedecinsSelect className="col-span-3" placeholder="Affecter un medecin" onChange={select_patient} state={{ NIN: patient!.NIN!, nom: patient!.nom!, prenom: patient!.prenom! }} />
            </div>
            <button className="primary ms-3 float-right" onClick={() => console.log(patient)}> Affecter </button>
        </Card>
    </>
}

export default DashboardEntree;