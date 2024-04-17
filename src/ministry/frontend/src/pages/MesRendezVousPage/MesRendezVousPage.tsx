import Card from "../../components/UI/Card";
import Calendar from "../../components/Calendars/FullCalendar";
import RdvCard from "./RdvCard";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../../config";
import axios from "axios";
import TableLoading from "../../components/UI/Loading";
import TableError from "../../components/UI/Tables/TableError";

const today = new Date()

function MesRendezVousPage() {
  const events = useQuery<RendezVous[]>({
    queryKey: ["rendezvous"],
    queryFn: async ()=>{
      const data = (await axios.get(`${baseURL}/api/rendez-vous`)).data;
      return data
    }
  });
  
  return (
    <div className="grid grid-cols-12 w-full">
      <Card className="col-span-12 md:col-span-9">
        <Calendar events={events.data ?? []} />
      </Card>
      <Card className="col-span-12 md:col-span-3" title="Rendez-vous" subtitle="Liste of vos prochaines rendez-vous" >
        <ul className="flex flex-col gap-y-4">
          {
            events.isError?
            <TableError />:
            events.isLoading?
            <TableLoading />:
            events.data!.filter((x: RendezVous ) => new Date(x.date) >= today).map((item: any, i: number) => <RdvCard key={i} {...item}></RdvCard>)
          }
        </ul>
      </Card>
    </div>
  );
}

export default MesRendezVousPage;
