import { useEffect, useState } from 'react'
import user from '../../assets/user.svg'
import moment from 'moment'

type Props = {
  text: string,
  timestamp: Date
}
function NotificationEntry({text, timestamp} : Props) {
  const [time, setTime] = useState(Date.now());
  useEffect(()=>{
    setInterval(() => setTime(() => Date.now()), 1000);
  }, [time]);

  return (
    <a className="ease-soft py-1.2 clear-both block w-full rounded-lg bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors">
      <div className="flex py-1">
        <div className="my-auto">
          <img src={user}
            className="inline-flex items-center justify-center mr-4 text-white text-sm h-9 w-9 max-w-none rounded-xl" />
        </div>
        <div className="flex flex-col justify-center">
          <h6 className="mb-1 font-normal leading-normal text-sm">
            {text}
          </h6>
          <p className="mb-0 leading-tight text-xs text-slate-400">
            <i className="mr-1 fa fa-clock"></i> {moment(timestamp).fromNow()}
          </p>
        </div>
      </div>
    </a>
  )
}

export default NotificationEntry