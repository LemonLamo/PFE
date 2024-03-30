import { useState } from "react";
import TableCell from "../../../../components/UI/Tables/TableCell";
import TableRow from "../../../../components/UI/Tables/TableRow";
import Table from "../../../../components/UI/Tables/Table";
import Button from "../../../../components/UI/Buttons/Button";
import DeleteButton from "../../../../components/UI/Buttons/DeleteButton";
import AjouterPrescription from "../../Modals/AjouterPrescription";
import DeletePrescription from "../../Modals/DeletePrescription";

type SectionProps = {
  state: Record<string, boolean>,
  updateState: (id: string, value: boolean) => void
  consultationData: Partial<Consultation>,
  updateConsultationData: (id: keyof Consultation, value: Consultation[typeof id]) => void,
}

let index = 0;
function PerscriptionsSection({ state, updateState, consultationData, updateConsultationData }: SectionProps){
  const [openModal, setOpenModal] = useState('')

  function add_prescription(prescription: Prescription) {
    let prescriptions = [...consultationData.prescriptions!, prescription]
    updateConsultationData('prescriptions', prescriptions)
    setOpenModal("")
  }

  function delete_prescription(index: number) {
    consultationData.prescriptions!.splice(index, 1)
    updateConsultationData('prescriptions', consultationData.prescriptions!)
    setOpenModal("")
  }

  return (
    <>
    <div className="block pl-7 py-2 border-b-2 flex justify-between">
      <label>
        <input id="checkbox-prescriptions" className="checkbox" type="checkbox" checked={state.medicaments_active} onChange={e => updateState('medicaments_active', e.target.checked)} />
        <label htmlFor="checkbox-prescriptions" className="cursor-pointer select-none text-slate-700">Préscriptions</label>
      </label>
        {state.medicaments_active &&
          <Button className="h-8" onClick={() => setOpenModal('ajouter_prescription')} theme="primary-alternate">
            <i className="fa fa-plus" />
            <span className="ms-2">Ajouter</span>
          </Button>
        }
    </div>
    <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
    {state.medicaments_active &&
      <Table fields={['#', 'Médicament', 'Posologie', 'Fréquence', 'Durée', 'Remarques', '']}>
        {consultationData.prescriptions!.map((p, i) =>
          <TableRow key={i}>
            <TableCell> {p.code_medicament} </TableCell>
            <TableCell> {p.DCI} </TableCell>
            <TableCell> {p.posologie} </TableCell>
            <TableCell> {p.frequence} </TableCell>
            <TableCell> {p.duree} </TableCell>
            <TableCell> {p.remarques} </TableCell>
            <TableCell>
              <DeleteButton onClick={() => {index = i; setOpenModal("delete_prescription")}} />
            </TableCell>
          </TableRow>
        )}
      </Table>
    }
    </div>
    <AjouterPrescription isOpen={openModal==="ajouter_prescription"} close={()=>setOpenModal("")} action={add_prescription} />
    <DeletePrescription isOpen={openModal==="delete_prescription"} close={()=>setOpenModal("")} action={() => delete_prescription(index)} />
    </>
  );
}

export default PerscriptionsSection