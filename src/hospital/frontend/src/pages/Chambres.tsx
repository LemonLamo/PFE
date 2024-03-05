import Card from "../components/UI/Card";
import CreatePatientModal from "../components/CreatePatientModal";
import Table from "../components/UI/Tables/Table";
import TableEntry from "../components/UI/Tables/TableEntry";

function Chambres() {
  return (
    <>
      <Card title="Chambres" action={<CreatePatientModal />}>
        <Table fields={["Num", "Etage", "Nombre de lits", "Niveau de disponibilité", "", ]}>
          <TableEntry data={["13", "123", "127839", "Faible"]}></TableEntry>
        </Table>
      </Card>
    </>
  );
}

export default Chambres;
