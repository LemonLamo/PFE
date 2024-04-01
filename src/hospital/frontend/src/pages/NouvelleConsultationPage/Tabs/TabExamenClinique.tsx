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
  consultationData: Partial<Consultation>,
  setConsultationData: React.Dispatch<React.SetStateAction<Partial<Consultation>>>,
}

function TabExamenClinique({ consultationData, setConsultationData }: TabProps) {
  const [openModal, setOpenModal] = useState('');

  function add_examen_clinique(examen_clinique : ExamenClinique) {
    let examens_cliniques = [...consultationData.examens_cliniques!, examen_clinique]
    setConsultationData({ ...consultationData, examens_cliniques })
    setOpenModal("")
  }

  function delete_examen_clinique(index: number) {
    consultationData.examens_cliniques!.splice(index, 1)
    setConsultationData({ ...consultationData, examens_cliniques: consultationData.examens_cliniques })
    setOpenModal("")
  }

  return (
    <>
      <h3 className="text-lg mb-0">Examen clinique</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
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
            {consultationData.examens_cliniques!.map((e, i) => (
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