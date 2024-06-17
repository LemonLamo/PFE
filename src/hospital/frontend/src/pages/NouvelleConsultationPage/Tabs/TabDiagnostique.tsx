type TabProps = {
  form: any,
}

function TabDiagnostique({ form } : TabProps) {
  return (
    <>
      <h3 className="text-lg mb-0">Diagnostic</h3>
      <p className="mb-4">Cette section concerne le diagnostic du patient. Les autres onglets afficheront des informations différentes.</p>
      <div className="grid grid-cols-6 gap-x-2 gap-y-3 items-center">
        <label className="font-semibold text-slate-700 text-sm col-span-1"> Diagnostic<span className="text-red-500">*</span> </label>
        <input type="text" placeholder="Diagnostic" className={`col-span-5 primary ${form.errors.diagnostique && 'has-error'}`} {...form.register("diagnostique", {required: true})} />

        <label className="font-semibold text-slate-700 text-sm col-span-1 self-start"> Détails </label>
        <textarea rows={5} placeholder="Détails supplémentaires" className={`col-span-5 primary ${form.errors.diagnostique_details && 'has-error'}`} {...form.register("diagnostique_details", {required: false})} />
      </div>
    </>
  );
}

export default TabDiagnostique