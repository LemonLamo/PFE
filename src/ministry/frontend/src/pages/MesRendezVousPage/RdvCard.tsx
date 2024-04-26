import moment from "moment";
import Avatar from "../../components/Avatar";
import { baseURL } from "../../config";

type Props = {
  title: string,
  medecin: Partial<Personnel>,
  start: Date,
}

function RdvCard({title, medecin, start} : Props) {
  return (
    <li className="flex justify-between gap-x-3 mb-0">
      <Avatar src={`${baseURL}/api/personnel/${medecin.NIN}/avatar`} alt="profile_picture" className="h-12 w-12 flex-none rounded-full bg-gray-50"/>
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900 mb-0">
          {title}
        </p>
        <p className="mb-0 truncate text-sm leading-5 text-gray-600">
          {medecin.nom} {medecin.prenom} - {moment(start).format('DD/MM/YYYY HH:mm')}
        </p>
      </div>
    </li>
  );
}
export default RdvCard;
