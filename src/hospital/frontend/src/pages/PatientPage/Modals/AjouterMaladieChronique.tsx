import { useState } from "react";
import moment from "moment";
import Modal, { ModalThemes } from "../../../components/UI/Modal";
import Select from "../../../components/Selects/Select";

type Props = {
  isOpen: boolean,
  close: () => void
  action: (arg0: Maladie) => void
}

const theme = "primary"

export default function AjouterMaladieChronique({isOpen, close, action}: Props) {
    const [selectedMaladie, setSelectedMaladie] = useState<Maladie>({code_maladie:"", designation:"", date: new Date()});
    function select_maladie(maladie: MaladieCode) {
        if(maladie)
            setSelectedMaladie({...selectedMaladie, code_maladie: maladie.code_maladie, designation: maladie.designation})
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une maladie chronique </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle maladie chronique </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Maladie: </label>
                <Select<MaladieCode> url="maladies-chroniques" code="code_maladie" designation="designation" className="col-span-4" placeholder="Maladie chronique" onChange={select_maladie} />

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                <input type="date" className="primary col-span-4" placeholder="Date de diagnostic" value={moment(selectedMaladie.date).format("YYYY-MM-DD")} onChange={(e) => setSelectedMaladie({...selectedMaladie, date: moment(e.target.value, "YYYY-MM-DD").toDate()})}/>

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedMaladie.remarques} onChange={(e) => setSelectedMaladie({...selectedMaladie, remarques: e.target.value})}/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(selectedMaladie)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
