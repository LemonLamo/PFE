import { useContext, useState } from "react";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import { ajouterRemarque } from "../../hooks/useHospitalisations";
import AlertsContext from "../../hooks/AlertsContext";

type Props = {
  isOpen: boolean,
  close: () => void
  selectedHospitalisation: Hospitalisation
}

const theme = "primary"

export default function AjouterRemarqueModal({isOpen, close, selectedHospitalisation}: Props) {
  const { showAlert } = useContext(AlertsContext);

    const [remarque, setRemarque] = useState("");
    async function submit(){
      try {
        if(!confirm("Êtes-vous sûr de vouloir continuer? Cette action est irréversible et ces données ne pourront plus être modifiées par la suite."))
          return;
        await ajouterRemarque(selectedHospitalisation.id, remarque);
        showAlert("success", "Remarque ajouté correctement");
        close();
      } catch (error: any) {
        if (error.response)
            if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
        else
            showAlert("error", error.code + ": " + error.message);
      }
    }
    return (
        <Modal isOpen={isOpen} icon="fa fa-edit" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une remarque </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une remarque à cette hospitalisation pour <span className="font-bold">{selectedHospitalisation.patient.nom} {selectedHospitalisation.patient.prenom}</span></p>

            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques<span className="text-red-500">*</span> </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={remarque} onChange={(e) => setRemarque(e.target.value)} />
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={submit}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
