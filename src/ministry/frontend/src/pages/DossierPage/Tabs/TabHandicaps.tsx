import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useContext, useMemo, useState } from "react";
import DataTable from "../../../components/UI/Tables/DataTable";
import moment from "moment";
import { baseURL } from "../../../config";
import Button from "../../../components/UI/Buttons/Button";
import AlertsContext from "../../../hooks/AlertsContext";
import DeleteButton from "../../../components/UI/Buttons/DeleteButton";
import AjouterHandicap from "../Modals/AjouterHandicap";
import DeleteHandicap from "../Modals/DeleteHandicap";
import { ajouter_handicap } from "../../../hooks/usePatient";
type Props = {
    NIN: string;
};

function TabHandicaps({ NIN }: Props) {
    const { showAlert } = useContext(AlertsContext);
    const [selectedHandicap, setSelectedHandicap] = useState<any>(null);

    const [openModal, setOpenModal] = useState("");
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
            {
                header: "", id: "actions",
                cell: (info) => {
                    const c = info.row.original;
                    return (
                        !c.disabled &&
                        <div className="flex justify-end gap-2">
                            <DeleteButton onClick={() => { setSelectedHandicap(c); setOpenModal("delete_handicap"); }} />
                        </div>
                    );
                },
            }
        ], []) as ColumnDef<any>[];

    const action = (
        <Button onClick={() => setOpenModal("ajouter_handicap")} theme="primary">
            <i className="fa fa-plus" />
            <span className="ms-2">Ajouter</span>
        </Button>);

    async function submit(NIN: Patient["NIN"], a: any) {
        try {
            await ajouter_handicap(NIN, a);
            handicaps.refetch();
            showAlert("success", "Handicap enregistrée correctement");
            setOpenModal("");
        } catch (error: any) {
            if (error.response)
                if (error.response?.data?.errorCode != "form-validation")
                    showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
                else
                    showAlert("error", error.code + ": " + error.message);
        }
    }

    async function deleteEntry() {
        try {
            await axios.delete(`${baseURL}/api/patients/${NIN}/handicaps/${selectedHandicap.id}`);
            showAlert("success", "Handicap supprimée correctement");
            handicaps.refetch();
            setOpenModal("");
        } catch (error: any) {
            if (error.response)
                if (error.response?.data?.errorCode != "form-validation")
                    showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
                else
                    showAlert("error", error.code + ": " + error.message);
        }
    }

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div className="border-black/12.5 mb-0 rounded-lg border-b-0 border-solid bg-white pb-0">
                    <h2 className="mb-0 text-xl">Handicaps</h2>
                    <p className="leading-normal mb-0">Liste des handicaps du patient connues.</p>
                </div>
                {action}
            </div>
            <DataTable tableDefinition={handicapsTableDefinition} query={handicaps} className="mt-2" />
            <AjouterHandicap isOpen={openModal === "ajouter_handicap"} action={(a) => submit(NIN, a)} close={() => setOpenModal("")} />
            <DeleteHandicap isOpen={openModal === "delete_handicap"} action={deleteEntry} close={() => { setOpenModal(""); handicaps.refetch() }} />
        </>
    );
}

export default TabHandicaps;
