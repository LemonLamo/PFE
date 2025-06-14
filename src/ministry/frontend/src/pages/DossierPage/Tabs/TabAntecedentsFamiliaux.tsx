import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
import moment from "moment";
type Props = {
  NIN: string;
};

function TabAntecedentsFamiliaux({ NIN }: Props) {
  const antecedents_familiaux = useQuery<Antecedent[]>({
    queryKey: ["antecedents_familiaux" + NIN],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseURL}/api/patients/${NIN}/antecedents-familiaux`)
      ).data;
      return data;
    },
  });
  const antecedents_familiauxTableDefinition = useMemo(
    () => [
      { header: "Désignation", accessorKey: "designation" },
      { header: "Date", id: "date", cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY HH:mm"), },
      { header: "Remarques", accessorKey: "remarques" },
    ], []) as ColumnDef<Antecedent>[];
  
  return (
    <>
      <div className="flex justify-between items-center mb-2">
            <div className="border-black/12.5 mb-0 rounded-lg border-b-0 border-solid bg-white pb-0">
                <h2 className="mb-0 text-xl">Antécédents Familiaux</h2>
                <p className="leading-normal text-sm mb-0">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            </div>
      </div>
      <DataTable tableDefinition={antecedents_familiauxTableDefinition} query={antecedents_familiaux} className="mt-2" />
    </>
  );
}

export default TabAntecedentsFamiliaux;
