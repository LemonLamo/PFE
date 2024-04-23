import { ColumnDef } from "@tanstack/react-table";
import Card from "../../components/UI/Card";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import moment from "moment";
import Button from "../../components/UI/Buttons/Button";
import { baseURL } from "../../config";
import axios from "axios";
import { status_badge } from "../../hooks/useRadios";
import LabelRadio from "./LabelRadio";
import JoindreResultatsRadio from "./JoindreResultatsRadio";
import { Link } from "react-router-dom";

function DashboardRadio(){
    const [openModal, setOpenModal] = useState("")
    const [selectedRadio, setSelectedRadio] = useState<Radio>({id:"", code_radio:"", date: new Date(), patient: {} })
    const query = useQuery<Radio[]>({
        queryKey: ['radios'],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/radios`)).data;
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
        { header: "Radio", accessorKey: "designation" },
        { header: "Remarques", accessorKey: "remarques" },
        { header: "Date", id: "date", cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY HH:mm") },
        { header: "Status", id: "status", cell: (info) => status_badge(info.row.original.date_fait) },
        { header: "Date (Fait)", id: "date_fait", 
            cell: (info) => info.row.original.date_fait? 
                            moment(info.row.original.date_fait).format("DD/MM/YYYY HH:mm"):
                            '-' },
        { header: "", id: "actions", cell: (info) => {
                const radio = info.row.original;
                return (
                    !info.row.original.date_fait?
                    <div className="flex justify-end gap-2">
                        <Button onClick={()=>{setSelectedRadio(radio); setOpenModal("label")}} theme="success">Label</Button>
                        <Button onClick={()=>{setSelectedRadio(radio); setOpenModal("joindre")}} theme="primary">Joindre</Button>
                    </div> :
                    <div className="flex justify-end gap-2">
                        <Link to={`/radios/${radio.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-2 px-4 font-semibold transition border text-cyan-500 border-cyan-500 rounded hover:bg-cyan-500 hover:text-white">Résultats</Link>
                    </div>
                )
            }
        },
    ], []) as ColumnDef<Radio>[];

    return <>
        <Card title="Mes radios" subtitle="Liste des radios à faire" className="w-full">
            <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
            <LabelRadio isOpen={openModal==="label"} close={()=>setOpenModal("")} selectedRadio={selectedRadio} />
            <JoindreResultatsRadio isOpen={openModal==="joindre"} close={() => {setOpenModal(""); query.refetch();}} selectedRadio={selectedRadio} />
        </Card>
    </>
}

export default DashboardRadio;