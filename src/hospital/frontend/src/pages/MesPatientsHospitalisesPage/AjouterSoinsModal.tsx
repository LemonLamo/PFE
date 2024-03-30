import { useState } from "react";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import InfirmiersSelect from "../../components/Selects/InfirmiersSelect";

type Props = {
  isOpen: boolean,
  close: () => void
  selectedHospitalisation: Hospitalisation,
}

const theme = "primary"

export default function selectedHospitalisation({isOpen, close, selectedHospitalisation}: Props) {
    const [selectedInfirmier, setSelectedInfirmier] = useState<Partial<Personnel>>({NIN:"", nom:"", prenom:""});
    function select_infirmier(infirmier: any) {
        if(infirmier)
        setSelectedInfirmier({ NIN: infirmier.NIN, nom: infirmier.nom, prenom: infirmier.prenom })
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Affecter un soin </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter un soin à {selectedHospitalisation.patient.nom} {selectedHospitalisation.patient.prenom} </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Infirmier: </label>
                <InfirmiersSelect className="col-span-4" placeholder="Infirmier" onChange={select_infirmier} state={{ NIN: selectedInfirmier.NIN!, nom: selectedInfirmier.nom!, prenom: selectedInfirmier.prenom! }} />

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Acte: </label>
                <select className="primary col-span-4">
                    <option>Injection</option>
                    <option>Petite intervention</option>
                    <option>Idk</option>
                </select>

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Détails: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques"/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => null}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
