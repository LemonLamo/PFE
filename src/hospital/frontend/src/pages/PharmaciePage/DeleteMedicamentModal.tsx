import { useContext } from "react";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import { deleteMedicament } from "../../hooks/useMedicaments";
import AlertsContext from "../../hooks/AlertsContext";

type Props = {
  isOpen: boolean,
  close: () => void,
  selectedMedicament: Medicament,
}

const theme = "danger"

export default function DeleteMedicamentModal({isOpen, close, selectedMedicament}: Props) {
    const { showAlert } = useContext(AlertsContext);

    async function handleSubmit(){
        try{
            await deleteMedicament(selectedMedicament.code_medicament)
            close();
        }catch(error : any){
            if (error.response)
                if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
            else
                showAlert("error", error.code + ": " + error.message);
        }
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-pills" theme={theme} size="sm:max-w-xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Supprimer le médicament "{selectedMedicament.DCI} ({selectedMedicament.code_medicament})" </h3>
            <p className="text-gray-600"> Êtes-vous sûr de vouloir supprimer cet enregistrement? Toutes vos données seront définitivement supprimées. Cette action ne peut pas être annulée. </p>
            <div className="flex justify-end gap-3">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={handleSubmit}>Retirer</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>
    );
}
