import axios from "axios";
import moment from "moment";
import { baseURL } from "../../hooks";
import { useQuery } from "@tanstack/react-query";

type TabProps = {
  hospitalisationData: Hospitalisation,
  setHospitalisationData: React.Dispatch<React.SetStateAction<Hospitalisation>>,
}

function TabHospitalisation({ hospitalisationData, setHospitalisationData } : TabProps) {
  const chambres = useQuery<Chambre[]>({
    queryKey: ["chambres"],
    queryFn: async () => {
      const result =(await axios.get(`${baseURL}/api/chambres/`)).data
      return result;
    },
  });
  const lits = useQuery<Chambre[]>({
    queryKey: ["lits"+hospitalisationData.chambre],
    queryFn: async () => {
      const result =(await axios.get(`${baseURL}/api/chambres/${hospitalisationData.chambre}/lits`)).data
      return result;
    },
  });
  function updateHospitalisationData(id: keyof Hospitalisation, value: Hospitalisation[typeof id]) {
    setHospitalisationData((hospitalisationData) => ({ ...hospitalisationData, [id]: value }))
  }

  return (
    <>
      <h3 className="text-lg mb-0">Hospitalisation</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="grid grid-cols-9 gap-x-2 gap-y-3 items-center">
        <label className="font-semibold text-slate-700 text-sm col-span-2"> Date d'entrée: </label>
        <input className="primary col-span-7" type="datetime-local" value={moment(hospitalisationData.date_entree).format('YYYY-MM-DDTHH:mm')} onChange={(e) => updateHospitalisationData('date_entree', moment(e.target.value).format('YYYY-MM-DDTHH:mm'))}></input>

        <label className="font-semibold text-slate-700 text-sm col-span-2"> Mode d'entrée: </label>
        <select className="col-span-7" value={hospitalisationData.mode_entree} onChange={(e) => updateHospitalisationData('mode_entree', e.target.value)}>
          <option>Hospitalisation complète</option>
          <option>Hospitalisation partielle</option>
          <option>Hôpital du jour</option>
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-2"> Chambre: </label>
        <select className="col-span-3" value={hospitalisationData.chambre} onChange={(e) => updateHospitalisationData('chambre', e.target.value)}>
          {chambres.data?.map((c, i) => (
            <option value={c?.num} key={i}> Chambre {c?.num}</option>
          ))
          }
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-1"> Lit: </label>
        <select className="col-span-3" value={hospitalisationData.lit} onChange={(e) => updateHospitalisationData('lit', e.target.value)}>
          {lits.data?.map((l, i) => (
            <option value={l?.num} key={i}> Lit N°{l?.num}</option>
          ))
          }
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-2"> Motif d'hospitalisation: </label>
        <input className="primary col-span-7" type="text" placeholder="Motif" value={hospitalisationData.motif_hospitalisation} onChange={(e) => updateHospitalisationData('motif_hospitalisation', e.target.value)}></input>

        <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Résumé d'hospitalisation: </label>
        <textarea rows={2} placeholder="Résumé" className="col-span-7" value={hospitalisationData.resume_hospitalisation} onChange={(e) => updateHospitalisationData('resume_hospitalisation', e.target.value)}></textarea>
      </div>
    </>
  );
}

export default TabHospitalisation