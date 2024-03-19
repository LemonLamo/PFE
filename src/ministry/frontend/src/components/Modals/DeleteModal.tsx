import { ReactNode } from 'react';
import Modal from '../UI/Modal/Modal';
import { Transition } from '@headlessui/react';

type ModalProps = {
    children?: ReactNode,
    open: boolean,
    action: () => void,
    close: () => void,
}

function DeleteModal({ children, open, close, action }: ModalProps) {
    return (
        <>
            <Transition
                className="z-50 fixed"
                show={open}
                enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100"
                leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Modal actionText='Supprimer' onAction={action} cancelText='Annuler' onCancel={close} icon="fa fa-trash" theme='danger'>
                    {children}
                </Modal>
            </Transition>
        </>
    )
}

export default DeleteModal