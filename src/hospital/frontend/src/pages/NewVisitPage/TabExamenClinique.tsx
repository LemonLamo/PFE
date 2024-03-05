import Table from "../../components/UI/Tables/Table";
import TableCell from "../../components/UI/Tables/TableCell";
import TableRow from "../../components/UI/Tables/TableRow";

type TabProps = {
  visiteData: Visite,
  setVisiteData: React.Dispatch<React.SetStateAction<Visite>>,
}

export function TabExamenClinique({ visiteData, setVisiteData }: TabProps) {
  function updateVisiteData(id: keyof Visite, value: Visite[typeof id]) {
    setVisiteData((visiteData) => ({ ...visiteData!, [id]: value }))
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
            {visiteData.examens_cliniques.map((e) => (
              <TableRow>
                <TableCell> {e.code} </TableCell>
                <TableCell> {e.nom} </TableCell>
                <TableCell> {e.result} </TableCell>
                <TableCell> {e.remarques} </TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      </div>
    </>
  );
}
