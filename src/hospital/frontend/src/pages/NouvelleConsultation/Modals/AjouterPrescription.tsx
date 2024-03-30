import Select from "../../../components/Selects/Select";
import Modal, { ModalThemes } from "../../../components/UI/Modal";
import { useState } from "react";

type Props = {
  isOpen: boolean,
  close: () => void,
  action: (arg0: Prescription) => void,
}

const theme = "primary"

export default function AjouterPrescription({isOpen, close, action}: Props) {
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription>({ code_medicament: '', DCI: '', posologie: 0, frequence:0, duree:0, remarques: '', date_debut: new Date() })

    function select_prescription(medicament : MedicamentCode) {
        if(medicament)
            setSelectedPrescription({ ...selectedPrescription, code_medicament: medicament.code_medicament!, DCI: medicament.DCI })
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une allergie </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle allergie </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Médicament: </label>
                <Select<MedicamentCode> url="medicaments" code="code_medicament" designation="DCI" onChange={select_prescription} className="col-span-4" placeholder="Médicament" />

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Posologie: </label>
                <input className="primary col-span-4" type="number" placeholder="Posologie" value={selectedPrescription.posologie} onChange={(e) => setSelectedPrescription({ ...selectedPrescription, posologie: e.target.valueAsNumber })}></input>

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Fréquence: </label>
                <input className="primary col-span-4" type="number" placeholder="Fréquence" value={selectedPrescription.frequence} onChange={(e) => setSelectedPrescription({ ...selectedPrescription, frequence: e.target.valueAsNumber })}></input>

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Durée: </label>
                <input className="primary col-span-4" type="number" placeholder="Duree" value={selectedPrescription.duree} onChange={(e) => setSelectedPrescription({ ...selectedPrescription, duree: e.target.valueAsNumber })}></input>

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Remarques: </label>
                <textarea className="col-span-4" rows={5}  placeholder="Remarques" value={selectedPrescription.remarques} onChange={(e) => setSelectedPrescription({ ...selectedPrescription, remarques: e.target.value })}></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(selectedPrescription)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
