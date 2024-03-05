import Card from "../components/UI/Card";
import CreatePatientModal from "../components/CreatePatientModal";
import Table from "../components/UI/Tables/Table";
import TableEntry from "../components/UI/Tables/TableEntry";

function Infirmiers() {
  return (
    <>
      <Card title="Infirmiers" action={<CreatePatientModal />}>
        <Table fields={["NIN", "Nom", "Prénom", "Date de naissance", "Sexe", "Adresse", "Numero de telephone", "", ]}>
          <TableEntry data={["1302893", "NADIL", "Marwa", "12/05/2002", "Femme", "39 HAI MOUHOUS", "0799771062", ]}></TableEntry>
        </Table>
      </Card>
    </>
  );
}

export default Infirmiers;
