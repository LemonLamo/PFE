import { useMemo, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Card from "../components/UI/Card";
import CreateModal from "../components/Modals/CreateModal";
import ViewModal from "../components/Modals/ViewModal";
import EditModal from "../components/Modals/EditModal";
import DeleteModal from "../components/Modals/DeleteModal";
import Badge from "../components/UI/Badge";
import { ColumnDef } from "@tanstack/react-table";
import ViewButton from "../components/Buttons/ViewButton";
import EditButton from "../components/Buttons/EditButton";
import DeleteButton from "../components/Buttons/DeleteButton";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/Buttons/Button";
import DataTable from "../components/UI/Tables/DataTable";
import Table from "../components/UI/Tables/Table";
import TableRow from "../components/UI/Tables/TableRow";
import TableCell from "../components/UI/Tables/TableCell";

const etageName = (etage : number) => {
  if (etage == 0) return "RDC";
  if (etage == 1) return "1er";
  return etage + "éme";
};

const build_badge = (taux : number) => {
  if (taux < 50) {
    return (
      <Badge bgColor={"#dcfce7"} textColor={"#267142"} className="ms-2">
        <CheckCircleIcon className="h-[1.7vh] mr-1" />
        {taux}%
      </Badge>
    );
  } else if (taux >= 50 && taux < 75) {
    return (
      <Badge bgColor={"#fdba74"} textColor={"#9a3412"} className="ms-2">
        <ExclamationTriangleIcon className="h-[1.7vh] mr-1" />
        {taux}%
      </Badge>
    );
  } else {
    return (
      <Badge bgColor={"#fee2e2"} textColor={"#991b1b"} className="ms-2">
        <ExclamationTriangleIcon className="h-[1.7vh] mr-1" />
        {taux}%
      </Badge>
    );
  }
};

function ChambresPage() {
  const [selectedChambre, setSelectedChambre] = useState<Chambre>({
    num: "",
    etage: 0,
    description: "",
    nombre_lits: 0,
    nombre_lits_occupe: 0,
  });
  const [openModal, setOpenModal] = useState('');
  const query = useQuery({
    queryKey: ['chambres'],
    queryFn: () => {
      let data = [
        { num: "F1", etage: 0, description: "Chambre pour les nouveau-nées", nombre_lits: 8, nombre_lits_occupe: 6 },
        { num: "F2", etage: 1, description: "Chambre pour les 1-3ans", nombre_lits: 8, nombre_lits_occupe: 2 },
      ];
      return data;
    }
  });

  const tableDefinition = useMemo(() => [
    { header: "Num", accessorKey: "num" },
    { header: "Etage", id: "etage", cell: (info) => etageName(info.row.original.etage) },
    { header: "Description", accessorKey: "description" },
    { header: "Nombre de lits", accessorKey: "nombre_lits" },
    { header: "Taux d'occupation", cell: (info) =>{
      const c = info.row.original
      return (
        <> { c.nombre_lits_occupe } / { c.nombre_lits }
          { build_badge((c.nombre_lits_occupe! * 100) / c.nombre_lits) }
        </>
      )}
    },
    { header: "", id: "actions", cell: (info) => {
        const c = info.row.original
        return (
          <div className="flex justify-end gap-2">
            <ViewButton onClick={() => { setSelectedChambre(c); setOpenModal('view'); }} />
            <EditButton onClick={() => { setSelectedChambre(c); setOpenModal('edit'); }} />
            <DeleteButton onClick={() => { setSelectedChambre(c); setOpenModal('delete'); }} />
          </div>
        )
      }
    },
  ], []) as ColumnDef<Chambre>[];

  async function createChambre() {
    console.log("Created " + selectedChambre);
  }

  async function editChambre() {
    console.log("Edited " + selectedChambre);
  }

  async function deleteChambre() {
    console.log("Deleted " + selectedChambre);
  }

  const action = (
    <Button onClick={() => setOpenModal('create')} type="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );
  return (
    <>
      <Card title="Chambres" action={action} className="w-full">
        <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />

        <CreateModal open={openModal === "create"} action={createChambre} close={() => setOpenModal('')}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title">
            Create chambre
          </h3>
          <p className="text-gray-600">
            Remplissez ce formulaire pour ajouter une nouvelle chambre
          </p>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-4">
              <label className="text-sm font-semibold">Numéro de chambre </label>
              <input type="text" className="primary" placeholder="Num" value={selectedChambre.num} onChange={(e) => setSelectedChambre({ ...selectedChambre, num: e.target.value })} />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Etage </label>
              <select className="primary" value={selectedChambre.etage} onChange={(e) => setSelectedChambre({ ...selectedChambre, etage: Number(e.target.value), })} >
                <option value={0}>RDC</option>
                <option value={1}>1er</option>
                <option value={2}>2éme</option>
                <option value={3}>3éme</option>
                <option value={4}>4éme</option>
                <option value={5}>5éme</option>
                <option value={6}>6éme</option>
              </select>
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Nombre de lits </label>
              <input type="text" className="primary" placeholder="Nombre" value={selectedChambre.nombre_lits} onChange={(e) => setSelectedChambre({ ...selectedChambre, nombre_lits: e.target.valueAsNumber, })} />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Description </label>
              <textarea className="primary" placeholder="Description" value={selectedChambre.description} onChange={(e) => setSelectedChambre({ ...selectedChambre, description: e.target.value })} />
            </div>
          </div>
        </CreateModal>

        <ViewModal open={openModal === "view"} close={() => setOpenModal('')}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" > Détails sur chambre </h3>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-4">
              <label className="text-sm font-semibold"> Numéro de chambre </label>
              <input type="text" className="primary" placeholder="Num" disabled value={selectedChambre.num} />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Etage </label>
              <select className="primary" value={selectedChambre.etage} onChange={(e) => setSelectedChambre({ ...selectedChambre, etage: Number(e.target.value), }) }>
                <option value={0}>RDC</option>
                <option value={1}>1er</option>
                <option value={2}>2éme</option>
                <option value={3}>3éme</option>
                <option value={4}>4éme</option>
                <option value={5}>5éme</option>
                <option value={6}>6éme</option>
              </select>
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">
                Nombre de lits
              </label>
              <input type="text" className="primary" placeholder="Nombre" disabled value={selectedChambre.nombre_lits} />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Description </label>
              <textarea className="primary" placeholder="Description" value={selectedChambre.description} onChange={(e) => setSelectedChambre({ ...selectedChambre, description: e.target.value, }) } disabled />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Lits </label>
              <Table fields={['#', 'Type', 'Statut', 'Remarques']}>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Broncale</TableCell>
                  <TableCell>
                    <Badge bgColor={"#fee2e2"} textColor={"#991b1b"} className="ms-2">
                      <ExclamationTriangleIcon className="h-[1.7vh] mr-1" />
                      Occupé
                    </Badge>
                  </TableCell>
                  <TableCell>Lorem ipsum Do loris sit amet</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Broncale</TableCell>
                  <TableCell>
                    <Badge bgColor={"#dcfce7"} textColor={"#267142"} className="ms-2">
                      <CheckCircleIcon className="h-[1.7vh] mr-1" />
                      Disponible
                    </Badge>
                  </TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              </Table>
            </div>
          </div>
        </ViewModal>

        <EditModal open={openModal === "edit"} action={editChambre} close={() => setOpenModal('')}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" >
            Modifier chambre
          </h3>
          <p className="text-gray-600">Here is some more info.</p>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-4">
              <label className="text-sm font-semibold">
                Numéro de chambre
              </label>
              <input type="text" className="primary" placeholder="Num" value={selectedChambre.num} onChange={(e) => setSelectedChambre({ ...selectedChambre, num: e.target.value, }) } disabled />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Etage </label>
              <select className="primary" value={selectedChambre.etage} onChange={(e) => setSelectedChambre({ ...selectedChambre, etage: Number(e.target.value), }) }>
                <option value={0}>RDC</option>
                <option value={1}>1er</option>
                <option value={2}>2éme</option>
                <option value={3}>3éme</option>
                <option value={4}>4éme</option>
                <option value={5}>5éme</option>
                <option value={6}>6éme</option>
              </select>
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">
                Nombre de lits
              </label>
              <input type="text" className="primary" placeholder="Nombre" value={selectedChambre.nombre_lits} onChange={(e) => setSelectedChambre({ ...selectedChambre, nombre_lits: e.target.valueAsNumber, }) } />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Description </label>
              <textarea className="primary" placeholder="Description" value={selectedChambre.description} onChange={(e) => setSelectedChambre({ ...selectedChambre, description: e.target.value, }) } />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Lits </label>
              <Table fields={['#', 'Type', 'Statut', 'Remarques']}>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <select>
                      <option>Broncale</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <Badge bgColor={"#fee2e2"} textColor={"#991b1b"} className="ms-2">
                      <ExclamationTriangleIcon className="h-[1.7vh] mr-1" />
                      Occupé
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <input type="text" className="primary"  placeholder="Remarques"/>
                  </TableCell>
                </TableRow>
              </Table>
            </div>
          </div>
        </EditModal>

        <DeleteModal open={openModal === "delete"} action={deleteChambre} close={() => setOpenModal('')}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" >
            Supprimer la chambre "{selectedChambre.num}"
          </h3>
          <p className="text-gray-600">Êtes-vous sûr de vouloir supprimer cet enregistrement? Toutes vos données seront définitivement supprimées. Cette action ne peut pas être annulée.</p>
        </DeleteModal>
      </Card>
    </>
  );
}

export default ChambresPage;
