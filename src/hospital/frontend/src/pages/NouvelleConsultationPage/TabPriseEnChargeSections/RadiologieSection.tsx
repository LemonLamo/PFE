import { useState } from "react";
import TableCell from "../../../components/UI/Tables/TableCell";
import TableRow from "../../../components/UI/Tables/TableRow";
import Table from "../../../components/UI/Tables/Table";
import AddModal from "../../../components/Modals/AddModal";
import DeleteModal from "../../../components/Modals/DeleteModal";

type SectionProps = {
    state: Record<string, boolean>,
    updateState: (id: string, value: boolean) => void
    consultationData: Consultation,
    updateConsultationData: (id: keyof Consultation, value: Consultation[typeof id]) => void,
}

function RadiologieSection({ state, updateState, consultationData, updateConsultationData }: SectionProps) {
    const [selectedRadiologie, setSelectedRadiologie] = useState<Radio>({ code: '', nom: '', remarques: '' })

    function add_radiologie() {
        let radiologie = [...consultationData.radiologie, selectedRadiologie]
        updateConsultationData('radiologie', radiologie)
    }

    function delete_radiologie(index: number) {
        consultationData.radiologie.splice(index, 1)
        updateConsultationData('radiologie', consultationData.radiologie)
    }

    return (
        <>
            <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                    <input id="checkbox-2" className="checkbox" type="checkbox" checked={state.radiologie_active} onChange={(e) => updateState('radiologie_active', e.target.checked)} />
                    <label htmlFor="checkbox-2" className="cursor-pointer select-none text-slate-700">Radiologie</label>
                </label>
                {state.radiologie_active &&
                    <AddModal onAdd={add_radiologie} onCancel={() => console.log("Cancelled create")}>
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter un radio</h3>
                        <p className="text-gray-600">Remplissez ce formulaire pour ajouter un radio à la consultation courante.</p>
                        <div className="grid grid-cols-6 gap-2">
                            <select className="col-span-3" value={selectedRadiologie.code} onChange={(e) => setSelectedRadiologie({ ...selectedRadiologie, code: e.target.value })}>
                                <option value="" disabled>Code</option>
                                <option >CM 101</option>
                                <option >CM 102</option>
                                <option >CM 103</option>
                            </select>
                            <input className="primary col-span-3" type="text" placeholder="Nom" value={selectedRadiologie.nom} onChange={(e) => setSelectedRadiologie({ ...selectedRadiologie, nom: e.target.value })}></input>
                            <textarea className="col-span-6" rows={5} placeholder="Remarques" value={selectedRadiologie.remarques} onChange={(e) => setSelectedRadiologie({ ...selectedRadiologie, remarques: e.target.value })}></textarea>
                        </div>
                    </AddModal>
                }
            </div>
            <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
                {state.radiologie_active &&
                    <Table fields={['#', 'Radio', 'Remarques']}>
                        {consultationData.radiologie.map((r, i) => (
                            <TableRow key={i}>
                                <TableCell> {r.code} </TableCell>
                                <TableCell> {r.nom} </TableCell>
                                <TableCell> {r.remarques} </TableCell>
                                <TableCell>
                                    <DeleteModal onDelete={() => delete_radiologie(i)} onCancel={() => console.log("Cancelled delete")}>
                                        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Radiologie {r.nom} ({r.code})</h3>
                                        <p className="text-gray-600">Are you sure you want to delete this examen clinique? All of your data will be permanently removed. This action cannot be undone.</p>
                                    </DeleteModal>
                                </TableCell>
                            </TableRow>
                        ))}
                    </Table>
                }
            </div>
        </>
    );
}

export default RadiologieSection