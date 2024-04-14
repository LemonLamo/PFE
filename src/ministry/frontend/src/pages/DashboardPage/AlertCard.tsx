import moment from "moment";
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import { baseURL } from "../../config";
import Button from "../../components/UI/Buttons/Button";

type Props = {
  title: string,
  start: Date,
  action?: string,
}

function AlertCard({title, start, action} : Props) {
  const button = (
    <Link to={`${baseURL}${action}`} target="_blank">
      <Button onClick={() => null} theme="primary" className="text-xs px-[0.5rem] py-">
        <i className="fa fa-magnifying-glass" />
        <span className="ms-2">View</span>
      </Button>
    </Link>);

  return (
    <li className="flex justify-between gap-x-3 mb-0">
      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
      <div className="min-w-0 flex-auto">
        <ReactMarkdown className="mb-1 font-normal leading-normal text-sm markdown">
          {title}
        </ReactMarkdown>
        <p className="mb-0 leading-tight text-xs text-slate-400">
          <i className="mr-1 fa fa-clock"></i> {moment(start).fromNow()}
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
