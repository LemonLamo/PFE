import { useState } from "react";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import moment from "moment";
import Select from "../../components/Selects/Select";

type Props = {
  isOpen: boolean,
  close: () => void
  selectedHospitalisation: Hospitalisation,
}

const theme = "primary"

export default function AjouterInterventionModal({isOpen, close, selectedHospitalisation}: Props) {
    const [selectedIntervention, setSelectedIntervention] = useState<Partial<Intervention>>({code_intervention:"", designation:""});
    function select_intervention(intervention: any) {
        if(intervention)
            setSelectedIntervention({ code_intervention: intervention.code, designation: intervention.designation })
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une intervention </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour plannifier une intervention pour {selectedHospitalisation.patient.nom} {selectedHospitalisation.patient.prenom} </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Intervention: </label>
                <Select<InterventionCode> url="interventions" code="code_intervention" designation="designation" className="col-span-4" placeholder="Intervention" onChange={select_intervention}/>

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                <input className="primary col-span-4" type="datetime-local" placeholder="Date" value={moment(selectedIntervention.date).format("YYYY-MM-DDTHH:mm")} onChange={(e) => setSelectedIntervention({ ...selectedIntervention, date: moment(e.target.value, "YYYY-MM-DDTHH:mm").toDate(), }) }/>

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedIntervention.remarques} onChange={(e) => setSelectedIntervention({ ...selectedIntervention, remarques: e.target.value }) }/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => null}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
