import { useMemo, useState } from "react";
import Card from "../components/UI/Card";
import CreateModal from "../components/Modals/CreateModal";
import Table from "../components/UI/Tables/Table";
import TableRow from "../components/UI/Tables/TableRow";
import TableCell from "../components/UI/Tables/TableCell";
import ViewModal from "../components/Modals/ViewModal";
import EditModal from "../components/Modals/EditModal";
import DeleteModal from "../components/Modals/DeleteModal";

function Chambres() {
  const [selectedChambre, setSelectedChambre] = useState<Chambre>({
    num: "",
    etage: "",
    nombre_lits: "",
    nombre_lits_occupe: "",
  });

  function create_chambre() {
    console.log("Creating new chambre");
    // use state variable to submit agent data
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
    <>
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
        <p className="text-gray-600">Here is the form.</p>
      </CreateModal>
    </>
  );
  const chambres = useMemo<Chambre[]>(() => {
    let data = [
      { num: "13", etage: "123", nombre_lits: 8, nombre_lits_occupe: 2 },
    ];
    return data;
  }, []);

  return (
    <>
      <Card title="Chambres" className="w-full">
        <Table
          fields={["Num", "Etage", "Nombre de lits", "Taux d'occupation", ""]}
        >
          {chambres.map((a, i) => (
            <TableRow>
              <TableCell className="pe-3 py-2">{a.num} </TableCell>
              <TableCell className="pe-3 py-2"> {a.etage} </TableCell>
              <TableCell className="pe-3 py-2"> {a.nombre_lits} </TableCell>
              <TableCell className="pe-3 py-2">
                {a.nombre_lits_occupe}
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
