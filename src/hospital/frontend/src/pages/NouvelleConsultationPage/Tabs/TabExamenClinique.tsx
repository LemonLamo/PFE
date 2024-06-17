import { useState } from "react";
import Table from "../../../components/UI/Tables/Table";
import TableCell from "../../../components/UI/Tables/TableCell";
import TableRow from "../../../components/UI/Tables/TableRow";
import Button from "../../../components/UI/Buttons/Button";
import DeleteButton from "../../../components/UI/Buttons/DeleteButton";
import AjouterExamenClinique from "../Modals/AjouterExamenClinique";
import DeleteExamenClinique from "../Modals/DeleteExamenClinique";

let index=0;
type TabProps = {
  examens_cliniques: ExamenClinique[],
  setExamensCliniques: React.Dispatch<React.SetStateAction<ExamenClinique[]>>,
}

function TabExamenClinique({ examens_cliniques, setExamensCliniques }: TabProps) {
  const [openModal, setOpenModal] = useState('');

  async function add_examen_clinique(examen_clinique : ExamenClinique) {
    setExamensCliniques([...examens_cliniques, examen_clinique])
    setOpenModal("")
  }

  function delete_examen_clinique(index: number) {
    examens_cliniques.splice(index, 1)
    setExamensCliniques(examens_cliniques)
    setOpenModal("")
  }

  return (
    <>
      <h3 className="text-lg mb-0">Examen clinique</h3>
      <p className="mb-4"> Cette section concerne l'examen clinique du patient. Les autres onglets afficheront des informations différentes.</p>
      <div className="">
        <div className="flex justify-between">
          <h6>Liste des examens cliniques</h6>
          <Button className="h-8" onClick={() => setOpenModal('ajouter_examen_clinique')} theme="primary-alternate">
            <i className="fa fa-plus" />
            <span className="ms-2">Ajouter</span>
          </Button>
        </div>
        <div className="col-span-6">
          <Table fields={['#', 'Examen clinique', 'Résultat', 'Remarques', '']}>
            {examens_cliniques.map((e : ExamenClinique, i : number) => (
              <TableRow key={i}>
                <TableCell> {e.code_examen_clinique} </TableCell>
                <TableCell> {e.designation} </TableCell>
                <TableCell> {e.resultat} </TableCell>
                <TableCell> {e.remarques} </TableCell>
                <TableCell>
                  <DeleteButton onClick={() => {index=i; setOpenModal("delete_examen_clinique")}} />
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
        <AjouterExamenClinique isOpen={openModal==="ajouter_examen_clinique"} close={() => setOpenModal("")} action={add_examen_clinique} />
        <DeleteExamenClinique isOpen={openModal==="delete_examen_clinique"} close={() => setOpenModal("")} action={() => delete_examen_clinique(index)} />
      </div>
    </>
  );
}

export default TabExamenClinique