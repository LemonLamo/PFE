import { useContext, useMemo } from "react";
import moment from "moment";
import 'moment/dist/locale/fr';
moment.locale('fr');
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import axios from "axios";
import { baseURL } from "../../config";
import Avatar from "../../components/Avatar";
import AuthContext from "../../hooks/AuthContext";
import Dropdown from "../../components/UI/Dropdown";

function UrgencesPage() {
  const auth = useContext(AuthContext);
  const query = useQuery({
    queryKey: ["urgences"],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/urgences?service=${auth?.service}&medecin=${auth?.NIN}`)).data;
      const NINs = data.map((x: any) => x.patient);

      if (NINs.length > 0) {
        const patients = (await axios.post(`${baseURL}/api/patients/bulk-select`, { NINs: NINs })).data;
        const patientsMap: Map<string, Patient> = new Map(patients.map((x: Patient) => [x.NIN, { ...x }]));
        const result = data.map((x: any) => ({
          ...patientsMap.get(x.patient),
          ...x,
        }));
        return result;
      } else
        return [];
    },
  });

  const tableDefinition = useMemo(
    () => [
      {
        header: "Patient", id: "patient", cell: (info) => {
          const p = info.row.original;
          return (
            <div className="flex min-w-72">
              <Avatar src={`${baseURL}/api/patients/${p.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2" />
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
      { header: "Date et lieu de naissance", id: "date_lieu_naissance", cell: (info) => (<> {moment(info.row.original.date_de_naissance).format("DD/MM/YYYY")}, {info.row.original.lieu_de_naissance}</>) },
      { header: "Email", accessorKey: "email" },
      { header: "Telephone", accessorKey: "telephone" },
      { header: "Arrivée", id: "arrive", cell: (info) => <> {moment(info.row.original.created_at).fromNow()}</> },
      {
        header: "", id: "actions", cell: (info) => {
          const a = info.row.original;
          return (
            <>
              <Dropdown text="Actions">
                <div className="bg-white rounded-md overflow-hidden w-[8.5rem]">
                  <Link to={`/patients/${a.NIN}`} target="_blank" className={`text-gray-900 hover:bg-cyan-400 hover:text-white group flex w-full items-center px-2 py-2 text-sm`}>
                    <i className="fa fa-folder w-4 mr-2" /> Dossier
                  </Link>
                  <Link to={`/consultations/new`} className={`text-gray-900 hover:bg-cyan-400 hover:text-white group flex w-full items-center px-2 py-2 text-sm`} state={info.row.original.NIN}>
                    <i className="fa fa-eye w-4 mr-2" /> Consultation
                  </Link>
                  <Link to={`/hospitalisations/new`} className={`text-gray-900 hover:bg-cyan-400 hover:text-white group flex w-full items-center px-2 py-2 text-sm`} state={info.row.original.NIN}>
                    <i className="fa fa-bed-pulse w-4 mr-2" /> Hospitalisation
                  </Link>
                  <Link to={`/interventions/new`} className={`text-gray-900 hover:bg-cyan-400 hover:text-white group flex w-full items-center px-2 py-2 text-sm`} state={info.row.original.NIN}>
                    <i className="fa fa-staff-snake w-4 mr-2" /> Intervention
                  </Link>
                </div>
              </Dropdown>
            </>);
        },
      },
    ],
    []
  ) as ColumnDef<any>[];

  return (
    <Card title="Liste des cas d'urgences" subtitle="Une liste des patients présents pour une urgence aujourd'hui" className="w-full">
      <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
    </Card>
  );
}

export default UrgencesPage