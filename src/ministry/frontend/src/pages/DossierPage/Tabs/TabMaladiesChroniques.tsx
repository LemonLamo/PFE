import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import moment from "moment";
import { baseURL } from "../../../config";
type Props = {
  NIN: string;
};

function TabMaladiesChroniques({ NIN }: Props) {
  const maladies_chroniques = useQuery<any>({
    queryKey: ["maladies_chroniques" + NIN],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseURL}/api/patients/${NIN}/maladies-chroniques`)
      ).data;
      return data;
    },
  });
  const maladies_chroniquesTableDefinition = useMemo(
    () => [
      { header: "Code", accessorKey: "code_maladie" },
      { header: "Désignation", accessorKey: "designation" },
      { header: "Date de diagnostic", id: "date_diagonstic", cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY"), },
      { header: "Remarques", accessorKey: "remarques" },
    ], []) as ColumnDef<Maladie>[];

  return (
    <>
      <div className="flex justify-between items-center mb-2">
            <div className="border-black/12.5 mb-0 rounded-lg border-b-0 border-solid bg-white pb-0">
                <h2 className="mb-0 text-xl">Maladies chroniques</h2>
                <p className="leading-normal text-sm mb-0">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            </div>
      </div>
      <DataTable tableDefinition={maladies_chroniquesTableDefinition} query={maladies_chroniques} className="mt-2"/>
    </>
  );
}

export default TabMaladiesChroniques;
