import { useMemo, useState } from "react";
import moment from "moment";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import axios from "axios";
import { baseURL } from "../../config";
import ExecuterIntervention from "./ExecuterIntervention";
import IconButton from "../../components/UI/Buttons/IconButton";
import { executerIntervention } from "../../hooks/useInterventions";

const createModal = (
  <>
    <Link className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" to="/patients/new">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouvelle consultation</span>
    </Link>
  </>
);

function MesInterventionsPage() {
  const [selectedIntervention, setSelectedIntervention] = useState<Partial<Intervention>>({
    id: "",
    patient: {NIN:"", nom:"", prenom:""},
    protocole_operatoire: "",
  });
  const [openModal, setOpenModal] = useState("");
  const query = useQuery({
    queryKey: ["interventions"],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/interventions?fait=0`)).data;
      return data;
    },
  });

  const tableDefinition = useMemo(
    () => [
      { header: "Patient", id: "patient", cell: (info) => {
          const p = info.row.original;
          return (
            <div className="flex w-68">
              <img className="rounded-full w-12 me-2" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"></img>
              <div>
                <h6 className="mb-0">
                  {p.patient!.nom} {p.patient!.prenom}
                </h6>
                <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {p.patient!.NIN}</p>
              </div>
            </div>
          );
        },
      },
      { header: "Intervention", id: "intervention", cell: (info) => (`[${info.row.original.code_intervention}]: ${info.row.original.designation}`) },
      { header: "Date", id: "date", cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY HH:mm") },
      { header: "Détails", accessorKey: "remarques" },
      { header: "", id: "actions", cell: (info) => {
          const a = info.row.original;
          return (
            <>
              { !a.protocole_operatoire? <IconButton icon="fa fa-check" className="text-green-500 hover:text-green-700" onClick={() => {setSelectedIntervention(a); setOpenModal('executer')}} /> : null}
            </>);
        },
      },
    ], []) as ColumnDef<Partial<Intervention>>[];

  return (
    <Card title="Liste des patients" subtitle="Une liste de tous les patients du service" className="w-full" action={createModal}>
      <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
      <ExecuterIntervention isOpen={openModal==="executer"} close={()=>setOpenModal("")} selectedIntervention={selectedIntervention} action={(intervention, protocole_operatoire) => executerIntervention(intervention, protocole_operatoire)} />
    </Card>
  );
}

export default MesInterventionsPage;
