import { useState } from "react";
import Modal, { ModalThemes } from "../../../components/UI/Modal";
import Select from "../../../components/Selects/Select";
import moment from "moment";

type Props = {
  isOpen: boolean,
  close: () => void
}

const theme = "primary"

export default function AjouterVaccaination({isOpen, close}: Props) {
    const [selectedVaccination, setSelectedVaccination] = useState<Partial<Vaccination>>({code_vaccin:"", designation:""});
    function select_vaccin(vaccin: VaccinationCode) {
        if(vaccin)
            setSelectedVaccination({ ...selectedVaccination, code_vaccin: vaccin.code_vaccin, designation: vaccin.designation })
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une allergie </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle allergie </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Allergene: </label>
                <Select<VaccinationCode> url="vaccins" code="code_vaccin" designation="designation" className="col-span-4" placeholder="Vaccination chronique" onChange={select_vaccin} />

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Date: </label>
                <input type="date" className="primary col-span-4" placeholder="Date" value={moment(selectedVaccination.date).format("YYYY-MM-DD")} onChange={(e) => setSelectedVaccination({...selectedVaccination, date: moment(e.target.value, "YYYY-MM-DD").toDate()})}/>

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques"/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => null}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
