import { useState } from "react";
import TableCell from "../../../../components/UI/Tables/TableCell";
import TableRow from "../../../../components/UI/Tables/TableRow";
import Table from "../../../../components/UI/Tables/Table";
import moment from "moment";
import Button from "../../../../components/UI/Buttons/Button";
import DeleteButton from "../../../../components/UI/Buttons/DeleteButton";
import DeleteIntervention from "../../Modals/DeleteIntervention";
import AjouterIntervention from "../../Modals/AjouterIntervention";

type SectionProps = {
    state: Record<string, boolean>,
    updateState: (id: string, value: boolean) => void
    interventions: Partial<Intervention>[],
    setInterventions: React.Dispatch<React.SetStateAction<Partial<Intervention>[]>>,
}

let index = 0;
function InterventionsSection({ state, updateState, interventions, setInterventions }: SectionProps) {
    const [openModal, setOpenModal] = useState('')
    
    async function add_interventions(intervention: Partial<Intervention>) {
        setInterventions([...interventions, intervention])
        setOpenModal("")
    }

    function delete_intervention(index: number) {
        interventions.splice(index, 1)
        setInterventions(interventions)
        setOpenModal("")
    }

    return (
        <>
            <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                    <input id="checkbox-interventions" className="checkbox" type="checkbox" checked={state.interventions_active} onChange={(e) => updateState('interventions_active', e.target.checked)} />
                    <label htmlFor="checkbox-interventions" className="cursor-pointer select-none text-slate-700">Interventions</label>
                </label>
                {state.interventions_active &&
                    <Button className="h-8" onClick={() => setOpenModal('ajouter_intervention')} theme="primary-alternate">
                        <i className="fa fa-plus" />
                        <span className="ms-2">Ajouter</span>
                    </Button>
                }
            </div>
            <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
                {state.interventions_active &&
                    <Table fields={['#', 'Intervention', 'Date', 'Remarques']}>
                        {interventions.map((a, i) => (
                            <TableRow key={i}>
                                <TableCell> {a.code_intervention} </TableCell>
                                <TableCell> {a.designation} </TableCell>
                                <TableCell> {moment(a.date).format('DD/MM/YYYY HH:mm')} </TableCell>
                                <TableCell> {a.remarques} </TableCell>
                                <TableCell>
                                    <DeleteButton onClick={() => {index = i; setOpenModal("delete_intervention")}} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                }
            </div>
            <AjouterIntervention isOpen={openModal === "ajouter_intervention"} close={() => setOpenModal("")} action={add_interventions}/>
            <DeleteIntervention isOpen={openModal === "delete_intervention"} close={() => setOpenModal("")} action={() => delete_intervention(index)}/>
        </>
    );
}

export default InterventionsSection