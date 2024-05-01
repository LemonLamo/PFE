import { Link } from "react-router-dom";
import Card from "../../components/UI/Card";
import PatientsSelect from "../../components/Selects/PatientsSelect";
import { useContext, useEffect, useState } from "react";
import MedecinsSelect from "../../components/Selects/MedecinsSelect";
import axios from "axios";
import { baseURL } from "../../config";
import AuthContext from "../../hooks/AuthContext";
import AlertsContext from "../../hooks/AlertsContext";
import { SubmitHandler, useForm } from "react-hook-form";

function DashboardReception(){
    const { showAlert } = useContext(AlertsContext);
  
    const { register, handleSubmit, getValues, setValue, reset, formState:{errors} } = useForm<any>();
    register('patient', {required: true});
    register('medecin', {required: false});

    const onSubmit: SubmitHandler<any> = async (data : any) => {
        try{
            await axios.post(`${baseURL}/api/reception`, data);
            reset();
            showAlert("success", "Patient ajouté correctement");
        } catch (error: any) {
            if (error.response)
                if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
            else
                showAlert("error", error.code + ": " + error.message);
        }
    }

    const create_patient = (<Link className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" to="/patients/new">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouveau</span>
    </Link>)
    const auth = useContext(AuthContext)
    const [hopitaux, setHopitaux] = useState<any[]>([]);
    const [patient, setPatient] = useState({NIN:"", nom:"", prenom:""});
    const [medecin, setMedecin] = useState({NIN:"", nom:"", prenom:""});

    function select_patient(patient: Partial<Personnel>){
        if(patient){
            setPatient({NIN: patient.NIN!, nom: patient.nom!, prenom:patient.prenom!})
            setValue('patient', patient.NIN);
        }
    }

    function select_medecin(medecin: Partial<Personnel>){
        if(medecin){
            setMedecin({NIN: medecin.NIN!, nom: medecin.nom!, prenom:medecin.prenom!})
            setValue('medecin', medecin.NIN);
        }
    }

    useEffect(()=>{
        axios.get(`${baseURL}/api/hopitaux/${auth!.hopital}/services`).then((response)=>{
            setHopitaux(response.data)
            if(response.data.length > 0)
                setValue('service', response.data[0].service)
        })
    }, [])
    
    return <>
        <Card title="Rechercher un patient" subtitle="Vous pouvez l'ajouter s'il n'existe pas encore" className="w-full max-w-[800px]" action={create_patient}>
            <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                <div className="grid grid-cols-4 gap-2 mb-3 mt-3">
                    <label className="text-sm font-semibold">Patient<span className="text-red-500">*</span></label>
                    <PatientsSelect className={`col-span-3 primary ${errors.patient && 'has-error'}`} placeholder="Rechercher un patient" onChange={select_patient} state={{ NIN: patient.NIN!, nom: patient.nom!, prenom: patient.prenom! }} />

                    <label className="text-sm font-semibold">Service<span className="text-red-500">*</span></label>
                    <select className={`col-span-3 primary ${errors.service && 'has-error'}`} {...register("service", {required: true})}>
                        { hopitaux.map((h, i) => (<option value={h?.service} key={i}> {h?.service}</option>)) }
                    </select>

                    <label className="text-sm font-semibold">Medecin</label>
                    <MedecinsSelect className="col-span-3" placeholder="Affecter un medecin" hopital={auth?.hopital!} service={getValues('service')} onChange={select_medecin} state={{ NIN: medecin.NIN!, nom: medecin.nom!, prenom: medecin.prenom! }} />
                </div>
                <button className="primary ms-3 float-right"> Affecter </button>
            </form>
        </Card>
    </>
}

export default DashboardReception;