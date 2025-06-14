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
  prescriptions: Prescription[],
  setPrescriptions: React.Dispatch<React.SetStateAction<Prescription[]>>,
}

let index = 0;
function PerscriptionsSection({ state, updateState, prescriptions, setPrescriptions }: SectionProps){
  const [openModal, setOpenModal] = useState('')

  async function add_prescription(prescription: Prescription) {
    setPrescriptions([...prescriptions, prescription])
    setOpenModal("")
  }

  function delete_prescription(index: number) {
    prescriptions.splice(index, 1)
    setPrescriptions(prescriptions)
    setOpenModal("")
  }

  return (
    <>
    <div className="block pl-7 py-2 border-b-2 flex justify-between">
      <label>
        <input id="checkbox-prescriptions" className="checkbox" type="checkbox" checked={state.prescriptions_active} onChange={e => updateState('prescriptions_active', e.target.checked)} />
        <label htmlFor="checkbox-prescriptions" className="cursor-pointer select-none text-slate-700">Préscriptions</label>
      </label>
        {state.prescriptions_active &&
          <Button className="h-8" onClick={() => setOpenModal('ajouter_prescription')} theme="primary-alternate">
            <i className="fa fa-plus" />
            <span className="ms-2">Ajouter</span>
          </Button>
        }
    </div>
    <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
    {state.prescriptions_active &&
      <Table fields={['#', 'Médicament', 'Posologie', 'Fréquence', 'Durée', 'Remarques', '']}>
        {prescriptions!.map((p, i) =>
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