import Select from "../../components/Selects/Select";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import { updateMedicamentQuantite } from "../../hooks/useMedicaments";
import { useState } from "react";

type Props = {
  isOpen: boolean,
  close: () => void,
}

const theme = "primary"

export default function AjouterMedicamentModal({isOpen, close}: Props) {
    const [selectedMedicament, setSelectedMedicament] = useState<Medicament>({
        code_medicament: "",
        DCI: "",
        quantite: 0,
    });
    
    function select_medicament(medicament : MedicamentCode) {
        if(medicament)
        setSelectedMedicament({ ...selectedMedicament, code_medicament: medicament.code_medicament, DCI: medicament.DCI });
    }

    async function handleSubmit(medicament : Medicament){
        await updateMedicamentQuantite(1, medicament)
    }
    
    return (
        <Modal isOpen={isOpen} icon="fa fa-bed" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter un médicament </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle chambre </p>
            <div className="mb-2">
                    <label className="text-sm font-semibold">Code:</label>
                    <Select<MedicamentCode> url="medicaments" code="code_medicament" designation="DCI" placeholder="Médicament" onChange={select_medicament} />
                </div>
                <div className="col-span-4 mb-2">
                    <label className="text-sm font-semibold">Quantité à ajouter:</label>
                    <input type="number" className="primary" placeholder="Qte" value={selectedMedicament.quantite} onChange={(e) => setSelectedMedicament({ ...selectedMedicament, quantite: e.target.valueAsNumber }) } />
                </div>

            <div className="flex justify-end gap-3">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => handleSubmit(selectedMedicament)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
