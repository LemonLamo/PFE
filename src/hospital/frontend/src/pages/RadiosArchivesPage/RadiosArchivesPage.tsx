import { ColumnDef } from "@tanstack/react-table";
import Card from "../../components/UI/Card";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import moment from "moment";
import { baseURL } from "../../config";
import axios from "axios";
import { status_badge } from "../../hooks/useRadios";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

function RadiosArchivesPage() {
  const query = useQuery<Radio[]>({
    queryKey: ["radios_archive"],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/radios?fait=1`)).data;
      return data;
    },
  });

  const tableDefinition = useMemo(
    () => [
      { header: "Code", accessorKey: "id" },
      {
        header: "Patient",
        id: "patient",
        cell: (info) => {
          const p = info.row.original;
          return (
            <div className="flex min-w-72">
              <Avatar src={`${baseURL}/api/patients/${p.patient.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
              <div>
                <h6 className="mb-0">
                  {p.patient.nom} {p.patient.prenom}
                </h6>
                <p className="mb-0 font-semibold mt-[-0.4rem]">
                  NIN: {p.patient.NIN}
                </p>
              </div>
            </div>
          );
        },
      },
      { header: "Radio", accessorKey: "designation" },
      { header: "Demandé par", id: "medecin", cell: (info) => {
              const p = info.row.original;
              return <div className="flex min-w-72">
                  <Avatar src={`${baseURL}/api/personnel/${p.medecin?.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
                  <div>
                      <h6 className="mb-0">{p.medecin?.nom} {p.medecin?.prenom}</h6>
                      <p className="mb-0 font-semibold mt-[-0.4rem]">Service: {p.service}</p>
                  </div>
              </div>
          }
      },
      { header: "Remarques", accessorKey: "remarques" },
      { header: "Date", id: "date", cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY HH:mm") },
      { header: "Status", id: "status", cell: (info) => status_badge(info.row.original.date_fait) },
      { header: "Date (Fait)", id: "date_fait", cell: (info) => info.row.original.date_fait ? moment(info.row.original.date_fait).format("DD/MM/YYYY HH:mm") : "-", },
      { header: "", id: "actions",
        cell: (info) => {
          const radio = info.row.original;
          return <div className="flex justify-end gap-2">
            <Link to={`/radios/${radio.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-2 px-4 font-semibold transition border text-cyan-500 border-cyan-500 rounded hover:bg-cyan-500 hover:text-white">
              Résultats
            </Link>
          </div>
        },
      },
    ], []) as ColumnDef<Radio>[];

  return (
    <>
      <Card title="Mes radios" subtitle="Liste des radios à faire" className="w-full" >
        <DataTable tableDefinition={tableDefinition} query={query} className="mt-2"/>
      </Card>
    </>
  );
}

export default RadiosArchivesPage;
