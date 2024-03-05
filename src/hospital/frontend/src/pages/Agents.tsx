import Card from "../components/UI/Card";
import CreatePatientModal from "../components/CreatePatientModal";
import Table from "../components/UI/Tables/Table";
import TableEntry from "../components/UI/Tables/TableEntry";
import { useMemo } from "react";

function Agents() {
  const agents = useMemo<Agent[]>(() => {
    let data = [
      { NIN: "1302893", nom: "NADIL", prenom: "Marwa", birthday: "12/05/2002", sexe: "Femme", addresse: "39 HAI MOUHOUS", telephone: "0799771062" },
      { NIN: "1302893", nom: "NADIL", prenom: "Marwa", birthday: "12/05/2002", sexe: "Femme", addresse: "39 HAI MOUHOUS", telephone: "0799771062" }
    ];
    return data
  }, []);

  return (
    <>
      <Card title="Agents" action={<CreatePatientModal />}>
        <Table fields={["NIN", "Nom", "Prénom", "Date de naissance", "Sexe", "Adresse", "Numero de telephone", "" ]}>
          { agents.map((agent) => (<TableEntry data={Object.values(agent)}></TableEntry>)) }
        </Table>
      </Card>
    </>
  );
}

export default Agents;
