import Card from "../components/UI/Card";
import CreatePatientModal from "../components/CreatePatientModal";
import Table from "../components/UI/Tables/Table";
import TableEntry from "../components/UI/Tables/TableEntry";

function Medecins() {
  return (
    <>
      <Card title="Medecins" action={<CreatePatientModal />}>
        <Table
          fields={[
            "NIN",
            "Nom",
            "Prénom",
            "Spécialité",
            "Date de naissance",
            "Sexe",
            "Adresse",
            "Numero de telephone",
            "",
          ]}
        >
          <TableEntry
            data={[
              "1302893",
              "NADIL",
              "Marwa",
              "psychologue",
              "12/05/2002",
              "Femme",
              "39 HAI MOUHOUS",
              "0799771062",
            ]}
          ></TableEntry>
        </Table>
      </Card>
    </>
  );
}

export default Medecins;
