import { Calendarjs } from "./FullCalendar";

function Calendar() {
  return (
    <div className="w-full">
      {/* <div className="grid grid-cols-7">
        <h6 className="w-full text-center">Dimanche</h6>
        <h6 className="w-full text-center">Lundi</h6>
        <h6 className="w-full text-center">Mardi</h6>
        <h6 className="w-full text-center">Mercredi</h6>
        <h6 className="w-full text-center">Jeudi</h6>
        <h6 className="w-full text-center">Vendredi</h6>
        <h6 className="w-full text-center">Samedi</h6>
      </div> */}
      <Calendarjs></Calendarjs>

      {/* <div className=''>
                TODO: @Marwa Finish th
            </div> */}
    </div>
  );
}

export default Calendar;
