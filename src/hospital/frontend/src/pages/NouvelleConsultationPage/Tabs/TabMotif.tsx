import moment from "moment";

type TabProps = {
  consultationData: Partial<Consultation>,
  setConsultationData: React.Dispatch<React.SetStateAction<Partial<Consultation>>>,
}

function TabMotif({ consultationData, setConsultationData }: TabProps) {
  function updateState(id : string, value: any){
    setConsultationData((consultationData: Partial<Consultation>) => { return { ...consultationData, [id]: value} })
  }
  return (
    <>
      <h3 className="text-lg mb-0">Motif de la consultation</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="grid grid-cols-6 gap-x-2 gap-y-3 items-center">

        <label className="font-semibold text-slate-700 text-sm col-span-1"> Date<span className="text-red-500">*</span> </label>
        <input className="primary col-span-5" type="datetime-local" value={moment(consultationData.date).format('YYYY-MM-DDTHH:mm')} onChange={(e) => updateState('date', moment(e.target.value).format('YYYY-MM-DDTHH:mm'))}></input>

        <label className="font-semibold text-slate-700 text-sm col-span-1"> Type<span className="text-red-500">*</span> </label>
        <select className="col-span-2" value={consultationData.type} onChange={(e) => updateState('type', e.target.value)}>
          <option>Evaluation de nouveau patient</option>
          <option>Suivi periodique (non urgent)</option>
          <option>Viste de soins (urgent)</option>
        </select>


        <label className="font-semibold text-slate-700 text-sm col-span-1 text-right"> Motif<span className="text-red-500">*</span> </label>
        <select className="col-span-2" value={consultationData.motif} onChange={(e) => updateState('motif', e.target.value)}>
          <option>Symptôme</option>
          <option>Plainte</option>
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-1 self-start"> Symptômes<span className="text-red-500">*</span> </label>
        <textarea rows={2} placeholder="Symptômes" className="col-span-5" value={consultationData.symptomes} onChange={(e) => updateState('symptomes', e.target.value)}></textarea>
        
        <label className="font-semibold text-slate-700 text-sm col-span-1 self-start"> Résumé<span className="text-red-500">*</span> </label>
        <textarea rows={4} placeholder="Résumé de consultation" className="col-span-5" value={consultationData.resume} onChange={(e) => updateState('resume', e.target.value)}></textarea>
      </div>
    </>
  );
}

export default TabMotif
