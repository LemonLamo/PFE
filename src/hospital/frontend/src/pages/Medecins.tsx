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
      { NIN: "100010364027390000", nom: "BRAHIM", prenom: "Abderrazak", specialite: "Psychologue", date_naissance: new Date(), lieu_naissance: "Tebessa", sexe: "Female", addresse: "39 HAI MOUHOUS", email: "brahim.abderrazak1307@gmail.com", telephone: "0799771062" },
      { NIN: "111111111111111111", nom: "NADIL", prenom: "Marwa", specialite: "Psychologue", date_naissance: new Date(), lieu_naissance: "Blida", sexe: "Male", addresse: "39 HAI MOUHOUS", email: "nadilmarwa02@gmail.com", telephone: "0799771062" }
    ];
    return data
  }, []);

  return (
    <>
      <Card title="Medecins" action={<button />}>
        <Table fields={[ "NIN", "Nom", "Prénom", "Spécialité", "Date de naissance", "Sexe", "Adresse", "Numero de telephone", "", ]}>
          Redo
        </Table>
      </Card>
    </>
  );
}

export default Medecins;
