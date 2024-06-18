import Select from "../../components/Selects/Select";

type TabProps = {
  form: any
}

function TabIntervention({ form } : TabProps) {
  function select_intervention(intervention: InterventionCode) {
    form.setValue('code_intervention', intervention.code_intervention)
  }

  return (
    <>
      <h3 className="text-lg mb-0">Intervention</h3>
      <p className="mb-4">Veuillez renseigner les détails de l'intervention à venir.</p>
      <div className="grid grid-cols-9 gap-x-2 gap-y-3 items-center">
        <label className="font-semibold text-slate-700 text-sm col-span-2"> Date<span className="text-red-500">*</span> </label>
        <input type="datetime-local" className={`col-span-7 primary ${form.errors.date && 'has-error'}`} {...form.register("date", {required: true})} />

        <label className="font-semibold text-slate-700 text-sm col-span-2"> Nom/Type d'intervention <span className="text-red-500">*</span> </label>
        <Select<InterventionCode> url="interventions" code="code_intervention" designation="designation" placeholder="Intervention" onChange={select_intervention} className={`col-span-7 primary ${form.errors.code_intervention && 'has-error'}`}/>

        <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Détails </label>
        <textarea rows={2} placeholder="Remarques" className={`col-span-7 primary ${form.errors.remarques && 'has-error'}`} {...form.register("remarques", {required: false})} />

        <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Protocole opératoire </label>
        <textarea rows={5} placeholder="Protocole opératoire" className={`col-span-7 primary ${form.errors.protocole_operatoire && 'has-error'}`} {...form.register("protocole_operatoire", {required: false})} />
      </div>
    </>
  );
}

export default TabIntervention