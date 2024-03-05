import { useMemo } from "react";
import Timeline from "../../components/UI/Timeline/Timeline";
import TimelineItem from "../../components/UI/Timeline/TimelineItem";
import moment from "moment";

type TabHistoriqueProps = {
  NIN: string
}

export function TabHistorique({NIN} : TabHistoriqueProps) {
  const historique = useMemo(() => {
    let d1 = moment(new Date()).subtract(1, 'd').toDate();
    let d2 = moment(new Date()).subtract(3, 'd').toDate();
    let d3 = moment(new Date()).subtract(32, 'd').toDate();
    return [
      { type: "Consultation", date: d1, type_visite: "Evaluation de nouveau patient", motif_visite: "Plainte", symptomes: "Mal au gorge", resume_visite: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id venenatis lacus. Duis rutrum eros lectus, eu malesuada elit sodales a. Cras placerat tincidunt odio vitae pellentesque.", diagnostique: "Grippe saisonière" },
      { type: "Hospitalization", date: d2, resume: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id venenatis lacus. Duis rutrum eros lectus, eu malesuada elit sodales a. Cras placerat tincidunt odio vitae pellentesque." },
      { type: "Consultation", date: d3, type_visite: "Evaluation de nouveau patient", motif_visite: "Plainte", symptomes: "Mal au gorge", resume_visite: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id venenatis lacus. Duis rutrum eros lectus, eu malesuada elit sodales a. Cras placerat tincidunt odio vitae pellentesque.", diagnostique: "Grippe saisonière" }
    ]
  }, [NIN])

  function buildTimelineItem(item : any){
    if (item.type == "Hospitalization")
      return (
        <TimelineItem icon="fa fa-bell text-red-400" title="Hospitalization" date={item.date}>
          <p className="mb-0 font-semibold leading-tight text-sm text-justify text-slate-400"><span className="font-semibold">Résumé: </span> {item.resume}</p>
        </TimelineItem>
      );

    if (item.type == "Consultation")
      return (
        <TimelineItem icon="fa fa-bell text-yellow-400" title="Consultaiton" date={item.date}>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Type: </span> {item.type_visite}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Motif: </span> {item.motif_visite}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Symptômes: </span> {item.symptomes}</p>
          <p className="mb-1 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Résumé: </span> {item.resume_visite}</p>
          <p className="mb-0 leading-tight text-sm text-justify text-slate-500"><span className="font-semibold">Diagnostique: </span> {item.diagnostique}</p>
        </TimelineItem>
      );
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
