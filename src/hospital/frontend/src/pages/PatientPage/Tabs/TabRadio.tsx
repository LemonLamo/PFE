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

function TabRadio({ NIN }: Props) {
  const query = useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      let data = (await axios.get(`${baseURL}/api/radio`)).data;
      return data;
    },
  });
  const tableDefinitionRadio = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Patient", accessorKey: "patient" },
      { header: "Code radio", accessorKey: "code_radio" },
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
  ) as ColumnDef<Radio>[];

  return (
    <>
      <h3 className="text-lg mb-0">Radio</h3>
      <DataTable
        tableDefinition={tableDefinitionRadio}
        query={query}
        className="mt-2"
      />
    </>
  );
}

export default TabRadio;
