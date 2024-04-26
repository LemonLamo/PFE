import moment from "moment";
import { baseURL } from "../../config";
import Avatar from "../../components/Avatar";

type Props = {
  title: string,
  patient: Partial<Patient>,
  start: Date,
}

function RdvCard({title, patient, start} : Props) {
  return (
    <li className="flex justify-between gap-x-3 mb-0">
      <Avatar src={`${baseURL}/api/patients/${patient.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900 mb-0">
          {title}
        </p>
        <p className="mb-0 truncate text-sm leading-5 text-gray-600">
          {patient.nom} {patient.prenom} - {moment(start).format('DD/MM/YYYY HH:mm')}
        </p>
      </div>
    </li>
  );
}
export default RdvCard;
