import { ReactNode, useState } from "react";
import Modal from "../UI/Modal/Modal";
import { Transition } from "@headlessui/react";

type RemplirModalProps = {
  children: ReactNode[];
  onAdd?: () => void;
  onCancel?: () => void;
};

function RemplirModal({ children, onAdd, onCancel }: RemplirModalProps) {
  const [open, setOpen] = useState(false);

  function submit() {
    if (onAdd) onAdd();
    setOpen(false);
  }
  function cancel() {
    if (onCancel) onCancel();
    setOpen(false);
  }

  return (
    <>
      <Transition
        className="z-50 fixed"
        show={open}
        enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100"
        leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
        <Modal actionText="Ajouter" onAction={submit} cancelText="Cancel" onCancel={cancel} icon="fa fa-user" color="bg-green-500" offColor="bg-green-100" iconColor="text-green-500" size="sm:max-w-xl" >
          {children}
        </Modal>
      </Transition>
      <button onClick={() => setOpen(true)} className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-green-600 font-semibold border border-green-600 rounded hover:bg-green-500 hover:text-white hover:border-transparent transition ease-in duration-50 hover:-translate-y-1 active:translate-y-0">
        <i className="fa fa-plus" />
        <span className="ms-2">Ajouter</span>
      </button>
    </>
  );
}

export default RemplirModal;
