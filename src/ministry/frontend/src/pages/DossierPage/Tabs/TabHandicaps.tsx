import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import moment from "moment";
import { baseURL } from "../../../config";
type Props = {
    NIN: string;
};

function TabHandicaps({ NIN }: Props) {
    const handicaps = useQuery<any[]>({
        queryKey: ["handicaps" + NIN],
        queryFn: async () => {
            const data = (await axios.get(`${baseURL}/api/patients/${NIN}/handicaps`)).data;
            return data;
        },
    });

    const handicapsTableDefinition = useMemo(
        () => [
            { header: "Code", id: "code_handicap", cell: (info) => !info.row.original.disabled ? info.row.original.code_handicap : <s>{info.row.original.code_handicap}</s> },
            { header: "Désignation", id: "designation", cell: (info) => !info.row.original.disabled ? info.row.original.designation : <s>{info.row.original.designation}</s> },
            { header: "Date de diagnostic", id: "date", cell: (info) => !info.row.original.disabled ? moment(info.row.original.date).format("DD/MM/YYYY") : <s>{moment(info.row.original.date).format("DD/MM/YYYY")}</s> },
            { header: "Remarques", id: "remarques", cell: (info) => !info.row.original.disabled ? info.row.original.remarques : <s>{info.row.original.remarques}</s> },
        ], []) as ColumnDef<any>[];

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div className="border-black/12.5 mb-0 rounded-lg border-b-0 border-solid bg-white pb-0">
                    <h2 className="mb-0 text-xl">Handicaps</h2>
                    <p className="leading-normal mb-0">Liste des handicaps du patient connues.</p>
                </div>
            </div>
            <DataTable tableDefinition={handicapsTableDefinition} query={handicaps} className="mt-2" />
        </>
    );
}

export default TabHandicaps;
