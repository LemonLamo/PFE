import Modal, { ModalThemes } from "../../../components/UI/Modal";
import { useState } from "react";
import moment from "moment";
import Select from "../../../components/Selects/Select";

type Props = {
  isOpen: boolean,
  close: () => void,
  action: (arg0: Intervention) => void,
}

const theme = "primary"

export default function AjouterIntervention({isOpen, close, action}: Props) {
    const [selectedIntervention, setSelectedIntervention] = useState<Intervention>({
        id: '',
        code_intervention: '',
        designation: '',
        nom_hopital: '',
        medecin: {},
        patient: {},
        date: new Date(),
        remarques: ''
    })

    function select_intervention(intervention: InterventionCode) {
        if(intervention)
            setSelectedIntervention({ ...selectedIntervention, code_intervention: intervention.code_intervention, designation: intervention.designation })
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une allergie </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle allergie </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Intervention: </label>
                        <Select<InterventionCode> url="interventions" code="code_intervention" designation="designation" onChange={select_intervention} className="col-span-4" placeholder="Intervention" />

                        <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                        <input className="primary col-span-4" type="datetime-local" placeholder="Date" value={moment(selectedIntervention.date).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setSelectedIntervention({ ...selectedIntervention, date: moment(e.target.value, 'YYYY-MM-DDTHH:mm').toDate() })}></input>

                        <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                        <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedIntervention.remarques} onChange={(e) => setSelectedIntervention({ ...selectedIntervention, remarques:e.target.value})}></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(selectedIntervention)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
