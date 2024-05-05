import { useContext, useEffect, useState } from "react";
import MedecinsSelect from "../../components/Selects/MedecinsSelect";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import axios from "axios";
import { baseURL } from "../../config";
import { ajouterTransfert } from "../../hooks/useTransferts";
import AlertsContext from "../../hooks/AlertsContext";

type Props = {
  isOpen: boolean,
  close: () => void
  selectedHospitalisation: Hospitalisation,
}

const theme = "primary"

export default function TransfertModal({isOpen, close, selectedHospitalisation}: Props) {
  const { showAlert } = useContext(AlertsContext);

    const [transfert, setTransfert] = useState<Transfert>({
        hospitalisation: "",
        hopital: "",
        service: "",
        medecin: {NIN: "", nom: "", prenom: ""},
        remarques: ""
    })
    const [hopitaux, setHopitaux] = useState<Hopital[]>([]);
    const [services, setServices] = useState<any[]>([]);
    useEffect(()=>{
        axios.get(`${baseURL}/api/hopitaux/`).then((response)=>{
            setHopitaux(response.data)
            if(response.data.length > 0)
                setTransfert(data => ({...data, hopital: response.data[0].nom_hopital!}))
        })
    }, [])
    useEffect(()=>{
        if(!transfert.hopital)
            setServices([])
        else
            axios.get(`${baseURL}/api/hopitaux/${transfert.hopital}/services`).then((response)=>{
                setServices(response.data)
                if(response.data.length > 0)
                    setTransfert(data => ({...data, service: response.data[0].service!}))
            })
    }, [transfert.hopital])
    
    function select_medecin(medecin: Partial<Personnel>) {
        if(medecin)
            setTransfert(t => ({...t, medecin:{NIN: medecin.NIN, nom: medecin.nom, prenom: medecin.prenom} }))
    }

    async function submit(){
      try {
        await ajouterTransfert(transfert);
        await axios.post(`${baseURL}/api/chambres/${selectedHospitalisation.chambre}/lits/${selectedHospitalisation.lit}/liberer`)
        showAlert("success", "Demande de transfert enregistrée correctement");
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
        <Modal isOpen={isOpen} icon="fa fa-truck-medical" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Transfert de patient </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour transferer <span className="font-bold">{selectedHospitalisation.patient.nom} {selectedHospitalisation.patient.prenom}</span>.</p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2">Hôpital<span className="text-red-500">*</span></label>
                <select className="col-span-4" value={transfert.hopital} onChange={(e) => setTransfert(t => ({...t, hopital: e.target.value}))}>
                    {hopitaux.map((x, i)=> <option key={i}>{x.nom_hopital}</option>)}
                </select>

                <label className="font-semibold text-slate-700 text-sm col-span-2">Service<span className="text-red-500">*</span></label>
                <select className="col-span-4" value={transfert.service} onChange={(e) => setTransfert(t => ({...t, service: e.target.value}))}>
                    {services.map((x, i)=> <option key={i}>{x.service}</option>)}
                </select>

                <label className="font-semibold text-slate-700 text-sm col-span-2">Médecin<span className="text-red-500">*</span></label>
                <MedecinsSelect className="col-span-4" placeholder="Médecin" hopital={transfert.hopital} service={transfert.service} onChange={select_medecin} state={{ NIN: transfert.medecin!.NIN!, nom: transfert.medecin!.nom!, prenom: transfert.medecin!.prenom! }} />

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={transfert.remarques} onChange={(e) => setTransfert(t => ({...t, remarques: e.target.value}))}/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={submit}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
