import { useContext, useEffect, useState } from "react";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import InfirmiersSelect from "../../components/Selects/InfirmiersSelect";
import AuthContext from "../../hooks/AuthContext";
import { createSoin } from "../../hooks/useSoins";
import AlertsContext from "../../hooks/AlertsContext";

type Props = {
  isOpen: boolean,
  close: () => void
  selectedHospitalisation?: Hospitalisation,
}

const theme = "primary"
const actes = [
  "Injection",
  "Mini chirurgie",
  "Pansement",
  "Prise de sang",
  "Vaccination",
  "Suture",
  "Perfusion",
  "Soins palliatifs",
  "Chimiothérapie",
  "Dialyse",
  "Physiothérapie",
  "Suivi post-opératoire",
  "Rééducation"
];

export default function AjouterSoinsModal({isOpen, close, selectedHospitalisation}: Props) {
    const { showAlert } = useContext(AlertsContext);

    const auth = useContext(AuthContext)
    const [selectedSoin, setSelectedSoin] = useState<Partial<Soin>>({
        hospitalisation: "",
        patient: {NIN: "", nom: "", prenom: ""},
        infirmier: {NIN: "", nom: "", prenom: ""},
        acte: actes[0],
        details: ""
    })
    useEffect(()=>{
        setSelectedSoin(s => ({...s, hospitalisation: selectedHospitalisation?.id, patient: selectedHospitalisation?.patient}))
    }, [selectedHospitalisation])
    
    function select_infirmier(infirmier: Partial<Personnel>) {
        if(infirmier)
            setSelectedSoin(s => ({...s, infirmier:{NIN: infirmier.NIN, nom: infirmier.nom, prenom: infirmier.prenom} }))
    }

    async function submit(){
      try {
        if(!confirm("Êtes-vous sûr de vouloir continuer? Cette action est irréversible et ces données ne pourront plus être modifiées par la suite."))
          return;
        await createSoin(selectedSoin);
        showAlert("success", "Soin ajouté correctement");
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
        <Modal isOpen={isOpen} icon="fa fa-briefcase-medical" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Affecter un soin </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter un soin à <span className="font-bold">{selectedSoin.patient!.nom} {selectedSoin.patient!.prenom}</span> </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2"> Infirmier<span className="text-red-500">*</span> </label>
                <InfirmiersSelect className="col-span-4" placeholder="Infirmier" onChange={select_infirmier} state={{ NIN: selectedSoin.infirmier!.NIN!, nom: selectedSoin.infirmier!.nom!, prenom: selectedSoin.infirmier!.prenom! }} hopital={auth!.hopital} service={auth!.service}/>

                <label className="font-semibold text-slate-700 text-sm col-span-2"> Acte<span className="text-red-500">*</span> </label>
                <select className="primary col-span-4" value={selectedSoin.acte} onChange={(e) => setSelectedSoin(s => ({...s, acte: e.target.value}))}>
                    {actes.map((x, i)=> <option key={i}>{x}</option>)}
                </select>

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Détails<span className="text-red-500">*</span> </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedSoin.details} onChange={(e) => setSelectedSoin(s => ({...s, details: e.target.value}))}/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={submit}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
