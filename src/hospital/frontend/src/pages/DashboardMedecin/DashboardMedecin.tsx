import { ColumnDef } from "@tanstack/react-table";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import ViewButton from "../../components/UI/Buttons/ViewButton";
import { useContext, useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import moment from "moment";
import SmallCalendar from "../../components/Calendars/SmallCalendar";
import Badge from "../../components/UI/Badge";
import { baseURL } from "../../config";
import StatisticsCard from "../../components/StatisticsCard";
import AuthContext from "../../hooks/AuthContext";
import TableLoading from "../../components/UI/Loading";
import Avatar from "../../components/Avatar";

const today = new Date();
function DashboardMedecin(){
    const auth = useContext(AuthContext);

    const statistics = useQuery<any>({
        queryKey: ['statistics_medecin'],
        queryFn: async () => {
            const statistics = { consultations: "", hospitalisations: "", interventions: "", patients_attente: "??",}
            statistics.consultations = await (await axios.get(`${baseURL}/api/consultations/count?hopital=${auth!.hopital}&medecin=${auth!.NIN}`)).data.count;
            statistics.hospitalisations = await (await axios.get(`${baseURL}/api/hospitalisations/count?hopital=${auth!.hopital}&medecin=${auth!.NIN}`)).data.count;
            statistics.interventions = (await axios.get(`${baseURL}/api/interventions/count?hopital=${auth!.hopital}&medecin=${auth!.NIN}`)).data.count;
            return statistics
        }
    })

    const consultations = useQuery<RendezVous[]>({
        queryKey: ['consultations_rendezvous'],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/rendez-vous`)).data;
            return data.filter((x: RendezVous ) => new Date(x.date) >= today && x.type == "Consultation")
        }
    })

    const interventions = useQuery<RendezVous[]>({
        queryKey: ['interventions_rendezvous'],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/rendez-vous`)).data;
            return data.filter((x: RendezVous ) => new Date(x.date) >= today && x.type == "Intervention")
        }
    })

    const patients = useQuery({
        queryKey: ['patients'],
        queryFn: async () => {
            const reception = (await axios.get(`${baseURL}/api/reception?service=${auth?.service}&medecin=${auth?.NIN}`)).data;
            const NINs = reception.map((x : any) => x.patient);

            if(NINs.length > 0){
                const data = (await axios.post(`${baseURL}/api/patients/bulk-select`, {NINs: NINs})).data;
                return data;
            }else
                return [];
        }
    });
    
    const tableDefinition = useMemo(() => [
        { header: "Patient", id: "patient", cell: (info) => {
                const p = info.row.original;
                console.log(p)
                return <div className="flex">
                    <Avatar src={`${baseURL}/api/patients/${p.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
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

    const tableDefinition2 = useMemo(() => [
        { header: "Patient", id: "patient", cell: (info) => {
                const x = info.row.original;
                return <div className="flex gap-x-2">
                    <Avatar src={`${baseURL}/api/patients/${x.patient.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900 mb-0">
                            {x.patient.nom} {x.patient.prenom}
                        </p>
                        <p className="mb-0 truncate text-sm leading-5 text-gray-600">
                            {x.title}
                        </p>
                    </div>
                </div>
            }
        },
        { header: "RDV", id:"date", cell: (info) => {
            const x = info.row.original;
            return <div className="text-center">
                <p className="text-center mb-0">{moment(x.date).format("DD/MM/YYYY")}</p>
                <p className="text-center mb-0">{moment(x.date).format("HH:mm")}</p>
            </div>
        } },
        { header: "État", id: "etat", cell: (info) => {
            const x = info.row.original;
            return <div className="text-center">
                <Badge textColor="#0891b2" bgColor="#cffafe">{x.duree}m</Badge>
            </div>
        }}
    ], []) as ColumnDef<RendezVous>[];

    return <>
        <div className="grid grid-cols-12 gap-x-4 gap-y-2 w-full">
            <StatisticsCard icon="fa fa-user" title="Consultations" >
            {
                statistics.isError? "Erreur":
                statistics.isLoading? <TableLoading /> :
                <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.data?.consultations}</h5>
            }
            </StatisticsCard>

            <StatisticsCard icon="fa fa-bed-pulse" title="Hospitalisations" >
            {
                statistics.isError? "Erreur":
                statistics.isLoading?
                    <TableLoading />:
                    <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.data?.hospitalisations}</h5>
            }
            </StatisticsCard>

            <StatisticsCard icon="fa fa-heart-pulse" title="Interventions">
            {
                statistics.isError? "Erreur":
                statistics.isLoading?
                    <TableLoading />:
                    <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.data?.interventions}</h5>
            }
            </StatisticsCard>

            <StatisticsCard icon="fa fa-user" title="Patients en attente">
            {
                statistics.isError? "Erreur":
                statistics.isLoading?
                    <TableLoading />:
                    <h5 className="text-2xl mb-0 font-bold dark:text-white">{statistics.data?.patients_attente}</h5>
            }
            </StatisticsCard>
        </div>
        <div className="grid grid-cols-11 gap-x-4 gap-y-2 w-full">
            <Card title="Prochaines interventions" className="col-span-12 md:col-span-4">
                <DataTable tableDefinition={tableDefinition2} query={interventions} pageSize={3} searchable={false} />
            </Card>

            <Card title="Prochaines consultations" className="col-span-12 md:col-span-4">
                <DataTable tableDefinition={tableDefinition2} query={consultations} pageSize={3} searchable={false} />
            </Card>
            
            <Card className="col-span-12 md:col-span-3 flex justify-center !p-0 aspect-[5/4]">
                <SmallCalendar />
            </Card>
        </div>
        <Card title="Mes patients" subtitle="Liste de vos patients" className="w-full">
            <DataTable tableDefinition={tableDefinition} query={patients} className="mt-2" />
        </Card>
    </>
}

export default DashboardMedecin;