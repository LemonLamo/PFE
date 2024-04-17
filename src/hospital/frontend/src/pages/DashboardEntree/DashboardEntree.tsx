import { Link } from "react-router-dom";
import Card from "../../components/UI/Card";
import PatientsSelect from "../../components/Selects/PatientsSelect";
import { useContext, useEffect, useState } from "react";
import MedecinsSelect from "../../components/Selects/MedecinsSelect";
import axios from "axios";
import { baseURL } from "../../config";
import AuthContext from "../../hooks/AuthContext";

function DashboardEntree(){
    const create_patient = (<Link className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" to="/nouveau_patient">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouveau</span>
    </Link>)
    const auth = useContext(AuthContext)
    const [hopitaux, setHopitaux] = useState<any[]>([]);
    const [data, setData] = useState<any>({patient: {NIN:"", nom:"", prenom:""}, service: "", medecin: {NIN:"", nom:"", prenom:""}});

    function select_patient(patient: Partial<Personnel>){
        if(patient)
            setData((x : any) => ({...x, patient: {NIN: patient.NIN, nom: patient.nom, prenom:patient.prenom}}))
    }
    function select_medecin(medecin: Partial<Personnel>){
        if(medecin)
            setData((x : any) => ({...x, medecin: {NIN: medecin.NIN, nom: medecin.nom, prenom:medecin.prenom}}))
    }

    function affecter_malade(){
        console.log(data)
    }

    useEffect(()=>{
        axios.get(`${baseURL}/api/hopitaux/${auth!.hopital}/services`).then((response)=>{
            setHopitaux(response.data)
            if(response.data.length > 0)
                setData((x : any) => ({...x, service: response.data[0].service}))
        })
    }, [])
    
    return <>
        <Card title="Rechercher un patient" subtitle="Vous pouvez l'ajouter s'il n'existe pas encore" className="w-full max-w-[800px]" action={create_patient}>
            <div className="grid grid-cols-4 gap-2 mb-3 mt-3">
                <label className="text-sm font-semibold">Patient<span className="text-red-500">*</span></label>
                <PatientsSelect className="col-span-3" placeholder="Rechercher un patient" onChange={select_patient} state={{ NIN: data.patient!.NIN!, nom: data.patient!.nom!, prenom: data.patient!.prenom! }} />

                <label className="text-sm font-semibold">Service<span className="text-red-500">*</span></label>
                <select className="col-span-3" value={data.service} onChange={(e) => setData((d: any) => ({...d, service: e.target.value}))}>
                    { hopitaux.map((h, i) => (<option value={h?.service} key={i}> {h?.service}</option>)) }
                </select>

                <label className="text-sm font-semibold">Medecin</label>
                <MedecinsSelect className="col-span-3" placeholder="Affecter un medecin" hopital={auth?.hopital!} service={data.service} onChange={select_medecin} state={{ NIN: data.medecin!.NIN!, nom: data.medecin!.nom!, prenom: data.medecin!.prenom! }} />
            </div>
            <button className="primary ms-3 float-right" onClick={affecter_malade}> Affecter </button>
        </Card>
    </>
}

export default DashboardEntree;