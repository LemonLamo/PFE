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
    let data = [{ num: "13", etage: "123", nb_lits: "8", taux: "4/8 (50%)" }];
    return data
  }, []);

  return (
    <>
      <Card title="Chambres" action={<button />}>
        <Table fields={["Num", "Etage", "Nombre de lits", "Taux d'occupation", "", ]}>
          {chambres.map((chambre) => (<TableEntry data={Object.values(chambre)}></TableEntry>))}
        </Table>
      </Card>
    </>
  );
}

export default Chambres;
