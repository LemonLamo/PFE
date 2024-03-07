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

const dcitionnaire_radiologie = [
    { key: 'M101', value: 'Scanner', },
]

function RadiologieSection({ state, updateState, consultationData, updateConsultationData }: SectionProps) {
    const [selectedRadiologie, setSelectedRadiologie] = useState<Radio>({ code: '', nom: '', remarques: '' })

    function select_radiologie({ key, value }: { key: string, value: string }) {
        setSelectedRadiologie({ ...selectedRadiologie, code: key, nom: value })
    }
    
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
                            <label className="font-semibold text-slate-700 text-sm col-span-2"> Radio: </label>
                            <Select className="col-span-4" options={dcitionnaire_radiologie} placeholder="Radio" onChange={select_radiologie} state={{ key: selectedRadiologie.code, value: selectedRadiologie.nom! }} />

                            <label className="font-semibold text-slate-700 text-sm col-span-2  self-start"> Remarques: </label>
                            <textarea className="col-span-4" rows={5} placeholder="Remarques" value={selectedRadiologie.remarques} onChange={(e) => setSelectedRadiologie({ ...selectedRadiologie, remarques: e.target.value })}></textarea>
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