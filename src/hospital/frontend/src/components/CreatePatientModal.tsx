import { useState } from 'react';
import Modal from './UI/Modal/Modal';
import ModalButton from './UI/Modal/ModalButton';

function CreatePatientModal() {
    const [open, setOpen] = useState(false);

    function submit() {
        // Do submission logic
        alert("Submitting form")
        setOpen(false);
    }
    function cancel() {
        console.log("Hit cancel button")
        setOpen(false);
    }

    return (
        <>
            <ModalButton onClick={() => setOpen(true)} className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0">
                <i className="fa fa-plus" />
                <span className="ms-2">New</span>
            </ModalButton>
            {
                open &&
                <Modal onAction={submit} onCancel={cancel} icon="fa fa-user" color="bg-cyan-500" offColor="bg-cyan-100" iconColor="text-cyan-500">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Title</h3>
                    <p className="text-gray-600">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                </Modal>
            }
        </>
    )
}

export default CreatePatientModal