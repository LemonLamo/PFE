import { useMemo, useState } from "react";
import moment from "moment";
import Card from "../../components/UI/Card";
import CreateModal from "../../components/Modals/CreateModal";
import Table from "../../components/UI/Tables/Table";
import TableRow from "../../components/UI/Tables/TableRow";
import TableCell from "../../components/UI/Tables/TableCell";
import ViewModal from "../../components/Modals/ViewModal";
import EditModal from "../../components/Modals/EditModal";
import DeleteModal from "../../components/Modals/DeleteModal";

function MesPatientsAdmisPage() {
  return (
    <Card title="Liste des patients admis" subtitle="Une liste de tous les patients admis" className="w-full">
      <Table fields={['NIN', 'Nom', 'Prénom', 'Date de naissance', 'Téléphone', 'Email', '']}>
        
      </Table>
    </Card>
  )
}

export default MesPatientsAdmisPage