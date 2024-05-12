import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
type Props = {
  NIN: string;
};

function TabMedicaments({ NIN }: Props) {
  const medicaments = useQuery<Medicament[]>({
    queryKey: ["medicaments" + NIN],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseURL}/api/patients/${NIN}/medicaments`)
      ).data;
      return data;
    },
  });
  const medicamentsTableDefinition = useMemo(
    () => [
      { header: "Code", accessorKey: "code_medicament" },
      { header: "DCI", accessorKey: "DCI" },
      { header: "Date début", accessorKey: "date_debut" },
      { header: "Posologie", accessorKey: "posologie" },
      { header: "Fréquence", accessorKey: "frequence" },
      { header: "Durée", accessorKey: "duree" },
      { header: "Remarques", accessorKey: "remarques" },
    ],
    []
  ) as ColumnDef<Prescription>[];

  return (
    <>
      <div className="border-black/12.5 mb-0 rounded-lg border-b-0 border-solid bg-white pb-0">
        <h2 className="mb-0 text-xl">Medicaments</h2>
        <p className="leading-normal mb-0">Liste des médicaments prescrits pour le patient.</p>
      </div>
      <DataTable tableDefinition={medicamentsTableDefinition} query={medicaments} className="mt-2" />
    </>
  );
}

export default TabMedicaments;
