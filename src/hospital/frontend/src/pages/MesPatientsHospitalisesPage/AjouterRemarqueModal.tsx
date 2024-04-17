import { useState } from "react";
import Modal, { ModalThemes } from "../../components/UI/Modal";

type Props = {
  isOpen: boolean,
  close: () => void
  selectedHospitalisation: Hospitalisation,
  action: (arg0: Hospitalisation["id"], arg1: string) => void
}

const theme = "primary"

export default function AjouterRemarqueModal({isOpen, close, selectedHospitalisation, action}: Props) {
    const [remarque, setRemarque] = useState("");
    return (
        <Modal isOpen={isOpen} icon="fa fa-edit" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une remarque </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une remarque à cette hospitalisation pour <span className="font-bold">{selectedHospitalisation.patient.nom} {selectedHospitalisation.patient.prenom}</span></p>

            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques<span className="text-red-500">*</span> </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={remarque} onChange={(e) => setRemarque(e.target.value)} />
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(selectedHospitalisation.id, remarque)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
