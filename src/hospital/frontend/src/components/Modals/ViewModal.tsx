import { ReactNode, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import { Transition } from '@headlessui/react';

type ViewModalProps = {
    children: ReactNode
    onOpen?: () => void,
    onCancel?: () => void,
}

function ViewModal({children, onOpen, onCancel} : ViewModalProps) {
    const [open, setOpen] = useState(false);

    function doOpen() {
        if (onOpen)
            onOpen();

        setOpen(true);
    }

    function cancel() {
        if(onCancel)
            onCancel();
        setOpen(false);
    }

    return (
        <>
            <button onClick={doOpen} className="w-4 text-green-500 hover:text-green-700 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" ></path>
                </svg>
            </button>
            <Transition
                className="z-50 fixed"
                show={open}
                enter="transition-opacity duration-75" enterFrom="opacity-0" enterTo="opacity-100"
                leave="transition-opacity duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Modal cancelText='Close' onCancel={cancel} icon="fa fa-user" color="bg-cyan-500" offColor="bg-cyan-100" iconColor="text-cyan-500" size='sm:max-w-2xl'>
                    {children}
                </Modal>
            </Transition>
        </>
    )
}

export default ViewModal