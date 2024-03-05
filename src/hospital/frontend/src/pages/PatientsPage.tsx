import CreatePatientModal from "../components/CreatePatientModal"
import Card from "../components/UI/Card"
import Table from "../components/UI/Tables/Table"
import TableEntry from "../components/UI/Tables/TableEntry"

function PatientsPage() {
  return (
    <Card title="Liste des patients" subtitle="Une liste de tous les patients du service" action={<CreatePatientModal/>}>
      <Table fields={['NIN', 'Nom', 'Prénom', 'Date de naissance', 'Téléphone', 'Email', '']}>
        <TableEntry data={['100010364027390000', 'BRAHIM', 'Abderrazak', '13/07/2001', '+213549297666', 'brahim.abderrazak1307@gmail.com']}></TableEntry>
      </Table>
    </Card>
  )
}

export default PatientsPage