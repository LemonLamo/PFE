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
      <h3 className="text-lg font-bold text-gray-900 mb-0">Motif de la consultation</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="grid grid-cols-6 gap-x-2 gap-y-3">

        <input className="primary col-span-2" type="datetime-local" value={moment(consultationData.date_consultation).format('YYYY-MM-DDTHH:mm')} onChange={(e) => updateState('date_consultation', moment(e.target.value).format('YYYY-MM-DDTHH:mm'))}></input>
        <select className="col-span-2" value={consultationData.type_consultation} onChange={(e) => updateState('type_consultation', e.target.value)}>
          <option disabled value={""} selected>Type de la consultation</option>
          <option>Evaluation de nouveau patient</option>
          <option>Suivi periodique (non urgent)</option>
          <option>Viste de soins (urgent)</option>
        </select>

        <select className="col-span-2" value={consultationData.motif_consultation} onChange={(e) => updateState('motif_consultation', e.target.value)}>
          <option disabled value={""} selected>Motif de la consultation</option>
          <option>Symptôme</option>
          <option>Plainte</option>
        </select>

        <textarea rows={2} placeholder="Symptômes" className="col-span-6" value={consultationData.symptomes} onChange={(e) => updateState('symptomes', e.target.value)}></textarea>
        <textarea rows={5} placeholder="Résumé de consultation" className="col-span-6" value={consultationData.resume_consultation} onChange={(e) => updateState('resume_consultation', e.target.value)}></textarea>
      </div>
    </>
  );
}

export default TabMotif
