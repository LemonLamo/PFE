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

function Chambres() {
  const chambres = useMemo<Chambre[]>(() => {
    let data = [{ num: "13", etage: "123", nombre_lits: 8, nombre_lits_occupe: 2 }];
    return data
  }, []);

  return (
    <>
      <Card title="Chambres" className="w-full">
        <Table fields={["Num", "Etage", "Nombre de lits", "Taux d'occupation", ""]}>
          Redo
        </Table>
      </Card>
    </>
  );
}

export default Chambres;
