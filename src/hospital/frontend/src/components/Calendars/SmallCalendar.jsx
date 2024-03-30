import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function SmallCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} locale="FR" className="rounded !border-0 w-full h-full mx-auto my-auto text-lg" />
    </div>
  );
}
export default SmallCalendar;
