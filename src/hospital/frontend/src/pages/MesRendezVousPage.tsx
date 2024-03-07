import Calendar from "../components/Calendar/FullCalendar";
import RdvCard from "../components/Calendar/RdvCard";
import Card from "../components/UI/Card";

function MesRendezVousPage() {
  let events = [
    { title: "Appendicite", subtitle: "BRAHIM Abderrazak", date: new Date() },
    { title: "Consultation", subtitle: "NADIL Marwa", date: new Date() },
  ];
  return (
    <div className="grid grid-cols-12 w-full">
      <Card className="col-span-9">
        <Calendar events={events}></Calendar>
      </Card>
      <Card
        className="col-span-3"
        title="Rendez-vous"
        subtitle="Liste of vos prochaines rendez-vous"
      >
        <RdvCard children={events}></RdvCard>
      </Card>
    </div>
  );
}

export default MesRendezVousPage;
