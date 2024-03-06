type TabProps = {
  consultationData: Consultation,
  setConsultationData: React.Dispatch<React.SetStateAction<Consultation>>,
}

function TabDiagnostique({ consultationData, setConsultationData } : TabProps) {
  function updateConsultationData(id: keyof Consultation, value: Consultation[typeof id]) {
    setConsultationData((consultationData) => ({ ...consultationData!, [id]: value }))
  }

  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-0">Diagnostique</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="grid grid-cols-6 gap-x-2 gap-y-3">
        <input className="primary col-span-6" type="text" placeholder="Diagnostique" value={consultationData.diagnostique} onChange={(e) => updateConsultationData('diagnostique', e.target.value)}></input>
        <textarea className="primary col-span-6" rows={5} placeholder="Détails" value={consultationData.diagnostique_details} onChange={(e) => updateConsultationData('diagnostique_details', e.target.value)}></textarea>
      </div>
    </>
  );
}

export default TabDiagnostique