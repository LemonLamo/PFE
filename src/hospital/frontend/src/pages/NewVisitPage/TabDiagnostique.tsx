

type TabProps = {
  state: any,
  setState: any
}

export function TabDiagnostique({state, setState} : TabProps) {
  function updateState(id: string, value: any) {
    setState((visiteData: Visite) => { return { ...visiteData, [id]: value } })
  }

  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-0">Diagnostique</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="grid grid-cols-6 gap-x-2 gap-y-3">
        <input className="col-span-6 focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" type="text" placeholder="Diagnostique" value={state.diagnostique} onChange={(e) => updateState('diagnostique', e.target.value)}></input>
        <textarea className="col-span-6 focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" rows={5} placeholder="Détails" value={state.diagnostique_details} onChange={(e) => updateState('diagnostique_details', e.target.value)}></textarea>
      </div>
    </>
  );
}
