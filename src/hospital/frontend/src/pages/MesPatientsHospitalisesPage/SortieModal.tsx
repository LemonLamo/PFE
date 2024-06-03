import { useContext, useState } from "react";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import moment from "moment";
import { ajouterSortie } from "../../hooks/useHospitalisations";
import AlertsContext from "../../hooks/AlertsContext";
import axios from "axios";
import { baseURL } from "../../config";

type Props = {
  isOpen: boolean,
  close: () => void
  selectedHospitalisation: Hospitalisation,
}

const theme = "primary"
const MODES_SORTIE = [
    "Hospitalisation complète",
    "Hospitalisation partielle",
    "Hôpital du jour"
]

export default function SortieModal({isOpen, close, selectedHospitalisation}: Props) {
  const { showAlert } = useContext(AlertsContext);

    const [sortie, setSortie] = useState<Sortie>({
        date_sortie: new Date(),
        mode_sortie: MODES_SORTIE[0],
    })

    async function submit(){
      try {
        if(!confirm("Êtes-vous sûr de vouloir continuer? Cette action est irréversible et ces données ne pourront plus être modifiées par la suite."))
          return;
        await ajouterSortie(selectedHospitalisation.id, sortie);
        showAlert("success", "Sortie enregistrée correctement");
        close();
      } catch (error: any) {
        if (error.response)
          if(error.response?.data?.errorCode != "form-validation")
            showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
        else
          showAlert("error", error.code + ": " + error.message);
        return;
      }
      await axios.post(`${baseURL}/api/chambres/${selectedHospitalisation.chambre}/lits/${selectedHospitalisation.lit}/liberer`)
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-person-running" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Sortie du malade </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une remarque à cette hospitalisation pour <span className="font-bold">{selectedHospitalisation.patient.nom} {selectedHospitalisation.patient.prenom}</span>.</p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2">Mode de sortie<span className="text-red-500">*</span> </label>
                <select className="col-span-4" value={sortie.mode_sortie} onChange={(e) => setSortie(s => ({...s, mode_sortie: e.target.value}))}>
                    {MODES_SORTIE.map((x, i)=> <option key={i}>{x}</option>)}
                </select>

                <label className="font-semibold text-slate-700 text-sm col-span-2">Date de sortie<span className="text-red-500">*</span></label>
                <input className="primary col-span-4" type="datetime-local" value={moment(sortie.date_sortie).format("YYYY-MM-DD HH:mm")} onChange={(e) => setSortie(s => ({...s, date_sortie: moment(e.target.value, "YYYY-MM-DD HH:mm").toDate()}))}/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={submit}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
