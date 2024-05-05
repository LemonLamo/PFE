import { ReactNode } from "react"

type Props = {
    icon : string,
    title : string,
    children? : ReactNode
    action?: ReactNode,
    className?: string
}

function SyntheseItem({icon, title, children, action, className=""} : Props) {
  return (
        <div className="flex items-center justify-between gap-4">
            <div className={`relative mb-3 mt-0 after:clear-both after:table after:content-[''] ${className}`}>
                <span className="w-8.5 h-6.5 text-base absolute left-4 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-left">
                    <i className={`${icon} relative leading-none leading-pro bg-clip-text fill-transparent`}></i>
                </span>
                <div className="ml-[2.5rem] pt-1.4 relative -top-1.5 w-auto">
                    <h6 className="mb-0 font-semibold leading-normal text-md text-slate-700">{title}</h6>
                    {children}
                </div>
            </div>
            <div>
                {action}
            </div>
        </div>
  )
}

export default SyntheseItem