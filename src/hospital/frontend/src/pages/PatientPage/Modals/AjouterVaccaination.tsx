import { useState } from "react";
import Modal, { ModalThemes } from "../../../components/UI/Modal";
import Select from "../../../components/Selects/Select";
import moment from "moment";

type Props = {
  isOpen: boolean,
  close: () => void,
  action: (arg0: Vaccination) => void,
}

const theme = "primary"

export default function AjouterVaccaination({isOpen, close, action}: Props) {
    const [selectedVaccination, setSelectedVaccination] = useState<Vaccination>({code_vaccin:"", designation:"", date: new Date(), date_de_prochaine_dose: undefined});
    function select_vaccin(vaccin: VaccinationCode) {
        if(vaccin)
            setSelectedVaccination({ ...selectedVaccination, code_vaccin: vaccin.code_vaccin, designation: vaccin.designation })
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une allergie </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle allergie </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Vaccin: </label>
                <Select<VaccinationCode> url="vaccins" code="code_vaccin" designation="designation" className="col-span-4" placeholder="Vaccination chronique" onChange={select_vaccin} />

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                <input type="datetime-local" className="primary col-span-4" placeholder="Date" value={moment(selectedVaccination.date).format("YYYY-MM-DD HH:mm")} onChange={(e) => setSelectedVaccination({...selectedVaccination, date: moment(e.target.value, "YYYY-MM-DD HH:mm").toDate()})}/>

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedVaccination.remarques} onChange={(e) => setSelectedVaccination({...selectedVaccination, remarques: e.target.value})}/>

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Date de prochaine dose: </label>
                <input type="datetime-local" className="primary col-span-4" placeholder="Date" value={selectedVaccination.date_de_prochaine_dose? moment(selectedVaccination.date_de_prochaine_dose).format("YYYY-MM-DD HH:mm") : undefined} onChange={(e) => setSelectedVaccination({...selectedVaccination, date_de_prochaine_dose: moment(e.target.value, "YYYY-MM-DD HH:mm").toDate()})}/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => {action(selectedVaccination); close()}}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
