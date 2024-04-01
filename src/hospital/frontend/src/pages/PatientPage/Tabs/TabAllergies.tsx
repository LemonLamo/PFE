import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo, useState } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import moment from "moment";
import { baseURL } from "../../../config";
import Button from "../../../components/UI/Buttons/Button";
import AjouterAllergie from "../Modals/AjouterAllergie";
import { ajouter_allergie } from "../../../hooks/usePatient";
type Props = {
  NIN: string;
};

function TabAllergies({ NIN }: Props) {
  const [openModal, setOpenModal] = useState("");
  const allergies = useQuery<Allergie[]>({
    queryKey: ["allergies" + NIN],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/patients/${NIN}/allergies`))
        .data;
      return data;
    },
  });

  const allergiesTableDefinition = useMemo(
    () => [
      { header: "Code", accessorKey: "code_allergene" },
      { header: "Désignation", accessorKey: "designation" },
      { header: "Date de diagnostic", id: "date", cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY HH:mm"), },
      { header: "Remarques", accessorKey: "remarques" },
    ],
    []
  ) as ColumnDef<Allergie>[];

  const action = (
    <Button onClick={() => setOpenModal("ajouter_allergie")} theme="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>);

  return (
    <>
      <div className="flex justify-between items-center mb-2">
            <div className="border-black/12.5 mb-0 rounded-lg border-b-0 border-solid bg-white pb-0">
                <h2 className="mb-0 text-xl">Allergies</h2>
                <p className="leading-normal text-sm mb-0">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
            </div>
            {action}
      </div>
      <DataTable tableDefinition={allergiesTableDefinition} query={allergies} className="mt-2" />
      <AjouterAllergie isOpen={openModal==="ajouter_allergie"} action={(a) => ajouter_allergie(NIN, a)} close={()=>setOpenModal("")}/>
    </>
  );
}

export default TabAllergies;
