import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
import ViewButton from "../../../components/UI/Buttons/ViewButton";
type Props = {
  NIN: string;
};

function TabBilan({ NIN }: Props) {
  const query = useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      let data = (await axios.get(`${baseURL}/api/bilan`)).data;
      return data;
    },
  });
  const tableDefinitionBilan = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Patient", accessorKey: "patient" },
      { header: "Code bilan", accessorKey: "code_bilan" },
      { header: "Designation", accessorKey: "designation" },
      { header: "Date", accessorKey: "date" },
      {
        header: "",
        id: "actions",
        cell: (info) => {
          const a = info.row.original;
          return (
            <div className="flex justify-end gap-2">
              <ViewButton onClick={() => {}} />
            </div>
          );
        },
      },
    ],
    []
  ) as ColumnDef<Bilan>[];

  return (
    <>
      <h3 className="text-lg mb-0">Bilan</h3>
      <DataTable
        tableDefinition={tableDefinitionBilan}
        query={query}
        className="mt-2"
        searchable={false}
      />
    </>
  );
}

export default TabBilan;
