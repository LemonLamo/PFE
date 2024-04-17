import { useEffect, useState } from 'react'
import user from '../../assets/user.svg'
import moment from 'moment'
import ReactMarkdown from 'react-markdown';
import { mark_as_read } from '../../hooks/useNotifications';
import { UseQueryResult } from '@tanstack/react-query';

type Props = {
  notification_id: string,
  summary: string,
  created_at: Date,
  isRead: boolean
  query: UseQueryResult<Notif[], Error>
}
function NotificationEntry({notification_id, summary, created_at, isRead, query} : Props) {
  const [time, setTime] = useState(Date.now());
  useEffect(()=>{
    setInterval(() => setTime(() => Date.now()), 1000);
  }, [time]);
  
  function action(id: Notif["id"]){
    mark_as_read(id);
    query.refetch();
  }

  return (
    <button className={`text-left relative block w-full pl-2 py-2 duration-100 hover:bg-gray-200 lg:transition-colors ${!isRead? 'text-slate-800':'text-slate-400 bg-gray-50/50'}`} onClick={() => action(notification_id)}>
      <div className="flex py-1 ml-4">
        <div className="my-auto">
          <img src={user}
            className="inline-flex items-center justify-center mr-4 text-white text-sm h-9 w-9 max-w-none rounded-xl" />
        </div>
        <div className="flex flex-col justify-center">
          <ReactMarkdown className="mb-1 font-normal leading-normal text-sm markdown">
            {summary}
          </ReactMarkdown>
          <p className="mb-0 leading-tight text-xs ${!isRead? 'text-slate-600':'text-slate-400'}">
            <i className="mr-1 fa fa-clock"></i> {moment(created_at).fromNow()}
          </p>
        </div>
      </div>
      {
        !isRead &&
        <i className='absolute w-3 h-3 rounded-full bg-cyan-500 top-[40%] bottom-[50%] right-3' />
      }
    </button>
  )
}

export default NotificationEntry