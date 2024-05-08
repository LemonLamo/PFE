import Card from "../../components/UI/Card";
import { useContext, useMemo } from "react";
import AuthContext from "../../hooks/AuthContext";
import SmallCalendar from "../../components/Calendars/SmallCalendar";
import RdvCard from "../MesRendezVousPage/RdvCard";
import TableError from "../../components/UI/Tables/TableError";
import TableLoading from "../../components/UI/Loading";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { baseURL } from "../../config";
import moment from "moment";
import AlertCard from "./AlertCard";
import Avatar from "../../components/Avatar";
import { getNotifiations } from "../../hooks/useNotifications";
import DataTable from "../../components/UI/Tables/DataTable";

const today = new Date()

function DashboardPage(){
    const auth = useContext(AuthContext)
    const events = useQuery<RendezVous[]>({
        queryKey: ["rendezvous"],
        queryFn: async ()=>{
            const data = (await axios.get(`${baseURL}/api/rendez-vous`)).data;
            return data
        }
    });

    const alerts = useQuery<any[]>({
        queryKey: ["alerts"],
        queryFn: async () => await getNotifiations()
    });

    const authorisations_history = useQuery<any[]>({
        queryKey: ["authorisations_active"],
        queryFn: async () => (await axios.get(`${baseURL}/api/auth/authorisations?actif=1`)).data
    });

    const autorisations_tableDef = useMemo(
    () => [
        { header: "Médecin", id: "medecin", cell: (info) => {
                const p = info.row.original;
                return <div className="flex min-w-72">
                    <Avatar src={`${baseURL}/api/personnel/${p.medecin.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
                    <div>
                        <h6 className="mb-0">{p.medecin.nom} {p.medecin.prenom}</h6>
                        <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {p.medecin.NIN}</p>
                    </div>
                </div>
            } 
        },
        { header: "Attribué le", id: "created_at", cell: (info) => moment(info.row.original.created_at).format("DD/MM/YYYY HH:mm")},
        { header: "Motif", accessorKey: "motif" },
    ], []) as ColumnDef<any>[];

    const profile = useQuery<Patient>({
        queryKey: ["patient" + auth!.NIN!],
        queryFn: async ()=>{
            const data = (await axios.get(`${baseURL}/api/patients/${auth!.NIN!}`)).data;
            return data
        }
    });

    return <>
        <div className="w-full grid grid-cols-11 gap-2">
            <div className="w-full col-span-8 grid grid-cols-8 gap-2">
                <div className="w-full col-span-3">
                    <Card title="Votre profile" subtitle="Vos informations personnelles" className="w-full">
                        {
                            profile.isLoading?
                            <TableLoading />:
                            (profile.isError || !profile.data)?
                            <TableError />:
                            <>
                                <div className="flex flex-col justify-between items-center">
                                    <Avatar className="w-36 mb-2 rounded-full" src={`${baseURL}/api/patients/${profile.data.NIN}/avatar`} alt="profile_picture"/>
                                    <h2 className="text-xl font-bold mb-0">{profile.data.nom} {profile.data.prenom}</h2>
                                    <p className="text-cyan-500 mb-0">NIN: {profile.data.NIN}</p>
                                </div>
                                
                                <div className="w-full h-px bg-gray-200 mt-3 mb-3"></div>
                                
                                <ul className="list-none space-y-2">
                                    <li className="flex justify-between">
                                        <span className="text-gray-500 font-semibold mr-2">Age:</span>
                                        <span className="text-slate-700 font-semibold">{moment(new Date()).diff(moment(profile.data.date_de_naissance), 'y')} ans</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-gray-500 font-semibold mr-2">Groupage:</span>
                                        <span className="text-slate-700 font-semibold">{profile.data.groupage}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-gray-500 font-semibold mr-2">Taille (cm):</span>
                                        <span className="text-slate-700 font-semibold">{profile.data.taille}cm</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-gray-500 font-semibold mr-2">Poids (Kg):</span>
                                        <span className="text-slate-700 font-semibold">{profile.data.poids}Kg</span>
                                    </li>
                                </ul>
                            </>
                        }
                    </Card>
                </div>
                <div className="col-span-5">
                    <Card title="Dernier alertes" subtitle="Les alertes les plus pertinentes" className="w-full">
                        <ul className="flex flex-col gap-y-4 mt-4">
                        {
                            alerts.isLoading?
                            <TableLoading />:
                            (alerts.isError || !alerts.data)?
                            <TableError />:
                            alerts.data.map((item: any, i: number) => <AlertCard key={i} {...item}></AlertCard>)
                        }
                        </ul>
                    </Card>
                    <Card title="Autorisations actifs" subtitle="Les medecins qui ont accès à votre dossier médical" className="w-full">
                        <DataTable query={authorisations_history} tableDefinition={autorisations_tableDef} searchable={false} pageSize={3} />
                    </Card>
                </div>
            </div>
            <Card title="Prochains rendez-vous" subtitle="Vos prochains rendez-vous" className="w-full col-span-3">
                <SmallCalendar />
                <ul className="flex flex-col gap-y-4 mt-4">
                {
                    events.isLoading?
                    <TableLoading />:
                    (events.isError || !events.data)?
                    <TableError />:
                    events.data.filter((x: RendezVous ) => new Date(x.date) >= today).map((item: any, i: number) => <RdvCard key={i} {...item}></RdvCard>)
                }
                </ul>
            </Card>
        </div>
    </>
}

export default DashboardPage;