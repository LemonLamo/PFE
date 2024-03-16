import { useMemo, useState, useEffect } from "react";
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
import {
  deleteChambres,
  getChambres,
  postChambres,
  putChambres,
} from "../hooks/useChambre";

const etageName = (etage: number) => {
  if (etage == 0) return "RDC";
  if (etage == 1) return "1er";
  return etage + "éme";
};

const build_badge = (taux: number) => {
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
  const fetchData = async () => {
    return await getChambres();
  };

  const [selectedChambre, setSelectedChambre] = useState<Chambre>({
    num: "",
    etage: 0,
    description: "",
    nombre_lits: 0,
    nombre_lits_occupe: 0,
  });
  const [openModal, setOpenModal] = useState("");
  const query = useQuery({
    queryKey: ["chambres"],
    queryFn: () => {
      let data = fetchData();
      return data;
    },
  });

  const tableDefinition = useMemo(
    () => [
      { header: "Num", accessorKey: "num" },
      {
        header: "Etage",
        id: "etage",
        cell: (info) => etageName(info.row.original.etage),
      },
      { header: "Description", accessorKey: "description" },
      { header: "Nombre de lits", accessorKey: "nombre_lits" },
      {
        header: "Taux d'occupation",
        cell: (info) => {
          const c = info.row.original;
          return (
            <>
              {" "}
              {c.nombre_lits_occupe} / {c.nombre_lits}
              {build_badge((c.nombre_lits_occupe! * 100) / c.nombre_lits)}
            </>
          );
        },
      },
      {
        header: "",
        id: "actions",
        cell: (info) => {
          const c = info.row.original;
          return (
            <div className="flex justify-end gap-2">
              <ViewButton
                onClick={() => {
                  setSelectedChambre(c);
                  setOpenModal("view");
                }}
              />
              <EditButton
                onClick={() => {
                  setSelectedChambre(c);
                  setOpenModal("edit");
                }}
              />
              <DeleteButton
                onClick={() => {
                  setSelectedChambre(c);
                  setOpenModal("delete");
                }}
              />
            </div>
          );
        },
      },
    ],
    []
  ) as ColumnDef<Chambre>[];

  async function createChambre() {
    try {
      await postChambres(selectedChambre);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function editChambre() {
    try {
      const editData = {
        num: selectedChambre.num,
        nombre_lits: selectedChambre.nombre_lits,
        nombre_lits_occupe: selectedChambre.nombre_lits_occupe,
      };
      await putChambres(editData);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteChambre() {
    try {
      await deleteChambres(selectedChambre.num);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const action = (
    <Button onClick={() => setOpenModal("create")} type="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );
  return (
    <>
      <Card title="Chambres" action={action} className="w-full">
        <DataTable
          tableDefinition={tableDefinition}
          query={query}
          className="mt-2"
        />

        <CreateModal
          open={openModal === "create"}
          action={createChambre}
          close={() => {
            setSelectedChambre({});
            setOpenModal("");
          }}
        >
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            Créer une chambre
          </h3>
          <p className="text-gray-600">
            Remplissez ce formulaire pour ajouter une nouvelle chambre
          </p>
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-4">
              <label className="text-sm font-semibold">
                Numéro de chambre{" "}
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
          </div>
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-4">
              <label className="text-sm font-semibold">Nombre de lits </label>
              <input
                type="number"
                min="0"
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
            <div className="col-span-4">
              <label className="text-sm font-semibold">
                Nombre de lits occupés
              </label>
              <input
                type="number"
                min="0"
                className="primary"
                placeholder="Nombre"
                value={selectedChambre.nombre_lits_occupe}
                onChange={(e) =>
                  setSelectedChambre({
                    ...selectedChambre,
                    nombre_lits_occupe: e.target.valueAsNumber,
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-2">
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
                }
              />
            </div>
          </div>
        </CreateModal>

        <ViewModal open={openModal === "view"} close={() => setOpenModal("")}>
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            {" "}
            Détails sur chambre{" "}
          </h3>
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-4">
              <label className="text-sm font-semibold">Numéro de chambre</label>
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
          </div>
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-4">
              <label className="text-sm font-semibold">Nombre de lits</label>
              <input
                type="number"
                className="primary"
                placeholder="Nombre"
                disabled
                value={selectedChambre.nombre_lits}
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">
                Nombre de lits occupés
              </label>
              <input
                type="number"
                className="primary"
                placeholder="Nombre"
                disabled
                value={selectedChambre.nombre_lits_occupe}
              />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-2">
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
                }
                disabled
              />
            </div>
          </div>
        </ViewModal>

        <EditModal
          open={openModal === "edit"}
          action={editChambre}
          close={() => setOpenModal("")}
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
              <label className="text-sm font-semibold">Numéro de chambre</label>
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
              <label className="text-sm font-semibold">Nombre de lits</label>
              <input
                type="number"
                min="0"
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
            <div className="col-span-4">
              <label className="text-sm font-semibold">
                Nombre de lits occupés
              </label>
              <input
                type="number"
                min="0"
                className="primary"
                placeholder="Nombre"
                value={selectedChambre.nombre_lits_occupe}
                onChange={(e) =>
                  setSelectedChambre({
                    ...selectedChambre,
                    nombre_lits_occupe: e.target.valueAsNumber,
                  })
                }
              />
            </div>
          </div>
        </EditModal>

        <DeleteModal
          open={openModal === "delete"}
          action={deleteChambre}
          close={() => setOpenModal("")}
        >
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            Supprimer la chambre "{selectedChambre.num}"
          </h3>
          <p className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer cet enregistrement? Toutes vos
            données seront définitivement supprimées. Cette action ne peut pas
            être annulée.
          </p>
        </DeleteModal>
      </Card>
    </>
  );
}

export default ChambresPage;
