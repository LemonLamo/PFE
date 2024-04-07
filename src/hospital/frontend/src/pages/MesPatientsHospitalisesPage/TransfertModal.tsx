import { useEffect, useState } from "react";
import MedecinsSelect from "../../components/Selects/MedecinsSelect";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import axios from "axios";
import { baseURL } from "../../config";

type Props = {
  isOpen: boolean,
  close: () => void
  selectedHospitalisation: Hospitalisation,
  action: (arg0: Transfert) => void
}

const theme = "primary"

export default function TransfertModal({isOpen, close, selectedHospitalisation, action}: Props) {
    const [transfert, setTransfert] = useState<Transfert>({
        hospitalisation: "",
        hopital: "",
        service: "",
        medecin: {NIN: "", nom: "", prenom: ""},
        remarques: ""
    })
    const [hopitaux, setHopitaux] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    useEffect(()=>{
        axios.get(`${baseURL}/api/hopitaux/`).then((response)=>{
            setHopitaux(response.data)
            if(response.data.length > 0)
                setTransfert(data => ({...data, hopital: response.data[0].hopital!}))
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
    useEffect(()=>{
        setTransfert(t => ({...t, hospitalisation: selectedHospitalisation.id}))
    }, [selectedHospitalisation])
    
    function select_medecin(medecin: Partial<Personnel>) {
        if(medecin)
            setTransfert(t => ({...t, medecin:{NIN: medecin.NIN, nom: medecin.nom, prenom: medecin.prenom} }))
    }

    return (
        <Modal isOpen={isOpen} icon="fa fa-truck-medical" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Transfert de patient </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour transferer {selectedHospitalisation.patient.nom} {selectedHospitalisation.patient.prenom} </p>
            <div className="grid grid-cols-6 gap-2">
                <label className="font-semibold text-slate-700 text-sm col-span-2">Hôpital:</label>
                <select className="col-span-4" value={transfert.hopital} onChange={(e) => setTransfert(t => ({...t, hopital: e.target.value}))}>
                    {hopitaux.map((x, i)=> <option key={i}>{x.hopital}</option>)}
                </select>

                <label className="font-semibold text-slate-700 text-sm col-span-2">Service:</label>
                <select className="col-span-4" value={transfert.service} onChange={(e) => setTransfert(t => ({...t, service: e.target.value}))}>
                    {services.map((x, i)=> <option key={i}>{x.service}</option>)}
                </select>

                <label className="font-semibold text-slate-700 text-sm col-span-2">Médecin:</label>
                <MedecinsSelect className="col-span-4" placeholder="Médecin" onChange={select_medecin} state={{ NIN: transfert.medecin!.NIN!, nom: transfert.medecin!.nom!, prenom: transfert.medecin!.prenom! }} />

                <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
                <textarea className="col-span-4" rows={5} placeholder="Remarques" value={transfert.remarques} onChange={(e) => setTransfert(t => ({...t, remarques: e.target.value}))}/>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => action(transfert)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
