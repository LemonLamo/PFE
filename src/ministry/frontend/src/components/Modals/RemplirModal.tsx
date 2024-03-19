import { ReactNode } from "react";
import Modal from "../UI/Modal/Modal";
import { Transition } from "@headlessui/react";

type ModalProps = {
  children: ReactNode,
  open: boolean,
  close: () => void,
  action: () => void
};

function RemplirModal({ children, open, close, action }: ModalProps) {
  return (
    <>
      <Transition
        className="z-50 fixed"
        show={open}
        enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100"
        leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
        <Modal actionText="Ajouter" onAction={action} cancelText="Cancel" onCancel={close} icon="fa fa-user" theme="success" size="sm:max-w-xl" >
          {children}
        </Modal>
      </Transition>
    </>
  );
}

export default RemplirModal;
