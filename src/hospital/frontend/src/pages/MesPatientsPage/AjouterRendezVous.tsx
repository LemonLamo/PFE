import Modal, { ModalThemes } from "../../components/UI/Modal";
import { useState } from "react";
import moment from "moment";
import Select from "../../components/Selects/Select";

type Props = {
  isOpen: boolean,
  close: () => void,
  selectedPatient: Partial<Patient>,
  action: (arg0: Patient["NIN"], arg1: Partial<RendezVous & InterventionCode>) => void,
}

const theme = "primary"

export default function AjouterRendezVous({isOpen, close, selectedPatient, action}: Props) {
    const [rendezVous, setRendezVous] = useState<Partial<RendezVous & InterventionCode>>({
        type: "Consultation",
        date: new Date(),
        details: "",
        patient: {}
    })

    function select_intervention(intervention: InterventionCode) {
        if(intervention)
            setRendezVous(rdv => ({ ...rdv, code_intervention: intervention.code_intervention, designation: intervention.designation }))
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter un rendez vous </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter un nouveau rendez vous </p>
            
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Type: </label>
                <select className="col-span-4" value={rendezVous.type} onChange={(e)=> setRendezVous(rdv => ({...rdv, type:e.target.value}))}>
                    <option value="Consultation"> Consultation </option>
                    <option value="Intervention"> Intervention </option>
                </select>
                {
                    rendezVous.type === "Intervention" &&
                    <>
                        <label className="font-semibold text-slate-700 text-sm col-span-2"> Intervention: </label>
                        <Select<InterventionCode> url="interventions" code="code_intervention" designation="designation" onChange={select_intervention} className="col-span-4" placeholder="Intervention" />
                    </>
                }

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                <input className="primary col-span-4" type="datetime-local" placeholder="Date" value={moment(rendezVous.date).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setRendezVous({ ...rendezVous, date: moment(e.target.value, 'YYYY-MM-DDTHH:mm').toDate() })}></input>

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Détails: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={rendezVous.details} onChange={(e) => setRendezVous({ ...rendezVous, details:e.target.value})}></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(selectedPatient.NIN!, rendezVous)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
