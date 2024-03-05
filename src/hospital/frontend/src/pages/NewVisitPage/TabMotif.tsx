import moment from "moment";

type TabProps = {
  state: any,
  setState: any
}

export function TabMotif({ state, setState }: TabProps) {
  function updateState(id : string, value: any){
    setState((visiteData: Visite) => { return { ...visiteData, [id]: value} })
  }
  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-0">Motif de la visite</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="grid grid-cols-6 gap-x-2 gap-y-3">

        <input className="col-span-2 focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" type="datetime-local" value={moment(state.date_visite).format('YYYY-MM-DDTHH:mm')} onChange={(e) => updateState('date_visite', moment(e.target.value).format('YYYY-MM-DDTHH:mm'))}></input>
        <select className="col-span-2 focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" value={state.type_visite} onChange={(e) => updateState('type_visite', e.target.value)}>
          <option disabled value={""} selected>Type de la visite</option>
          <option>Evaluation de nouveau patient</option>
          <option>Suivi periodique (non urgent)</option>
          <option>Viste de soins (urgent)</option>
        </select>

        <select className="col-span-2 focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" value={state.motif_visite} onChange={(e) => updateState('motif_visite', e.target.value)}>
          <option disabled value={""} selected>Motif de la visite</option>
          <option>Symptôme</option>
          <option>Plainte</option>
        </select>

        <textarea rows={2} placeholder="Symptômes" className="col-span-6 focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" value={state.symptomes} onChange={(e) => updateState('symptomes', e.target.value)}></textarea>
        <textarea rows={5} placeholder="Résumé de visite" className="col-span-6 focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" value={state.resume_visite} onChange={(e) => updateState('resume_visite', e.target.value)}></textarea>
      </div>
    </>
  );
}
