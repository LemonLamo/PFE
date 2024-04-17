import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
type Props = {
  NIN: string;
};

function TabMedicaments({ NIN }: Props) {
  const medicaments = useQuery<Medicament[]>({
    queryKey: ["medicaments" + NIN],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseURL}/api/patients/${NIN}/medicaments`)
      ).data;
      return data;
    },
  });
  const medicamentsTableDefinition = useMemo(
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
      <h3 className="text-lg mb-0">Medicaments</h3>
      <p className="mb-4">
        This is some placeholder content the Profile tab's associated content,
        clicking another tab will toggle the visibility of this one for the
        next.
      </p>
      <DataTable tableDefinition={medicamentsTableDefinition} query={medicaments} className="mt-2" />
    </>
  );
}

export default TabMedicaments;
