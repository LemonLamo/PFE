import { useMemo } from "react";
import moment from "moment";
import Card from "../components/UI/Card";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import ViewButton from "../components/Buttons/ViewButton";
import DataTable from "../components/UI/Tables/DataTable";
import axios from "axios";
import { baseURL } from "../hooks";

const createModal = (
  <>
    <Link className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" to="/nouvelle_consultation">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouvelle consultation</span>
    </Link>
  </>
);

function MesPatientsPage() {
  const query = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/patients`)).data;
      return data;
    }
  });
  
  const tableDefinition = useMemo(() => [
    { header: "Patient", id:"patient", cell: (info) => {
      const p = info.row.original;
      return <div className="flex w-68">
        <img className="rounded-full w-12 me-2" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"></img>
        <div>
          <h6 className="mb-0">{p.nom} {p.prenom}</h6>
          <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {p.NIN}</p>
        </div>
      </div>
      }
    },
    { header: "Date et lieu de naissance", id: "date_lieu_naissance", cell: (info) => <> {moment(info.row.original.date_naissance).format('DD/MM/YYYY')}, {info.row.original.lieu_naissance}</> },
    { header: "Email", accessorKey: "email" },
    { header: "Telephone", accessorKey: "telephone" },
    { header: "Dernier rendez-vous", id: "dernier_rdv", cell: () => "16/03/2024" },
    { header: "Prochain rendez-vous", id: "prochain_rdv", cell: () => "20/03/2024" },
    {
      header: "", id: "actions", cell: (info) => {
        const a = info.row.original
        return (
          <div className="flex justify-end gap-2">
            <Link to={`/patients/${a.NIN}`} className="w-4 transform text-green-500 hover:text-green-700 hover:scale-110">
              <ViewButton onClick={() => null}/>
            </Link>
            <Link to={`/patients/${a.NIN}`} className="w-4 transform text-green-500 hover:text-green-700 hover:scale-110">
              <button onClick={() => null} className="w-4 text-green-500 hover:text-green-700 hover:scale-110">
                <i className="fa fa-envelope text-xs"></i>
              </button>
            </Link>
          </div>
        )
      }
    },
  ], []) as ColumnDef<Partial<Patient>>[];
  
  return (
    <Card title="Liste des patients" subtitle="Une liste de tous les patients du service" className="w-full" action={createModal} >
      <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
    </Card>
  );
}

export default MesPatientsPage;
