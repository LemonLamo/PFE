import Card from "../../components/UI/Card";
import Calendar from "../../components/Calendars/FullCalendar";
import RdvCard from "./RdvCard";
import moment, { DurationInputArg1, } from "moment";
import { useQuery } from "@tanstack/react-query";

const today = new Date();
const calculateEndDate = (date: Date, duration: DurationInputArg1, unit: any) => {
  return moment(date).add(duration, unit).toDate();
};

function MesRendezVousPage() {
  const events = useQuery<any>({
    queryKey: ["events"],
    queryFn: async ()=>{
      const data = [
        {title: "Bypass Innominate Artery", patient:{nom: "BRAHIM", prenom:"Abderrazak"}, date: today,  details:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim ornare dolor, fringilla aliquet libero tincidunt eu. Integer vulputate lacinia felis vitae feugiat."},
        {title: "Consultation", patient:{nom: "NADIL", prenom:"Marwa"}, date: calculateEndDate(today, 1, 'd'), details:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim ornare dolor, fringilla aliquet libero tincidunt eu. Integer vulputate lacinia felis vitae feugiat."},
        {title: "Appendicite", patient:{nom: "KEBTANE", prenom:"Djamel"}, date: calculateEndDate(today, 3, 'd')}
      ]
      
      return data.map((x)=> ({
          extendedProps:{
            title: x.title,
            subtitle: `${x.patient.nom} ${x.patient.prenom}`,
            details: x.details,
            start: x.date,
            end: calculateEndDate(x.date, 1, 'h'),
          },
          start: x.date,
          end: calculateEndDate(x.date, 1, 'h')
      }))
    }
  });
  
  return (
    <div className="grid grid-cols-12 w-full">
      <Card className="col-span-12 md:col-span-9">
        <Calendar events={events.data}></Calendar>
      </Card>
      <Card className="col-span-12 md:col-span-3" title="Rendez-vous" subtitle="Liste of vos prochaines rendez-vous" >
        <ul className="flex flex-col gap-y-4">
          {
            !events.isLoading && 
            events.data.map((item: any, i: number) => <RdvCard key={i} {...item.extendedProps}></RdvCard>)
          }
        </ul>
      </Card>
    </div>
  );
}

export default MesRendezVousPage;
