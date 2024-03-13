import { useState } from "react";
import DeleteModal from "../Modals/DeleteModal";
import Table from "../UI/Tables/Table";
import TableCell from "../UI/Tables/TableCell";
import TableRow from "../UI/Tables/TableRow";
import AddModal from "../Modals/AddModal";
import Select from "../Select";
import dictionnaire_examens_clinique from "../../codifications/examens_cliniques.json"

type TabProps = {
  consultationData: Consultation,
  setConsultationData: React.Dispatch<React.SetStateAction<Consultation>>,
}

function TabExamenClinique({ consultationData, setConsultationData }: TabProps) {
  const [selectedExamenClinique, setSelectedExamenClinique] = useState<ExamenClinique>({ code: '', nom: '', resultat: '', remarques: '' })

  function select_examen_clinique({ key, value }: { key: string, value: string }) {
    setSelectedExamenClinique({ ...selectedExamenClinique, code: key, nom: value})
  }

  function insert_examen_clinique() {
    let examens_cliniques = [...consultationData.examens_cliniques, selectedExamenClinique]
    setConsultationData({ ...consultationData, examens_cliniques })
  }

  function delete_examen_clinique(index: number) {
    consultationData.examens_cliniques.splice(index, 1)
    setConsultationData({ ...consultationData, examens_cliniques: consultationData.examens_cliniques })
  }

  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-0">Examen clinique</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="">
        <div className="flex justify-between">
          <h6>Liste des examens cliniques</h6>
          <AddModal onAdd={insert_examen_clinique} onCancel={() => console.log("Cancelled create")}>
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter un examen clinique</h3>
            <p className="text-gray-600">Remplissez ce formulaire pour ajouter un examen clinique à la consultation courante.</p>
            <div className="grid grid-cols-6 gap-2 items-center">
              <label className="font-semibold text-slate-700 text-sm col-span-2"> Examen clinique: </label>
              <Select className="col-span-4" options={dictionnaire_examens_clinique} placeholder="Examen Clinique" onChange={select_examen_clinique} state={{key: selectedExamenClinique.code, value:selectedExamenClinique.nom!}}/>

              <label className="font-semibold text-slate-700 text-sm col-span-2"> Résultats: </label>
              <input className="primary col-span-4" type="text" placeholder="Résultat" value={selectedExamenClinique.resultat} onChange={(e) => setSelectedExamenClinique({ ...selectedExamenClinique, resultat: e.target.value })}></input>

              <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques: </label>
              <textarea rows={5} className="col-span-4" placeholder="Remarques" value={selectedExamenClinique.remarques} onChange={(e) => setSelectedExamenClinique({ ...selectedExamenClinique, remarques: e.target.value })}></textarea>
            </div>
          </AddModal>
        </div>
        <div className="col-span-6">
          <Table fields={['#', 'Examen clinique', 'Résultat', 'Remarques', '']}>
            {consultationData.examens_cliniques.map((e, i) => (
              <TableRow key={i}>
                <TableCell> {e.code} </TableCell>
                <TableCell> {e.nom} </TableCell>
                <TableCell> {e.resultat} </TableCell>
                <TableCell> {e.remarques} </TableCell>
                <TableCell>
                  <DeleteModal onDelete={() => delete_examen_clinique(i)} onCancel={() => console.log("Cancelled delete")}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Examen Clinique {e.nom} ({e.code})</h3>
                    <p className="text-gray-600">Are you sure you want to delete this examen clinique? All of your data will be permanently removed. This action cannot be undone.</p>
                  </DeleteModal>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      </div>
    </>
  );
}

export default TabExamenClinique