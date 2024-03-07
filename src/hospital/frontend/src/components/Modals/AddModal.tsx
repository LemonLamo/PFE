import { ReactNode, useState } from 'react';
import Modal from '../UI/Modal/Modal';

type AddModalProps = {
    children: ReactNode[],
    onAdd?: () => void,
    onCancel?: () => void,
}

function AddModal({ children, onAdd, onCancel }: AddModalProps) {
    const [open, setOpen] = useState(false);

    function submit() {
        if (onAdd)
            onAdd();
        setOpen(false);
    }
    function cancel() {
        if (onCancel)
            onCancel();
        setOpen(false);
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="text-sky-600 font-semibold hover:text-sky-700">
                <i className="fa fa-plus" />
                <span className="ms-2">Ajouter</span>
            </button>
            {
                open &&
                <Modal actionText='Ajouter' onAction={submit} cancelText='Cancel' onCancel={cancel} icon="fa fa-user" color="bg-cyan-500" offColor="bg-cyan-100" iconColor="text-cyan-500" size='sm:max-w-3xl'>
                    {children}
                </Modal>
            }
        </>
    )
}

export default AddModal