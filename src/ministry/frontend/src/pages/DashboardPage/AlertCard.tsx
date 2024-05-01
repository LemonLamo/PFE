import moment from "moment";
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import { baseURL } from "../../config";
import Button from "../../components/UI/Buttons/Button";
import user from "../../assets/user.svg"

type Props = {
  summary: string,
  created_at: Date,
  notification_type: string,
  data: string
}

function AlertCard({summary, created_at, notification_type, data} : Props) {
  const action = 
    (notification_type == 'BILAN_READY')?
      `/bilans/${JSON.parse(data).bilan}`:
    (notification_type == 'RADIO_READY')?
      `/radios/${JSON.parse(data).radio}`:
      null;

  const button = (
    <Link to={`${baseURL}${action}`} target="_blank">
      <Button onClick={() => null} theme="primary" className="text-xs px-[0.5rem] py-">
        <i className="fa fa-magnifying-glass" />
        <span className="ms-2">View</span>
      </Button>
    </Link>);

  return (
    <li className="flex justify-between gap-x-3 mb-0">
      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={user} alt=""/>
      <div className="min-w-0 flex-auto">
        <ReactMarkdown className="mb-1 font-normal leading-normal text-sm markdown">
          {summary}
        </ReactMarkdown>
        <p className="mb-0 leading-tight text-xs text-slate-400">
          <i className="mr-1 fa fa-clock"></i> {moment(created_at).fromNow()}
        </p>
      </div>
      { action && 
      <div>
        {button}
      </div>
      }
    </li>
  );
}
export default AlertCard;
