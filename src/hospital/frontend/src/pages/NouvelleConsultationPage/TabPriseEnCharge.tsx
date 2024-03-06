import moment from "moment";
import Table from "../../components/UI/Tables/Table";
import TableCell from "../../components/UI/Tables/TableCell";
import TableRow from "../../components/UI/Tables/TableRow";

type TabProps = {
  consultationData: Consultation,
  setConsultationData: React.Dispatch<React.SetStateAction<Consultation>>,
  state: Record<string, boolean>,
  setState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

function TabPriseEnCharge({ consultationData, setConsultationData, state, setState }: TabProps) {
  function updateConsultationData(id: keyof Consultation, value: Consultation[typeof id]) {
    setConsultationData((consultationData) => ({ ...consultationData!, [id]: value }))
  }
  function updateState(id: string, value: boolean) {
    setState((state) => ({ ...state!, [id]: value }))
  }

  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-0">Prise en charge</h3>
      <p className="mb-2">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="">
        <div className="block pl-7 py-2 border-b-2 flex justify-between">
          <label>
            <input id="checkbox-1" className="checkbox" type="checkbox" checked={state.medicaments_active} onChange={(e) => updateState('medicaments_active', e.target.checked)} />
            <label htmlFor="checkbox-1" className="cursor-pointer select-none text-slate-700">Préscriptions</label>
          </label>
          <button>Edit</button>
        </div>
        <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
        {state.medicaments_active &&
          <Table fields={['#', 'Médicament', 'Dosage', 'Fréquence', 'Durée', 'Remarques']}>
            {consultationData.prescriptions.map((p) =>(
              <TableRow>
                <TableCell> {p.code} </TableCell>
                <TableCell> {p.nom} </TableCell>
                <TableCell> {p.frequence} </TableCell>
                <TableCell> {p.duree} </TableCell>
                <TableCell> {p.remarques} </TableCell>
              </TableRow>
            ))}
          </Table>
        }
        </div>

        <div className="block pl-7 py-2 border-b-2 flex justify-between">
          <label>
            <input id="checkbox-2" className="checkbox" type="checkbox" checked={state.radiologie_active} onChange={(e) => updateState('radiologie_active', e.target.checked)} />
            <label htmlFor="checkbox-2" className="cursor-pointer select-none text-slate-700">Radiologie</label>
          </label>
          <button>Edit</button>
        </div>
        <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
          {state.radiologie_active &&
          <Table fields={['#', 'Radio', 'Remarques']}>
              {consultationData.radiologie.map((r) => (
                <TableRow>
                  <TableCell> {r.code} </TableCell>
                  <TableCell> {r.nom} </TableCell>
                  <TableCell> {r.remarques} </TableCell>
                </TableRow>
              ))}
          </Table>
        }
        </div>

        <div className="block pl-7 py-2 border-b-2 flex justify-between">
          <label>
            <input id="checkbox-3" className="checkbox" type="checkbox" checked={state.analyses_active} onChange={(e) => updateState('analyses_active', e.target.checked)} />
            <label htmlFor="checkbox-3" className="cursor-pointer select-none text-slate-700">Analyses</label>
          </label>
          <button>Edit</button>
        </div>
        <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
          {state.analyses_active &&
          <Table fields={['#', 'Analyses', 'Remarques']}>
              {consultationData.analyses.map((a) => (
                <TableRow>
                  <TableCell> {a.code} </TableCell>
                  <TableCell> {a.nom} </TableCell>
                  <TableCell> {a.remarques} </TableCell>
                </TableRow>
              ))}
          </Table>
        }
        </div>

        <div className="block pl-7 py-2 border-b-2 flex justify-between">
          <label>
            <input id="checkbox-4" className="checkbox" type="checkbox" checked={state.interventions_active} onChange={(e) => updateState('interventions_active', e.target.checked)}/>
            <label htmlFor="checkbox-4" className="cursor-pointer select-none text-slate-700">Interventions</label>
          </label>
          <button>Edit</button>
        </div>
        <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
          {state.interventions_active &&
            <Table fields={['#', 'Intervention', 'Remarques']}>
              {consultationData.interventions.map((i) => (
                <TableRow>
                  <TableCell> {i.code} </TableCell>
                  <TableCell> {i.nom} </TableCell>
                  <TableCell> {i.remarques} </TableCell>
                </TableRow>
              ))}
            </Table>
          }
        </div>

        <div className="block pl-7 py-2 flex justify-between">
          <label>
            <input id="checkbox-5" className="checkbox" type="checkbox" checked={state.prochaine_consultation_active} onChange={(e) => updateState('prochaine_consultation_active', e.target.checked)} />
            <label htmlFor="checkbox-5" className="cursor-pointer select-none text-slate-700">Prochaine consultation</label>
          </label>
        </div>
        {state.prochaine_consultation_active &&
        <div className={"overflow-hidden transition-all ease-soft-in-out duration-350 mb-2"}>
          <input className="primary" type="datetime-local" value={moment(consultationData.prochaine_consultation).format('YYYY-MM-DDTHH:mm')} onChange={(e) => updateConsultationData('prochaine_consultation', moment(e.target.value).format('YYYY-MM-DDTHH:mm'))}></input>
        </div>
        }
      </div>
    </>
  );
}

export default TabPriseEnCharge