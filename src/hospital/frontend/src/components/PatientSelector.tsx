import { useContext, useEffect, useState } from 'react'
import Card from './UI/Card';
import { useLocation } from 'react-router-dom';
import PatientsSelect from './Selects/PatientsSelect';
import AlertsContext from '../hooks/AlertsContext';
import card from '../assets/card.gif'
import { checkEHRAuth } from '../hooks/useAuth';
import { requestEHRAuth } from '../hooks/useAuth';

type Props = {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    patient: Partial<Patient>,
    select_patient: (arg0: Partial<Patient>) => void,
    motif: string
}

function PatientsSelector({step, setStep, patient, select_patient, motif} : Props) {
    const { showAlert } = useContext(AlertsContext);
    // Init variable from location.state
    const [ NIN ] = useState(useLocation().state);
    useEffect(()=>{
        async function initVars(){
            select_patient({NIN: NIN?? "", nom:"", prenom:""})
            if(NIN){
                const authenticated = await checkEHRAuth(NIN);
                setStep(authenticated? 2 : 1);
            }
        }
        initVars();
    }, [NIN])

    async function choosePatient() {
        if (patient.NIN !== ""){
            const authenticated = await checkEHRAuth(patient.NIN!);
            setStep(authenticated? 2 : 1);
        }else setStep(0);
    }

    async function request_auth(){
        try{
            await requestEHRAuth(patient.NIN!, motif);
            showAlert("success", `Patient ${patient.nom} ${patient.prenom} has authorized you, congrats!`)
            setStep(2);
        }catch(err){
            showAlert("error", `Patient ${patient.nom} ${patient.prenom} has not authorized you, sadge!`)
        }
    }
    return (
        step == 0 ?
            <Card title="Choisir un patient?" subtitle="Veuillez sélectionner un patient" className="w-full max-w-[600px]">
                <div className="flex w-inherit">
                    <PatientsSelect placeholder="Rechercher un patient" onChange={select_patient} state={{ NIN: patient.NIN!, nom: patient.nom!, prenom: patient.prenom!, }} />
                    <button className="primary ms-3" onClick={choosePatient}>Choisir</button>
                </div>
            </Card>:

        step == 1 && 
            <Card title={`Scanner la carte de ${patient.nom} ${patient.prenom}`} subtitle={`NIN: ${patient.NIN}`} className="w-full max-w-[600px]">
                <img src={card} className='w-full'/>
                <div className='flex w-full justify-center'>
                    <button className="primary ms-3" onClick={request_auth}>DEBUG: Request auth</button>
                </div>
            </Card>
    )
}

export default PatientsSelector