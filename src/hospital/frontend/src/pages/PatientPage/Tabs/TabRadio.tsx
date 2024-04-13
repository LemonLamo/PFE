import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
import { Link } from "react-router-dom";
import IconButton from "../../../components/UI/Buttons/IconButton";
import { status_badge } from "../../../hooks/useRadios";
import moment from "moment";
type Props = {
  reference: string;
};

function TabRadio({ reference }: Props) {
  const query = useQuery({
    queryKey: ["radios"+reference],
    queryFn: async () => {
      let data = (await axios.get(`${baseURL}/api/radios?reference=${reference}`)).data;
      return data;
    },
  });
  const tableDefinitionRadio = useMemo(
    () => [
      { header: "#", accessorKey: "id" },
      { header: "Radio", id: "radio",
        cell: (info) => `[${info.row.original.code_radio}] : ${info.row.original.designation}`},
      { header: "Date", id: "date",
        cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY HH:mm")},
      { header: "Status", id: "status", cell: (info) => status_badge(info.row.original.date_fait) },
      { header: "Date (Fait)", id: "date_fait", 
        cell: (info) => info.row.original.date_fait? moment(info.row.original.date_fait).format("DD/MM/YYYY HH:mm") : '-' },
      {
        header: "",
        id: "actions",
        cell: (info) => {
          const a = info.row.original;
          return (
            <div className="flex justify-end gap-2">
              {a.date_fait && 
              <Link to={`/radios/${a.id}`} target="_blank">
                <IconButton icon="fa fa-eye" onClick={() => null} className="text-green-500" />
              </Link>
              }
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
        searchable={false}
      />
    </>
  );
}

export default TabRadio;
