import { useState } from 'react';
import Button from '../components/UI/Buttons/Button';
import Card from '../components/UI/Card';
import Timeline from '../components/UI/Timeline';
import TimelineItem from '../components/UI/Timeline/TimelineItem';
import DetailsConsultation from './PatientPage/Modals/DetailsConsultation';
import DetailsHospitalisation from './PatientPage/Modals/DetailsHospitalisation';
import DetailsIntervention from './PatientPage/Modals/DetailsIntervention';
import moment from 'moment';

    
function TestRoute() {
    const [openModal, setOpenModal] = useState('');
    const [selectedConsultation, setSelectedConsultation] = useState<Consultation>()
    const [selectedHospitalisation, setSelectedHospitalisation] = useState<Hospitalisation>()
    const [selectedIntervention, setSelectedIntervention] = useState<Intervention>()
    const timelineitems = [
        {
            id: "cons-XNDHDBZ",
            patient: {NIN: "100010364027390000", nom:"NADIL", prenom: "Marwa", date_de_naissance: new Date("2002-05-12"), sexe:"Femme"},
            medecin: {NIN: "100010364027390000", nom:"NADIL", prenom: "Marwa", specialite: "Cardiologie", service:"Pédiatrie", hopital:"CHU Beni Messous"},
            hopital: "CHU Beni Messous",
            date: new Date("2023-02-17T00:00:00.000Z"),
            type: "Evaluation de nouveau patient",
            motif: "Symptôme",
            symptomes: "Fièvre, Frissons, Toux sèche, Mal de gorge",
            resume: "Le patient s'est présenté avec des symptômes typiques de la grippe, notamment de la fièvre, des frissons, une toux sèche, un mal de gorge, un nez qui coule ou congestionné, des courbatures, de la fatigue et des maux de tête. Il n'y a pas d'antécédents de voyage récent ou de contact avec des personnes malades. Le patient rapporte que les symptômes ont commencé il ya 5 semaines",
            diagnostique: "H1N1 - Influenza A",
            diagnostique_details: "-",
            duree_arret_de_travail: undefined,
            examens_cliniques: [],
            prescriptions: [],
            radios: [],
            bilans: [],
            interventions: [],
            prochaine_consultation: moment(new Date()).add(7).toDate(),
        },
        {
            id: "hos-PZR37CU",
            patient: {NIN: "100010364027390000", nom:"NADIL", prenom: "Marwa", date_de_naissance: new Date("2002-05-12"), sexe:"Femme"},
            medecin: {NIN: "100010364027390000", nom:"NADIL", prenom: "Marwa", specialite: "Cardiologie", service:"Pédiatrie", hopital:"CHU Beni Messous"},
            hopital: "CHU Beni Messous",
            date_entree: new Date("2023-02-18T00:00:00.000Z"),
            mode_entree: "Hospitalisation complète",
            chambre: "F1",
            lit: 1,
            motif_hospitalisation: "Soupçon de COVID-19",
            resume_hospitalisation: "Le patient s'est présenté avec une fièvre extra-ordinaire, un mal de gorge, un nez qui coule.",
        },
        {
            id: "interv-XNDHDBZ",
            code_intervention: "03120Z0",
            designation: "Bypass Innominate Artery to Right Upper Arm Artery",
            patient: {NIN: "100010364027390000", nom:"NADIL", prenom: "Marwa", date_de_naissance: new Date("2002-05-12"), sexe:"Femme"},
            medecin: {NIN: "100010364027390000", nom:"NADIL", prenom: "Marwa", specialite: "Cardiologie", service:"Pédiatrie", hopital:"CHU Beni Messous"},
            hopital: "CHU Beni Messous",
            date: new Date("2024-02-18T00:00:00.000Z"),
            protocole_operatoire: "Idk",
            remarques: "-",
        }
    ]

    
    return (
        <>
            <Card title='Testing route v2.0 REVAMPED' className='w-full max-w-4xl'>
                <Timeline>
                    {
                        timelineitems.map((item)=>{
                            if ((item as Hospitalisation).date_entree !== undefined) {
                                let h = item as Hospitalisation;
                                const detailsButton = (<Button theme='primary-alternate' className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" onClick={() => {setSelectedHospitalisation(h); setOpenModal("hospitalisation")}}>
                                    <i className="fa fa-magnifying-glass" />
                                    <span className="ms-2">Voir détails</span>
                                </Button>);

                                return <TimelineItem title='Hospitalisation' date={new Date()} icon='fa fa-bell' action={detailsButton}>
                                    وفوق كل ذي علم عليم
                                </TimelineItem>
                            }
                            else if ((item as Intervention).code_intervention !== undefined) {
                                let i = item as Intervention;
                                const detailsButton = (<Button theme='primary-alternate' className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" onClick={() => {setSelectedIntervention(i); setOpenModal("intervention")}}>
                                    <i className="fa fa-magnifying-glass" />
                                    <span className="ms-2">Voir détails</span>
                                </Button>);

                                return <TimelineItem title='Intervention' date={new Date()} icon='fa fa-bell' action={detailsButton}>
                                    قد أفلح المؤمنون الذين هم في صلاتهم خاشعون
                                </TimelineItem>
                            }
                            else {
                                let c = item as Consultation;
                                const detailsButton = (<Button theme='primary-alternate' className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" onClick={() => {setSelectedConsultation(c); setOpenModal("consultation")}}>
                                    <i className="fa fa-magnifying-glass" />
                                    <span className="ms-2">Voir détails</span>
                                </Button>);

                                return <TimelineItem title='Consultation' date={new Date()} icon='fa fa-bell' action={detailsButton}>
                                    واذكر في الكتاب مريم
                                </TimelineItem>
                            }

                        })
                    }
                </Timeline>
            </Card>
            <DetailsConsultation isOpen={openModal==="consultation"} close={() => setOpenModal("")} selectedConsultation={selectedConsultation!}/>
            <DetailsHospitalisation isOpen={openModal==="hospitalisation"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation!}/>
            <DetailsIntervention isOpen={openModal==="intervention"} close={() => setOpenModal("")} selectedIntervention={selectedIntervention!}/>
        </>
    )
}

export default TestRoute