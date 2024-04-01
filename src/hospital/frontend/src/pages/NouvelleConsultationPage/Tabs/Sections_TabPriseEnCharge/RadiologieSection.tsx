import { useState } from "react";
import TableCell from "../../../../components/UI/Tables/TableCell";
import TableRow from "../../../../components/UI/Tables/TableRow";
import Table from "../../../../components/UI/Tables/Table";
import Button from "../../../../components/UI/Buttons/Button";
import DeleteButton from "../../../../components/UI/Buttons/DeleteButton";
import AjouterRadio from "../../Modals/AjouterRadio";
import DeleteRadio from "../../Modals/DeleteRadio";

type SectionProps = {
    state: Record<string, boolean>,
    updateState: (id: string, value: boolean) => void
    consultationData: Partial<Consultation>,
    updateConsultationData: (id: keyof Consultation, value: Consultation[typeof id]) => void,
}

let index = 0;
function RadiologieSection({ state, updateState, consultationData, updateConsultationData }: SectionProps) {
    const [openModal, setOpenModal] = useState('')
    
    function add_radio(radio: Partial<Radio>) {
        let radios = [...consultationData.radios!, radio]
        updateConsultationData('radios', radios)
        setOpenModal("")
    }

    function delete_radio(index: number) {
        consultationData.radios!.splice(index, 1)
        updateConsultationData('radios', consultationData.radios!)
        setOpenModal("")
    }

    return (
        <>
            <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                    <input id="checkbox-radios" className="checkbox" type="checkbox" checked={state.radios_active} onChange={(e) => updateState('radios_active', e.target.checked)} />
                    <label htmlFor="checkbox-radios" className="cursor-pointer select-none text-slate-700">Radiologie</label>
                </label>
                {state.radios_active &&
                    <Button className="h-8" onClick={() => setOpenModal('ajouter_radio')} theme="primary-alternate">
                        <i className="fa fa-plus" />
                        <span className="ms-2">Ajouter</span>
                    </Button>
                }
            </div>
            <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
                {state.radios_active &&
                    <Table fields={['#', 'Radio', 'Remarques']}>
                        {consultationData.radios!.map((r, i) => (
                            <TableRow key={i}>
                                <TableCell> {r.code_radio} </TableCell>
                                <TableCell> {r.designation} </TableCell>
                                <TableCell> {r.remarques} </TableCell>
                                <TableCell>
                                    <DeleteButton onClick={() => {index = i; setOpenModal("delete_radio")}} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                }
            </div>
            <AjouterRadio isOpen={openModal==="ajouter_radio"} close={() => setOpenModal("")} action={add_radio} />
            <DeleteRadio isOpen={openModal==="delete_radio"} close={() => setOpenModal("")} action={() => delete_radio(index)} />
        </>
    );
}

export default RadiologieSection