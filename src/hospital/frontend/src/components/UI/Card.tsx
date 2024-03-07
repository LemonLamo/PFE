import { ReactNode } from "react"

type CardProps = {
    title?: string,
    subtitle?: string,
    children: ReactNode,
    action?: ReactNode,
    className?: string,
}

function Card({ title, subtitle, children, action, className }: CardProps) {
  return (
      <div className={`relative flex flex-col rounded-lg bg-white break-words shadow-soft-xl p-6 mb-3 ${className}`}>
          <div className="flex justify-between items-center mb-2">
              <div className="border-black/12.5 mb-3 rounded-lg border-b-0 border-solid bg-white pb-0">
                  {title && <h6 className="mb-0">{title}</h6>}
                  {subtitle && <p className="leading-normal text-sm mb-0">{subtitle}</p>}
              </div>
              {action}
          </div>
          <div className="block w-full">
              {children}
          </div>
      </div>
  )
}

export default Card