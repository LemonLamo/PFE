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

const dcitionnaire_analyses = [
    { key: 'M101', value: 'FSH-LH', },
]

function AnalysesSection({ state, updateState, consultationData, updateConsultationData }: SectionProps) {
    const [selectedAnalyses, setSelectedAnalyses] = useState<Analyse>({ code: '', nom: '', remarques: '' })

    function select_analyses({ key, value }: { key: string, value: string }) {
        setSelectedAnalyses({ ...selectedAnalyses, code: key, nom: value })
    }
    function add_analyses() {
        let analyses = [...consultationData.analyses, selectedAnalyses]
        updateConsultationData('analyses', analyses)
    }

    function delete_analyses(index: number) {
        consultationData.analyses.splice(index, 1)
        updateConsultationData('analyses', consultationData.analyses)
    }

    return (
        <>
            <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                    <input id="checkbox-3" className="checkbox" type="checkbox" checked={state.analyses_active} onChange={(e) => updateState('analyses_active', e.target.checked)} />
                    <label htmlFor="checkbox-3" className="cursor-pointer select-none text-slate-700">Analyses</label>
                </label>
                {state.analyses_active &&
                    <AddModal onAdd={add_analyses} onCancel={() => console.log("Cancelled create")}>
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter des analyses</h3>
                        <p className="text-gray-600">Remplissez ce formulaire pour ajouter des analyses à la consultation courante.</p>
                        <div className="grid grid-cols-6 gap-2">
                            <Select className="col-span-6" options={dcitionnaire_analyses} placeholder="Analyse" onChange={select_analyses} state={{ key: selectedAnalyses.code, value: selectedAnalyses.nom! }} />
                            <textarea className="col-span-6" rows={5} placeholder="Remarques" value={selectedAnalyses.remarques} onChange={(e) => setSelectedAnalyses({ ...selectedAnalyses, remarques: e.target.value })}></textarea>
                        </div>
                    </AddModal>
                }
            </div>
            <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
                {state.analyses_active &&
                    <Table fields={['#', 'Analyse', 'Remarques']}>
                        {consultationData.analyses.map((a, i) => (
                            <TableRow key={i}>
                                <TableCell> {a.code} </TableCell>
                                <TableCell> {a.nom} </TableCell>
                                <TableCell> {a.remarques} </TableCell>
                                <TableCell>
                                    <DeleteModal onDelete={() => delete_analyses(i)} onCancel={() => console.log("Cancelled delete")}>
                                        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Analyses {a.nom} ({a.code})</h3>
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

export default AnalysesSection