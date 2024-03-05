import { useMemo, useState } from "react";
import moment from "moment";
import Card from "../components/UI/Card";
import CreateModal from "../components/Modals/CreateModal";
import Table from "../components/UI/Tables/Table";
import TableRow from "../components/UI/Tables/TableRow";
import TableCell from "../components/UI/Tables/TableCell";
import ViewModal from "../components/Modals/ViewModal";
import EditModal from "../components/Modals/EditModal";
import DeleteModal from "../components/Modals/DeleteModal";

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
<<<<<<< HEAD
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
=======
      <Card title="Stock Medicaments" action={<button />}>
        <Table fields={["Nom", "Code", "Quantité en stock", "Niveau de disponibilité", "", ]}>
          {medicaments.map((medicament) => (<TableEntry data={Object.values(medicament)}></TableEntry>))}
>>>>>>> 84b7b291cf5f8bf6bbc5715b817ed5517b39f0bd
        </Table>
      </Card>
    </>
  );
}

export default Medicaments;
