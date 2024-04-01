import moment from "moment";
import Select from "../../../components/Selects/Select";
import Modal, { ModalThemes } from "../../../components/UI/Modal";
import { useState } from "react";

type Props = {
  isOpen: boolean,
  close: () => void,
  action: (arg0: Partial<Radio>) => void,
}

const theme = "primary"

export default function AjouterRadio({isOpen, close, action}: Props) {
    const [selectedRadio, setSelectedRadio] = useState<Partial<Radio>>({ code_radio: '', designation: '', remarques: '', date: new Date() })

    function select_radiologie(radio : RadioCode) {
        if(radio)
            setSelectedRadio({ ...selectedRadio, code_radio: radio.code_radio, designation: radio.designation })
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une allergie </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle allergie </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Radio: </label>
                <Select<RadioCode> url="radios" code="code_radio" designation="designation" className="col-span-4" placeholder="Radio" onChange={select_radiologie} />

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                <input type="datetime-local" className="primary col-span-4" placeholder="Date" value={moment(selectedRadio.date).format("YYYY-MM-DD HH:mm")} onChange={(e) => setSelectedRadio({...selectedRadio, date: moment(e.target.value, "YYYY-MM-DD HH:mm").toDate()})}/>

                <label className="font-semibold text-slate-700 text-sm col-span-2  self-start"> Remarques: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedRadio.remarques} onChange={(e) => setSelectedRadio({ ...selectedRadio, remarques: e.target.value })}></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(selectedRadio)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
