import Calendar from "../components/Calendar/FullCalendar";
import RdvCard from "../components/Calendar/RdvCard";
import Card from "../components/UI/Card";

function MesRendezVousPage() {
  const today = new Date();
  const setEndRdv = (date, durée) => {
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
      start: today,
      end: setEndRdv(today, 0),
    },
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
