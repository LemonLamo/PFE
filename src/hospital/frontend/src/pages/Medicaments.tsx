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
  const medicaments = useMemo<StockMedicament[]>(() => {
    let data = [
      { nom: "Patacétamol", code: "PC123", quantite: 122 },
      { nom: "Patacétamol", code: "PC123", quantite: 116 },
      { nom: "Patacétamol", code: "PC123", quantite: 186 },
    ];
    return data;
  }, []);

  return (
    <>
      <Card title="Stock Medicaments" action={<button />} className="w-full">
        <Table fields={["Nom", "Code", "Quantité en stock", "Niveau de disponibilité", "", ]}>
          Redo
        </Table>
      </Card>
    </>
  );
}

export default Medicaments;
