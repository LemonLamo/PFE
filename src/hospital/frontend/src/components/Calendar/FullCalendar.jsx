import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Calendar({ events }) {
  return (
    <div className="h-full w-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        locale="fr"
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  console.log(eventInfo)
  return (
    <>
      <span>
        <span className="me-1 font-bold"> {eventInfo.timeText} </span> {eventInfo.event.title}
      </span>
      
    </>
  );
}

export default Calendar;
