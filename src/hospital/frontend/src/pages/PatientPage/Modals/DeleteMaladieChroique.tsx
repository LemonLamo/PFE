import Modal, { ModalThemes } from "../../../components/UI/Modal";

type Props = {
  isOpen: boolean,
  close: () => void,
  action: () => void,
}

const theme = "danger"

export default function DeleteMaladieChroique({isOpen, close, action}: Props) {
    return (
        <Modal isOpen={isOpen} icon="fa fa-virus" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Supprimer une maladie chronique </h3>
            <p className="text-gray-600">Êtes-vous sûr de vouloir supprimer cet enregistrement? Toutes vos données seront définitivement supprimées. Cette action ne peut pas être annulée.</p>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => {action(); close()}}>Supprimer</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
