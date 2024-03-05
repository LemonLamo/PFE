import TableEntry from "../../components/UI/Tables/TableEntry";
import Table from "../../components/UI/Tables/Table";

type TabProps = {
  state: any,
  setState: any
}

export function TabExamenClinique({ state, setState }: TabProps) {
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
            {state.examens_cliniques.map((item: any) => <TableEntry data={item}></TableEntry>)}
          </Table>
        </div>
      </div>
    </>
  );
}
