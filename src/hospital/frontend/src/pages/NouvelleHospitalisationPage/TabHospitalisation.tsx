import axios from "axios";
import { baseURL } from "../../config";
import { useEffect, useState } from "react";

type TabProps = {
  form: any
}

function TabHospitalisation({ form } : TabProps) {
  const [chambres, setChambres] = useState<Chambre[]>([]);
  const [lits, setLits] = useState<Lit[]>([]);

  useEffect(()=>{
    axios.get(`${baseURL}/api/chambres/`).then((response)=>{
      setChambres(response.data)
      if(response.data.length > 0)
        form.setValue("chambre", response.data[0].num)
    })
  }, [])

  const watched_chambre = form.watch("chambre");
  useEffect(() => {
    if(!watched_chambre)
      setLits([])
    else
      axios.get(`${baseURL}/api/chambres/${watched_chambre}/lits?occupe=0`).then((response)=>{
        setLits(response.data)
        if(response.data.length > 0)
          form.setValue("lit", response.data[0].num)
      })
  }, [watched_chambre]);

  return (
    <>
      <h3 className="text-lg mb-0">Hospitalisation</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="grid grid-cols-9 gap-x-2 gap-y-3 items-center">
        <label className="font-semibold text-slate-700 text-sm col-span-2"> Date d'entrée<span className="text-red-500">*</span> </label>
        <input type="datetime-local" className={`col-span-7 primary ${form.errors.date_entree && 'has-error'}`} {...form.register("date_entree", {required: true})} />

        <label className="font-semibold text-slate-700 text-sm col-span-2"> Mode d'entrée<span className="text-red-500">*</span> </label>
        <select className={`col-span-7 primary ${form.errors.mode_entree && 'has-error'}`} {...form.register("mode_entree", {required: true})}>
          <option>Hospitalisation complète</option>
          <option>Hospitalisation partielle</option>
          <option>Hôpital du jour</option>
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-2"> Chambre<span className="text-red-500">*</span> </label>
        <select className={`col-span-3 primary ${form.errors.chambres && 'has-error'}`} {...form.register("chambre", {required: true})}>
          { chambres.map((c, i) => (<option value={c?.num} key={i}> Chambre {c?.num}</option>)) }
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-1"> Lit<span className="text-red-500">*</span> </label>
        <select className={`col-span-3 primary ${form.errors.lit && 'has-error'}`} {...form.register("lit", {required: true})}>
          { lits.map((l, i) => (<option value={l?.num} key={i}> Lit N°{l?.num}</option>)) }
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-2"> Motif d'hospitalisation<span className="text-red-500">*</span> </label>
        <input type="text" placeholder="Motif" className={`col-span-7 primary ${form.errors.motif_hospitalisation && 'has-error'}`} {...form.register("motif_hospitalisation", {required: true})} />

        <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Résumé d'hospitalisation </label>
        <textarea rows={2} placeholder="Résumé" className={`col-span-7 primary ${form.errors.resume_hospitalisation && 'has-error'}`} {...form.register("resume_hospitalisation", {required: false})} />
      </div>
    </>
  );
}

export default TabHospitalisation