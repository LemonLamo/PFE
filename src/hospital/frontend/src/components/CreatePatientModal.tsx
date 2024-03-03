import Modal from './UI/Modal/Modal';

function CreatePatientModal() {
    function submit() {
        // Do submission logic
        console.log("Submitting form")
    }
    function cancel(){
        console.log("Hit cancel button")
    }

    return (
        <Modal onAction={submit} onCancel={cancel}>
            <>
                <i className="fa fa-plus" />
                <span className="ms-2">New</span>
            </>
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Title</h3>
            <p className="text-gray-600">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
        </Modal>
    )
}

export default CreatePatientModal