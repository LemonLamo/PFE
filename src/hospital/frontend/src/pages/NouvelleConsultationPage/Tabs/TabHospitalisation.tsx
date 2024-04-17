import axios from "axios";
import moment from "moment";
import { baseURL } from "../../../config";
import { useEffect, useState } from "react";

type TabProps = {
  hospitalisationData: Partial<Hospitalisation>,
  setHospitalisationData: React.Dispatch<React.SetStateAction<Partial<Hospitalisation>>>,
}

function TabHospitalisation({ hospitalisationData, setHospitalisationData } : TabProps) {
  const [chambres, setChambres] = useState<Chambre[]>([]);
  const [lits, setLits] = useState<Lit[]>([]);
  useEffect(()=>{
    axios.get(`${baseURL}/api/chambres/`).then((response)=>{
      setChambres(response.data)
      if(response.data.length > 0)
        setHospitalisationData(data => ({...data, chambre: response.data[0].num}))
    })
  }, [])
  useEffect(()=>{
    if(!hospitalisationData.chambre)
      setLits([])
    else
      axios.get(`${baseURL}/api/chambres/${hospitalisationData.chambre}/lits?occupe=0`).then((response)=>{
        setLits(response.data)
        if(response.data.length > 0)
          setHospitalisationData(data => ({...data, lit: response.data[0].num}))
      })
  }, [hospitalisationData.chambre])

  function updateHospitalisationData(id: keyof Hospitalisation, value: Hospitalisation[typeof id]) {
    setHospitalisationData((hospitalisationData) => ({ ...hospitalisationData, [id]: value }))
  }

  return (
    <>
      <h3 className="text-lg mb-0">Hospitalisation</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="grid grid-cols-9 gap-x-2 gap-y-3 items-center">
        <label className="font-semibold text-slate-700 text-sm col-span-2"> Date d'entrée<span className="text-red-500">*</span> </label>
        <input className="primary col-span-7" type="datetime-local" value={moment(hospitalisationData.date_entree).format('YYYY-MM-DDTHH:mm')} onChange={(e) => updateHospitalisationData('date_entree', moment(e.target.value).format('YYYY-MM-DDTHH:mm'))}></input>

        <label className="font-semibold text-slate-700 text-sm col-span-2"> Mode d'entrée<span className="text-red-500">*</span> </label>
        <select className="col-span-7" value={hospitalisationData.mode_entree} onChange={(e) => updateHospitalisationData('mode_entree', e.target.value)}>
          <option>Hospitalisation complète</option>
          <option>Hospitalisation partielle</option>
          <option>Hôpital du jour</option>
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-2"> Chambre<span className="text-red-500">*</span> </label>
        <select className="col-span-3" value={hospitalisationData.chambre} onChange={(e) => updateHospitalisationData('chambre', e.target.value)}>
          { chambres.map((c, i) => (<option value={c?.num} key={i}> Chambre {c?.num}</option>)) }
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-1"> Lit<span className="text-red-500">*</span> </label>
        <select className="col-span-3" value={hospitalisationData.lit} onChange={(e) => updateHospitalisationData('lit', e.target.value)}>
          { lits.map((l, i) => (<option value={l?.num} key={i}> Lit N°{l?.num}</option>)) }
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-2"> Motif d'hospitalisation<span className="text-red-500">*</span> </label>
        <input className="primary col-span-7" type="text" placeholder="Motif" value={hospitalisationData.motif_hospitalisation} onChange={(e) => updateHospitalisationData('motif_hospitalisation', e.target.value)}></input>

        <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Résumé d'hospitalisation </label>
        <textarea rows={2} placeholder="Résumé" className="col-span-7" value={hospitalisationData.resume_hospitalisation} onChange={(e) => updateHospitalisationData('resume_hospitalisation', e.target.value)}></textarea>
      </div>
    </>
  );
}

export default TabHospitalisation