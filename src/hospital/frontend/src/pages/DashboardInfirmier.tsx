import { ColumnDef } from "@tanstack/react-table";
import Card from "../components/UI/Card";
import { Link } from "react-router-dom";
import ViewButton from "../components/Buttons/ViewButton";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../components/UI/Tables/DataTable";
import moment from "moment";
import Badge from "../components/UI/Badge";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { baseURL } from "../hooks";

const build_badge = (done: boolean) => {
  return (
      done?
        <Badge bgColor="#dcfce7" textColor="#267142">
            <CheckCircleIcon className="h-4 mr-1" />
            Fait
        </Badge> :

        <Badge bgColor="#fee2e2" textColor="#991b1b">
            <ExclamationTriangleIcon className="h-4 mr-1" />
            Pas encore
        </Badge>
    );
};

function DashboardInfirmier(){
    const query = useQuery<Soin[]>({
        queryKey: ['soins'],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/soins`)).data
            return data;
        }
    });

    const tableDefinition = useMemo(() => [
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
        { header: "Chambre et lit", id: "chambre_lit", cell: (info) => `Chambre ${info.row.original} - Lit N°${info.row.original}` },
        { header: "Date", id: "date", cell: (info) => moment(info.row.original.date_soin).format("DD/MM/YYYY HH:mm") },
        { header: "Acte", accessorKey: "acte" },
        { header: "Détails", accessorKey: "details" },
        { header: "Status", id: "status", cell: (info) => build_badge(info.row.original.fait) },
        { header: "", id: "actions", cell: (info) => {
                const a = info.row.original
                return (
                    <div className="flex justify-end gap-2">
                        <Link to={`/patients/${a.patient.NIN}`} className="w-4 transform text-green-500 hover:text-green-700 hover:scale-110">
                            <ViewButton onClick={() => null} />
                        </Link>
                    </div>
                )
            }
        },
    ], []) as ColumnDef<Soin>[];

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
        <Card title="Mes tâches" subtitle="Liste de vos patients" className="w-full">
            <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
        </Card>
    </>
}

export default DashboardInfirmier;