import { ReactNode, useState } from 'react';
import Modal from '../UI/Modal/Modal';

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
            <button onClick={() => setOpen(true)} className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0">
                <i className="fa fa-plus" />
                <span className="ms-2">Créer</span>
            </button>
            {
                open &&
                <Modal actionText='Créer' onAction={submit} cancelText='Cancel' onCancel={cancel} icon="fa fa-user" color="bg-cyan-500" offColor="bg-cyan-100" iconColor="text-cyan-500">
                    {children}
                </Modal>
            }
        </>
    )
}

export default CreateModal