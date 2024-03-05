import { ReactNode } from "react"

type ModalButtonProps = {
    className?: string,
    onClick: ()=>void,
    children: ReactNode
}

function ModalButton({className, onClick, children} : ModalButtonProps) {
  return (
      <button className={className} onClick={onClick}>
          {children}
      </button>
  )
}

export default ModalButton