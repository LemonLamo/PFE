import { useMemo, useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Card from "../components/UI/Card";
import CreateModal from "../components/Modals/CreateModal";
import Table from "../components/UI/Tables/Table";
import TableRow from "../components/UI/Tables/TableRow";
import TableCell from "../components/UI/Tables/TableCell";
import ViewModal from "../components/Modals/ViewModal";
import EditModal from "../components/Modals/EditModal";
import DeleteModal from "../components/Modals/DeleteModal";
import Badge from "../components/UI/Badge";

const etageName = (etage) => {
  if (etage == 0) return "RDC";
  if (etage == 1) return "1er";
  return etage + "éme";
};

const badgecolor = (taux) => {
  if (taux < 50) {
    return (
      <Badge bgColor={"#dcfce7"} textColor={"#267142"}>
        <CheckCircleIcon className="h-[1.7vh] mr-1" />
        {taux}%
      </Badge>
    );
  } else if (taux >= 50 && taux < 75) {
    return (
      <Badge bgColor={"#fdba74"} textColor={"#9a3412"}>
        <ExclamationTriangleIcon className="h-[1.7vh] mr-1" />
        {taux}%
      </Badge>
    );
  } else {
    return (
      <Badge bgColor={"#fee2e2"} textColor={"#991b1b"}>
        <ExclamationTriangleIcon className="h-[1.7vh] mr-1" />
        {taux}%
      </Badge>
    );
  }
};

function Chambres() {
  

  const [selectedChambre, setSelectedChambre] = useState<Chambre>({
    num: "",
    etage: 0,
    nombre_lits: 0,
    nombre_lits_occupe: 0,
  });

  function create_chambre() {
    console.log("Creating new chambre");
  }

  function view_chambre(num: string) {
    // use NIN to get the agent data into the state variable
    console.log(`Viewing chambre ${num}`);
    setSelectedChambre((v) => ({ ...v, num: num }));
  }

  function load_edit_chambre(num: string) {
    console.log(`Loading information for edit modal ${num}`);
    // use NIN to get the agent data into the state variable
  }

  function edit_chambre(num: string) {
    alert(`Editing chambre ${num}`);
  }

  function delete_chambre(num: string) {
    alert(`Deleting chambre ${num}`);
    // do actual delete
  }

  const createModal = (
    <div className="flex gap-2 min-h-min">
      <CreateModal
        onCreate={create_chambre}
        onCancel={() => console.log("Cancelled create")}
      >
        <h3
          className="text-lg font-semibold leading-6 text-gray-900 mb-3"
          id="modal-title"
        >
          Create chambre
        </h3>
        <p className="text-gray-600">
          Remplissez ce formulaire pour ajouter une nouvelle chambre
        </p>
        <div className="col-span-4 mb-2">
          <label className="text-sm font-semibold">Numéro de chambre </label>
          <input
            type="text"
            className="primary"
            placeholder="Num"
            value={selectedChambre.num}
            onChange={(e) =>
              setSelectedChambre({
                ...selectedChambre,
                num: e.target.value,
              })
            }
          />
        </div>
        <div className="col-span-4 mb-2">
          <label className="text-sm font-semibold">Nombre de lits </label>
          <input
            type="text"
            className="primary"
            placeholder="Nombre"
            value={selectedChambre.nombre_lits}
            onChange={(e) =>
              setSelectedChambre({
                ...selectedChambre,
                nombre_lits: e.target.valueAsNumber,
              })
            }
          />
        </div>
      </CreateModal>
    </div>
  );
  const chambres = useMemo<Chambre[]>(() => {
    let data = [
      { num: "F1", etage: 0, nombre_lits: 8, nombre_lits_occupe: 2 },
      { num: "F2", etage: 1, nombre_lits: 8, nombre_lits_occupe: 2 },
    ];
    return data;
  }, []);

  return (
    <>
      <Card title="Chambres" action={createModal} className="w-full">
        <Table
          fields={["Num", "Etage", "Nombre de lits", "Taux d'occupation", ""]}
        >
          {chambres.map((a, i) => (
            <TableRow key={i}>
              <TableCell className="pe-3 py-2">{a.num} </TableCell>
              <TableCell className="pe-3 py-2">
                {etageName(a.etage)}
              </TableCell>
              <TableCell className="pe-3 py-2"> {a.nombre_lits} </TableCell>
              <TableCell className="pe-3 py-2">
                {badgecolor((a.nombre_lits_occupe * 100) / a.nombre_lits)}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <ViewModal onOpen={() => view_chambre(a.num)}>
                  <h3
                    className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                    id="modal-title"
                  >
                    View chambre
                  </h3>
                  <form>
                    <input type="text" value={selectedChambre.num}></input>
                  </form>
                </ViewModal>

                <EditModal
                  onOpen={() => load_edit_chambre(a.num)}
                  onEdit={() => edit_chambre(a.num)}
                  onCancel={() => console.log("Cancelled edit")}
                >
                  <h3
                    className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                    id="modal-title"
                  >
                    Edit chambre
                  </h3>
                  <p className="text-gray-600">Here is some more more info.</p>
                </EditModal>

                <DeleteModal
                  onDelete={() => delete_chambre(a.num)}
                  onCancel={() => console.log("Cancelled delete")}
                >
                  <h3
                    className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                    id="modal-title"
                  >
                    Delete chambre
                  </h3>
                  <p className="text-gray-600">
                    Are you sure you want to delete this record? All of your
                    data will be permanently removed. This action cannot be
                    undone.
                  </p>
                </DeleteModal>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </>
  );
}

export default Chambres;
