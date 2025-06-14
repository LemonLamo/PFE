import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import moment from "moment";
import { baseURL } from "../../../config";
import Button from "../../../components/UI/Buttons/Button";
import AjouterAllergie from "../Modals/AjouterAllergie";
import { ajouter_allergie } from "../../../hooks/usePatient";
import AlertsContext from "../../../hooks/AlertsContext";
import DeleteAllergie from "../Modals/DeleteAllergie";
import DeleteButton from "../../../components/UI/Buttons/DeleteButton";
type Props = {
  NIN: string;
};

function TabAllergies({ NIN }: Props) {
  const { showAlert } = useContext(AlertsContext);
  const [selectedAllergie, setSelectedAllergie] = useState<any>(null);

  const [openModal, setOpenModal] = useState("");
  const allergies = useQuery<Allergie[]>({
    queryKey: ["allergies" + NIN],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/patients/${NIN}/allergies`)).data;
      return data;
    },
  });

  const allergiesTableDefinition = useMemo(
    () => [
      { header: "Code", id: "code_allergene", cell: (info) => !info.row.original.disabled? info.row.original.code_allergene : <s>{info.row.original.code_allergene}</s>  },
      { header: "Désignation", id: "designation", cell: (info) => !info.row.original.disabled? info.row.original.designation : <s>{info.row.original.designation}</s> },
      { header: "Date de diagnostic", id: "date", cell: (info) => !info.row.original.disabled? moment(info.row.original.date).format("DD/MM/YYYY") : <s>{moment(info.row.original.date).format("DD/MM/YYYY")}</s>},
      { header: "Remarques", id: "remarques",  cell: (info)=> !info.row.original.disabled? info.row.original.remarques : <s>{info.row.original.remarques}</s> },
      { header: "", id: "actions",
        cell: (info) => {
          const c = info.row.original;
          return (
            !c.disabled &&
            <div className="flex justify-end gap-2">
              <DeleteButton onClick={() => { setSelectedAllergie(c); setOpenModal("delete_allergie"); }} />
            </div>
          );
        },
      }
    ], []) as ColumnDef<Allergie>[];

  const action = (
    <Button onClick={() => setOpenModal("ajouter_allergie")} theme="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>);

  async function submit(NIN: Patient["NIN"], a: Allergie){
    try {
      await ajouter_allergie(NIN, a);
      allergies.refetch();
      showAlert("success", "Allergie enregistrée correctement");
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
      await axios.delete(`${baseURL}/api/patients/${NIN}/allergies/${selectedAllergie.id}`);
      showAlert("success", "Allergie supprimée correctement");
      allergies.refetch();
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
                <h2 className="mb-0 text-xl">Allergies</h2>
                <p className="leading-normal mb-0">Liste des allergies du patient connues, y compris aux médicaments, aliments, ou insectes.</p>
            </div>
            {action}
      </div>
      <DataTable tableDefinition={allergiesTableDefinition} query={allergies} className="mt-2" />
      <AjouterAllergie isOpen={openModal==="ajouter_allergie"} action={(a) => submit(NIN, a)} close={()=>setOpenModal("")}/>
      <DeleteAllergie isOpen={openModal==="delete_allergie"} action={deleteEntry} close={()=> {setOpenModal(""); allergies.refetch()}} />
    </>
  );
}

export default TabAllergies;
