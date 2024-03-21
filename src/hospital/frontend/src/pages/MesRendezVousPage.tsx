import Calendar from "../components/Calendar/FullCalendar";
import RdvCard from "../components/Calendar/RdvCard";
import Card from "../components/UI/Card";

function MesRendezVousPage() {
  const today = new Date();
  const setEndRdv = (date: Date, durée: number) => {
    const endDate = new Date();
    endDate.setDate(date.getDate() + durée);
    return endDate;
  };
  let events = [
    {
      title: "Appendicite",
      subtitle: "BRAHIM Abderrazak",
      start: today,
      end: setEndRdv(today, 2),
    },
    {
      title: "Consultation",
      subtitle: "NADIL Marwa",
      start: setEndRdv(today, 2),
      end: setEndRdv(today, 2),
    },
  ];
  return (
    <div className="grid grid-cols-12 w-full">
      <Card className="col-span-12 md:col-span-9">
        <Calendar events={events}></Calendar>
      </Card>
      <Card className="col-span-12 md:col-span-3" title="Rendez-vous" subtitle="Liste of vos prochaines rendez-vous" >
        <ul className="flex flex-col gap-y-4">
          {events.map((item) => <RdvCard {...item}></RdvCard>)}
        </ul>
      </Card>
    </div>
  );
}

export default MesRendezVousPage;
