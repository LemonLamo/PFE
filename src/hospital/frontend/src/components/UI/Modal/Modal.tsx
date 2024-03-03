import React, { ReactNode, useState } from "react";
import ModalContent from "./ModalContent";

type ModalProps = {
  children : ReactNode[]
  onAction: () => void
  onCancel: () => void
}

function Modal({ children, onAction, onCancel } : ModalProps) {
  const [open, setOpen] = useState(false);

  function action(){
    onAction();
    setOpen(false);
  }
  function cancel(){
    onCancel();
    setOpen(false);
  }

  return (
    <>
      <button className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0" onClick={() => setOpen(true)}>
        {React.Children.toArray(children)[0]}
      </button>
      {
        open &&
        <ModalContent action={action} cancel={cancel}>
            {children.slice(1)}
        </ModalContent>
      }
    </>
  )
}

export default Modal