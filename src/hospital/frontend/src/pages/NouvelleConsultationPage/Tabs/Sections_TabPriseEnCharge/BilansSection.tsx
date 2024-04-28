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
    bilans: Partial<Bilan>[],
    setBilans: React.Dispatch<React.SetStateAction<Partial<Bilan>[]>>,
}

let index = 0;
function BilansSection({ state, updateState, bilans, setBilans }: SectionProps) {
    const [openModal, setOpenModal] = useState('')

    async function add_bilans(bilan : Partial<Bilan>) {
        setBilans([...bilans, bilan])
        setOpenModal("")
    }

    function delete_bilans(index: number) {
        bilans.splice(index, 1)
        setBilans(bilans)
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
                        {bilans!.map((a, i) => (
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