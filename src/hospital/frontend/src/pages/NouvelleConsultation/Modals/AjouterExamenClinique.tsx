import Select from "../../../components/Selects/Select";
import Modal, { ModalThemes } from "../../../components/UI/Modal";
import { useState } from "react";

type Props = {
  isOpen: boolean,
  close: () => void,
  action: (arg0: ExamenClinique) => void,
}

const theme = "primary"

export default function AjouterExamenClinique({isOpen, close, action}: Props) {
    const [selectedExamenClinique, setSelectedExamenClinique] = useState<ExamenClinique>({ code_examen_clinique: '', designation: '', resultat: '', remarques: '' })
    
    function select_examen_clinique(examen_clinique : ExamenCliniqueCode) {
        if(examen_clinique)
            setSelectedExamenClinique({ ...selectedExamenClinique, code_examen_clinique: examen_clinique.code_examen_clinique, designation: examen_clinique.designation})
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-health-snake" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une allergie </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle allergie </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Examen clinique: </label>
              <Select<ExamenCliniqueCode> url="examens-cliniques" code="code_examen_clinique" designation="designation" onChange={select_examen_clinique} className="col-span-4" placeholder="Examen Clinique"/>

              <label className="font-semibold text-slate-700 text-sm col-span-2"> Résultats: </label>
              <input className="primary col-span-4" type="text" placeholder="Résultat" value={selectedExamenClinique.resultat} onChange={(e) => setSelectedExamenClinique({ ...selectedExamenClinique, resultat: e.target.value })}></input>

              <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
              <textarea rows={5} className="col-span-4" placeholder="Remarques" value={selectedExamenClinique.remarques} onChange={(e) => setSelectedExamenClinique({ ...selectedExamenClinique, remarques: e.target.value })}></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(selectedExamenClinique)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
