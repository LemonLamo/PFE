import moment from "moment";

type TabProps = {
  consultationData: Consultation,
  setConsultationData: React.Dispatch<React.SetStateAction<Consultation>>,
}

function TabMotif({ consultationData, setConsultationData }: TabProps) {
  function updateState(id : string, value: any){
    setConsultationData((consultationData: Consultation) => { return { ...consultationData, [id]: value} })
  }
  return (
    <>
      <h3 className="text-lg mb-0">Motif de la consultation</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="grid grid-cols-6 gap-x-2 gap-y-3 items-center">

        <label className="font-semibold text-slate-700 text-sm col-span-1"> Date: </label>
        <input className="primary col-span-5" type="datetime-local" value={moment(consultationData.date_consultation).format('YYYY-MM-DDTHH:mm')} onChange={(e) => updateState('date_consultation', moment(e.target.value).format('YYYY-MM-DDTHH:mm'))}></input>

        <label className="font-semibold text-slate-700 text-sm col-span-1"> Type: </label>
        <select className="col-span-2" value={consultationData.type_consultation} onChange={(e) => updateState('type_consultation', e.target.value)}>
          <option>Evaluation de nouveau patient</option>
          <option>Suivi periodique (non urgent)</option>
          <option>Viste de soins (urgent)</option>
        </select>


        <label className="font-semibold text-slate-700 text-sm col-span-1 text-right"> Motif: </label>
        <select className="col-span-2" value={consultationData.motif_consultation} onChange={(e) => updateState('motif_consultation', e.target.value)}>
          <option>Symptôme</option>
          <option>Plainte</option>
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-1 self-start"> Symptômes: </label>
        <textarea rows={2} placeholder="Symptômes" className="col-span-5" value={consultationData.symptomes} onChange={(e) => updateState('symptomes', e.target.value)}></textarea>
        
        <label className="font-semibold text-slate-700 text-sm col-span-1 self-start"> Résumé: </label>
        <textarea rows={4} placeholder="Résumé de consultation" className="col-span-5" value={consultationData.resume_consultation} onChange={(e) => updateState('resume_consultation', e.target.value)}></textarea>
      </div>
    </>
  );
}

export default TabMotif
