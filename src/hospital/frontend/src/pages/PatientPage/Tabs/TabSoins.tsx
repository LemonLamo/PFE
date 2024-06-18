import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
import moment from "moment";
import { status_badge } from "../../../hooks/useBilans";
type Props = {
  reference: string;
};

function TabSoins({ reference }: Props) {
  const query = useQuery({
    queryKey: ["soins"+reference],
    queryFn: async () => {
      let data = (await axios.get(`${baseURL}/api/soins?reference=${reference}`)).data;
      return data;
    },
  });
  const tableDefinitionBilan = useMemo(
    () => [
      { header: "#", accessorKey: "id" },
      { header: "Soin", accessorKey: "acte" },
      { header: "Détails", accessorKey: "details" },
      { header: "Date", id: "date",
        cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY HH:mm")},
      { header: "Status", id: "status", cell: (info) => status_badge(info.row.original.date_fait) },
      { header: "Date (Fait)", id: "date_fait", cell: (info) => info.row.original.date_fait? moment(info.row.original.date_fait).format("DD/MM/YYYY HH:mm") : '-' },
      { header: "Observation (Fait)", id: "date_fait", cell: (info) => info.row.original.details_fait },
    ],
    []
  ) as ColumnDef<any>[];

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

export default TabSoins;
