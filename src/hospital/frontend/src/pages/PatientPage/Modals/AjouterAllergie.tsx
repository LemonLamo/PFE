import { useState } from "react";
import Modal, { ModalThemes } from "../../../components/UI/Modal";
import moment from "moment";
import Select from "../../../components/Selects/Select";

type Props = {
  isOpen: boolean,
  close: () => void
  action: (arg0: Allergie) => void
}

const theme = "primary"

export default function AjouterAllergie({isOpen, close, action}: Props) {
    const [selectedAllergie, setSelectedAllergie] = useState<Allergie>({code_allergene:"", designation:"", date:new Date()});
    function select_allergie(allergie: Allergie) {
        if(allergie)
            setSelectedAllergie(a => ({...a, ...allergie}))
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une allergie </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle allergie </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Allergène: </label>
                <Select<Allergie> url="allergenes" code="code_allergene" designation="designation" onChange={select_allergie} className="col-span-4" placeholder="Allergène"/>

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                <input type="datetime-local" className="primary col-span-4" placeholder="Date de diagnostic" value={moment(selectedAllergie.date).format("YYYY-MM-DD HH:mm")} onChange={(e) => setSelectedAllergie({...selectedAllergie, date: moment(e.target.value, "YYYY-MM-DD HH:mm").toDate()})}/>

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedAllergie.remarques} onChange={(e) => setSelectedAllergie({...selectedAllergie, remarques: e.target.value})}/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(selectedAllergie)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
