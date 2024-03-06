import { useMemo } from "react";
import Timeline from "../../components/UI/Timeline/Timeline";
import TimelineItem from "../../components/UI/Timeline/TimelineItem";
import moment from "moment";

type TabHistoriqueProps = {
  NIN: string
}

export function TabHistorique({NIN} : TabHistoriqueProps) {
  const historique = useMemo<(Hospitalisation | Consultation)[]>(() => {
    let d1 = moment(new Date()).subtract(1, 'd').toDate();
    let d2 = moment(new Date()).subtract(3, 'd').toDate();
    let d3 = moment(new Date()).subtract(32, 'd').toDate();
    return [
      {
        code_consultation: "vis-0536518",
        nom_hopital: 'CHU Kolea',
        medecin: 'Rahim Abdelkader',
        patient: '',
        date_consultation: d1,
        type_consultation: "Evaluation de nouveau patient",
        motif_consultation: "Plainte",
        symptomes: "Mal au gorge",

        resume_consultation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id venenatis lacus. Duis rutrum eros lectus, eu malesuada elit sodales a. Cras placerat tincidunt odio vitae pellentesque.",
        examens_cliniques: [],
        
        diagnostique: "Grippe saisonière",
        diagnostique_details: "",

        prescriptions: [],
        radiologie: [],
        analyses: [],
        interventions: [],
        prochaine_consultation: d2,
      },
      {
        code_hospitalisation: 'hosp-1356415',
        nom_hopital: 'CHU Beni Messous',
        medecin: 'BRAHIM Nadjette',
        patient: '4551631',
        date_entree: d3,
        mode_entree: 'Hospitalisation complète',
        motif_hospitalisation: 'procédures de diagnostic',
        date_sortie: new Date(),
        mode_sortie: 'Transfert',
        resume_hospitalisation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id venenatis lacus. Duis rutrum eros lectus, eu malesuada elit sodales a. Cras placerat tincidunt odio vitae pellentesque.',
      }
    ]
  }, [NIN])

  function buildTimelineItem(item: (Consultation|Hospitalisation)){
    if ((item as Hospitalisation).code_hospitalisation !== undefined){
      let h = item as Hospitalisation;
      return (
        <TimelineItem icon="fa fa-bell text-red-400" title={`Hospitalisation`} date={h.date_entree}>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Medecin: </span> {h.medecin} ({h.nom_hopital})</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Période: </span> {moment(h.date_entree).format('DD/MM/YYYY')} ({h.mode_entree}) - {moment(h.date_sortie).format('DD/MM/YYYY')} ({h.mode_sortie})</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Résumé: </span> {h.resume_hospitalisation}</p>
        </TimelineItem>
      );
    }

    else if ((item as Consultation).code_consultation !== undefined){
      let c = item as Consultation;
      return (
        <TimelineItem icon="fa fa-bell text-yellow-400" title="Consultation" date={c.date_consultation}>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Medecin: </span> {c.medecin} ({c.nom_hopital})</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Motif: </span> {c.motif_consultation}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Symptômes: </span> {c.symptomes}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Résumé: </span> {c.resume_consultation}</p>
          <p className="mb-0 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Diagnostique: </span> {c.diagnostique}</p>
          <p className="mb-0 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Prochaine rendez-vous: </span> {moment(c.prochaine_consultation).format('DD/MM/YYYY')}</p>
        </TimelineItem>
      );
    }
  }
  
  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-0">Historique médicale</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <Timeline>
        {historique.map((item) => buildTimelineItem(item))}
      </Timeline>
    </>
  );
}

export default TabHistorique