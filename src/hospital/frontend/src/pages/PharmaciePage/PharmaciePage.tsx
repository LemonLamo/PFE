import { useMemo, useState } from "react";
import Card from "../../components/UI/Card";
import axios from "axios";
import DataTable from "../../components/UI/Tables/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import ViewButton from "../../components/UI/Buttons/ViewButton";
import DeleteButton from "../../components/UI/Buttons/DeleteButton";
import Button from "../../components/UI/Buttons/Button";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../../config";
import AjouterMedicamentModal from "./AjouterMedicamentModal";
import RetirerMedicamentModal from "./RetirerMedicamentModal";
import DetailsMedicamentModal from "./DetailsMedicamentModal";
import DeleteMedicamentModal from "./DeleteMedicamentModal";
import { build_badge } from "../../hooks/useMedicaments";

function PharmacyPage() {
  const [selectedMedicament, setSelectedMedicament] = useState<Medicament>({
    code_medicament: "",
    DCI: "",
    quantite: 0,
  });
  const [openModal, setOpenModal] = useState("");
  const query = useQuery<Medicament[]>({
    queryKey: ["medicaments"],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/medicaments/`)).data;
      const codes_medicaments = data.map((x: any) => x.code_medicament);

      if (codes_medicaments.length > 0) {
        const medicaments = (await axios.post(`${baseURL}/api/codifications/medicaments`, { codes_medicaments: codes_medicaments })).data;
        const medicamentsMap: Map<string, any> = new Map(medicaments.map((x: any) => [x.code_medicament, { ...x }]));
        const result = data.map((x: any) => ({
          ...medicamentsMap.get(x.code_medicament),
          ...x,
        }));
        return result;
      } else
        return [];
    },
  });

  const tableDefinition = useMemo(
    () => [
      { header: "Code", accessorKey: "code_medicament" },
      { header: "Nom", accessorKey: "DCI" },
      { header: "Quantité en stock", accessorKey: "quantite" },
      {
        header: "Niveau de disponibilité",
        id: "badge",
        cell: (info) => build_badge(info.row.original.quantite!),
      },
      {
        header: "",
        id: "actions",
        cell: (info) => {
          const m = info.row.original;
          return (
            <div className="flex justify-end gap-2">
              <ViewButton
                onClick={() => {
                  setSelectedMedicament(m);
                  setOpenModal("details");
                }}
              />
              <DeleteButton
                onClick={() => {
                  setSelectedMedicament(m);
                  setOpenModal("delete");
                }}
              />
            </div>
          );
        },
      },
    ],
    []
  ) as ColumnDef<Medicament>[];

  const actions = (
    <div className="flex gap-2">
      <Button theme="primary" onClick={() => setOpenModal("ajouter")}>
        <i className="fa fa-plus" />
        <span className="ms-2">Alimenter</span>
      </Button>

      <Button theme="danger" onClick={() => setOpenModal("retirer")}>
        <i className="fa fa-plus" />
        <span className="ms-2">Retirer</span>
      </Button>
    </div>
  );

  return (
    <>
      <Card title="Gestion des médicaments" action={actions} className="w-full">
        <DataTable
          tableDefinition={tableDefinition}
          query={query}
          className="mt-2"
        />

        <AjouterMedicamentModal
          isOpen={openModal === "ajouter"}
          close={() => {setOpenModal(""); query.refetch();}}
        />
        {selectedMedicament !== undefined ? (
          <>
            <RetirerMedicamentModal
              isOpen={openModal === "retirer"}
              close={() => {setOpenModal(""); query.refetch();}}
            />
            <DetailsMedicamentModal
              isOpen={openModal === "details"}
              close={() => setOpenModal("")}
              selectedMedicament={selectedMedicament}
            />
            <DeleteMedicamentModal
              isOpen={openModal === "delete"}
              close={() => {setOpenModal(""); query.refetch();}}
              selectedMedicament={selectedMedicament}
            />
          </>
        ) : null}
      </Card>
    </>
  );
}

export default PharmacyPage;
