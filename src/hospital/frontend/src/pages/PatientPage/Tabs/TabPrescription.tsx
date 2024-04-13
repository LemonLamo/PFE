import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
import Button from "../../../components/UI/Buttons/Button";
import { Link } from "react-router-dom";
type Props = {
  reference: string;
};

function TabPrescription({ reference }: Props) {
  const query = useQuery({
    queryKey: ["prescriptions"+reference],
    queryFn: async () => {
      let data = (await axios.get(`${baseURL}/api/prescriptions?reference=${reference}`)).data;
      return data;
    },
  });
  const tableDefinitionPrescription = useMemo(
    () => [
      { header: "DCI", accessorKey: "DCI" },
      { header: "Posologie", accessorKey: "posologie" },
      { header: "Fréquence", accessorKey: "frequence" },
      { header: "Durée", accessorKey: "duree" },
      { header: "Remarques", accessorKey: "remarques" },
    ],
    []
  ) as ColumnDef<Prescription>[];

  const action = (
    <Link to={`/ordonnances/${reference}`} target="_blank">
      <Button onClick={() => null} theme="primary">
        <i className="fa fa-magnifying-glass" />
        <span className="ms-2">View Ordonannce</span>
      </Button>
    </Link>);

  return (
    <>
      <div className="flex justify-between items-center mb-2">
            <div className="border-black/12.5 mb-0 rounded-lg border-b-0 border-solid bg-white pb-0">
                <h2 className="mb-0 text-xl">Préscriptions</h2>
            </div>
            {action}
      </div>
      <DataTable tableDefinition={tableDefinitionPrescription} query={query} className="mt-2" searchable={false}/>
    </>
  );
}

export default TabPrescription;
