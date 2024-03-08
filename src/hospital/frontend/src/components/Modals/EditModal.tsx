import { ReactNode, useState } from 'react';
import Modal from '../UI/Modal/Modal';

type EditModalProps = {
    children: ReactNode,
    onOpen?: () => void,
    onEdit?: () => void,
    onCancel?: () => void,
}

function EditModal({ children, onOpen, onEdit, onCancel } : EditModalProps) {
    const [open, setOpen] = useState(false);

    function doOpen() {
        if(onOpen)
            onOpen();
        setOpen(true);
    }
    function submit() {
        if (onEdit)
            onEdit();
        setOpen(false);
    }
    function cancel() {
        if (onCancel)
            onCancel();
        setOpen(false);
    }

    return (
        <>
            <button onClick={doOpen} className="w-4 transform text-yellow-500 hover:text-yellow-700 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
            </button>
            {
                open &&
                <Modal actionText='Modifier' onAction={submit} cancelText='Cancel' onCancel={cancel} icon="fa fa-user" color="bg-yellow-500" offColor="bg-yellow-100" iconColor="text-yellow-500" size='sm:max-w-2xl'>
                    {children}
                </Modal>
            }
        </>
    )
}

export default EditModal