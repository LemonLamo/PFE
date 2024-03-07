import { useState } from "react";
import TableCell from "../../../components/UI/Tables/TableCell";
import TableRow from "../../../components/UI/Tables/TableRow";
import Table from "../../../components/UI/Tables/Table";
import AddModal from "../../../components/Modals/AddModal";
import DeleteModal from "../../../components/Modals/DeleteModal";
import moment from "moment";
import Select from "../../../components/Select";

type SectionProps = {
    state: Record<string, boolean>,
    updateState: (id: string, value: boolean) => void
    consultationData: Consultation,
    updateConsultationData: (id: keyof Consultation, value: Consultation[typeof id]) => void,
}

const dictionnaire_interventions = [
    { key: 'M101', value: 'Appendictomie', },
]

function InterventionsSection({ state, updateState, consultationData, updateConsultationData }: SectionProps) {
    const [selectedInterventions, setSelectedInterventions] = useState<Intervention>({
        nom_hopital: '',
        medecin: '',
        patient: '',
        code_intervention: '',
        nom: '',
        date: new Date(),
        remarques: ''
    })

    function select_intervention({ key, value }: { key: string, value: string }) {
        setSelectedInterventions({ ...selectedInterventions, code_intervention: key, nom: value })
    }

    function add_interventions() {
        let interventions = [...consultationData.interventions, selectedInterventions]
        updateConsultationData('interventions', interventions)
    }

    function delete_interventions(index: number) {
        consultationData.interventions.splice(index, 1)
        updateConsultationData('interventions', consultationData.interventions)
    }

    return (
        <>
            <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                    <input id="checkbox-4" className="checkbox" type="checkbox" checked={state.interventions_active} onChange={(e) => updateState('interventions_active', e.target.checked)} />
                    <label htmlFor="checkbox-4" className="cursor-pointer select-none text-slate-700">Interventions</label>
                </label>
                {state.interventions_active &&
                    <AddModal onAdd={add_interventions} onCancel={() => console.log("Cancelled create")}>
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter une intervention</h3>
                        <p className="text-gray-600">Remplissez ce formulaire pour ajouter une intervention à la consultation courante.</p>
                        <div className="grid grid-cols-6 gap-2">
                            <Select className="col-span-6" options={dictionnaire_interventions} placeholder="Intervention" onChange={select_intervention} state={{ key: selectedInterventions.code_intervention, value: selectedInterventions.nom! }} />
                            <input className="primary col-span-6" type="datetime-local" placeholder="Date" value={moment(selectedInterventions.date).format('YYYY-MM-DDTHH:mm')} onChange={(e) => setSelectedInterventions({ ...selectedInterventions, date: moment(e.target.value, 'YYYY-MM-DDTHH:mm').toDate() })}></input>
                            <textarea className="col-span-6" rows={5} placeholder="Remarques" value={selectedInterventions.remarques} onChange={(e) => setSelectedInterventions({ ...selectedInterventions, remarques:e.target.value})}></textarea>
                        </div>
                    </AddModal>
                }
            </div>
            <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
                {state.interventions_active &&
                    <Table fields={['#', 'Intervention', 'Date', 'Remarques']}>
                        {consultationData.interventions.map((a, i) => (
                            <TableRow key={i}>
                                <TableCell> {a.code_intervention} </TableCell>
                                <TableCell> {a.nom} </TableCell>
                                <TableCell> {moment(a.date).format('DD/MM/YYYY HH:mm')} </TableCell>
                                <TableCell> {a.remarques} </TableCell>
                                <TableCell>
                                    <DeleteModal onDelete={() => delete_interventions(i)} onCancel={() => console.log("Cancelled delete")}>
                                        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Intervention {a.nom} ({a.code_intervention})</h3>
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

export default InterventionsSection