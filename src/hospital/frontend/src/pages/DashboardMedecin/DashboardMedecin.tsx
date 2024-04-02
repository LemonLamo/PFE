import { ColumnDef } from "@tanstack/react-table";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import ViewButton from "../../components/UI/Buttons/ViewButton";
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import moment from "moment";
import SmallCalendar from "../../components/Calendars/SmallCalendar";
import TableRow from "../../components/UI/Tables/TableRow";
import TableCell from "../../components/UI/Tables/TableCell";
import Table from "../../components/UI/Tables/Table";
import Badge from "../../components/UI/Badge";
import { baseURL } from "../../config";
import StatisticsCard from "../../components/StatisticsCard";
import AuthContext from "../../hooks/AuthContext";

function DashboardMedecin(){
    const auth = useContext(AuthContext);
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
        { header: "Sexe", accessorKey: "sexe" },
        { header: "Date et lieu de naissance", id: "date_lieu_naissance", cell: (info) => <> {moment(info.row.original.date_de_naissance).format('DD/MM/YYYY')}, {info.row.original.lieu_de_naissance}</> },
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

    const [statistics, setStatistics] = useState({
      consultations: "",
      hospitalisations: "",
      interventions: "",
      patients_attente: "??",
    })
    const [consultations, setConsultations] = useState<any>([])
    const [interventions, setInterventions] = useState<any>([])
    useEffect(()=>{
      axios.get(`${baseURL}/api/ehr/consultations/count?hopital=${auth!.hopital}&medecin=${auth!.NIN}`).then((response: any)=> setStatistics(s => ({...s, consultations: response.data.count})))
      axios.get(`${baseURL}/api/ehr/hospitalisations/count?hopital=${auth!.hopital}&medecin=${auth!.NIN}`).then((response: any)=> setStatistics(s => ({...s, hospitalisations: response.data.count})))
      axios.get(`${baseURL}/api/ehr/interventions/count?hopital=${auth!.hopital}&medecin=${auth!.NIN}`).then((response: any)=> setStatistics(s => ({...s, interventions: response.data.count})))

      setConsultations([{patient:{nom: "BRAHIM", prenom:"Abderrazak"}, date:new Date()}])
      setInterventions([{patient:{nom: "BRAHIM", prenom:"Abderrazak"}, designation: "Appendicite", date:new Date()}])
    }, [])

    return <>
        <div className="grid grid-cols-12 gap-x-4 gap-y-2 w-full">
            <StatisticsCard icon="fa fa-user" title="Consultations" >
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.consultations}</h5>
            </StatisticsCard>

            <StatisticsCard icon="fa fa-bed-pulse" title="Hospitalisations" >
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.hospitalisations}</h5>
            </StatisticsCard>

            <StatisticsCard icon="fa fa-heart-pulse" title="Interventions">
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.interventions}</h5>
            </StatisticsCard>

            <StatisticsCard icon="fa fa-user" title="Patients en attente">
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.patients_attente}</h5>
            </StatisticsCard>
        </div>
        <div className="grid grid-cols-12 gap-x-4 gap-y-2 w-full">
            <Card title="Prochaines interventions" className="col-span-12 md:col-span-5">
                <Table fields={["Patient", "Remarques", "Time"]}>
                    {
                        interventions.map((item: any, i: number)=> (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="flex gap-x-2">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900 mb-0">
                                                {item.patient.nom} {item.patient.prenom}
                                            </p>
                                            <p className="mb-0 truncate text-sm leading-5 text-gray-600">
                                                Appendecite
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="text-center">{moment(item.date).format("DD/MM/YYYY")}</p>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge textColor="#0891b2" bgColor="#cffafe">{moment(item.date).format("HH:mm")}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </Table>
            </Card>

            <Card title="Prochaines consultations" className="col-span-12 md:col-span-4">
                <Table fields={["Patient", "Date", "Time"]}>
                    {
                        consultations.map((item: any, i: number)=> (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="flex gap-x-2">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900 mb-0">
                                                {item.patient.nom} {item.patient.prenom}
                                            </p>
                                            <p className="mb-0 truncate text-sm leading-5 text-gray-600">
                                                Consultation
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="text-center">{moment(item.date).format("DD/MM/YYYY")}</p>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge textColor="#0891b2" bgColor="#cffafe">{moment(item.date).format("HH:mm")}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </Table>
            </Card>
            
            <Card className="col-span-12 md:col-span-3 flex justify-center !p-0 aspect-[5/4]">
                <SmallCalendar />
            </Card>
        </div>
        <Card title="Mes patients" subtitle="Liste de vos patients" className="w-full">
            <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
        </Card>
    </>
}

export default DashboardMedecin;