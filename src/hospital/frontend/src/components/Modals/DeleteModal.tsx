import { ReactNode, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import { Transition } from '@headlessui/react';

type DeleteModalProps = {
    children: ReactNode,
    onOpen?: () => void,
    onDelete?: () => void,
    onCancel?: () => void,
}

function DeleteModal({ children, onDelete, onCancel } : DeleteModalProps) {
    const [open, setOpen] = useState(false);

    function submit() {
        if (onDelete)
            onDelete();
        setOpen(false);
    }
    function cancel() {
        if (onCancel)
            onCancel();
        setOpen(false);
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="w-4 text-red-500 hover:text-red-700 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" ></path>
                </svg>
            </button>
            <Transition
                className="z-50 fixed"
                show={open}
                enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100"
                leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Modal actionText='Supprimer' onAction={submit} cancelText='Cancel' onCancel={cancel} icon="fa fa-trash" color="bg-red-500" offColor="bg-red-100" iconColor="text-red-500">
                    {children}
                </Modal>
            </Transition>
        </>
    )
}

export default DeleteModal