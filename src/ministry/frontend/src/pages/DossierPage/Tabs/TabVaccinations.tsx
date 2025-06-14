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

function TabVaccinations({ NIN }: Props) {
  const vaccinations = useQuery<Vaccination[]>({
    queryKey: ["vaccinations" + NIN],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseURL}/api/patients/${NIN}/vaccinations`)
      ).data;
      return data;
    },
  });
  const vaccinationsTableDefinition = useMemo(
    () => [
      { header: "Code", accessorKey: "code_vaccin" },
      { header: "Désignation", accessorKey: "designation" },
      { header: "Date", id: "date", cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY HH:mm") },
      { header: "Remarques", accessorKey: "remarques" },
      { header: "Prochaine dose", id: "date_de_prochaine_dose", cell: (info) => moment(info.row.original.date_de_prochaine_dose).format("DD/MM/YYYY HH:mm"),},
    ],
    []
  ) as ColumnDef<Vaccination>[];

  return (
    <>
      <div className="flex justify-between items-center mb-2">
            <div className="border-black/12.5 mb-0 rounded-lg border-b-0 border-solid bg-white pb-0">
                <h2 className="mb-0 text-xl">Vaccinations</h2>
                <p className="leading-normal text-sm mb-0">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            </div>
      </div>
      <DataTable tableDefinition={vaccinationsTableDefinition} query={vaccinations} className="mt-2"/>
    </>
  );
}

export default TabVaccinations;
