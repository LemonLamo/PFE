import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo, useState } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
import Button from "../../../components/UI/Buttons/Button";
import AjouterAntecedentMedical from "../Modals/AjouterAntecedentMedical";
import moment from "moment";
import { ajouter_antecedent } from "../../../hooks/usePatient";
type Props = {
  NIN: string;
};

function TabAntecedentsMedicales({ NIN }: Props) {
  const [openModal, setOpenModal] = useState("");
  const antecedents_medicales = useQuery<Antecedent[]>({
    queryKey: ["antecedents_medicales" + NIN],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseURL}/api/patients/${NIN}/antecedents-medicals`)
      ).data;
      return data;
    },
  });
  const antecedents_medicalesTableDefinition = useMemo(
    () => [
      { header: "Désignation", accessorKey: "designation" },
      { header: "Date", id: "date", cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY HH:mm"), },
      { header: "Remarques", accessorKey: "remarques" },
    ],
    []
  ) as ColumnDef<Antecedent>[];

  const action = (
    <Button onClick={() => setOpenModal("ajouter_antecedants_medicales")} theme="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );
  
  return (
    <>
      <div className="flex justify-between items-center mb-2">
            <div className="border-black/12.5 mb-0 rounded-lg border-b-0 border-solid bg-white pb-0">
                <h2 className="mb-0 text-xl">Antécédents Médicales</h2>
                <p className="leading-normal text-sm mb-0">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            </div>
            {action}
      </div>
      <DataTable tableDefinition={antecedents_medicalesTableDefinition} query={antecedents_medicales} className="mt-2" />
      <AjouterAntecedentMedical isOpen={openModal==="ajouter_antecedants_medicales"} action={(a) => ajouter_antecedent(NIN, a, 'medical')} close={()=>setOpenModal("")}/>
    </>
  );
}

export default TabAntecedentsMedicales;
