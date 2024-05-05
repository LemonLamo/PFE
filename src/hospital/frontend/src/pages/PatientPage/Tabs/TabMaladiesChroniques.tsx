import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import moment from "moment";
import { baseURL } from "../../../config";
import Button from "../../../components/UI/Buttons/Button";
import AjouterMaladieChronique from "../Modals/AjouterMaladieChronique";
import { ajouter_maladie_chronique } from "../../../hooks/usePatient";
import AlertsContext from "../../../hooks/AlertsContext";
type Props = {
  NIN: string;
};

function TabMaladiesChroniques({ NIN }: Props) {
  const { showAlert } = useContext(AlertsContext);
  const [openModal, setOpenModal] = useState("");
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

  const action = (
    <Button theme="primary" onClick={() => setOpenModal("ajouter_maladie_chronique")}>
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );
  
  async function submit(NIN: Patient["NIN"], m: Maladie){
    try {
      await ajouter_maladie_chronique(NIN, m);
      showAlert("success", "Maladie chronique enregistrée correctement");
      maladies_chroniques.refetch();
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
                <h2 className="mb-0 text-xl">Maladies chroniques</h2>
                <p className="leading-normal mb-0">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            </div>
            {action}
      </div>
      <DataTable tableDefinition={maladies_chroniquesTableDefinition} query={maladies_chroniques} className="mt-2"/>
      <AjouterMaladieChronique isOpen={openModal==="ajouter_maladie_chronique"} action={(m) => submit(NIN, m)} close={()=>setOpenModal("")}/>
    </>
  );
}

export default TabMaladiesChroniques;
