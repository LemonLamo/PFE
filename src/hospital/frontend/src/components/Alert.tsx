import { ReactNode } from "react"

type AlertProps = {
    color: string,
    children: ReactNode
}

function Alert({ color, children }: AlertProps) {
  return (
    <div className={`relative w-full px-4 py-3 text-white rounded-lg ${color} mb-3`}>{children}</div>
  )
}

export default Alert