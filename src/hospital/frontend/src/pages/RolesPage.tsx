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

function RolesPage() {
  const roles = useMemo<Role[]>(() => {
    let data = [{ id: "13", nom: "123", permissions: []}];
    return data
  }, []);

  return (
    <>
      <Card title="Roles" className="w-full">
        <Table fields={["#", "Role", "Permissions", ""]}>
          
        </Table>
      </Card>
    </>
  );
}

export default RolesPage;
