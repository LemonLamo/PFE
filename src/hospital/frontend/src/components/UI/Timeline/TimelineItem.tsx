import moment from "moment"
import { ReactNode } from "react"

type TimelineItemProps = {
    date: Date,
    icon : string,
    title : string,
    children? : ReactNode
}

function TimelineItem({icon, date, title, children} : TimelineItemProps) {
  return (
      <div className="relative mb-4 mt-0 after:clear-both after:table after:content-['']">
          <span className="absolute left-9 -translate-x-1/2 rounded-full text-center font-semibold text-sm text-slate-400">
              <p className="mb-0">{moment(date).format('DD/MM/YYYY')}</p>
              <p className="mb-0 mt-[-0.5rem]">{moment(date).format('HH:mm:ss')}</p>
          </span>
          <span className="w-8.5 h-6.5 text-base absolute left-24 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-left">
              <i className={`${icon} relative leading-none leading-pro bg-clip-text fill-transparent`}></i>
          </span>
          <div className="ml-[7.5rem] pt-1.4 relative -top-1.5 w-auto">
              <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">{title}</h6>
              {children}
          </div>
      </div>
  )
}

export default TimelineItem