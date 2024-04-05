import axios from "axios";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import { updateMedicamentQuantite } from "../../hooks/useMedicaments";
import { baseURL } from "../../config";
import { useQuery } from "@tanstack/react-query";
import TableError from "../../components/UI/Tables/TableError";
import TableLoading from "../../components/UI/Loading";
import TableRow from "../../components/UI/Tables/TableRow";
import TableCell from "../../components/UI/Tables/TableCell";
import Table from "../../components/UI/Tables/Table";
import moment from "moment";

type Props = {
  isOpen: boolean,
  close: () => void,
  selectedMedicament: Medicament,
}

const theme = "primary"

export default function DetailsMedicamentModal({isOpen, close, selectedMedicament}: Props) {
    const query2 = useQuery<Transaction[]>({
        queryKey: ["transactions", selectedMedicament.code_medicament],
        queryFn: async () => {
        let data = (
            await axios.get(`${baseURL}/api/medicaments/${selectedMedicament.code_medicament}/transactions`)
        ).data;
        return data;
        },
    });
    
    return (
        <Modal isOpen={isOpen} icon="fa fa-bed" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Détails sur "{selectedMedicament.DCI} ({selectedMedicament.code_medicament})" </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une nouvelle chambre </p>
            <div className="grid grid-cols-12 gap-x-4">
                <div className="col-span-4 mb-2">
                    <label className="text-sm font-semibold">Code<span className="text-red-500">*</span> </label>
                    <input type="text" className="primary" placeholder="Code" value={selectedMedicament.code_medicament} disabled />
                </div>
                    <div className="col-span-4 mb-2">
                    <label className="text-sm font-semibold">Nom<span className="text-red-500">*</span> </label>
                    <input type="text" className="primary" placeholder="Nom" value={selectedMedicament.DCI} disabled />
                </div>
                    <div className="col-span-4 mb-2">
                    <label className="text-sm font-semibold">Quantité actuelle<span className="text-red-500">*</span> </label>
                    <input type="number" className="primary" placeholder="Qte" value={selectedMedicament.quantite} disabled />
                </div>

                <h6 className="mt-4 mb-1 col-span-12"> Liste des transactions </h6>
                {query2.isError ? (
                    <div className="block w-full ">
                    <TableError />
                    </div>) :
                query2.isLoading ? (
                    <div className="block w-full ">
                    <TableLoading />
                    </div>) :
                (
                    <Table fields={["#", "Date", "Avant", "Après", "Différence"]} className="mb-4 col-span-12 max-h-72">
                    {query2.data?.map((t, i) => (
                        <TableRow key={i}>
                        <TableCell className="font-bold">{i + 1}</TableCell>
                        <TableCell>
                            {moment(t.date).format("DD/MM/YYYY HH:mm")}
                        </TableCell>
                        <TableCell>{t.avant}</TableCell>
                        <TableCell>{t.avant + t.difference}</TableCell>
                        <TableCell className={`${t.difference > 0 ? "text-green-500" : "text-red-500"} font-bold`}> {t.difference} </TableCell>
                        </TableRow>
                    ))}
                    </Table>
                )}
            </div>

            <div className="flex justify-end gap-3">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={() => updateMedicamentQuantite(1, selectedMedicament)}>Ajouter</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
            </div>
        </Modal>);
}
