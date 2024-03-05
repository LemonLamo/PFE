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

function Medecins() {
  const medecins = useMemo<Medecin[]>(() => {
    let data = [
      { NIN: "1302893", nom: "NADIL", prenom: "Marwa", specialite: "Psychologue", birthday: "12/05/2002", sexe: "Femme", addresse: "39 HAI MOUHOUS", telephone: "0799771062" },
    ];
    return data
  }, []);

  return (
    <>
      <Card title="Medecins" action={<button />}>
        <Table fields={[ "NIN", "Nom", "Prénom", "Spécialité", "Date de naissance", "Sexe", "Adresse", "Numero de telephone", "", ]}>
          {medecins.map((medecin) => (<TableEntry data={Object.values(medecin)}></TableEntry>))}
        </Table>
      </Card>
    </>
  );
}

export default Medecins;
