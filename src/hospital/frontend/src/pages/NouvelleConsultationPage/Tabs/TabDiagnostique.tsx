type TabProps = {
  consultationData: Partial<Consultation>,
  setConsultationData: React.Dispatch<React.SetStateAction<Partial<Consultation>>>,
}

function TabDiagnostique({ consultationData, setConsultationData } : TabProps) {
  function updateConsultationData(id: keyof Consultation, value: Consultation[typeof id]) {
    setConsultationData((consultationData) => ({ ...consultationData!, [id]: value }))
  }

  return (
    <>
      <h3 className="text-lg mb-0">Diagnostique</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="grid grid-cols-6 gap-x-2 gap-y-3 items-center">
        <label className="font-semibold text-slate-700 text-sm col-span-1"> Diagnostique: </label>
        <input className="primary col-span-5" type="text" placeholder="Diagnostique" value={consultationData.diagnostique} onChange={(e) => updateConsultationData('diagnostique', e.target.value)}></input>

        <label className="font-semibold text-slate-700 text-sm col-span-1 self-start"> Détails: </label>
        <textarea className="primary col-span-5" rows={5} placeholder="Détails" value={consultationData.diagnostique_details} onChange={(e) => updateConsultationData('diagnostique_details', e.target.value)}></textarea>
      </div>
    </>
  );
}

export default TabDiagnostique