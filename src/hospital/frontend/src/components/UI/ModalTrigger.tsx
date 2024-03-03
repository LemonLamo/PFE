import { ReactNode, useState } from 'react'
import Modal from './Modal'

type ModalTriggerProps = {
  icon: string,
  text: ReactNode
}

function ModalTrigger({icon, text} : ModalTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0" onClick={() => setOpen(!open)}>
        <i className={icon}/>
        <span className="ms-2">{text}</span>
      </button>
      { open && <Modal/> }
    </>
  )
}

export default ModalTrigger