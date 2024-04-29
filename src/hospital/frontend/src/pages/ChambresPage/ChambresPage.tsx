import { useMemo, useState } from "react";
import Card from "../../components/UI/Card";
import DataTable from "../../components/UI/Tables/DataTable";
import CreateChambreModal from "./CreateChambreModal";
import ViewChambreModal from "./ViewChambreModal";
import DeleteChambreModal from "./DeleteChambreModal";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Button from "../../components/UI/Buttons/Button";
import ViewButton from "../../components/UI/Buttons/ViewButton";
import DeleteButton from "../../components/UI/Buttons/DeleteButton";
import axios from "axios";
import { baseURL } from "../../config";
import { getEtageName, taux_occupation_badge } from "../../hooks/useChambres";

function ChambresPage() {
  const [selectedChambre, setSelectedChambre] = useState<Chambre>({
    num: "",
    etage: 0,
    description: "",
    nombre_lits: undefined,
    nombre_lits_occupe: undefined,
  });
  const [openModal, setOpenModal] = useState("");
  const query = useQuery<Chambre[]>({
    queryKey: ["chambres"],
    queryFn: async () => {
      let data = (await axios.get(`${baseURL}/api/chambres`)).data;
      return data;
    },
  });
  const tableDefinition = useMemo(
    () => [
      { header: "Num", accessorKey: "num" },
      {
        header: "Etage",
        id: "etage",
        cell: (info) => getEtageName(info.row.original.etage),
      },
      { header: "Description", accessorKey: "description" },
      { header: "Nombre de lits", accessorKey: "nombre_lits" },
      {
        header: "Taux d'occupation",
        cell: (info) => {
          const c = info.row.original;
          return (
            <>
              {c.nombre_lits_occupe} / {c.nombre_lits}
              {taux_occupation_badge(
                Number(c.nombre_lits_occupe!),
                Number(c.nombre_lits)
              )}
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

  const action = (
    <Button theme="primary" onClick={() => setOpenModal("create")}>
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );

  return (
    <>
      <Card title="Chambres" className="w-full" action={action}>
        <DataTable
          tableDefinition={tableDefinition}
          query={query}
          className="mt-2"
        />
        <CreateChambreModal
          isOpen={openModal === "create"}
          close={() => {setOpenModal(""); query.refetch();}}
        />
        {selectedChambre !== undefined ? (
          <>
            <ViewChambreModal
              isOpen={openModal === "view"}
              close={() => setOpenModal("")}
              selectedChambre={selectedChambre}
            />
            <DeleteChambreModal
              isOpen={openModal === "delete"}
              close={() => {setOpenModal(""); query.refetch();}}
              selectedChambre={selectedChambre}
            />
          </>
        ) : null}
      </Card>
    </>
  );
}

export default ChambresPage;
