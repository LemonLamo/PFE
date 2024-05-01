import { useContext, useMemo, useState } from "react";
import moment from "moment";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import axios from "axios";
import { baseURL } from "../../config";
import AjouterRendezVous from "./AjouterRendezVous";
import Avatar from "../../components/Avatar";
import AuthContext from "../../hooks/AuthContext";
import Dropdown from "../../components/UI/Dropdown";

function MesPatientsPage() {
  const auth = useContext(AuthContext);
  const [selectedPatient, setSelectedPatient] = useState<Partial<Patient>>({
    NIN: "",
    nom: "",
    prenom: ""
  });
  const [openModal, setOpenModal] = useState("");
  const query = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const reception = (await axios.get(`${baseURL}/api/reception?service=${auth?.service}&medecin=${auth?.NIN}`)).data;
      const NINs = reception.map((x : any) => x.patient);

      if(NINs.length > 0){
        const data = (await axios.post(`${baseURL}/api/patients/bulk-select`, {NINs: NINs})).data;
        return data;
      }else
        return [];
    },
  });

  const tableDefinition = useMemo(
    () => [
      { header: "Patient", id: "patient", cell: (info) => {
          const p = info.row.original;
          return (
            <div className="flex min-w-72">
              <Avatar src={`${baseURL}/api/patients/${p.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
              <div>
                <h6 className="mb-0">
                  {p.nom} {p.prenom}
                </h6>
                <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {p.NIN}</p>
              </div>
            </div>
          );
        },
      },
      { header: "Sexe", accessorKey: "sexe" },
      { header: "Date et lieu de naissance", id: "date_lieu_naissance",cell: (info) => (<> {moment(info.row.original.date_de_naissance).format("DD/MM/YYYY")}, {info.row.original.lieu_de_naissance}</>) },
      { header: "Email", accessorKey: "email" },
      { header: "Telephone", accessorKey: "telephone" },
      { header: "Arrivée", id: "arrive", cell: (info) => <> {moment(info.row.original.created_at).fromNow()}</>  },
      { header: "", id: "actions", cell: (info) => {
          const a = info.row.original;
          return (
            <>
              <Dropdown text="Actions">
                <div className="bg-white rounded-md overflow-hidden">
                  <Link to={`/patients/${a.patient.NIN}`} className={`text-gray-900 hover:bg-cyan-400 hover:text-white group flex w-full items-center px-2 py-2 text-sm`}>
                    <i className="fa fa-folder w-4 mr-2" /> Dossier
                  </Link>
                  <Link to={`/consultations/new`} className={`text-gray-900 hover:bg-cyan-400 hover:text-white group flex w-full items-center px-2 py-2 text-sm`} state={info.row.original.NIN}>
                    <i className="fa fa-folder w-4 mr-2" /> Dossier
                  </Link>
                  <Link to={`/hospitalisations/new`} className={`text-gray-900 hover:bg-cyan-400 hover:text-white group flex w-full items-center px-2 py-2 text-sm`} state={info.row.original.NIN}>
                    <i className="fa fa-folder w-4 mr-2" /> Dossier
                  </Link>
                  <Link to={`/interventions/new`} className={`text-gray-900 hover:bg-cyan-400 hover:text-white group flex w-full items-center px-2 py-2 text-sm`} state={info.row.original.NIN}>
                    <i className="fa fa-folder w-4 mr-2" /> Dossier
                  </Link>
                  <button className={`hover:bg-cyan-400 hover:text-white text-gray-900 group flex w-full items-center px-2 py-2 text-sm`} onClick={() => {setSelectedPatient(a); setOpenModal('rendez-vous')}}>
                    <i className="fa fa-calendar w-4 mr-2" /> Rendez vous
                  </button>
                </div>
              </Dropdown>
          </>);
        },
      },
    ],
    []
  ) as ColumnDef<any>[];

  return (
    <Card title="Liste des patients en attente" subtitle="Une liste des patients présents pour la consultation d'aujourd'hui" className="w-full">
      <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
      <AjouterRendezVous isOpen={openModal==="rendez-vous"} close={()=>setOpenModal("")} selectedPatient={selectedPatient} />
    </Card>
  );
}

export default MesPatientsPage;
