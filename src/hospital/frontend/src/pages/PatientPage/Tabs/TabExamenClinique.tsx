import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
type Props = {
  reference: string;
};

function TabExamenClinique({ reference }: Props) {
  const query = useQuery({
    queryKey: ["examens-cliniques"+reference],
    queryFn: async () => {
      let data = (await axios.get(`${baseURL}/api/consultations/${reference}/examens-cliniques`)).data;
      return data;
    },
  });
  const tableDefinitionExamenClinique = useMemo(
    () => [
      { header: "ID", accessorKey: "#" },
      { header: "Code examen clinique", accessorKey: "code_examen_clinique" },
      { header: "Designation", accessorKey: "designation" },
      { header: "Résultat", accessorKey: "resultat" },
      { header: "Remarques", accessorKey: "remarques" },
    ],
    []
  ) as ColumnDef<ExamenClinique>[];

  return (
    <>
      <h3 className="text-lg mb-0">Examen Clinique</h3>
      <DataTable
        tableDefinition={tableDefinitionExamenClinique}
        query={query}
        className="mt-2"
        searchable={false}
      />
    </>
  );
}

export default TabExamenClinique;
