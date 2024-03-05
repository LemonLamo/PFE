import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const events = [
  {
    title: "Rendez-Vous 1",
    start: new Date("2024-03-05"),
    end: new Date("2024-03-06"),
  },
  {
    title: "Rendez-Vous 2",
    start: new Date("2024-03-10"),
    end: new Date("2024-03-11"),
  },
  {
    title: "Rendez-Vous 2",
    start: new Date("2024-04-10"),
    end: new Date("2024-04-11"),
  },
];

export function Calendarjs() {
  return (
    <div className="h-full w-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
