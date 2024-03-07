import Calendar from "../components/Calendar/FullCalendar";
import Card from "../components/UI/Card";

function MesRendezVousPage() {
  let events = [
    { title: "Appendicite", subtitle:"BRAHIM Abderrazak", date: new Date() },
    { title: "Consultation", subtitle: "NADIL Marwa",  date: new Date() }
  ]
  return (
    <div className="grid grid-cols-12 w-full">
      <Card className="col-span-9">
        <Calendar></Calendar>
      </Card>
      <Card className="col-span-3"  title="Rendez-vous" subtitle='Liste of vos prochaines rendez-vous'>
          <ul className='flex flex-col gap-y-4'>
              <li className="flex justify-between gap-x-3 mb-0">
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900 mb-0">Appendicite</p>
                    <p className="mb-0 truncate text-sm leading-5 text-gray-600">Brahim Abderrazak - 04/03/2024 08:00</p>
                  </div>
              </li>
          </ul>
      </Card>
    </div>
  );
}

export default MesRendezVousPage;
