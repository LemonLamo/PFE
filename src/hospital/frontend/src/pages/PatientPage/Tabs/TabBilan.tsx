import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
import IconButton from "../../../components/UI/Buttons/IconButton";
import { Link } from "react-router-dom";
type Props = {
  reference: string;
};

function TabBilan({ reference }: Props) {
  const query = useQuery({
    queryKey: ["bilans"+reference],
    queryFn: async () => {
      let data = (await axios.get(`${baseURL}/api/bilans?reference=${reference}`)).data;
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
              {a.date_fait && 
              <Link to={`/bilans/${a.id}`} target="_blank">
                <IconButton icon="fa fa-eye" onClick={() => null} className="text-green-500" />
              </Link>
              }
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
