import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import moment from "moment";
import { baseURL } from "../../../config";
import Button from "../../../components/UI/Buttons/Button";
import AjouterVaccaination from "../Modals/AjouterVaccaination";
import { ajouter_vaccination } from "../../../hooks/usePatient";
import AlertsContext from "../../../hooks/AlertsContext";
type Props = {
  NIN: string;
};

function TabVaccinations({ NIN }: Props) {
  const { showAlert } = useContext(AlertsContext);

  const [openModal, setOpenModal] = useState("");
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
      { header: "Prochaine dose", id: "date_de_prochaine_dose", cell: (info) =>
          info.row.original.date_de_prochaine_dose? moment(info.row.original.date_de_prochaine_dose).format("DD/MM/YYYY HH:mm") : '-',},
    ], []) as ColumnDef<Vaccination>[];

  const action = (
    <Button onClick={() => setOpenModal("ajouter_vaccinations")} theme="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );

  async function submit(NIN: Patient["NIN"], v: Vaccination){
    try {
      await ajouter_vaccination(NIN, v);
      showAlert("success", "Vaccination enregistrée correctement");
      vaccinations.refetch();
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
                <h2 className="mb-0 text-xl">Vaccinations</h2>
                <p className="leading-normal text-sm mb-0">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            </div>
            {action}
      </div>
      <DataTable tableDefinition={vaccinationsTableDefinition} query={vaccinations} className="mt-2"/>
      <AjouterVaccaination isOpen={openModal==="ajouter_vaccinations"} action={(v) => submit(NIN, v)} close={()=>setOpenModal("")}/>
    </>
  );
}

export default TabVaccinations;
