import { ReactNode, useState } from 'react';
import Modal from '../UI/Modal/Modal';

type DepenserModalProps = {
    children: ReactNode[],
    onSubstract?: () => void,
    onCancel?: () => void,
}

function DepenserModal({ children, onSubstract, onCancel }: DepenserModalProps) {
    const [open, setOpen] = useState(false);

    function submit() {
        if (onSubstract)
            onSubstract();
        setOpen(false);
    }
    function cancel() {
        if (onCancel)
            onCancel();
        setOpen(false);
    }

    return (
        <>
            <button onClick={() => setOpen(true)} className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-red-600 font-semibold border border-red-600 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0">
                <i className="fa fa-minus" />
                <span className="ms-2">Retirer</span>
            </button>
            {
                open &&
                <Modal actionText='Retirer' onAction={submit} cancelText='Cancel' onCancel={cancel} icon="fa fa-user" color="bg-red-500" offColor="bg-red-100" iconColor="text-red-500" size='sm:max-w-xl'>
                    {children}
                </Modal>
            }
        </>
    )
}

export default DepenserModal