import { ReactNode } from "react"

type TimelineProps = {
    children: ReactNode
}

function Timeline({children} : TimelineProps) {
    return (
        <>
        <div className="before:border-r-solid relative before:absolute before:top-0 before:left-24 before:h-full before:border-r-2 before:border-r-slate-100 before:content-[''] before:lg:-ml-px w-full">
            {children}
        </div>
        </>
    )
}

export default Timeline