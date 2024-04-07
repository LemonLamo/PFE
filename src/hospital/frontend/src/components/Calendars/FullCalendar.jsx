import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import moment from "moment";

const calculateEndDate = (date, duration, unit) => {
  return moment(date).add(duration, unit).toDate();
};
const COLORS = {
  "Consultation": "text-green-500",
  "Intervention": "text-purple-500",
}

const transformRendezVous = (rdv) => {
  return rdv.map((x)=> ({
      extendedProps:{
        title: x.title,
        type: x.type,
        subtitle: `${x.patient.nom} ${x.patient.prenom}`,
        details: x.details,
        start: x.date,
        end: calculateEndDate(x.date, x.duree, 'm'),
      },
      start: x.date,
      end: calculateEndDate(x.date, x.duree, 'm')
  }))
}

function Calendar({ events }) {
  return (
    <div className="h-full w-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={transformRendezVous(events)}
        eventContent={renderEventContent}
        //eventColor="rgb(6 182 212)"
        eventColor="rgba(255 255 255 0)"
        eventClassNames="bg-transparent hover:bg-transparent rounded-sm"
        locale="fr"
        headerToolbar={
          {left: 'today prev,next', right: 'dayGridDay,dayGridWeek,dayGridMonth'}
        }
        buttonText={
          {today: "Aujourd'hui", month: "Mois", week:"Semaine", day:"Jour"}
        }
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <Popover className="relative w-full">
        {({ open }) => (
          <>
            <div>
            <Popover.Button className="truncate w-full ring-0 focus-visible:outline-0">
              <div className="px-1 focus-visible:outline-0 flex items-center">
                <i className={`fa fa-circle text-[0.4rem] ${COLORS[eventInfo.event.extendedProps.type]} mr-1 mt-[0.125rem]`} />
                <span>
                  <span className="font-bold"> {eventInfo.event.extendedProps.title} - </span>{eventInfo.event.extendedProps.subtitle}
                </span>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute text-slate-600 h-[500px] w-[350px] text-[1rem]">
                <div className="rounded-lg shadow-xl ring-1 ring-black/5 bg-white p-7">
                  <h6 className="text-xl font-bold mb-2 break-normal">
                    <i className={`fas fa-calendar-alt mr-2 ${COLORS[eventInfo.event.extendedProps.type]}`}/> {eventInfo.event.extendedProps.title}
                  </h6>
                  <p className="text-gray-600 mb-2">
                    <i className="fas fa-user mr-2"></i>{eventInfo.event.extendedProps.subtitle}
                  </p>
                  <div className="flex justify-between whitespace-normal">
                    <p className="text-gray-600"><i className="fa-regular fa-clock mr-2"></i> {moment(eventInfo.event.extendedProps.start).format("HH:mm")}</p>
                    <b> - </b>
                    <p className="text-gray-600">{moment(eventInfo.event.extendedProps.end).format("HH:mm")} <i className="fa-regular fa-clock ml-2"></i></p>
                  </div>
                  {eventInfo.event.extendedProps.details &&
                  <p className="whitespace-normal">{eventInfo.event.extendedProps.details}</p>
                  }
                </div>
              </Popover.Panel>
            </Transition>
            </div>
          </>
        )}
      </Popover>
  );
}

export default Calendar;
