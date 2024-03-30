import { useMemo, useState } from "react";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Buttons/Button";
import { useQuery } from "@tanstack/react-query";
import ViewButton from "../../components/UI/Buttons/ViewButton";
import EditButton from "../../components/UI/Buttons/EditButton";
import DeleteButton from "../../components/UI/Buttons/DeleteButton";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../components/UI/Tables/DataTable";
import Badge from "../../components/UI/Badge";

function RolesPage() {
  const [, setSelectedRole] = useState<Role>({id:'', nom:'', permissions:[]})
  const [, setOpenModal] = useState('');
  const query = useQuery({
    queryKey: ['roles'],
    queryFn: () => {
      let data = [{ id: "1", nom: "Medecins", permissions: ['Gestion consultation', 'Gestion stock'] }];
      return data;
    }
  })

  const tableDefinition = useMemo(() => [
    { header: "#", accessorKey: "id" },
    { header: "Nom", accessorKey: "nom" },
    { header: "Permissions", id: "actions", cell: (info) =>
      info.row.original.permissions.map((p, i) => (<Badge key={i} textColor="#0891b2" bgColor="#cffafe" className="me-2">{p}</Badge>))
    },
    { header: "", id: "actions", cell: (info) => {
        const r = info.row.original
        return (
          <div className="flex justify-end gap-2">
            <ViewButton onClick={() => { setSelectedRole(r); setOpenModal('view'); }} />
            <EditButton onClick={() => { setSelectedRole(r); setOpenModal('edit'); }} />
            <DeleteButton onClick={() => { setSelectedRole(r); setOpenModal('delete'); }} />
          </div>
        )
      }
    },
  ], []) as ColumnDef<Role>[];

  const action = (
    <Button onClick={() => setOpenModal('create')} theme="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );

  return (
    <>
      <Card title="Roles" className="w-full" action={action}>
        <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />

        {/*<CreateModal open={openModal === 'create'} close={() => setOpenModal('')} action={createRole}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Ajouter un nouveau rôle</h3>
          <p className="text-gray-600">Remplissez ce formulaire pour ajouter un nouveau rôle.</p>
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
              <textarea rows={5} className="primary" placeholder="Permissions" value={selectedRole?.permissions} />
            </div>
          </div>
        </CreateModal>

        <ViewModal open={openModal === 'view'} close={() => setOpenModal('')}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Détails sur "{selectedRole.nom} ({selectedRole.id})"</h3>
          <p className="text-gray-600">Voici les informations concernant ce rôle.</p>
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
              <textarea rows={5} className="primary" placeholder="Permissions" value={selectedRole?.permissions} disabled />
            </div>
          </div>
        </ViewModal>

        <EditModal open={openModal === 'edit'} close={() => setOpenModal('')} action={editRole}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Modifier "{selectedRole.nom} ({selectedRole.id})"</h3>
          <p className="text-gray-600">Remplissez ce formulaire pour modifier ce rôle.</p>
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
              <textarea rows={5} className="primary" placeholder="Permissions" value={selectedRole?.permissions} />
            </div>
          </div>
        </EditModal>

        <DeleteModal open={openModal === 'delete'} close={() => setOpenModal('')} action={deleteRole}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">Supprimer le rôle "{selectedRole.nom}"</h3>
          <p className="text-gray-600">Êtes-vous sûr de vouloir supprimer cet enregistrement? Toutes vos données seront définitivement supprimées. Cette action ne peut pas être annulée.</p>
        </DeleteModal>*/}
      </Card>
    </>
  );
}

export default RolesPage;
