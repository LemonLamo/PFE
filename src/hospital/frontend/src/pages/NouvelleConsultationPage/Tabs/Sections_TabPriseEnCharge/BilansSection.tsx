import { useState } from "react";
import TableCell from "../../../../components/UI/Tables/TableCell";
import TableRow from "../../../../components/UI/Tables/TableRow";
import Table from "../../../../components/UI/Tables/Table";
import Button from "../../../../components/UI/Buttons/Button";
import DeleteButton from "../../../../components/UI/Buttons/DeleteButton";
import AjouterBilan from "../../Modals/AjouterBilan";
import DeleteBilan from "../../Modals/DeleteBilan";

type SectionProps = {
    state: Record<string, boolean>,
    updateState: (id: string, value: boolean) => void
    consultationData: Partial<Consultation>,
    updateConsultationData: (id: keyof Consultation, value: Consultation[typeof id]) => void,
}

let index = 0;
function BilansSection({ state, updateState, consultationData, updateConsultationData }: SectionProps) {
    const [openModal, setOpenModal] = useState('')

    function add_bilans(bilan : Partial<Bilan>) {
        let bilans = [...consultationData.bilans!, bilan]
        updateConsultationData('bilans', bilans)
        setOpenModal("")
    }

    function delete_bilans(index: number) {
        consultationData.bilans!.splice(index, 1)
        updateConsultationData('bilans', consultationData.bilans!)
        setOpenModal("")
    }

    return (
        <>
            <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                    <input id="checkbox-3" className="checkbox" type="checkbox" checked={state.bilans_active} onChange={(e) => updateState('bilans_active', e.target.checked)} />
                    <label htmlFor="checkbox-3" className="cursor-pointer select-none text-slate-700">Bilans</label>
                </label>
                {state.bilans_active &&
                <Button className="h-8" onClick={() => setOpenModal('ajouter_bilan')} theme="primary-alternate">
                    <i className="fa fa-plus" />
                    <span className="ms-2">Ajouter</span>
                </Button>
                }
            </div>
            <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
                {state.bilans_active &&
                    <Table fields={['#', 'Bilan', 'Remarques']}>
                        {consultationData.bilans!.map((a, i) => (
                            <TableRow key={i}>
                                <TableCell> {a.code_bilan} </TableCell>
                                <TableCell> {a.designation} </TableCell>
                                <TableCell> {a.remarques} </TableCell>
                                <TableCell>
                                    <DeleteButton onClick={() => {index = i; setOpenModal("delete_bilan")}} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                }
            </div>
            <AjouterBilan isOpen={openModal==="ajouter_bilan"} close={() => setOpenModal("")} action={add_bilans} />
            <DeleteBilan isOpen={openModal==="delete_bilan"} close={() => setOpenModal("")} action={() => delete_bilans(index)} />
        </>
    );
}

export default BilansSection