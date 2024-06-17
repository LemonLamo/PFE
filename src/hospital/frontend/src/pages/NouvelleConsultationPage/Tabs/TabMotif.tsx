type TabProps = {
  form: any
}

function TabMotif({ form }: TabProps) {
  return (
    <>
      <h3 className="text-lg mb-0">Motif de la consultation</h3>
      <p className="mb-4">Cette section concerne le motif de la consultation. Les autres onglets afficheront des informations différentes.</p>
      <div className="grid grid-cols-6 gap-x-2 gap-y-3 items-center">

        <label className="font-semibold text-slate-700 text-sm col-span-1"> Date<span className="text-red-500">*</span> </label>
        <input type="datetime-local" className={`col-span-5 primary ${form.errors.date && 'has-error'}`} {...form.register("date", {required: true})} />

        <label className="font-semibold text-slate-700 text-sm col-span-1"> Type<span className="text-red-500">*</span> </label>
        <select className={`col-span-2 primary ${form.errors.type && 'has-error'}`} {...form.register("type", {required: true})}>
          <option>Evaluation de nouveau patient</option>
          <option>Suivi periodique (non urgent)</option>
          <option>Viste de soins (urgent)</option>
        </select>


        <label className="font-semibold text-slate-700 text-sm col-span-1 text-right"> Motif<span className="text-red-500">*</span> </label>
        <select className={`col-span-2 primary ${form.errors.motif && 'has-error'}`} {...form.register("motif", {required: true})}>
          <option>Symptôme</option>
          <option>Plainte</option>
        </select>

        <label className="font-semibold text-slate-700 text-sm col-span-1 self-start"> Description des symptômes du patient <span className="text-red-500">*</span> </label>
        <textarea rows={2} placeholder="Symptômes" className={`col-span-5 primary ${form.errors.symptomes && 'has-error'}`} {...form.register("symptomes", {required: true})} />
        
        <label className="font-semibold text-slate-700 text-sm col-span-1 self-start"> Résumé détaillé de la consultation <span className="text-red-500">*</span> </label>
        <textarea rows={4} placeholder="Résumé de consultation" className={`col-span-5 primary ${form.errors.resume && 'has-error'}`} {...form.register("resume", {required: true})} />
      </div>
    </>
  );
}

export default TabMotif
