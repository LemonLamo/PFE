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

  function create_chambre() {
    console.log("Creating new chambre");
  }

  function select_chambre(index: number) {
    setSelectedChambre(chambres[index]);
  }

  function edit_chambre(num: string) {
    alert(`Edited chambre ${num}`);
  }

  function delete_chambre(num: string) {
    alert(`Deleted chambre ${num}`);
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
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-4">
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
          <div className="col-span-4">
            <label className="text-sm font-semibold">Etage </label>
            <select
              className="primary"
              value={selectedChambre.etage}
              onChange={(e) =>
                setSelectedChambre({
                  ...selectedChambre,
                  etage: Number(e.target.value),
                })
              }
            >
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
          <div className="col-span-12">
            <label className="text-sm font-semibold">Description </label>
            <textarea
              className="primary"
              placeholder="Description"
              value={selectedChambre.description}
              onChange={(e) =>
                setSelectedChambre({
                  ...selectedChambre,
                  description: e.target.value,
                })
              } />
          </div>
        </div>
      </CreateModal>
    </div>
  );
  const chambres = useMemo<Chambre[]>(() => {
    let data = [
      { num: "F1", etage: 0, description: "Chambre pour les nouveau-nées", nombre_lits: 8, nombre_lits_occupe: 6 },
      { num: "F2", etage: 1, description: "Chambre pour les 1-3ans", nombre_lits: 8, nombre_lits_occupe: 2 },
    ];
    return data;
  }, []);

  return (
    <>
      <Card title="Chambres" action={createModal} className="w-full">
        <Table
          fields={["Num", "Etage", "Description", "Nombre de lits", "Taux d'occupation", ""]}
        >
          {chambres.map((a, i) => (
            <TableRow key={i}>
              <TableCell className="pe-3 py-2 font-bold">{a.num} </TableCell>
              <TableCell className="pe-3 py-2">{etageName(a.etage)}</TableCell>
              <TableCell className="pe-3 py-2"> {a.description} </TableCell>
              <TableCell className="pe-3 py-2"> {a.nombre_lits} </TableCell>
              <TableCell className="pe-3 py-2">
                {a.nombre_lits_occupe} / {a.nombre_lits}
                {build_badge((a.nombre_lits_occupe * 100) / a.nombre_lits)}
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <ViewModal onOpen={() => select_chambre(i)}>
                  <h3
                    className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                    id="modal-title"
                  >
                    Détails sur chambre
                  </h3>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-4">
                      <label className="text-sm font-semibold">
                        Numéro de chambre
                      </label>
                      <input
                        type="text"
                        className="primary"
                        placeholder="Num"
                        disabled
                        value={selectedChambre.num}
                      />
                    </div>
                    <div className="col-span-4">
                      <label className="text-sm font-semibold">Etage </label>
                      <select
                        className="primary"
                        value={selectedChambre.etage}
                        onChange={(e) =>
                          setSelectedChambre({
                            ...selectedChambre,
                            etage: Number(e.target.value),
                          })
                        }>
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
                      <input
                        type="text"
                        className="primary"
                        placeholder="Nombre"
                        disabled
                        value={selectedChambre.nombre_lits}
                      />
                    </div>
                    <div className="col-span-12">
                      <label className="text-sm font-semibold">Description </label>
                      <textarea
                        className="primary"
                        placeholder="Description"
                        value={selectedChambre.description}
                        onChange={(e) =>
                          setSelectedChambre({
                            ...selectedChambre,
                            description: e.target.value,
                          })
                        } />
                    </div>
                  </div>
                </ViewModal>

                <EditModal
                  onOpen={() => select_chambre(i)}
                  onEdit={() => edit_chambre(a.num)}
                  onCancel={() => console.log("Cancelled edit")}
                >
                  <h3
                    className="text-lg font-semibold leading-6 text-gray-900 mb-3"
                    id="modal-title"
                  >
                    Modifier chambre
                  </h3>
                  <p className="text-gray-600">Here is some more info.</p>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-4">
                      <label className="text-sm font-semibold">
                        Numéro de chambre
                      </label>
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
                        disabled
                      />
                    </div>
                    <div className="col-span-4">
                      <label className="text-sm font-semibold">Etage </label>
                      <select
                        className="primary"
                        value={selectedChambre.etage}
                        onChange={(e) =>
                          setSelectedChambre({
                            ...selectedChambre,
                            etage: Number(e.target.value),
                          })
                        }>
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
                    <div className="col-span-12">
                      <label className="text-sm font-semibold">Description </label>
                      <textarea
                        className="primary"
                        placeholder="Description"
                        value={selectedChambre.description}
                        onChange={(e) =>
                          setSelectedChambre({
                            ...selectedChambre,
                            description: e.target.value,
                          })
                        } />
                    </div>
                  </div>
                </EditModal>

                <DeleteModal onDelete={() => delete_chambre(a.num)} onCancel={() => console.log("Cancelled delete")} >
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" >
                    Supprimer la chambre "{a.num}"
                  </h3>
                  <p className="text-gray-600">Êtes-vous sûr de vouloir supprimer cet enregistrement? Toutes vos données seront définitivement supprimées. Cette action ne peut pas être annulée.</p>
                </DeleteModal>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </>
  );
}

export default ChambresPage;
