import { useState } from "react";
import Modal, { ModalThemes } from "../../../components/UI/Modal";
import moment from "moment";

type Props = {
  isOpen: boolean,
  close: () => void,
  action: (arg0: Antecedent) => void
}

const theme = "primary"

export default function AjouterAntecedentMedical({isOpen, close, action}: Props) {
    const [selectedAntecedentMedical, setSelectedAntecedentMedical] = useState<Antecedent>({designation:"", date: new Date(), remarques:""});

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter un antécédant </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle antecedent </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Designation: </label>
                <input type="text" className="primary col-span-4" placeholder="Designation" value={selectedAntecedentMedical.designation} onChange={(e) => setSelectedAntecedentMedical({...selectedAntecedentMedical, designation: e.target.value})}/>

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                <input type="datetime-local" className="primary col-span-4" placeholder="Date" value={moment(selectedAntecedentMedical.date).format("YYYY-MM-DD HH:mm")} onChange={(e) => setSelectedAntecedentMedical({...selectedAntecedentMedical, date: moment(e.target.value, "YYYY-MM-DD HH:mm").toDate()})}/>

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedAntecedentMedical.remarques} onChange={(e) => setSelectedAntecedentMedical({...selectedAntecedentMedical, remarques: e.target.value})}/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(selectedAntecedentMedical)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
