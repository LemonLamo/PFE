import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

function Synthese({ children } : Props) {
  return (
        <>
        <div className="before:border-r-solid relative before:absolute before:top-0 before:left-4 before:h-full before:border-r-2 before:border-r-slate-100 before:content-[''] before:lg:-ml-px w-full">
            {children}
        </div>
        </>
    )
}

export default Synthese