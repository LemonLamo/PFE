import moment from "moment";
import Select from "../../components/Selects/Select";

type TabProps = {
  interventionData: Partial<Intervention>,
  setInterventionData: React.Dispatch<React.SetStateAction<Partial<Intervention>>>,
}

function TabIntervention({ interventionData, setInterventionData } : TabProps) {
  function updateInterventionData(id: keyof Intervention, value: Intervention[typeof id]) {
    setInterventionData((interventionData) => ({ ...interventionData, [id]: value }))
  }

  function select_intervention(intervention: InterventionCode) {
    if(intervention)
      setInterventionData(s => ({...s, code_intervention: intervention.code_intervention, designation: intervention.designation }) )
  }

  return (
    <>
      <h3 className="text-lg mb-0">Intervention</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="grid grid-cols-9 gap-x-2 gap-y-3 items-center">
        <label className="font-semibold text-slate-700 text-sm col-span-2"> Date<span className="text-red-500">*</span> </label>
        <input className="primary col-span-7" type="datetime-local" value={moment(interventionData.date).format('YYYY-MM-DDTHH:mm')} onChange={(e) => updateInterventionData('date', moment(e.target.value).format('YYYY-MM-DDTHH:mm'))}></input>

        <label className="font-semibold text-slate-700 text-sm col-span-2"> Intervention<span className="text-red-500">*</span> </label>
        <Select<InterventionCode> url="interventions" code="code_intervention" designation="designation" className="col-span-7" placeholder="Intervention" onChange={select_intervention}/>

        <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Détails </label>
        <textarea rows={2} placeholder="Résumé" className="col-span-7" value={interventionData.remarques} onChange={(e) => updateInterventionData('remarques', e.target.value)}></textarea>

        <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Protocole opératoire </label>
        <textarea rows={5} placeholder="Résumé" className="col-span-7" value={interventionData.protocole_operatoire} onChange={(e) => updateInterventionData('protocole_operatoire', e.target.value)}></textarea>
      </div>
    </>
  );
}

export default TabIntervention