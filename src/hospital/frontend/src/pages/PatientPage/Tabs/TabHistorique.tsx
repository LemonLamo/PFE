import Timeline from "../../../components/UI/Timeline/Timeline";
import TimelineItem from "../../../components/UI/Timeline/TimelineItem";
import moment from "moment";
import axios from "axios";
import { baseURL } from "../../../config";
import { useQuery } from "@tanstack/react-query";
import TableLoading from "../../../components/UI/Loading";
import TableError from "../../../components/UI/Tables/TableError";
import DetailsConsultation from "../Modals/DetailsConsultation";
import DetailsHospitalisation from "../Modals/DetailsHospitalisation";
import DetailsIntervention from "../Modals/DetailsIntervention";
import { useState } from "react";
import Button from "../../../components/UI/Buttons/Button";
import { Link } from "react-router-dom";

type TabHistoriqueProps = {
  NIN: string,
  link?: boolean
}

export function TabHistorique({ NIN, link = false } : TabHistoriqueProps) {
  const [openModal, setOpenModal] = useState("");
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation>();
  const [selectedHospitalisation, setSelectedHospitalisation] = useState<Hospitalisation>();
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention>();
  const historique = useQuery<(Hospitalisation | Consultation | Intervention)[]>({
    queryKey: ['historique' + NIN],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/patients/${NIN}/historique`)).data;
      return data;
    }
  });

  function buildTimelineItem(item: (Consultation|Hospitalisation|Intervention), index : number){
    if ((item as Hospitalisation).date_entree !== undefined){
      let h = item as Hospitalisation;
      const detailsButton = (
        <Button theme="primary-alternate" className="w-40 flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" onClick={() => {
            setSelectedHospitalisation(h);
            setOpenModal("hospitalisation");
          }}>
          <i className="fa fa-magnifying-glass" />
          <span className="ms-2">Voir détails</span>
        </Button>
      );
      return (
        <TimelineItem key={index} icon="fa fa-bell text-red-400" title={`Hospitalisation ${h.id}`} date={h.date_entree} action={detailsButton}>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Medecin: </span> {h.medecin.nom} {h.medecin.prenom} ({h.service}, {h.hopital})</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Période: </span> {moment(h.date_entree).format('DD/MM/YYYY')} ({h.mode_entree}) - {h.date_sortie ? `${moment(h.date_sortie).format('DD/MM/YYYY')} (${h.mode_sortie})` : 'En cours'}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Motif: </span> {h.motif_hospitalisation}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500 whitespace-pre-wrap"><span className="font-semibold">Résumé: </span> {h.resume_hospitalisation}</p>
        </TimelineItem>
      );
    }

    else if ((item as Intervention).code_intervention !== undefined) {
      let i = item as Intervention;
      const detailsButton = (
        <Button theme="primary-alternate" className="w-40 flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" onClick={() => {
            setSelectedIntervention(i);
            setOpenModal("intervention");
          }}>
          <i className="fa fa-magnifying-glass" />
          <span className="ms-2">Voir détails</span>
        </Button>
      );
      return (
        <TimelineItem key={index} icon="fa fa-bell text-green-400" title={`Intervention: ${i.designation} (${i.id})`} date={i.date} action={detailsButton}>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Medecin: </span> {i.medecin.nom} {i.medecin.prenom} ({i.service}, {i.hopital})</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500 whitespace-pre-wrap"><span className="font-semibold">Protocole Operatoire: </span> {i.protocole_operatoire}</p>
        </TimelineItem>
      );
    }

    else if ((item as Consultation).date !== undefined){
      let c = item as Consultation;
      const detailsButton = (
        <Button theme="primary-alternate" className="w-40 flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0"
          onClick={() => {
            setSelectedConsultation(c);
            setOpenModal("consultation");
          }}>
          <i className="fa fa-magnifying-glass" />
          <span className="ms-2">Voir détails</span>
        </Button>
      );

      return (
        <TimelineItem key={index} icon="fa fa-bell text-yellow-400" title={`Consultation ${c.id}`} date={c.date} action={detailsButton}>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Medecin: </span> {c.medecin.nom} {c.medecin.prenom} ({c.service}, {c.hopital})</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Motif: </span> {c.motif}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Symptômes: </span> {c.symptomes}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Résumé: </span> {c.resume}</p>
          <p className="mb-0 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Diagnostique: </span> {c.diagnostique}</p>
        </TimelineItem>
      );
    }

  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg mb-0">Historique médical</h2>
          <p className="leading-normal mb-0">Ci-dessous un apperçu des consultations, hospitalisations et interventions subis par le patient.</p>
        </div>
        {link &&
          <Link to={`/patients/${NIN}`} target="_blank" className={`flex items-center justify-center py-2 px-4 font-semibold transition border text-cyan-500 border-cyan-500 rounded hover:bg-cyan-500 hover:text-white`}>
            <i className="fa fa-magnifying-glass" />
            Consulter DME
          </Link>
        }
      </div>
        {
          historique.isError ? 
            <div className="block w-full ">
              <TableError msg={(historique.error as any).response.data?.errorMessage} />
            </div>:
          historique.isLoading ?
            <div className="block w-full ">
              <TableLoading />
            </div>:
          <>
            <Timeline>
              {historique.data!.map((item, i) => buildTimelineItem(item, i))}
            </Timeline>
            {selectedConsultation ? <DetailsConsultation isOpen={openModal === "consultation"} close={() => setOpenModal("")} selectedConsultation={selectedConsultation!} /> : null}
            {selectedHospitalisation ? <DetailsHospitalisation isOpen={openModal === "hospitalisation"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation!} /> : null}
            {selectedIntervention ? <DetailsIntervention isOpen={openModal === "intervention"} close={() => setOpenModal("")} selectedIntervention={selectedIntervention!} /> : null}
          </>
        }
    </>
  );
}

export default TabHistorique