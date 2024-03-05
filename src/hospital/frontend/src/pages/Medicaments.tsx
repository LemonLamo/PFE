import Card from "../components/UI/Card";
import CreatePatientModal from "../components/CreatePatientModal";
import Table from "../components/UI/Tables/Table";
import TableEntry from "../components/UI/Tables/TableEntry";

function Medicaments() {
  const fields = [
    "Nom",
    "Code",
    "Quantité en stock",
    "Niveau de disponibilité",
    "",
  ];
  const tableContent = [
    {
      Nom: "Patacétamol",
      Code: "PC123",
      Quantité_en_stock: "127839",
      Niveau_de_disponibilité: "Faible",
    },
  ];
  return (
    <div className="h-full w-[50wh] flex justify-center">
      <Card title="Stock Medicaments" action=<CreatePatientModal />>
        <Table fields={fields}>
          {tableContent.map((item: any) => (
            <TableEntry data={Object.values(item)} />
          ))}
        </Table>
      </Card>
    </div>
  );
}

export default Medicaments;
