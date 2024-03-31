import { ColumnDef } from "@tanstack/react-table";
import Card from "../components/UI/Card";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../components/UI/Tables/DataTable";
import moment from "moment";
import Button from "../components/UI/Buttons/Button";
import { baseURL } from "../config";
import axios from "axios";
import { status_badge } from "../hooks/useBilans";

function DashboardLab(){
    const query = useQuery<Bilan[]>({
        queryKey: ['bilans'],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/ehr/bilans`)).data;
            return data;
        }
    });

    const tableDefinition = useMemo(() => [
        { header: "Code", accessorKey: "id" },
        { header: "Patient", id: "patient", cell: (info) => {
                const p = info.row.original;
                return <div className="flex">
                    <img className="rounded-full w-12 me-2" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"></img>
                    <div>
                        <h6 className="mb-0">{p.patient.nom} {p.patient.prenom}</h6>
                        <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {p.patient.NIN}</p>
                    </div>
                </div>
            }
        },
        { header: "Bilan", accessorKey: "designation" },
        { header: "Remarques", accessorKey: "remarques" },
        { header: "Date", id: "date", cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY HH:mm") },
        { header: "Status", id: "status", cell: (info) => status_badge(info.row.original.date_fait) },
        { header: "Date (Fait)", id: "date_fait", 
            cell: (info) => info.row.original.date_fait? 
                            moment(info.row.original.date_fait).format("DD/MM/YYYY HH:mm"):
                            '-' },
        { header: "", id: "actions", cell: () => {
                return (
                    <div className="flex justify-end gap-2">
                        <Button onClick={()=>null} theme="success">Label</Button>
                        <Button onClick={()=>null} theme="primary">Joindre</Button>
                    </div>
                )
            }
        },
    ], []) as ColumnDef<Bilan>[];

    return <>
        <Card title="Mes bilans" subtitle="Liste des bilans à faire" className="w-full">
            <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
        </Card>
    </>
}

export default DashboardLab;