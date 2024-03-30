import Modal, { ModalThemes } from "../../components/UI/Modal";
import { deletePersonnel } from "../../hooks/usePersonnel";

type Props = {
  isOpen: boolean,
  close: () => void
  selectedPersonnel: Personnel,
}

const theme="danger"

export default function DeletePersonnelModal({ isOpen, close, selectedPersonnel} : Props) {
  function handleSubmit(NIN : Personnel["NIN"]){
    deletePersonnel(NIN);
  }

  return (
    <Modal isOpen={isOpen} icon="fa fa-bed" theme={theme} size="sm:max-w-xl">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Supprimer la Personnel "{selectedPersonnel.nom} {selectedPersonnel.prenom}" </h3>
      <p className="text-gray-600"> Êtes-vous sûr de vouloir supprimer cet enregistrement? Toutes vos données seront définitivement supprimées. Cette action ne peut pas être annulée. </p>
      <div className="flex justify-end gap-3">
        <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => handleSubmit(selectedPersonnel.NIN)}>Supprimer</button>
        <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
      </div>
    </Modal>
    );
}
  