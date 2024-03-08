import { useMemo, useState } from "react";
import Card from "../components/UI/Card";
import CreateModal from "../components/Modals/CreateModal";
import Table from "../components/UI/Tables/Table";
import TableRow from "../components/UI/Tables/TableRow";
import TableCell from "../components/UI/Tables/TableCell";
import ViewModal from "../components/Modals/ViewModal";
import EditModal from "../components/Modals/EditModal";
import DeleteModal from "../components/Modals/DeleteModal";
import Badge from "../components/UI/Badge";

function RolesPage() {
  const roles = useMemo<Role[]>(() => {
    let data = [{ id: "1", nom: "Medecins", permissions: ['Gestion consultation', 'Gestion stock']}];
    return data
  }, []);

  const [selectedRole, setSelectedRole] = useState<Role>({id:'', nom:'', permissions:[]})

  const permissions_dictionnaire = [
    { key: "P1", value: "Permission 1" },
    { key: "P2", value: "Permission 2" },
    { key: "P3", value: "Permission 3" }
  ]

  function create_role() {
    console.log("Creating new role");
    // use state variable to submit agent data
  }

  function view_role(id: string) {
    // use id to get the agent data into the state variable
    console.log(`Viewing role ${id}`);
    setSelectedRole((r) => ({ ...r, id: "Brahim" }));
  }

  function load_edit_role(id: string) {
    console.log(`Loading information for edit modal ${id}`);
    // use NIN to get the agent data into the state variable
  }

  function edit_role(id: string) {
    alert(`Editing role ${id}`);
  }

  function delete_role(id: string) {
    alert(`Deleting agent ${id}`);
    // do actual delete
  }

  const createModal = (
    <>
      <CreateModal onCreate={create_role} onCancel={() => console.log("Cancelled create")} >
        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter un nouveau rôle</h3>
        <p className="text-gray-600">Remplissez ce formulaire pour ajouter une prescription à la consultation courante.</p>
        <div className="grid grid-cols-8 gap-x-4">
          <div className="col-span-3 mb-2">
            <label className="text-sm font-semibold">ID:</label>
            <input type="text" className="primary" placeholder="Code" value={selectedRole?.id} />
          </div>
          <div className="col-span-5 mb-2">
            <label className="text-sm font-semibold">Nom:</label>
            <input type="text" className="primary" placeholder="Nom" value={selectedRole?.nom} />
          </div>
          <div className="col-span-8 mb-2">
            <label className="text-sm font-semibold">Permissions:</label>
            <textarea rows={5} className="primary" placeholder="Qte" value={selectedRole?.permissions} />
          </div>
        </div>
      </CreateModal>
    </>
  );

  return (
    <>
      <Card title="Roles" className="w-full" action={createModal}>
        <Table fields={["#", "Role", "Permissions", ""]}>
          {roles.map((r, i) => (
            <TableRow key={i}>
              <TableCell> {r.id} </TableCell>
              <TableCell> {r.nom} </TableCell>
              <TableCell>
                {r.permissions.map((p, i) => (<Badge key={i} textColor="#0891b2" bgColor="#cffafe" className="me-2">{p}</Badge> ))}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <ViewModal onOpen={() => view_role(r.id)}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Détails sur "{r.nom} ({r.id})"</h3>
                  <p className="text-gray-600">Remplissez ce formulaire pour ajouter une prescription à la consultation courante.</p>
                  <div className="grid grid-cols-8 gap-x-4">
                    <div className="col-span-3 mb-2">
                      <label className="text-sm font-semibold">ID:</label>
                      <input type="text" className="primary" placeholder="Code" value={selectedRole?.id} disabled />
                    </div>
                    <div className="col-span-5 mb-2">
                      <label className="text-sm font-semibold">Nom:</label>
                      <input type="text" className="primary" placeholder="Nom" value={selectedRole?.nom} disabled />
                    </div>
                    <div className="col-span-8 mb-2">
                      <label className="text-sm font-semibold">Permissions:</label>
                      <textarea rows={5} className="primary" placeholder="Qte" value={selectedRole?.permissions} disabled />
                    </div>
                  </div>
                </ViewModal>

                <EditModal onOpen={() => load_edit_role(r.id)} onEdit={() => edit_role(r.id)}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Modifier "{r.nom} ({r.id})"</h3>
                  <p className="text-gray-600">Remplissez ce formulaire pour ajouter une prescription à la consultation courante.</p>
                  <div className="grid grid-cols-8 gap-x-4">
                    <div className="col-span-3 mb-2">
                      <label className="text-sm font-semibold">ID:</label>
                      <input type="text" className="primary" placeholder="Code" value={selectedRole?.id} disabled />
                    </div>
                    <div className="col-span-5 mb-2">
                      <label className="text-sm font-semibold">Nom:</label>
                      <input type="text" className="primary" placeholder="Nom" value={selectedRole?.nom} />
                    </div>
                    <div className="col-span-8 mb-2">
                      <label className="text-sm font-semibold">Permissions:</label>
                      <textarea rows={5} className="primary" placeholder="Qte" value={selectedRole?.permissions} />
                    </div>
                  </div>
                </EditModal>

                <DeleteModal onDelete={() => delete_role(r.id)}>
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Delete Rôle</h3>
                  <p className="text-gray-600">Are you sure you want to delete this record? All of your data will be permanently removed. This action cannot be undone.</p>
                </DeleteModal>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </>
  );
}

export default RolesPage;
