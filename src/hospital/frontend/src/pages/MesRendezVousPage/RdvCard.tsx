import moment from "moment";

type Props = {
  title: string,
  subtitle: string,
  start: Date
}

function RdvCard({ title, subtitle, start } : Props) {
  return (
    <li className="flex justify-between gap-x-3 mb-0">
      <img
        className="h-12 w-12 flex-none rounded-full bg-gray-50"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900 mb-0">
          {title}
        </p>
        <p className="mb-0 truncate text-sm leading-5 text-gray-600">
          {subtitle} - {moment(start).format('DD/MM/YYYY HH:mm')}
        </p>
      </div>
    </li>
  );
}
export default RdvCard;
