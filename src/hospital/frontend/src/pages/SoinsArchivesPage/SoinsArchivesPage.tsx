import { ColumnDef } from "@tanstack/react-table";
import Card from "../../components/UI/Card";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import moment from "moment";
import axios from "axios";
import { baseURL } from "../../config";
import Avatar from "../../components/Avatar";
import { build_badge } from "../../hooks/useSoins";



function SoinsArchivesPage(){
    const query = useQuery<Soin[]>({
        queryKey: ['soins_archive'],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/soins?fait=1`)).data
            return data;
        }
    });

    const tableDefinition = useMemo(() => [
        { header: "Patient", id: "patient", cell: (info) => {
                const p = info.row.original;
                return <div className="flex min-w-72">
                    <Avatar src={`${baseURL}/api/patients/${p.patient.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
                    <div>
                        <h6 className="mb-0">{p.patient.nom} {p.patient.prenom}</h6>
                        <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {p.patient.NIN}</p>
                    </div>
                </div>
            }
        },
        { header: "Chambre et lit", id: "chambre_lit", cell: ((info) => 
            info.row.original.hospitalisation?
                `Chambre ${(info.row.original.hospitalisation as Partial<Hospitalisation>).chambre}, Lit N°${(info.row.original.hospitalisation as Partial<Hospitalisation>).lit}`:
                "-"
        )},
        { header: "Demandé par", id: "medecin", cell: (info) => {
              const p = info.row.original;
              return <div className="flex min-w-72">
                  <Avatar src={`${baseURL}/api/personnel/${p.medecin.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
                  <div>
                      <h6 className="mb-0">{p.medecin.nom} {p.medecin.prenom}</h6>
                      <p className="mb-0 font-semibold mt-[-0.4rem]">Service: {p.medecin.service}</p>
                  </div>
              </div>
          }
        },
        { header: "Acte", accessorKey: "acte" },
        { header: "Détails", accessorKey: "details" },
        { header: "Date", id: "date", cell: (info) => moment(info.row.original.date_soin).format("DD/MM/YYYY HH:mm") },
        { header: "Status", id: "status", cell: (info) => build_badge(info.row.original.fait) },
    ], []) as ColumnDef<any>[];

    return <>
        <Card title="Mes tâches" subtitle="Liste de vos patients" className="w-full">
            <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
        </Card>
    </>
}

export default SoinsArchivesPage;