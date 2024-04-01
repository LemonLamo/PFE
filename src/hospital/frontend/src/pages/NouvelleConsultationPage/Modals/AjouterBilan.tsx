import Modal, { ModalThemes } from "../../../components/UI/Modal";
import { useState } from "react";
import Select from "../../../components/Selects/Select";
import moment from "moment";

type Props = {
  isOpen: boolean,
  close: () => void,
  action: (arg0: Partial<Bilan>) => void,
}

const theme = "primary"

export default function AjouterBilan({isOpen, close, action}: Props) {
    const [selectedBilan, setSelectedBilan] = useState<Partial<Bilan>>({ code_bilan: '', designation: '', remarques: '', date: new Date() })
    function select_bilan(bilan : BilanCode) {
        if(bilan)
            setSelectedBilan({ ...selectedBilan, code_bilan: bilan.code_bilan, designation: bilan.designation })
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une allergie </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle allergie </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Bilan: </label>
                <Select<BilanCode> url="bilans" code="code_bilan" designation="designation" onChange={select_bilan} className="col-span-4" placeholder="Bilan" />

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                <input type="datetime-local" className="primary col-span-4" placeholder="Date" value={moment(selectedBilan.date).format("YYYY-MM-DD HH:mm")} onChange={(e) => setSelectedBilan({...selectedBilan, date: moment(e.target.value, "YYYY-MM-DD HH:mm").toDate()})}/>

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedBilan.remarques} onChange={(e) => setSelectedBilan({ ...selectedBilan, remarques: e.target.value })}></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(selectedBilan)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
