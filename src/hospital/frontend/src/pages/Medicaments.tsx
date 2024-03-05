import Card from "../components/UI/Card";
import CreatePatientModal from "../components/CreatePatientModal";
import Table from "../components/UI/Tables/Table";
import TableEntry from "../components/UI/Tables/TableEntry";
import { useMemo } from "react";

function Medicaments() {
  const medicaments = useMemo<Medicament[]>(() => {
    let data = [
      { nom: "Patacétamol", code: "PC123", quantity: "156", level: "Faible" },
      { nom: "Patacétamol", code: "PC123", quantity: "156", level: "Moyenne" },
      { nom: "Patacétamol", code: "PC123", quantity: "156", level: "Elevée" },
    ];
    return data;
  }, []);

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
          {medicaments.map((medicament) => (
            <TableEntry data={Object.values(medicament)}></TableEntry>
          ))}
        </Table>
      </Card>
    </>
  );
}

export default Medicaments;
