import { ColumnDef } from "@tanstack/react-table";
import Card from "../../components/UI/Card";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import moment from "moment";
import Badge from "../../components/UI/Badge";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { baseURL } from "../../config";
import IconButton from "../../components/UI/Buttons/IconButton";
import ExecuterSoinModal from "./ExecuterSoinModal";

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
    const [openModal, setOpenModal] = useState("");
    const [selectedSoin, setSelectedSoin] = useState<Soin>({
        id: "",
        hopital: "",
        hospitalisation: {chambre:"", lit: 0},
        medecin: { NIN: "", nom: "", prenom: "" },
        patient: { NIN: "", nom: "", prenom: "" },
        date_soin: new Date(),
        acte: "",
        details: "",
        infirmier: { NIN: "", nom: "", prenom: "" },
        fait: false,
    });
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
        { header: "Chambre et lit", id: "chambre_lit", cell: ((info) => 
            info.row.original.hospitalisation?
                `Chambre ${(info.row.original.hospitalisation as Partial<Hospitalisation>).chambre}, Lit N°${(info.row.original.hospitalisation as Partial<Hospitalisation>).lit}`:
                "-"
        )},
        { header: "Date", id: "date", cell: (info) => moment(info.row.original.date_soin).format("DD/MM/YYYY HH:mm") },
        { header: "Acte", accessorKey: "acte" },
        { header: "Détails", accessorKey: "details" },
        { header: "Status", id: "status", cell: (info) => build_badge(info.row.original.fait) },
        { header: "", id: "actions", cell: (info) => {
                const a = info.row.original
                return (
                    <div className="flex justify-end gap-2">
                        { !a.fait? <IconButton icon="fa fa-check" className="text-green-500 hover:text-green-700" onClick={() => {setSelectedSoin(a); setOpenModal('soin')}} /> : null}
                    </div>
                )
            }
        },
    ], []) as ColumnDef<Soin>[];

    return <>
        <Card title="Mes tâches" subtitle="Liste de vos patients" className="w-full">
            <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
            <ExecuterSoinModal isOpen={openModal==="soin"} close={() => {setOpenModal(""); query.refetch();}} selectedSoin={selectedSoin}/>
        </Card>
    </>
}

export default DashboardInfirmier;