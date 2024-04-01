import Timeline from "../../../components/UI/Timeline/Timeline";
import TimelineItem from "../../../components/UI/Timeline/TimelineItem";
import moment from "moment";
import axios from "axios";
import { baseURL } from "../../../config";
import { useQuery } from "@tanstack/react-query";
import TableLoading from "../../../components/UI/Loading";
import TableError from "../../../components/UI/Tables/TableError";

type TabHistoriqueProps = {
  NIN: string
}

export function TabHistorique({NIN} : TabHistoriqueProps) {
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
      return (
        <TimelineItem key={index} icon="fa fa-bell text-red-400" title={`Hospitalisation ${h.id}`} date={h.date_entree}>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Medecin: </span> {h.medecin.nom} {h.medecin.prenom} ({h.hopital})</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Période: </span> {moment(h.date_entree).format('DD/MM/YYYY')} ({h.mode_entree}) - {h.date_sortie ? `${moment(h.date_sortie).format('DD/MM/YYYY')} (${h.mode_sortie})` : 'En cours'}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Motif: </span> {h.motif_hospitalisation}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Résumé: </span> {h.resume_hospitalisation}</p>
        </TimelineItem>
      );
    }

    else if ((item as Intervention).code_intervention !== undefined) {
      let i = item as Intervention;
      return (
        <TimelineItem key={index} icon="fa fa-bell text-green-400" title={`Intervention: ${i.designation} (${i.id})`} date={i.date}>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Medecin: </span> {i.medecin.nom} {i.medecin.prenom} ({i.hopital})</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Protocole Operatoire: </span> {i.protocole_operatoire}</p>
        </TimelineItem>
      );
    }

    else if ((item as Consultation).date !== undefined){
      let c = item as Consultation;
      return (
        <TimelineItem key={index} icon="fa fa-bell text-yellow-400" title={`Consultation ${c.id}`} date={c.date}>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Medecin: </span> {c.medecin.nom} {c.medecin.prenom} ({c.hopital})</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Motif: </span> {c.motif}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Symptômes: </span> {c.symptomes}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Résumé: </span> {c.resume}</p>
          <p className="mb-0 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Diagnostique: </span> {c.diagnostique}</p>
          <p className="mb-0 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Prochaine rendez-vous: </span> {c.prochaine_consultation? moment(c.prochaine_consultation).format('DD/MM/YYYY') : '-'}</p>
        </TimelineItem>
      );
    }

  }
  
  return (
    <>
      <h3 className="text-lg mb-0">Historique médicale</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <Timeline>
        {
          historique.isError ? 
            <div className="block w-full ">
              <TableError />
            </div>:
          historique.isLoading ?
            <div className="block w-full ">
              <TableLoading />
            </div>:
          historique.data!.map((item, i) => buildTimelineItem(item, i))

        }
      </Timeline>
    </>
  );
}

export default TabHistorique