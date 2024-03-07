import { useState } from "react";
import TableCell from "../../../components/UI/Tables/TableCell";
import TableRow from "../../../components/UI/Tables/TableRow";
import Table from "../../../components/UI/Tables/Table";
import AddModal from "../../../components/Modals/AddModal";
import DeleteModal from "../../../components/Modals/DeleteModal";
import Select from "../../../components/Select";

type SectionProps = {
  state: Record<string, boolean>,
  updateState: (id: string, value: boolean) => void
  consultationData: Consultation,
  updateConsultationData: (id: keyof Consultation, value: Consultation[typeof id]) => void,
}

const dictionnaire_medicaments = [
  { key: 'M101', value: 'Paracetamol', },
  { key: 'M102', value: 'Melatonin' },
  { key: 'M103', value: 'Aspirin' },
]
function PerscriptionsSection({ state, updateState, consultationData, updateConsultationData }: SectionProps){
  const [selectedPrescription, setSelectedPrescription] = useState<Medicament>({ code: '', nom: '', posologie: 0, frequence:0, duree:0, remarques: '' })

  function select_prescription({ key, value }: { key: string, value: string }) {
    setSelectedPrescription({ ...selectedPrescription, code: key, nom: value })
  }

  function add_prescription() {
    let prescriptions = [...consultationData.prescriptions, selectedPrescription]
    updateConsultationData('prescriptions', prescriptions)
  }

  function delete_prescription(index: number) {
    consultationData.prescriptions.splice(index, 1)
    updateConsultationData('prescriptions', consultationData.prescriptions)
  }

  return (
    <>
    <div className="block pl-7 py-2 border-b-2 flex justify-between">
      <label>
        <input id="checkbox-1" className="checkbox" type="checkbox" checked={state.medicaments_active} onChange={e => updateState('medicaments_active', e.target.checked)} />
        <label htmlFor="checkbox-1" className="cursor-pointer select-none text-slate-700">Préscriptions</label>
      </label>
        {state.medicaments_active &&
          <AddModal onAdd={add_prescription} onCancel={() => console.log("Cancelled create")}>
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter une prescription</h3>
            <p className="text-gray-600">Remplissez ce formulaire pour ajouter une prescription à la consultation courante.</p>
            <div className="grid grid-cols-6 gap-2">
              <label className="font-semibold text-slate-700 text-sm col-span-2"> Médicament: </label>
              <Select className="col-span-4" options={dictionnaire_medicaments} placeholder="Médicament" onChange={select_prescription} state={{ key: selectedPrescription.code, value: selectedPrescription.nom! }} />

              <label className="font-semibold text-slate-700 text-sm col-span-2"> Posologie: </label>
              <input className="primary col-span-4" type="number" placeholder="Posologie" value={selectedPrescription.posologie} onChange={(e) => setSelectedPrescription({ ...selectedPrescription, posologie: e.target.valueAsNumber })}></input>

              <label className="font-semibold text-slate-700 text-sm col-span-2"> Fréquence: </label>
              <input className="primary col-span-4" type="number" placeholder="Fréquence" value={selectedPrescription.frequence} onChange={(e) => setSelectedPrescription({ ...selectedPrescription, frequence: e.target.valueAsNumber })}></input>

              <label className="font-semibold text-slate-700 text-sm col-span-2"> Durée: </label>
              <input className="primary col-span-4" type="number" placeholder="Duree" value={selectedPrescription.duree} onChange={(e) => setSelectedPrescription({ ...selectedPrescription, duree: e.target.valueAsNumber })}></input>

              <label className="font-semibold text-slate-700 text-sm col-span-2"> Remarques: </label>
              <textarea className="col-span-4" rows={5}  placeholder="Remarques" value={selectedPrescription.remarques} onChange={(e) => setSelectedPrescription({ ...selectedPrescription, remarques: e.target.value })}></textarea>
            </div>
          </AddModal>
        }
    </div>
    <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
    {state.medicaments_active &&
      <Table fields={['#', 'Médicament', 'Posologie', 'Fréquence', 'Durée', 'Remarques', '']}>
        {consultationData.prescriptions.map((p, i) =>
          <TableRow key={i}>
            <TableCell> {p.code} </TableCell>
            <TableCell> {p.nom} </TableCell>
            <TableCell> {p.posologie} </TableCell>
            <TableCell> {p.frequence} </TableCell>
            <TableCell> {p.duree} </TableCell>
            <TableCell> {p.remarques} </TableCell>
            <TableCell>
              <DeleteModal onDelete={() => delete_prescription(i)} onCancel={() => console.log("Cancelled delete")}>
                <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Prescription {p.nom} ({p.code})</h3>
                <p className="text-gray-600">Are you sure you want to delete this examen clinique? All of your data will be permanently removed. This action cannot be undone.</p>
              </DeleteModal>
            </TableCell>
          </TableRow>
        )}
      </Table>
    }
    </div>
    </>
  );
}

export default PerscriptionsSection