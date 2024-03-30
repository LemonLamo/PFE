import Modal, { ModalThemes } from "../../components/UI/Modal";

type Props = {
  isOpen: boolean,
  close: () => void,
  selectedSoin: Soin,
}

const theme = "primary"

export default function ExecuterSoinModal({isOpen, close, selectedSoin}: Props) {

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Executer un soin </h3>
            <p className="text-gray-600"> Marquer le soin "{selectedSoin.acte}" pour {selectedSoin.patient.nom} {selectedSoin.patient.prenom} comme executé. Cette action ne peut pas être annulée. </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Détails: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques"/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => null}>Executer</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>
    );
}
