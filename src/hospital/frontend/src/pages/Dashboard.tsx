import { ColumnDef } from "@tanstack/react-table";
import Card from "../components/UI/Card";
import { Link } from "react-router-dom";
import ViewButton from "../components/Buttons/ViewButton";
import { useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../components/UI/Tables/DataTable";
import moment from "moment";

function Dashboard(){
    const query = useQuery({
        queryKey: ['patients'],
        queryFn: async () => {
            const data = (await axios.get(`http://localhost:8080/api/patients`)).data;
            return data;
        }
    });

    const tableDefinition = useMemo(() => [
        {
            header: "Patient", id: "patient", cell: (info) => {
                const p = info.row.original;
                return <div className="py-2 flex w-68">
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
        {
            header: "", id: "actions", cell: (info) => {
                const a = info.row.original
                return (
                    <div className="flex justify-end gap-2">
                        <Link to={`/patients/${a.NIN}`} className="w-4 transform text-green-500 hover:text-green-700 hover:scale-110">
                            <ViewButton onClick={() => null} />
                        </Link>
                    </div>
                )
            }
        },
    ], []) as ColumnDef<Partial<Patient>>[];

    return <>
        <div className="grid grid-cols-12 gap-4 w-full">
            <Card title="Mes patients" className="col-span-3">
                Hi
            </Card>
            <Card title="Mes patients admis" className="col-span-3">
                Hi
            </Card>
            <Card title="Mes interventions" className="col-span-3">
                Hi
            </Card>
            <Card title="Patients d'aujourd'hui" className="col-span-3">
                Hi
            </Card>
        </div>
        <div className="grid grid-cols-12 gap-4 w-full">
            <Card title="Mes tâches" className="col-span-7">
                Hi
            </Card>
            <Card title="Smoll calendar" className="col-span-5">
                Hi
            </Card>
        </div>
        <Card title="Mes patients" subtitle="Liste de vos patients" className="w-full">
            <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
        </Card>
    </>
}

export default Dashboard;