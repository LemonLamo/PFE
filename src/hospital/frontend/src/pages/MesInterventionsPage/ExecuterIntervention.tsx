import { useState } from "react";
import Modal, { ModalThemes } from "../../components/UI/Modal";

type Props = {
  isOpen: boolean,
  close: () => void,
  selectedIntervention: Partial<Intervention>,
  action: (arg0: Intervention["id"], arg1: string) => void
}

const theme = "primary"

export default function ExecuterIntervention({isOpen, close, selectedIntervention, action}: Props) {
    const [protocoleOperatoire, setProtocoleOperatoire] = useState('')
    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Executer une intervention </h3>
            <p className="text-gray-600"> Marquer l'intervention "{selectedIntervention.designation}" pour {selectedIntervention.patient!.nom} {selectedIntervention.patient!.prenom} comme executé. Cette action ne peut pas être annulée. </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Protocole opératoire: </label>
        <textarea rows={5} placeholder="Résumé" className="col-span-7" value={protocoleOperatoire} onChange={(e) => setProtocoleOperatoire(e.target.value)}></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(selectedIntervention.id!, protocoleOperatoire)}>Executer</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>
    );
}
