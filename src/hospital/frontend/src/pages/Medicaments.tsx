import Card from "../components/UI/Card";
import CreatePatientModal from "../components/CreatePatientModal";
import Table from "../components/UI/Tables/Table";
import TableEntry from "../components/UI/Tables/TableEntry";

function Medicaments() {
  return (
    <>
      <Card title="Stock Medicaments" action={<CreatePatientModal />}>
        <Table
          fields={[
            "Nom",
            "Code",
            "Quantité en stock",
            "Niveau de disponibilité",
            "",
          ]}
        >
          <TableEntry
            data={["Patacétamol", "PC123", "127839", "Faible"]}
          ></TableEntry>
        </Table>
      </Card>
    </>
  );
}

export default Medicaments;
