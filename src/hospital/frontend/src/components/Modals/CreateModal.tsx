import { ReactNode, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import { Transition } from '@headlessui/react';

type CreateModalProps = {
    children: ReactNode[],
    onCreate?: () => void,
    onCancel?: () => void,
}

function CreateModal({ children, onCreate, onCancel }: CreateModalProps) {
    const [open, setOpen] = useState(false);

    function submit() {
        if (onCreate)
            onCreate();
        setOpen(false);
    }
    function cancel() {
        if (onCancel)
            onCancel();
        setOpen(false);
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 hover:-translate-y-1 active:translate-y-0">
                <i className="fa fa-plus" />
                <span className="ms-2">Créer</span>
            </button>
            <Transition
                className="z-50 fixed"
                show={open}
                enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100"
                leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Modal actionText='Créer' onAction={submit} cancelText='Cancel' onCancel={cancel} icon="fa fa-user" color="bg-cyan-500" offColor="bg-cyan-100" iconColor="text-cyan-500" size="sm:max-w-2xl">
                    {children}
                </Modal>
            </Transition>
        </>
    )
}

export default CreateModal