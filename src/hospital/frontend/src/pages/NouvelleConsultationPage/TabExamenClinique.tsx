import Table from "../../components/UI/Tables/Table";
import TableCell from "../../components/UI/Tables/TableCell";
import TableRow from "../../components/UI/Tables/TableRow";

type TabProps = {
  consultationData: Consultation,
  setConsultationData: React.Dispatch<React.SetStateAction<Consultation>>,
}

function TabExamenClinique({ consultationData, setConsultationData }: TabProps) {
  function updateConsultationData(id: keyof Consultation, value: Consultation[typeof id]) {
    setConsultationData((consultationData) => ({ ...consultationData!, [id]: value }))
  }

  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-0">Examen clinique</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="">
        <div className="flex justify-between">
          <h6>Liste des examens cliniques</h6>
          <button>Edit</button>
        </div>
        <div className="col-span-6">
          <Table fields={['#', 'Examen clinique', 'Résultat', 'Remarques']}>
            {consultationData.examens_cliniques.map((e) => (
              <TableRow>
                <TableCell> {e.code} </TableCell>
                <TableCell> {e.nom} </TableCell>
                <TableCell> {e.resultat} </TableCell>
                <TableCell> {e.remarques} </TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      </div>
    </>
  );
}

export default TabExamenClinique