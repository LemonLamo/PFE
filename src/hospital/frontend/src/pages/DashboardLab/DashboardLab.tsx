import { ColumnDef } from "@tanstack/react-table";
import Card from "../../components/UI/Card";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import moment from "moment";
import Button from "../../components/UI/Buttons/Button";
import { baseURL } from "../../config";
import axios from "axios";
import { status_badge } from "../../hooks/useBilans";
import LabelBilan from "./LabelBilan";
import JoindreResultatsBilan from "./JoindreResultatsBilan";
import Avatar from "../../components/Avatar";

function DashboardLab(){
    const [openModal, setOpenModal] = useState("")
    const [selectedBilan, setSelectedBilan] = useState<Bilan>({id:"", code_bilan:"", date: new Date(), patient: {} })
    const query = useQuery<Bilan[]>({
        queryKey: ['bilans'],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/bilans?fait=0`)).data;
            return data;
        }
    });

    const tableDefinition = useMemo(() => [
        { header: "Code", accessorKey: "id" },
        { header: "Patient", id: "patient", cell: (info) => {
                const p = info.row.original;
                return <div className="flex min-w-72">
                    <Avatar src={`${baseURL}/api/patients/${p.patient.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
                    <div>
                        <h6 className="mb-0">{p.patient.nom} {p.patient.prenom}</h6>
                        <p className="mb-0 font-semibold mt-[-0.4rem]">Service: {p.service}</p>
                    </div>
                </div>
            }
        },
        { header: "Bilan", accessorKey: "designation" },
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
        { header: "", id: "actions", cell: (info) => {
                const bilan = info.row.original;
                return (
                    <div className="flex justify-end gap-2">
                        <Button onClick={()=>{setSelectedBilan(bilan); setOpenModal("label")}} theme="success">Label</Button>
                        <Button onClick={()=>{setSelectedBilan(bilan); setOpenModal("joindre")}} theme="primary">Joindre</Button>
                    </div>
                )
            }
        },
    ], []) as ColumnDef<Bilan>[];

    return <>
        <Card title="Mes bilans" subtitle="Liste des bilans à faire" className="w-full">
            <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
            <LabelBilan isOpen={openModal==="label"} close={()=>setOpenModal("")} selectedBilan={selectedBilan} />
            <JoindreResultatsBilan isOpen={openModal==="joindre"} close={() => {setOpenModal(""); query.refetch();}} selectedBilan={selectedBilan} />
        </Card>
    </>
}

export default DashboardLab;