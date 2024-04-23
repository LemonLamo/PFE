import { useState } from "react";
import Modal, { ModalThemes } from "../../../components/UI/Modal";
import moment from "moment";
import Select from "../../../components/Selects/Select";

type Props = {
  isOpen: boolean,
  close: () => void,
  action: (arg0: Partial<Intervention>) => void
}

const theme = "primary"

export default function AjouterIntervention({isOpen, close, action}: Props) {
    const [selectedIntervention, setSelectedIntervention] = useState<Partial<Intervention>>({code_intervention:"", designation:"", date: new Date()});
    function select_intervention(intervention: InterventionCode) {
        if(intervention)
            setSelectedIntervention({...selectedIntervention, code_intervention: intervention.code_intervention, designation: intervention.designation })
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une intervention </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour plannifier une intervention.</p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Intervention: </label>
                <Select<InterventionCode> url="interventions" code="code_intervention" designation="designation" onChange={select_intervention} className="col-span-4" placeholder="Intervention" />

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                <input className="primary col-span-4" type="datetime-local" placeholder="Date" value={moment(selectedIntervention.date).format("YYYY-MM-DDTHH:mm")} onChange={(e) => setSelectedIntervention({ ...selectedIntervention, date: moment(e.target.value, "YYYY-MM-DDTHH:mm").toDate(), }) }/>

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedIntervention.remarques} onChange={(e) => setSelectedIntervention({ ...selectedIntervention, remarques: e.target.value }) }/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => {action(selectedIntervention); close()}}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
