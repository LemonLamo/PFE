import { ColumnDef } from "@tanstack/react-table";
import Card from "../components/UI/Card";
import { Link } from "react-router-dom";
import ViewButton from "../components/Buttons/ViewButton";
import { useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../components/UI/Tables/DataTable";
import moment from "moment";
import SmallCalendar from "../components/Calendar/SmallCalendar";
import TableRow from "../components/UI/Tables/TableRow";
import TableCell from "../components/UI/Tables/TableCell";
import Table from "../components/UI/Tables/Table";
import Badge from "../components/UI/Badge";
import { baseURL } from "../hooks";

function Dashboard(){
    const query = useQuery({
        queryKey: ['patients'],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/patients`)).data;
            return data;
        }
    });

    const tableDefinition = useMemo(() => [
        { header: "Patient", id: "patient", cell: (info) => {
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
                            <ViewButton onClick={() => null} />
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

    return <>
        <div className="grid grid-cols-12 gap-x-4 gap-y-2 w-full">
            <Card className="col-span-12 sm:col-span-6 md:col-span-3 px-3">
                <div className="flex justify-between w-full">
                    <div className="flex-none max-w-full px-3">
                        <p className="mb-0 font-sans font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Patients</p>
                        <h5 className="mb-2 font-bold dark:text-white">10</h5>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                        <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                            <i className="fa fa-user text-2xl relative top-2 text-white"></i>
                        </div>
                    </div>
                </div>
                <p className="mb-0 px-3">
                    <span className="font-bold leading-normal text-sm text-emerald-500">+55%</span> du mois passé
                </p>
            </Card>
            <Card className="col-span-12 sm:col-span-6 md:col-span-3 px-3">
                <div className="flex justify-between w-full">
                    <div className="flex-none max-w-full px-3">
                        <p className="mb-0 font-sans font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Patients</p>
                        <h5 className="mb-2 font-bold dark:text-white">10</h5>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                        <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                            <i className="fa fa-user text-2xl relative top-2 text-white"></i>
                        </div>
                    </div>
                </div>
                <p className="mb-0 px-3">
                    <span className="font-bold leading-normal text-sm text-emerald-500">+55%</span> du mois passé
                </p>
            </Card>
            <Card className="col-span-12 sm:col-span-6 md:col-span-3 px-3">
                <div className="flex justify-between w-full">
                    <div className="flex-none max-w-full px-3">
                        <p className="mb-0 font-sans font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Patients</p>
                        <h5 className="mb-2 font-bold dark:text-white">10</h5>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                        <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                            <i className="fa fa-user text-2xl relative top-2 text-white"></i>
                        </div>
                    </div>
                </div>
                <p className="mb-0 px-3">
                    <span className="font-bold leading-normal text-sm text-emerald-500">+55%</span> du mois passé
                </p>
            </Card>
            <Card className="col-span-12 sm:col-span-6 md:col-span-3 px-3">
                <div className="flex justify-between w-full">
                    <div className="flex-none max-w-full px-3">
                        <p className="mb-0 font-sans font-semibold leading-normal uppercase dark:text-white dark:opacity-60">Patients</p>
                        <h5 className="mb-2 font-bold dark:text-white">10</h5>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                        <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                            <i className="fa fa-user text-2xl relative top-2 text-white"></i>
                        </div>
                    </div>
                </div>
                <p className="mb-0 px-3">
                    <span className="font-bold leading-normal text-sm text-emerald-500">+55%</span> du mois passé
                </p>
            </Card>
        </div>
        <div className="grid grid-cols-10 gap-x-4 gap-y-2 w-full">
            <Card title="Interventions d'aujourd'hui" className="col-span-12 md:col-span-4">
                <Table fields={["Patient", "Equipe", "Time"]}>
                    <TableRow>
                        <TableCell>
                            <div className="flex gap-x-2">
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900 mb-0">
                                        BRAHIM Abderrazak
                                    </p>
                                    <p className="mb-0 truncate text-sm leading-5 text-gray-600">
                                        Appendecite
                                    </p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <ul>
                                <li>NADIL Marwa</li>
                                <li>KEBTANE Djamel</li>
                            </ul>
                        </TableCell>
                        <TableCell className="text-center">
                            <Badge textColor="#0891b2" bgColor="#cffafe">11:00</Badge>
                        </TableCell>
                    </TableRow>
                </Table>
            </Card>
            <Card title="Patients d'aujourd'hui" className="col-span-12 md:col-span-3">
                <Table fields={["Patient", "Time"]}>
                    <TableRow>
                        <TableCell>
                            <div className="flex gap-x-2">
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900 mb-0">
                                        BRAHIM Abderrazak
                                    </p>
                                    <p className="mb-0 truncate text-sm leading-5 text-gray-600">
                                        Consultation
                                    </p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-center">
                            <Badge textColor="#0891b2" bgColor="#cffafe">09:00</Badge>
                        </TableCell>
                    </TableRow>
                </Table>
            </Card>
            <Card className="col-span-12 md:col-span-3 flex justify-center">
                <SmallCalendar />
            </Card>
        </div>
        <Card title="Mes patients" subtitle="Liste de vos patients" className="w-full">
            <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
        </Card>
    </>
}

export default Dashboard;