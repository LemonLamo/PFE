import Card from "../../components/UI/Card";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { baseURL } from "../../config";
import moment from "moment";
import Avatar from "../../components/Avatar";
import DataTable from "../../components/UI/Tables/DataTable";
import Badge from "../../components/UI/Badge";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Button from "../../components/UI/Buttons/Button";

const build_badge = (created_at: Date, expired_at: Date) => {
    return (
        (!expired_at || (new Date() >= new Date(created_at) && new Date() <= new Date(expired_at)))?
            <Badge bgColor="#dcfce7" textColor="#267142">
                <CheckCircleIcon className="h-4 mr-1" />
                Actif
            </Badge> :

            <Badge bgColor="#fee2e2" textColor="#991b1b">
                <ExclamationTriangleIcon className="h-4 mr-1" />
                Expiré
            </Badge>
    );
};

function HistoriquePage(){
    const authorisations_history = useQuery<any[]>({
        queryKey: ["authorisations"],
        queryFn: async () => (await axios.get(`${baseURL}/api/auth/authorisations`)).data
    });

    const revoquer = async (id: string) => {
        await axios.post(`${baseURL}/api/auth/authorisations/${id}/expire`, {});
        authorisations_history.refetch();
    }

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
        { header: "Service", id: "service", cell: (info) => info.row.original.medecin.service},
        { header: "Hopital", id: "hopital", cell: (info) => info.row.original.medecin.hopital},
        { header: "Attribué le", id: "created_at", cell: (info) => moment(info.row.original.created_at).format("DD/MM/YYYY HH:mm")},
        { header: "Motif", accessorKey: "motif" },
        { header: "Actif", id: "actif", cell: (info) => build_badge(info.row.original.created_at, info.row.original.expired_at) },
        { header: "Révoqué le", id: "expired_at", cell: (info) => info.row.original.expired_at? moment(info.row.original.expired_at).format("DD/MM/YYYY HH:mm") : '-'},
        { header: "", id: "actions",
                cell: (info) => {
                    const a = info.row.original;
                    return a.expired_at &&
                    <div className="flex justify-end gap-2">
                        <Button onClick={() => revoquer(a.id)} theme="danger">Revoquer</Button>
                    </div>
                },
            },
    ], []) as ColumnDef<any>[];

    return <>
        <Card title="Histroique d'autorisations" subtitle="Les alertes les plus pertinentes" className="w-full">
            <DataTable query={authorisations_history} tableDefinition={autorisations_tableDef} searchable={false} />
        </Card>
    </>
}

export default HistoriquePage;