type TimelineItemProps = {
    icon : string,
    title : string,
    subtitle? : string
}

function TimelineItem({icon, title, subtitle} : TimelineItemProps) {
  return (
      <div className="relative mb-4 mt-0 after:clear-both after:table after:content-['']">
          <span className="w-6.5 h-6.5 text-base absolute left-4 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
              <i className={`${icon} relative leading-none leading-pro bg-clip-text fill-transparent`}></i>
          </span>
          <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
              <h6 className="mb-0 font-semibold leading-normal text-sm text-slate-700">{title}</h6>
              {subtitle && <p className="mt-1 mb-0 font-semibold leading-tight text-xs text-slate-400">{subtitle}</p>}
          </div>
      </div>
  )
}

export default TimelineItem