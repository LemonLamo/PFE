import Card from "../components/UI/Card";
import CreatePatientModal from "../components/CreatePatientModal";
import Table from "../components/UI/Tables/Table";
import TableEntry from "../components/UI/Tables/TableEntry";
import { useMemo } from "react";

function Medecins() {
  const medecins = useMemo<Medecin[]>(() => {
    let data = [
      { NIN: "1302893", nom: "NADIL", prenom: "Marwa", specialite: "Psychologue", birthday: "12/05/2002", sexe: "Femme", addresse: "39 HAI MOUHOUS", telephone: "0799771062" },
    ];
    return data
  }, []);

  return (
    <>
      <Card title="Medecins" action={<CreatePatientModal />}>
        <Table fields={[ "NIN", "Nom", "Prénom", "Spécialité", "Date de naissance", "Sexe", "Adresse", "Numero de telephone", "", ]}>
          {medecins.map((medecin) => (<TableEntry data={Object.values(medecin)}></TableEntry>))}
        </Table>
      </Card>
    </>
  );
}

export default Medecins;
