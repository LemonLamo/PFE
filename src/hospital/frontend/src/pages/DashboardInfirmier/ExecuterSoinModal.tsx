import { useContext, useState } from "react";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import { executerSoin } from "../../hooks/useSoins";
import AlertsContext from "../../hooks/AlertsContext";

type Props = {
  isOpen: boolean,
  close: () => void,
  selectedSoin: Soin,
}

const theme = "primary"


export default function ExecuterSoinModal({isOpen, close, selectedSoin}: Props) {
    const { showAlert } = useContext(AlertsContext);

    const [remarque, setRemarque] = useState('')
    async function submit(){
      try {
        if(!confirm("Êtes-vous sûr de vouloir continuer? Cette action est irréversible et ne pourra plus être annulée."))
          return;
        await executerSoin(selectedSoin.id, remarque);
        showAlert("success", "Soin executé correctement");
        close();
      } catch (error: any) {
        if (error.response)
            if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
        else
            showAlert("error", error.code + ": " + error.message);
      }
    }
    return (
        <Modal isOpen={isOpen} icon="fa fa-briefcase-medical" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Executer un soin </h3>
            <p className="text-gray-600"> Marquer le soin <span className="font-bold">{selectedSoin.id}</span> pour <span className="font-bold">{selectedSoin.patient.nom} {selectedSoin.patient.prenom}</span> comme executé. Cette action ne peut pas être annulée. </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-1 self-start"> Détails: </label>
                <textarea className="col-span-5" rows={5} placeholder="Remarques" value={remarque} onChange={(e) => setRemarque(e.target.value)} />
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={submit}>Executer</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>
    );
}
