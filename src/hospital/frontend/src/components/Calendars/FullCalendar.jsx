import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import moment from "moment";

function Calendar({ events }) {
  return (
    <div className="h-full w-full">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        eventColor="rgb(6 182 212)"
        locale="fr"
        headerToolbar={
          {right: 'dayGridDay,dayGridWeek,dayGridMonth'}
        }
        eventClassNames="truncate"
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button>
              <span className="font-bold px-1 truncate">{eventInfo.event.extendedProps.title} - </span> {eventInfo.event.extendedProps.subtitle}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="fixed text-slate-600 w-[350px] max-w-sm text-[1rem]">
                <div className="rounded-lg shadow-xl ring-1 ring-black/5 bg-white p-7">
                  <h6 className="text-xl font-bold mb-2"> <i className="fas fa-calendar-alt mr-2"></i> {eventInfo.event.extendedProps.title}</h6>
                  <p className="text-gray-600 mb-2">
                    <i className="fas fa-user mr-2"></i>
                    {eventInfo.event.extendedProps.subtitle}
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
          </>
        )}
      </Popover>
  );
}

export default Calendar;
