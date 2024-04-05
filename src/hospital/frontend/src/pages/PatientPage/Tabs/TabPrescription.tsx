import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
type Props = {
  NIN: string;
};

function TabPrescription({ NIN }: Props) {
  const query = useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      let data = (await axios.get(`${baseURL}/api/prescription`)).data;
      return data;
    },
  });
  const tableDefinitionPrescription = useMemo(
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
      <h3 className="text-lg mb-0">Prescription</h3>
      <DataTable
        tableDefinition={tableDefinitionPrescription}
        query={query}
        className="mt-2"
        searchable={false}
      />
    </>
  );
}

export default TabPrescription;
