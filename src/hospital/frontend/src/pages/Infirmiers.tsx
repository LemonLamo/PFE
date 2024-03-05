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

function Infirmiers() {
  const infirmiers = useMemo<Infirmier[]>(() => {
    let data = [
      { NIN: "1302893", nom: "NADIL", prenom: "Marwa", birthday: "12/05/2002", sexe: "Femme", addresse: "39 HAI MOUHOUS", telephone: "0799771062" },
      { NIN: "1302893", nom: "NADIL", prenom: "Marwa", birthday: "12/05/2002", sexe: "Femme", addresse: "39 HAI MOUHOUS", telephone: "0799771062" }
    ];
    return data
  }, []);

  return (
    <>
      <Card title="Infirmiers" action={<button />}>
        <Table fields={["NIN", "Nom", "Prénom", "Date de naissance", "Sexe", "Adresse", "Numero de telephone", "", ]}>
          {infirmiers.map((infirmier) => (<TableEntry data={Object.values(infirmier)}></TableEntry>))}
        </Table>
      </Card>
    </>
  );
}

export default Infirmiers;
