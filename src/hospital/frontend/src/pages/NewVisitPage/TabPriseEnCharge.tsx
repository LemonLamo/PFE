import TableEntry from "../../components/UI/Tables/TableEntry";
import Table from "../../components/UI/Tables/Table";
import moment from "moment";

type TabProps = {
  state: any,
  setState: any
}

export function TabPriseEnCharge({ state, setState }: TabProps) {
  function updateState(id: string, value: any) {
    setState((visiteData: Visite) => { return { ...visiteData, [id]: value } })
  }
  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-0">Prise en charge</h3>
      <p className="mb-2">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="">
        <div className="block pl-7 py-2 border-b-2 flex justify-between">
          <label>
            <input id="checkbox-1" className="w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" checked={state.medicaments_active} onChange={(e) => updateState('medicaments_active', e.target.checked)} />
            <label htmlFor="checkbox-1" className="cursor-pointer select-none text-slate-700">Médicaments</label>
          </label>
          <button>Edit</button>
        </div>
        <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
        {state.medicaments_active &&
          <Table fields={['#', 'Médicament', 'Dosage', 'Fréquence', 'Durée', 'Remarques']}>
            {state.medicaments.map((item: any) => <TableEntry data={item}></TableEntry>)}
          </Table>
        }
        </div>

        <div className="block pl-7 py-2 border-b-2 flex justify-between">
          <label>
            <input id="checkbox-2" className="w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" checked={state.radiologie_active} onChange={(e) => updateState('radiologie_active', e.target.checked)} />
            <label htmlFor="checkbox-2" className="cursor-pointer select-none text-slate-700">Radiologie</label>
          </label>
          <button>Edit</button>
        </div>
        <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
        {state.radiologie_active &&
          <Table fields={['#', 'Radio', 'Remarques']}>
            {state.radiologie.map((item: any) => <TableEntry data={item}></TableEntry>)}
          </Table>
        }
        </div>

        <div className="block pl-7 py-2 border-b-2 flex justify-between">
          <label>
            <input id="checkbox-3" className="w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" checked={state.analyses_active} onChange={(e) => updateState('analyses_active', e.target.checked)} />
            <label htmlFor="checkbox-3" className="cursor-pointer select-none text-slate-700">Analyses</label>
          </label>
          <button>Edit</button>
        </div>
        <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
        {state.analyses_active &&
          <Table fields={['#', 'Analyses', 'Remarques']}>
            {state.analyses.map((item: any) => <TableEntry data={item}></TableEntry>)}
          </Table>
        }
        </div>

        <div className="block pl-7 py-2 border-b-2 flex justify-between">
          <label>
            <input id="checkbox-4" className="w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" checked={state.interventions_active} onChange={(e) => updateState('interventions_active', e.target.checked)}/>
            <label htmlFor="checkbox-4" className="cursor-pointer select-none text-slate-700">Interventions</label>
          </label>
          <button>Edit</button>
        </div>
        <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
          {state.interventions_active &&
            <Table fields={['#', 'Intervention', 'Remarques']}>
              {state.interventions.map((item: any) => <TableEntry data={item}></TableEntry>)}
            </Table>
          }
        </div>

        <div className="block pl-7 py-2 flex justify-between">
          <label>
            <input id="checkbox-5" className="w-5 h-5 ease-soft text-base -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" checked={state.prochaine_consultation_active} onChange={(e) => updateState('prochaine_consultation_active', e.target.checked)} />
            <label htmlFor="checkbox-5" className="cursor-pointer select-none text-slate-700">Prochaine consultation</label>
          </label>
        </div>
        
        <div className={"hidden overflow-hidden transition-all ease-soft-in-out duration-350 mb-2"}>
          <input className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none" type="datetime-local" value={moment(state.prochaine_consultaiton).format('YYYY-MM-DDTHH:mm')} onChange={(e) => updateState('prochaine_consultaiton', moment(e.target.value).format('YYYY-MM-DDTHH:mm'))}></input>
        </div>
      </div>
    </>
  );
}
