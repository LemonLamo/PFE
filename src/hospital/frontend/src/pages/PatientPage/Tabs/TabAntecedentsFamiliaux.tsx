import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
import Button from "../../../components/UI/Buttons/Button";
import AjouterAntecedentFamilial from "../Modals/AjouterAntecedentFamilial";
import moment from "moment";
import { ajouter_antecedent } from "../../../hooks/usePatient";
import AlertsContext from "../../../hooks/AlertsContext";
type Props = {
  NIN: string;
};

function TabAntecedentsFamiliaux({ NIN }: Props) {
  const { showAlert } = useContext(AlertsContext);

  const [openModal, setOpenModal] = useState("");
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
    ],
    []
  ) as ColumnDef<Antecedent>[];

  const action = (
    <Button onClick={() => setOpenModal("ajouter_antecedants_familiales")} theme="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );

  async function submit(NIN: Patient["NIN"], a: Antecedent, type: 'familial' | 'medical'){
    try {
      await ajouter_antecedent(NIN, a, type);
      showAlert("success", "Antécédent enregistré correctement");
      antecedents_familiaux.refetch();
      setOpenModal("");
    } catch (error: any) {
      if (error.response)
          if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
      else
          showAlert("error", error.code + ": " + error.message);
    }
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-2">
            <div className="border-black/12.5 mb-0 rounded-lg border-b-0 border-solid bg-white pb-0">
                <h2 className="mb-0 text-xl">Antécédents Familiaux</h2>
                <p className="leading-normal mb-0">Inclut ici est historique de maladie présent dans la famille du patient.</p>
            </div>
            {action}
      </div>
      <DataTable tableDefinition={antecedents_familiauxTableDefinition} query={antecedents_familiaux} className="mt-2" />
      <AjouterAntecedentFamilial isOpen={openModal==="ajouter_antecedants_familiales"} action={(a) => submit(NIN, a, 'familial')} close={()=>setOpenModal("")}/>
    </>
  );
}

export default TabAntecedentsFamiliaux;
