import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import { baseURL } from "../../../config";
import Button from "../../../components/UI/Buttons/Button";
import AjouterAntecedentMedical from "../Modals/AjouterAntecedentMedical";
import moment from "moment";
import { ajouter_antecedent } from "../../../hooks/usePatient";
import AlertsContext from "../../../hooks/AlertsContext";
import DeleteAntecedentMedical from "../Modals/DeleteAntecedentMedical";
import DeleteButton from "../../../components/UI/Buttons/DeleteButton";
type Props = {
  NIN: string;
};

function TabAntecedentsMedicales({ NIN }: Props) {
  const { showAlert } = useContext(AlertsContext);
  const [selectedAntecedent, setSelectedAntecedent] = useState<any>(null);

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
      { header: "Désignation", id: "designation", cell: (info) => !info.row.original.disabled? info.row.original.designation : <s>{info.row.original.designation}</s> },
      { header: "Date de diagnostic", id: "date", cell: (info) => !info.row.original.disabled? moment(info.row.original.date).format("DD/MM/YYYY") : <s>{moment(info.row.original.date).format("DD/MM/YYYY")}</s>},
      { header: "Remarques", id: "remarques",  cell: (info)=> !info.row.original.disabled? info.row.original.remarques : <s>{info.row.original.remarques}</s> },
      { header: "", id: "actions",
        cell: (info) => {
          const c = info.row.original;
          return (
            !c.disabled &&
            <div className="flex justify-end gap-2">
              <DeleteButton onClick={() => { setSelectedAntecedent(c); setOpenModal("delete_antecedants_medicales"); }} />
            </div>
          );
        },
      }
    ], []) as ColumnDef<Antecedent>[];

  const action = (
    <Button onClick={() => setOpenModal("ajouter_antecedants_medicales")} theme="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );

  async function submit(NIN: Patient["NIN"], a: Antecedent, type: 'familial' | 'medical'){
    try {
      await ajouter_antecedent(NIN, a, type);
      showAlert("success", "Antécédent enregistré correctement");
      antecedents_medicales.refetch();
      setOpenModal("");
    } catch (error: any) {
      if (error.response)
          if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
      else
          showAlert("error", error.code + ": " + error.message);
    }
  }

  async function deleteEntry(){
    try {
      await axios.delete(`${baseURL}/api/patients/${NIN}/antecedents-medicals/${selectedAntecedent.id}`);
      showAlert("success", "Antécedent médical supprimée correctement");
      antecedents_medicales.refetch();
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
                <h2 className="mb-0 text-xl">Antécédents Médicaux</h2>
                <p className="leading-normal mb-0">Inclut ici sont les maladies diagnostiquées, les chirurgies subies, et tout autre évènement pertinent à la santé du patient.</p>
            </div>
            {action}
      </div>
      <DataTable tableDefinition={antecedents_medicalesTableDefinition} query={antecedents_medicales} className="mt-2" />
      <AjouterAntecedentMedical isOpen={openModal==="ajouter_antecedants_medicales"} action={(a) => submit(NIN, a, 'medical')} close={()=>setOpenModal("")}/>
      <DeleteAntecedentMedical isOpen={openModal==="delete_antecedants_medicales"} action={deleteEntry} close={()=> {setOpenModal(""); antecedents_medicales.refetch()}} />
    </>
  );
}

export default TabAntecedentsMedicales;
